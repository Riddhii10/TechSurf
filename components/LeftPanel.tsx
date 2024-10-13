import { useDraggable } from '@dnd-kit/core';

const components = ['header', 'footer', 'article', 'textfield', 'url', 'img', 'button', 'heading'];

export default function LeftPanel() {
  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      {components.map((component) => (
        <DraggableComponent key={component} id={component} />
      ))}
    </div>
  );
}

function DraggableComponent({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-2 mb-2 rounded cursor-move"
      style={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined }}
    >
      {id}
    </div>
  );
}
