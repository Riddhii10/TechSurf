import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers, FieldType } from "./fields";
// import styles from '.../styles/playground.module.css'
import styles from '../../styles/playground.module.css'

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
  const { field, overlay, onSelect, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += ` ${styles.dragOverlay}`;
  }

  const handleClick = (e: React.MouseEvent) => {
    console.log('clicked');
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
}

const SortableField: React.FC<SortableFieldProps> = (props) => {
  const { id, index, field, onSelect } = props;
  // const [isDragging, setIsDragging] = useState(false);

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
      onPointerDown={()=>{console.log('clicked');}}
    >
      <Field field={field} onSelect={onSelect}/>
    </div>
  );
};

interface CanvasProps {
  fields: FieldType[];
  onFieldSelect: (field: FieldType) => void;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { fields, onFieldSelect } = props;

  const { setNodeRef } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

  return (
    <div ref={setNodeRef} className={styles.canvas}>
      <div className={`${styles['canvas-fields-container']}`}>
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} onSelect={onFieldSelect}/>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
