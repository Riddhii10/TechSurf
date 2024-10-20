import React from 'react';
import HeroBanner from '../hero-banner';
import TeamSection from '../team-section';
import SectionBucket from '../section-bucket';
import Section from '../section';
import CardSection from '../card-section';
import SectionWithHtmlCode from '../section-with-html-code';
import BlogSection from '../blog-section';

export interface FieldType {
  id: string;
  title: string;
  type: string;
  name?: string;
  parent?: string | null;
  placeholder?: string;
  text?: string;
  content?: any; // Changed to any to accommodate various content types
}

// Define available field types for the sidebar
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
    id: "our_team",
    type: "our_team",
    title: "Our Team",
  }
];

export const renderers: Record<string, React.FC<FieldType>> = {
  input: (props) => <input type="text" placeholder={props.placeholder || "This is a text input"} />,
  textarea: (props) => <textarea rows={5} placeholder={props.placeholder || "This is a text area"}>{props.content}</textarea>,
  text: (props) => <p>{props.content || "Lorem Ipsum is simply dummy text"}</p>,
  button: (props) => <button>{props.text || "Button"}</button>,
  url: (props) => <a href={props.content}>{props.content}</a>,
  hero_banner: (props) => <HeroBanner banner={props.content.hero_banner}/>,
  our_team: (props) => <TeamSection ourTeam={props.content.our_team}/>,
  section_with_buckets: (props) => <SectionBucket section={props.content.section_with_buckets}/>,
  section: (props) => <Section section={props.content.section}/>,
  section_with_cards: (props) => <CardSection cards={props.content.section_with_cards.cards}/>,
  section_with_html_code: (props) => <SectionWithHtmlCode embedCode={props.content.section_with_html_code}/>,
  from_blog: (props)  => <BlogSection fromBlog={props.content.from_blog}/>,
};