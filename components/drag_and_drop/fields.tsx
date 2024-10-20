import React from 'react';

export interface FieldType {
  [x: string]: any;
  id: string;
  title: string;
  type: string;
  name?: string;
  parent?: string | null;
  placeholder?: string;
  text?: string;
  content?: string;
}

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

export const renderers: Record<string, React.FC<FieldType>> = {
  input: (props) => <input type="text" placeholder={props.placeholder || "This is a text input"} />,
  textarea: (props) => <textarea rows={5} placeholder={props.placeholder || "This is a text area"}>{props.content}</textarea>,
  select: () => (
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  ),    
  text: (props) => <p>{props.content || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>,
  button: (props) => <button>{props.text || "Button"}</button>,
};