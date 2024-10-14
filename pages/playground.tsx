// import { useRef, useState } from "react";
// import { useImmer } from "use-immer";
// import { DndContext, DragOverlay } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import Canvas, {Field} from "../components/drag_and_drop/canvas";
// import Sidebar, {SidebarField} from "../components/drag_and_drop/sidebar";
// import { FieldType, fields } from "../components/drag_and_drop/fields";
// import styles from '../styles/playground.module.css'

// interface DataState {
//   fields: FieldType[];
// }

// function getData(prop: any) {
//   return prop?.data?.current ?? {};
// }

// function createSpacer({ id }: { id: string }): FieldType {
//   return {
//     id,
//     type: "spacer",
//     title: "spacer",
//   };
// }

// export default function App() {
//   const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState<number>(Date.now());
//   const spacerInsertedRef = useRef<boolean>(false);
//   const currentDragFieldRef = useRef<FieldType | null>(null);
//   const [activeDraggedField, setActiveDraggedField] = useState<FieldType | null>(null);

//   const [data, updateData] = useImmer<DataState>({
//     fields: [],
//   });

//   const cleanUp = () => {
//     setActiveDraggedField(null);
//     currentDragFieldRef.current = null;
//     spacerInsertedRef.current = false;
//   };

//   const handleDragStart = (e: any) => {
//     const { active } = e;
//     const activeData = getData(active);

//     if (activeData.fromSidebar) {
//       const { field } = activeData;
//       const { type, title } = field;
//       const newField = {
//         id: active.id,
//         type,
//         name: `${type}${data.fields.length + 1}`,
//         title,
//         parent: null,
//       };
//       setActiveDraggedField(newField);
//       currentDragFieldRef.current = newField;
//     } else {
//       const { field, index } = activeData;
//       setActiveDraggedField(field);
//       currentDragFieldRef.current = field;
//       updateData((draft: DataState) => {
//         draft.fields.splice(index, 1, createSpacer({ id: active.id }));
//       });
//     }
//   };

//   const handleDragOver = (e: any) => {
//     // ... (keep your existing handleDragOver logic)
//   };

//   const handleDragEnd = (e: any) => {
//     const { active, over } = e;
    
//     if (!over) {
//       cleanUp();
//       updateData((draft: DataState) => {
//         draft.fields = draft.fields.filter((f) => f.type !== "spacer");
//       });
//       return;
//     }

//     const activeData = getData(active);
//     const overData = getData(over);

//     if (activeData.fromSidebar) {
//       // Adding a new field from sidebar
//       let nextField = currentDragFieldRef.current;
//       if (nextField) {
//         updateData((draft: DataState) => {
//           const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
//           draft.fields.splice(spacerIndex, 1, nextField);
//         });
//       }
//     } else {
//       // Reordering within canvas
//       updateData((draft: DataState) => {
//         const oldIndex = draft.fields.findIndex((f) => f.id === active.id);
//         const newIndex = overData.index;
//         draft.fields = arrayMove(draft.fields, oldIndex, newIndex);
//       });
//     }

//     setSidebarFieldsRegenKey(Date.now());
//     cleanUp();
//   };

//   const { fields } = data;

//   return (
//     <div className={styles.app}>
//       <div className={styles.content}>
//         <DndContext
//           onDragStart={handleDragStart}
//           onDragOver={handleDragOver}
//           onDragEnd={handleDragEnd}
//           autoScroll
//         >
//           <Sidebar fieldsRegKey={String(sidebarFieldsRegenKey)} />
//           <SortableContext
//             strategy={verticalListSortingStrategy}
//             items={fields.map((f: FieldType) => f.id)}
//           >
//             <Canvas fields={fields} />
//           </SortableContext>
//           <DragOverlay>
//             {activeDraggedField && (
//               <div className={styles.dragOverlay}>
//                 <Field field={activeDraggedField} overlay />
//               </div>
//             )}
//           </DragOverlay>
//         </DndContext>
//       </div>
//     </div>
//   );
// }


import { useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// import Announcements from "./announcements";
// import Canvas, { Field } from "./canvas";
// import Sidebar, { SidebarField } from "./sidebar";
// import { FieldType, fields } from "./fields"; // Import fields type
import Canvas, {Field} from "../components/drag_and_drop/canvas";
import Sidebar, {SidebarField} from "../components/drag_and_drop/sidebar";
import { FieldType,fields as initialFields } from "../components/drag_and_drop/fields";
import styles from '../styles/playground.module.css'
import Trash from "../components/drag_and_drop/trash";
import RightPanel from "../components/drag_and_drop/rightpanel";


// Define the structure of your data state
interface DataState {
  fields: FieldType[];
}

// Helper function to get data from draggable elements
function getData(prop: any) {
  return prop?.data?.current ?? {};
}

// Function to create a spacer field
function createSpacer({ id }: { id: string }): FieldType {
  return {
    id,
    type: "spacer",
    title: "spacer"
  };
}

export default function App() {
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState<number>(
    Date.now()
  );
  const spacerInsertedRef = useRef<boolean>(false);
  const currentDragFieldRef = useRef<FieldType | null>(null);
  const [activeSidebarField, setActiveSidebarField] = useState<FieldType | null>(null);
  const [activeField, setActiveField] = useState<FieldType | null>(null);
  const [selectedField, setSelectedField] = useState<FieldType | null>(null);

  


  // Use useImmer with a defined type for the state
  const [data, updateData] = useImmer<DataState>({
    fields: initialFields,
  });

  // Cleanup function to reset states
  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  // Handle drag start event
  const handleDragStart = (e: any) => {
    const { active } = e;
    const activeData = getData(active);

    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type,title, content, placeholder, text } = field;
      setActiveSidebarField(field);
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${data.fields.length + 1}`,
        title,
        parent: null,
        content: content,
        placeholder: placeholder,
        text: text
      };
      return;
    }

    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData((draft: DataState) => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  // Handle drag over event
  const handleDragOver = (e: any) => {
    console.log(e,"over");
    const { active, over } = e;
    const activeData = getData(active);

    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: `${active.id}-spacer`,
        });

        updateData((draft: DataState) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex = overData.index > -1 ? overData.index : draft.fields.length;
            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        updateData((draft: DataState) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        updateData((draft: DataState) => {
          const spacerIndex = draft.fields.findIndex((f) => f.id === `${active.id}-spacer`);
          const nextIndex = overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, nextIndex);
        });
      }
    }
  };

  // Handle drag end event
  const handleDragEnd = (e: any) => {
    const { over } = e;
    
    if (!over) {
      cleanUp();
      updateData((draft: DataState) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);

      updateData((draft: DataState) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);
        draft.fields = arrayMove(draft.fields, spacerIndex, overData.index || 0);
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
    setSelectedField(null);
  };


  const handleFieldSelect = (field: FieldType) => {
    console.log(field);
    setSelectedField(field);
  };

  const handleUpdateField = (updatedField: FieldType) => {
    updateData((draft: DataState) => {
      const index = draft.fields.findIndex(f => f.id === updatedField.id);
      if (index !== -1) {
        draft.fields[index] = updatedField;
      }
    });
    setSelectedField(updatedField);
  };

  const { fields } = data;
  console.log(JSON.stringify(fields));

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          autoScroll
        >
          {/* <Announcements /> */}
          <Sidebar fieldsRegKey={String(sidebarFieldsRegenKey)} />
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={fields.map((f:FieldType) => f.id)}
          >
            <Canvas fields={fields} onFieldSelect={handleFieldSelect}/>
          </SortableContext>
          {/* <Trash /> */}
          
          <DragOverlay>
            {activeSidebarField ? (
              <SidebarField overlay field={activeSidebarField} />
            ) : null}
            {activeField ? <Field overlay field={activeField} /> : null}
          </DragOverlay>
          <RightPanel selectedField={selectedField} onUpdateField={handleUpdateField} />
        </DndContext>
      </div>
    </div>
  );
}
