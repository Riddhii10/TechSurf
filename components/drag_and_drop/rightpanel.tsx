import React from 'react';
// import { Component, Banner, SectionProps, SectionWithBucket, Cards, TeamProps, AdditionalParamProps, FeaturedBlogData } from './component';
// import { Action, Image } from './action';
import { Action, Image } from '../../typescript/action';
import styles from '../../styles/playground.module.css';

interface RightPanelProps {
  selectedComponent: any;
  onUpdateComponent: (updatedComponent: any) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedComponent, onUpdateComponent }) => {
  if (!selectedComponent) {
    return (
      <div className={styles['right-panel']}>
        <p>Select a component to edit its properties</p>
      </div>
    );
  }
  console.log(selectedComponent, "this component is selected!!");
  const handleChange = (path: string, value: any) => {
    console.log(path,"the path");
    console.log(value,"the value");
    const updateNestedObject = (obj: any, path: string[], value: any): any => {
      console.log(`Updating path: ${path.join('.')} with value: ${value}`);
      console.log('Current object at this level:', obj);
    
      if (path.length === 0) return value;
    
      const [currentKey, ...restPath] = path;
      
      // Handle case when obj[currentKey] is undefined
      const currentLevel = obj[currentKey] || (isNaN(Number(restPath[0])) ? {} : []);
      
      const updatedObject = Array.isArray(currentLevel) ? [...currentLevel] : { ...obj };
    
      if (restPath.length === 0) {
        // We're at the leaf node, assign the value directly
        updatedObject[currentKey] = value;
        console.log('Updating leaf node:', { original: obj, updated: updatedObject });
        return updatedObject;
      }
    
      // Recursively update nested objects
      updatedObject[currentKey] = updateNestedObject(currentLevel, restPath, value);
      console.log(updatedObject[currentKey],'ek baar ye dekte hai ');
      console.log('Returning updated object for this level:', updatedObject);
      return updatedObject;
    };
    
    
    
    // Create a deep copy of the selected component
    const componentCopy = JSON.parse(JSON.stringify(selectedComponent));
    const componentType = componentCopy.type;
    const pathArray = path.split('.');
    
    // Update the content property specifically
    if (componentCopy.content) {
      const pathArray = path.split('.');
      const componentType = componentCopy.type;
      
      // Update the nested content object
      const updatedContent = {
        ...componentCopy.content,
        [componentType]: updateNestedObject(
          componentCopy.content[componentType] || {},
          pathArray,
          value
        )
      };

      console.log(updatedContent,"check this ");
      // Create the final updated component
      const updatedComponent = {
        ...componentCopy,
        content: updatedContent
      };
      console.log('Updated component:', componentCopy);
      // Call the update function with the new component
      onUpdateComponent(updatedComponent);
    }
  };


  
  const renderField = (label: string, path: string, value: any, type: string = 'text') => {
    // console.log(type,"type u are trying to update");
    switch (type) {
      case 'text':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <textarea
              value={value || ''}
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
              value={value || '#000000'}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          </div>
        );
      case 'select':
        return (
          <div className={styles['field-container']}>
            <label>{label}</label>
            <select
              value={value || ''}
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

  const renderImageEditor = (image: Image, path: string) => (
    <div className={styles['editor-section']}>
      <h4>Image</h4>
      {renderField('URL', `${path}.url`, image?.url)}
      {renderField('Alt Text', `${path}.filename`, image?.filename)}
    </div>
  );

  const renderComponentEditor = () => {
    const componentType = selectedComponent.type;
    console.log(componentType, "This is component Type!!!");
    const component = selectedComponent.content[componentType];
    console.log(component,"her is component");
    switch (componentType) {
      case 'hero_banner':
        return (
          <>
            {renderField('Banner Title', 'hero_banner.banner_title', component.banner_title)}
            {renderField('Description', 'hero_banner.banner_description', component.banner_description, 'textarea')}
            {renderField('Background Color', 'hero_banner.bg_color', component.bg_color, 'color')}
            {renderField('Text Color', 'hero_banner.text_color', component.text_color, 'color')}
            {renderImageEditor(component.banner_image, 'hero_banner.banner_image')}
            {renderActionEditor(component.call_to_action, 'hero_banner.call_to_action')}
          </>
        );

      case 'section':
        return (
          <>
            {renderField('Title', 'section.title_h2', component.title_h2)}
            {renderField('Description', 'section.description', component.description, 'textarea')}
            {renderField('Image Alignment', 'section.image_alignment', component.image_alignment, 'select')}
            {renderImageEditor(component.image, 'section.image')}
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
                  {renderImageEditor(bucket.icon, `section_with_buckets.buckets.${index}.icon`)}
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
                  {renderImageEditor(employee.image, `our_team.employees.${index}.image`)}
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
                  {renderImageEditor(blog.featured_image, `from_blog.featured_blogs.${index}.featured_image`)}
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