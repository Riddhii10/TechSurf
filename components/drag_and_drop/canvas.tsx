import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers, FieldType } from "./fields";
// import styles from '.../styles/playground.module.css'
import styles from "../../styles/playground.module.css";

// C:\Users\Acer\Desktop\project_works\test2\styles\playground.module.css
// Define types for the field and its props
// type FieldType = {
//   id: string;
//   type: string;
//   // Add other properties based on your field structure
// };

interface FieldProps {
  field: FieldType;
  overlay?: boolean; // Optional prop
  [key: string]: any; // Allow any other props
  onSelect?: (field: FieldType) => void;
  isSelected?: boolean;
  isFixed?: boolean;
}

function getRenderer(type: string) {
  if (type === "spacer") {
    return () => {
      return <div className={styles.spacer}>spacer</div>;
    };
  }

  return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export const Field: React.FC<FieldProps> = (props) => {
  const { field, overlay, isSelected, onSelect, isFixed, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += ` ${styles.dragOverlay}`;
  }
  if (isSelected) {
    className += ` ${styles.selectedField}`;
  }
  if (isFixed) {
    className += ` ${styles.fixedField}`;
  }

  const handleClick = (e: React.PointerEvent) => {
    console.log("clicked");
    console.log(e);
    e.stopPropagation();
    if (onSelect) {
      onSelect(field);
    }
  };

  return (
    <div className={className} onPointerDown={handleClick}>
      <Component {...field} {...rest} />
    </div>
  );
};

interface SortableFieldProps {
  id: string;
  index: number;
  field: FieldType;
  onSelect: (field: FieldType) => void;
  isSelected: boolean;
  isFixed: boolean;
}

const SortableField: React.FC<SortableFieldProps> = (props) => {
  const { id, index, field, onSelect, isSelected, isFixed } = props;
  // const [isDragging, setIsDragging] = useState(false);
  if (isFixed) {
    return (
      <div className={`${styles.sortableField} ${styles.fixedField}`}>
        <Field
          field={field}
          onSelect={onSelect}
          isSelected={isSelected}
          isFixed={true}
        />
      </div>
    );
  }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      index,
      id,
      field,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.sortableField}
    >
      <Field field={field} onSelect={onSelect} isSelected={isSelected} />
    </div>
  );
};

interface CanvasProps {
  fields: FieldType[];
  onFieldSelect: (field: FieldType) => void;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { fields, onFieldSelect } = props;
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const { setNodeRef } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  const handleFieldSelect = (field: FieldType) => {
    setSelectedField(field.id); // Update selected field
    onFieldSelect(field);
  };
  //   const style = {
  //     transform: CSS.Transform.toString(transform),
  //     transition,
  //   };

  return (
    <div ref={setNodeRef} className={styles.canvas}>
      <div className={`${styles["canvas-fields-container"]}`}>
      {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} onSelect={handleFieldSelect} isSelected={f.id == selectedField} isFixed={f.fixed}/>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
