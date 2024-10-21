import React from 'react';
import { Action, Image } from '../../typescript/action';
import styles from '../../styles/playground.module.css';
import { extractTextFromRichText } from '../about-section-bucket';
// import { renderImageEditor } from '../imageSelector';
import { ImageEditor, renderImageEditor } from '../imageSelector';

interface RightPanelProps {
  selectedComponent: any;
  onUpdateComponent: (updatedComponent: any) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedComponent, onUpdateComponent }) => {
  console.log(selectedComponent);
  if (!selectedComponent) {
    return (
      <div className={styles['right-panel']}>
        <p>Select a component to edit its properties</p>
      </div>
    );
  }

  const updateNestedState = (path: string[], value: any) => {
    const updatedComponent = {
      ...selectedComponent,
      content: {
        ...selectedComponent.content,
        [selectedComponent.type]: {
          ...selectedComponent.content[selectedComponent.type]
        }
      }
    };
    let current = updatedComponent.content[selectedComponent.type];
    const pathWithoutType = path[0] === selectedComponent.type ? path.slice(1) : path;
    for (let i = 0; i < pathWithoutType.length - 1; i++) {
      const key = pathWithoutType[i];
      const nextKey = pathWithoutType[i + 1];
      if (!isNaN(Number(nextKey))) {
        if (!current[key]) {
          current[key] = [];
        }
        current[key] = [...current[key]];
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }
    const lastKey = pathWithoutType[pathWithoutType.length - 1];
    if (Array.isArray(current)) {
      current[Number(lastKey)] = value;
    } else {
      current[lastKey] = value;
    }
    if (typeof value === 'object' && value !== null) {
      current[lastKey] = { ...current[lastKey], ...value };
    }
    onUpdateComponent(updatedComponent);
  };

  const handleChange = (path: string, value: any) => {
    const pathArray = path.split('.');
    updateNestedState(pathArray, value);
  };

  const renderField = (label: string, path: string, value: any, type: string = 'text') => {
    console.log(label,value,type, path,"description check");
    const fieldValue = typeof value === 'object' ? extractTextFromRichText(value) : value;
    switch (type) {
      case 'text':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <input
              type="text"
              value={fieldValue || ''}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <textarea
              value={fieldValue || ''}
              onChange={(e) => handleChange(path, e.target.value)}
              rows={4}
            />
          </div>
        );
      case 'color':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <input
              type="color"
              value={fieldValue || '#000000'}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          </div>
        );
      case 'select':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <select
              value={fieldValue || ''}
              onChange={(e) => handleChange(path, e.target.value)}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
            </select>
          </div>
        );
    }
  };

  const renderActionEditor = (action: Action, path: string) => (
    <div className={styles['editor-section']}>
      <h4>Call to Action</h4>
      {renderField('Title', `${path}.title`, action?.title)}
      {renderField('URL', `${path}.href`, action?.href)}
    </div>
  );

  // const renderImageEditor = (image: Image, path: string) => (
  //   <div className={styles['editor-section']}>
  //     <h4>Image</h4>
  //     {renderField('Alt Text', `${path}.filename`, image?.filename)}
  //     {image.uid}
  //   </div>
  // );

  const renderComponentEditor = () => {
    
    const componentType = selectedComponent.type;
    const component = selectedComponent.content[componentType];

    switch (componentType) {
      case 'hero_banner':
        return (
          <>
            {renderField('Banner Title', 'hero_banner.banner_title', component.banner_title)}
            {renderField('Description', 'hero_banner.banner_description', component.banner_description, 'textarea')}
            {renderField('Background Color', 'hero_banner.bg_color', component.bg_color, 'color')}
            {renderField('Text Color', 'hero_banner.text_color', component.text_color, 'color')}
            <ImageEditor image={component.banner_image} path={'hero_banner.banner_image'} handleChange={handleChange}/>
            {renderActionEditor(component.call_to_action, 'hero_banner.call_to_action')}
          </>
        );

      case 'section':
        return (
          <>
            {renderField('Title', 'section.title_h2', component.title_h2)}
            {renderField('Description', 'section.description', component.description, 'textarea')}
            {renderField('Image Alignment', 'section.image_alignment', component.image_alignment, 'select')}
            {/* {renderImageEditor(component.image, 'section.image',handleChange)} */}
            {/* <renderImageEditor image={component.image} /> */}
            <ImageEditor image={component.image} path={'section.image'} handleChange={handleChange}/>
            {renderActionEditor(component.call_to_action, 'section.call_to_action')}
          </>
        );

      case 'section_with_buckets':
        return (
          <>
            {renderField('Title', 'section_with_buckets.title_h2', component.title_h2)}
            {renderField('Description', 'section_with_buckets.description', component.description, 'textarea')}
            <div className={styles['editor-section']}>
              <h4>Buckets</h4>
              {component.buckets?.map((bucket: any, index: number) => (
                <div key={index} className={styles['bucket-item']}>
                  {renderField(`Bucket ${index + 1} Title`, `section_with_buckets.buckets.${index}.title_h3`, bucket.title_h3)}
                  {renderField(`Bucket ${index + 1} Description`, `section_with_buckets.buckets.${index}.description`, bucket.description, 'textarea')}
                  {renderActionEditor(bucket.call_to_action, `section_with_buckets.buckets.${index}.call_to_action`)}
                  {/* {renderImageEditor(bucket.icon, `section_with_buckets.buckets.${index}.icon`,handleChange)} */}
                  <ImageEditor image={bucket.icon} path={`section_with_buckets.buckets.${index}.icon`} handleChange={handleChange}/>
                </div>
              ))}
            </div>
          </>
        );

      case 'section_with_html_code':
        return (
          <>
            {renderField('Title', 'section_with_html_code.title', component.title)}
            {renderField('HTML Code', 'section_with_html_code.html_code', component.html_code, 'textarea')}
            {renderField('Alignment', 'section_with_html_code.html_code_alignment', component.html_code_alignment, 'select')}
          </>
        );

      case 'our_team':
        return (
          <>
            {renderField('Title', 'our_team.title_h2', component.title_h2)}
            {renderField('Description', 'our_team.description', component.description, 'textarea')}
            <div className={styles['editor-section']}>
              <h4>Team Members</h4>
              {component.employees?.map((employee: any, index: number) => (
                <div key={index} className={styles['team-member']}>
                  {renderField(`Member ${index + 1} Name`, `our_team.employees.${index}.name`, employee.name)}
                  {renderField(`Member ${index + 1} Designation`, `our_team.employees.${index}.designation`, employee.designation)}
                  {/* {renderImageEditor(employee.image, `our_team.employees.${index}.image`,handleChange)} */}
                  <ImageEditor image={component.image} path={`our_team.employees.${index}.image`} handleChange={handleChange}/>
                </div>
              ))}
            </div>
          </>
        );

      case 'from_blog':
        return (
          <>
            {renderField('Title', 'from_blog.title_h2', component.title_h2)}
            <div className={styles['editor-section']}>
              <h4>Featured Blogs</h4>
              {component.featured_blogs?.map((blog: any, index: number) => (
                <div key={index} className={styles['blog-item']}>
                  {renderField(`Blog ${index + 1} Title`, `from_blog.featured_blogs.${index}.title`, blog.title)}
                  {renderField(`Blog ${index + 1} Body`, `from_blog.featured_blogs.${index}.body`, blog.body, 'textarea')}
                  {renderField(`Blog ${index + 1} URL`, `from_blog.featured_blogs.${index}.url`, blog.url)}
                  {/* {renderImageEditor(blog.featured_image, `from_blog.featured_blogs.${index}.featured_image`,handleChange)} */}
                  <ImageEditor image={component.image} path={`from_blog.featured_blogs.${index}.featured_image`} handleChange={handleChange}/>
                </div>
              ))}
            </div>
          </>
        );

      default:
        return <p>No editor available for this component type.</p>;
    }
  };

  return (
    <div className={styles['right-panel']}>
      <h3>Edit Component</h3>
      {renderComponentEditor()}
    </div>
  );
};

export default RightPanel;
