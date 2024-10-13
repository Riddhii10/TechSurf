// components/RightPanel.tsx
// import { ComponentData } from '../types'; // Importing from the new types file
import {ComponentData} from '../typescript/types';

interface RightPanelProps {
  components: ComponentData[];
  updateComponent: (id: string, newProps: Partial<ComponentData>) => void;
}

export default function RightPanel({ components, updateComponent }: RightPanelProps) {
  const handleChange = (id: string, property: string, value: string) => {
    updateComponent(id, { [property]: value });
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-lg font-bold">Edit Component</h2>
      {components.map((component) => (
        <div key={component.id} className="mb-4">
          <h3 className="text-md font-semibold">{component.type}</h3>
          <input
            type="color"
            value={component.color}
            onChange={(e) => handleChange(component.id, 'color', e.target.value)}
            className="mb-2"
          />
          <input
            type="number"
            value={parseInt(component.fontSize, 10)}
            onChange={(e) => handleChange(component.id, 'fontSize', `${e.target.value}px`)}
            className="mb-2 w-full"
            placeholder="Font Size"
          />
          <input
            type="text"
            value={component.content}
            onChange={(e) => handleChange(component.id, 'content', e.target.value)}
            className="mb-2 w-full"
            placeholder="Content"
          />
        </div>
      ))}
    </div>
  );
}
