
import { FieldType } from '../components/drag_and_drop/fields';
import { sampleData } from './sampleData';

export function initializeComponent(type: string): FieldType {
  const id = `${type}_${Date.now()}`;
  const baseStructure = {
    id,
    type,
    title: type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
  };

  // Get the sample data for this component type
  const sampleComponentData = sampleData.pageComponents[type as keyof typeof sampleData.pageComponents];

  // Create the content structure
  const content = {
    [type]: sampleComponentData || getDefaultComponentData(type)
  };

  return {
    ...baseStructure,
    content
  };
}

function getDefaultComponentData(type: string) {
  // Provide default structures for each component type
  switch (type) {
    case 'hero_banner':
      return {
        banner_title: "New Banner Title",
        banner_description: "Add your banner description here",
        bg_color: "#ffffff",
        text_color: "#000000",
        banner_image: {
          filename: "placeholder.jpg",
          url: "/api/placeholder/800/400",
          title: "Banner Image"
        },
        call_to_action: {
          title: "Click Here",
          href: "#"
        }
      };

    case 'section':
      return {
        title_h2: "New Section",
        description: "Add your section description here",
        image_alignment: "left",
        image: {
          filename: "placeholder.jpg",
          url: "/api/placeholder/800/400",
          title: "Section Image"
        },
        call_to_action: {
          title: "Learn More",
          href: "#"
        }
      };

    case 'section_with_buckets':
      return {
        title_h2: "New Bucket Section",
        description: "Add your bucket section description",
        bucket_tabular: false,
        buckets: [{
          title_h3: "New Bucket",
          description: "Bucket description",
          icon: {
            filename: "icon.svg",
            url: "/api/placeholder/64/64",
            title: "Bucket Icon"
          },
          call_to_action: {
            title: "Learn More",
            href: "#"
          }
        }]
      };

    case 'our_team':
      return {
        title_h2: "Our Team",
        description: "Meet our team members",
        employees: [{
          name: "Team Member",
          designation: "Role",
          image: {
            filename: "team-member.jpg",
            url: "/api/placeholder/300/300",
            title: "Team Member"
          }
        }]
      };

    case 'section_with_html_code':
      return {
        title: "HTML Section",
        html_code: "<div>Add your HTML here</div>",
        html_code_alignment: "center"
      };

    case 'from_blog':
      return {
        title_h2: "Latest Blog Posts",
        featured_blogs: [{
          title: "New Blog Post",
          body: "Blog post content...",
          url: "#",
          featured_image: {
            filename: "blog.jpg",
            url: "/api/placeholder/800/400",
            title: "Blog Image"
          }
        }],
        view_articles: {
          title: "View All",
          href: "#"
        }
      };

    default:
      return {
        title: "New Component",
        description: "Add component description"
      };
  }
}