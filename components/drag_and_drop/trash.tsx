// drag_and_drop/Trash.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "../../styles/playground.module.css"; // Adjust path as needed

const Trash: React.FC = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.trash} ${isOver ? styles.trashOver : ""}`}
    >
      🗑️ Drop Here to Delete
    </div>
  );
};

export default Trash;
