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
import Canvas, {Field} from "../components/Canvas";
import Sidebar, {SidebarField} from "../components/sidebar";
import { FieldType,fields } from "../components/fields";
import styles from '../styles/playground.module.css'


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
    title: "spacer",
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
      const { type,title } = field;
      setActiveSidebarField(field);
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${data.fields.length + 1}`,
        title,
        parent: null,
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
            <Canvas fields={fields} />
          </SortableContext>
          <DragOverlay>
            {activeSidebarField ? (
              <SidebarField overlay field={activeSidebarField} />
            ) : null}
            {activeField ? <Field overlay field={activeField} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
