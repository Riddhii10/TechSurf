import React from "react";

// Define the FieldType interface
export interface FieldType {
    id: string;  // Ensure this property is present
    title: string;
    type: string;
    name?: string; // Optional property
    parent?: string | null; // Optional property
  }

// These will be available from the sidebar
export const fields: FieldType[] = [
  {
    id: "input",
    type: "input",
    title: "Text Input",
  },
  {
    id: "select",
    type: "select",
    title: "Select",
  },
  {
    id: "text",
    type: "text",
    title: "Text",
  },
  {
    id: "button",
    type: "button",
    title: "Button",
  },
  {
    id: "textarea",
    type: "textarea",
    title: "Text Area",
  },
];

// Define the type for renderers
type Renderer = () => JSX.Element;

// These define how we render the field
export const renderers: Record<string, Renderer> = {
  input: () => <input type="text" placeholder="This is a text input" />,
  textarea: () => <textarea rows={5} placeholder="This is a text area" />,
  select: () => (
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  ),
  text: () => (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  ),
  button: () => <button>Button</button>,
};
