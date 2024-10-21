import { useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Canvas, {Field} from "../../../components/drag_and_drop/canvas";
import Sidebar, {SidebarField} from "../../../components/drag_and_drop/sidebar";
import { FieldType } from "../../../components/drag_and_drop/fields";
import styles from '../../../styles/playground.module.css'
import Trash from "../../../components/drag_and_drop/trash";
import RightPanel from "../../../components/drag_and_drop/rightpanel";
import { GetServerSideProps } from "next/types";
import { getSpecificContentTypeRes, getSpecificEntry } from "../../../helper";
import { ContentType } from "../../contenttype/[uid]";
import { PageProps } from "../../../typescript/layout";


// Define the structure of your data state
interface DataState {
  fields: FieldType[];
}

interface PlaygroundProps {
  contentType: ContentType;
  entry: PageProps;
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

// const getInitialContentype = (entry:PageProps) : FieldType[] => {
//   console.log(entry);
//   const fields: FieldType[] = [];
//   if (entry.title) {
//     fields.push({
//       id: "title",
//       type: "text",
//       title: "Title",
//       content: entry.title
//     });
//   }

//   if (entry.url) {
//     fields.push({
//       id: "url",
//       type: "url",
//       title: "URL",
//       content: entry.url
//     });
//   }

//   // Transform page_components array if it exists
//   if (entry.page_components && Array.isArray(entry.page_components)) {
//     entry.page_components.forEach((component, index) => {
//       const componentType = Object.keys(component)[0];
      
//       fields.push({
//         id: `${componentType}_${index}`,
//         type: componentType,
//         title: componentType.split('_').map(word => 
//           word.charAt(0).toUpperCase() + word.slice(1)
//         ).join(' '),
//         content: component
//       });
//     });
//   }

//   // Add other entry fields
//   Object.entries(entry).forEach(([key, value]) => {
//     if (
//       key !== 'title' && 
//       key !== 'url' && 
//       key !== 'page_components' &&
//       !key.startsWith('$') && // Skip system fields
//       typeof value !== 'object'
//     ) {
//       fields.push({
//         id: key,
//         type: typeof value === 'string' ? 'text' : 'input',
//         title: key.charAt(0).toUpperCase() + key.slice(1),
//         content: value
//       });
//     }
//   });

//   return fields;
// }

export default function App({contentType, entry}:PlaygroundProps) {
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState<number>(
    Date.now()
  );
  const spacerInsertedRef = useRef<boolean>(false);
  const currentDragFieldRef = useRef<FieldType | null>(null);
  const [activeSidebarField, setActiveSidebarField] = useState<FieldType | null>(null);
  const [activeField, setActiveField] = useState<FieldType | null>(null);
  const [selectedField, setSelectedField] = useState<FieldType | null>(null);
//   const initialFields = getInitialContentype(entry);
  


  // Use useImmer with a defined type for the state
  const [data, updateData] = useImmer<DataState>({
    fields: [],
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
      console.log('updating ');
      const index = draft.fields.findIndex(f => f.id === updatedField.id);
      if (index !== -1) {
        draft.fields[index] = {
          ...draft.fields[index],
          ...updatedField,
          content: updatedField.content
        };
        console.log('updated draft : ', draft.fields[index]);
      }
    });
    setSelectedField(updatedField);
  };

  const { fields } = data;
  // console.log(JSON.stringify(fields));

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
          <Sidebar fieldsRegKey={String(sidebarFieldsRegenKey)} contentType ={contentType}/>
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
          <RightPanel selectedComponent={selectedField} onUpdateComponent={handleUpdateField} />
        </DndContext>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { contentTypeUid } = context.query;
  const content_type = await getSpecificContentTypeRes(contentTypeUid);

  return {
    props: {
      contentType: content_type,
    },
  };
};
