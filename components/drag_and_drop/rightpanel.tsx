import React from 'react';
import { FieldType } from './fields';

interface RightPanelProps {
  selectedField: FieldType | null;
  onUpdateField: (updatedField: FieldType) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedField, onUpdateField }) => {
  if (!selectedField) {
    return <div className="right-panel">Select a field to edit its properties</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateField({ ...selectedField, [name]: value });
  };

  const renderProperties = () => {
    console.log(selectedField.type);
    switch (selectedField.type) {
      case 'input':
        return (
          <>
            <label>
              Placeholder:
              <input
                type="text"
                name="placeholder"
                value={selectedField.placeholder || ''}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case 'button':
        return (
          <>
            <label>
              Button Text:
              <input
                type="text"
                name="text"
                value={selectedField.text || ''}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case 'text':
        return (
          <>
            <label>
              Content:
              <textarea
                name="content"
                value={selectedField.content || ''}
                onChange={(e) => onUpdateField({ ...selectedField, content: e.target.value })}
              />
            </label>
          </>
        );
      // Add more cases for other field types
      default:
        return <p>No editable properties for this field type.</p>;
    }
  };

  return (
    <div className="right-panel">
      <h3>Edit {selectedField.title}</h3>
      {renderProperties()}
    </div>
  );
};

export default RightPanel;