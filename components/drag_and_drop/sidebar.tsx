import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";

import {  FieldType } from "./fields";
import styles from '../../styles/playground.module.css'
import { ContentType, Schema } from "../../pages/contenttype/[uid]";
import { RiDragDropLine } from "react-icons/ri";

// Define the type for SidebarFieldProps
interface SidebarFieldProps {
  field: FieldType;
  overlay?: boolean; // Optional prop
}

// the title text
export const SidebarField: React.FC<SidebarFieldProps> = (props) => {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += ` ${styles.dragOverlay}`;
  }
  
  return <div className={`${className} font-serif text-2xl ml-2 font-semibold `}>{title}</div>;
};

// Define the type for DraggableSidebarFieldProps
interface DraggableSidebarFieldProps {
  field: FieldType;
  [key: string]: any; // Allow any other props
}

const DraggableSidebarField: React.FC<DraggableSidebarFieldProps> = (props) => {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });
  
  return (
    <div ref={setNodeRef} className={`${styles['sidebar-field']}`} {...attributes}>

      {/* drag wala */}
      <div className={`${styles['sidebar-field-drag-handle']} `} {...listeners}>
        {/* hi ... */}
        <RiDragDropLine size={30}/>
      </div>

      <SidebarField field={field} {...rest} />
    </div>
  );
};



// Define the type for SidebarProps
interface SidebarProps {
  fieldsRegKey: string;
  contentType: ContentType;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { fieldsRegKey,contentType } = props;

  const fields: FieldType[] = convertContentTypeToFields(contentType);
  return (
    <div key={fieldsRegKey} className={styles.sidebar}>
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
};

function convertContentTypeToFields(contentType: ContentType): FieldType[] {
  const fields: FieldType[] = [];
  const processField = (field: Schema) => {
    console.log(field);
    if (field.data_type === "blocks" && field.blocks) {
      field.blocks.forEach((sub) =>
        fields.push({
          id: sub.uid,
          type: sub.uid,
          title: sub.title,
        })
      );
    }
    else if(field.data_type !== "text"){
      fields.push({
        id: field.uid,
        type: field.uid,
        title: field.display_name,
      });
    }
  };
  contentType.schema.forEach(processField);

  return fields;
}

export default Sidebar;
