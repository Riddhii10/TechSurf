import React from 'react';
import HeroBanner from '../hero-banner';
import TeamSection from '../team-section';
import SectionBucket from '../section-bucket';

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
  url: (props) => <a href='twitch.tv'>twitch</a>,
  hero_banner: (props)=> <HeroBanner banner={{
    bg_color: '#ffffff',
    text_color: '',
    banner_title: 'Title',
    banner_description: 'Description',
    call_to_action: {
      title: 'twitch',
      href: 'twitch.tv',
      $: {
        url: '',
        title: 'tiele'
      }
    },
    banner_image: {
      filename: '',
      url: '',
      $: {
        url: '',
        title: 'tiele'
      }
    },
    $: {
      banner_title: 'Banner title',
      banner_description: 'Description :)'
    }
  }}/>,
  our_team: (props) => <TeamSection ourTeam={{
    title_h2: 'Our Team',
    description: 'Team Members',
    $: {
      title: '',
      title_h2: '',
      title_h3: '',
      description: '',
      html_code: '',
      designation: '',
      name: ''
    },
    employees: [{
      image: {
        filename: '',
        url: '',
        $: {
          url: '',
          title: ''
        }
      },
      name: 'Your Name',
      designation: 'Your Designation',
      $: {
        title: '',
        title_h2: '',
        title_h3: '',
        description: '',
        html_code: '',
        designation: '',
        name: ''
      }
    },
    {
      image: {
        filename: '',
        url: '',
        $: {
          url: '',
          title: ''
        }
      },
      name: 'Your Name',
      designation: 'Your Designation',
      $: {
        title: '',
        title_h2: '',
        title_h3: '',
        description: '',
        html_code: '',
        designation: '',
        name: ''
      }
    }  
  ]
  }}/>,
  contact_details: (props) => <></>,
  section_with_buckets: (props) => <SectionBucket section={{
    title_h2: '',
    description: '',
    buckets: [{
      title_h3: '',
      description: '',
      call_to_action: {
        title: '',
        href: '',
        $: {
          url: '',
          title: ''
        }
      },
      icon: {
        filename: '',
        url: '',
        $: {
          url: '',
          title: ''
        }
      },
      $: {
        title: '',
        title_h2: '',
        title_h3: '',
        description: '',
        html_code: '',
        designation: '',
        name: ''
      }
    }],
    $: {
      title: '',
      title_h2: '',
      title_h3: '',
      description: '',
      html_code: '',
      designation: '',
      name: ''
    }
  }}/>
};