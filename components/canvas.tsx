import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers } from "./fields";
import styles from '../styles/playground.module.css'

// Define types for the field and its props
type FieldType = {
  id: string;
  type: string;
  // Add other properties based on your field structure
};

interface FieldProps {
  field: FieldType;
  overlay?: boolean; // Optional prop
  [key: string]: any; // Allow any other props
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
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
};

interface SortableFieldProps {
  id: string;
  index: number;
  field: FieldType;
}

const SortableField: React.FC<SortableFieldProps> = (props) => {
  const { id, index, field } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} />
    </div>
  );
};

interface CanvasProps {
  fields: FieldType[];
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { fields } = props;

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
      <div className={`${styles['canvas-field']}`}>
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
