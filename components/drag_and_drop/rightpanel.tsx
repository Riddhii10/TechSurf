import React from "react";
import { Action, Image } from "../../typescript/action";
import styles from "../../styles/playground.module.css";
import { extractTextFromRichText } from "../about-section-bucket";
// import { renderImageEditor } from '../imageSelector';
import { ImageEditor } from "../imageSelector";
import { PlusCircle } from "lucide-react";

interface RightPanelProps {
  selectedComponent: any;
  onUpdateComponent: (updatedComponent: any) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  selectedComponent,
  onUpdateComponent,
}) => {
  console.log(selectedComponent);
  if (!selectedComponent) {
    return (
      <div className={styles["right-panel"]}>
        <p className="text-2xl font-serif text-[#6247AA]">
          Select a component to edit its properties
        </p>
      </div>
    );
  }

  const updateNestedState = (path: string[], value: any) => {
    if (selectedComponent.type === "text") {
      const updatedComponent = {
        ...selectedComponent,
        content: value,
      };
      onUpdateComponent(updatedComponent);
      return;
    }

    if (selectedComponent.type === "url") {
      const updatedComponent = {
        ...selectedComponent,
        content: value,
      };
      onUpdateComponent(updatedComponent);
      return;
    }
    const updatedComponent = {
      ...selectedComponent,
      content: {
        ...selectedComponent.content,
        [selectedComponent.type]: {
          ...selectedComponent.content[selectedComponent.type],
        },
      },
    };

    let current = updatedComponent.content[selectedComponent.type];
    console.log("Current Component:", updatedComponent);

    // Handle path without type prefix
    const pathWithoutType =
      path[0] === selectedComponent.type ? path.slice(1) : path;

    for (let i = 0; i < pathWithoutType.length - 1; i++) {
      const key = pathWithoutType[i];
      const nextKey = pathWithoutType[i + 1];

      if (!isNaN(Number(nextKey))) {
        // Ensure current[key] is initialized as an array
        if (!Array.isArray(current[key])) {
          current[key] = [];
        }
        current[key] = [...current[key]]; // Clone the array to maintain immutability
      } else {
        current[key] = { ...current[key] }; // Clone the object for immutability
      }

      current = current[key]; // Move deeper into the structure
    }

    // Handle the last key in the path
    const lastKey = pathWithoutType[pathWithoutType.length - 1];

    if (Array.isArray(current)) {
      current[Number(lastKey)] = value; // Update the specific index in the array
    } else {
      current[lastKey] = value; // Update the object property
    }

    console.log("Updated Component:", updatedComponent);
    onUpdateComponent(updatedComponent); // Trigger the update
  };

  const handleChange = (path: string, value: any) => {
    console.log(path, value);
    const pathArray = path.split(".");
    updateNestedState(pathArray, value);
  };

  const addNewItemToArray = (path: string, currentItems: any[]) => {
    console.log(currentItems);
    const newItem =
      currentItems.length > 0
        ? { ...currentItems[currentItems.length - 1] } // Clone the last item
        : {}; // Fallback if the array is empty
    console.log(newItem);
    const newArray = [...currentItems, newItem];
    console.log(newArray, path);
    handleChange(path, newArray);
  };
  const renderAddButton = (path: string, items: any[]) => (
    <button
      className="w-full mt-4 p-2 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md 
                 text-gray-600 hover:border-gray-400 hover:bg-[#A594F9] hover:text-white transition-colors duration-200 ease-in-out"
      onClick={() => addNewItemToArray(path, items)}
    >
      <PlusCircle className="w-5 h-5 mr-2" />
      <span className="font-xl font-semibold">Add Item</span>
    </button>
  );

  const renderField = (
    label: string,
    path: string,
    value: any,
    type: string = "text"
  ) => {
    console.log(label, value, type, path, "description check");
    const fieldValue =
      typeof value === "object" ? extractTextFromRichText(value) : value;
    switch (type) {
      case "text":
        // console.log
        return (
          <div className={`${styles["field-container"]} `}>
            <label className="text-2xl font-serif text-[#6247AA] font-bold underline">
              {label}
            </label>
            <input
              type="text"
              value={fieldValue || ""}
              onChange={(e) => handleChange(path, e.target.value)}
              className="text-xl font-serif "
            />
          </div>
        );
      case "textarea":
        return (
          <div className={styles["field-container"]}>
            <label className="text-2xl font-serif text-[#6247AA] font-bold underline">
              {label}
            </label>
            <textarea
              value={fieldValue || ""}
              onChange={(e) => handleChange(path, e.target.value)}
              rows={4}
              className="text-xl font-serif "
            />
          </div>
        );
      case "color":
        return (
          <div className={styles["field-container"]}>
            <label className="text-2xl font-serif text-[#6247AA] font-bold underline">
              {label}
            </label>
            <input
              type="color"
              value={fieldValue || "#000000"}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          </div>
        );
      case "select":
        return (
          <div className={styles["field-container"]}>
            <label className="text-2xl font-serif text-[#6247AA] font-bold underline">
              {label}
            </label>
            <select
              value={fieldValue || ""}
              onChange={(e) => handleChange(path, e.target.value)}
              className="font-serif text-xl"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
            </select>
          </div>
        );

      case "number": 
        return (
          <div className={styles["field-container"]}>
            <label className="text-2xl font-serif text-[#6247AA] font-bold underline">
              {label}
            </label>
            <input
              type="number"
              value={fieldValue || ""}
              onChange={(e) => handleChange(path, parseFloat(e.target.value))}
              className="text-xl font-serif "
            />
          </div>
        );
  
    }
  };

  const renderActionEditor = (action: Action, path: string) => (
    <div className={styles["editor-section"]}>
      <h4>Call to Action</h4>
      {renderField("Title", `${path}.title`, action?.title)}
      {renderField("URL", `${path}.href`, action?.href)}
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
    console.log(selectedComponent);
    switch (componentType) {
      case "text":
        return (
          <>{renderField("Title ", "", selectedComponent.content)}</>
          // <>

          // titel</>
        );
      case "url":
        return (
          <>{renderField("url ", "", selectedComponent.content)}</>
          // <>

          // titel</>
        );
      case "hero_banner":
        return (
          <>
            {renderField(
              "Banner Title",
              "hero_banner.banner_title",
              component.banner_title
            )}
            {renderField(
              "Description",
              "hero_banner.banner_description",
              component.banner_description,
              "textarea"
            )}
            {renderField(
              "Background Color",
              "hero_banner.bg_color",
              component.bg_color,
              "color"
            )}
            {renderField(
              "Text Color",
              "hero_banner.text_color",
              component.text_color,
              "color"
            )}
            <ImageEditor
              image={component.banner_image}
              path={"hero_banner.banner_image"}
              handleChange={handleChange}
            />
            {renderActionEditor(
              component.call_to_action,
              "hero_banner.call_to_action"
            )}
          </>
        );

      case "section":
        return (
          <>
            {renderField("Title", "section.title_h2", component.title_h2)}
            {renderField(
              "Description",
              "section.description",
              component.description,
              "textarea"
            )}
            {renderField(
              "Image Alignment",
              "section.image_alignment",
              component.image_alignment,
              "select"
            )}
            {/* {renderImageEditor(component.image, 'section.image',handleChange)} */}
            {/* <renderImageEditor image={component.image} /> */}
            <ImageEditor
              image={component.image}
              path={"section.image"}
              handleChange={handleChange}
            />
            {renderActionEditor(
              component.call_to_action,
              "section.call_to_action"
            )}
          </>
        );

      case "section_with_buckets":
        return (
          <>
            {renderField(
              "Title",
              "section_with_buckets.title_h2",
              component.title_h2
            )}
            {renderField(
              "Description",
              "section_with_buckets.description",
              component.description,
              "textarea"
            )}
            <div className={styles["editor-section"]}>
              <h4>Buckets</h4>
              {component.buckets?.map((bucket: any, index: number) => (
                <div key={index} className={styles["bucket-item"]}>
                  {renderField(
                    `Bucket ${index + 1} Title`,
                    `section_with_buckets.buckets.${index}.title_h3`,
                    bucket.title_h3
                  )}
                  {renderField(
                    `Bucket ${index + 1} Description`,
                    `section_with_buckets.buckets.${index}.description`,
                    bucket.description,
                    "textarea"
                  )}
                  {renderActionEditor(
                    bucket.call_to_action,
                    `section_with_buckets.buckets.${index}.call_to_action`
                  )}
                  {/* {renderImageEditor(bucket.icon, `section_with_buckets.buckets.${index}.icon`,handleChange)} */}
                  <ImageEditor
                    image={bucket.icon}
                    path={`section_with_buckets.buckets.${index}.icon`}
                    handleChange={handleChange}
                  />
                </div>
              ))}
              {renderAddButton(
                "section_with_buckets.buckets",
                component.buckets || []
              )}
            </div>
          </>
        );

      case "section_with_html_code":
        return (
          <>
            {renderField(
              "Title",
              "section_with_html_code.title",
              component.title
            )}
            {renderField(
              "HTML Code",
              "section_with_html_code.html_code",
              component.html_code,
              "textarea"
            )}
            {renderField(
              "Alignment",
              "section_with_html_code.html_code_alignment",
              component.html_code_alignment,
              "select"
            )}
          </>
        );

      case "our_team":
        return (
          <>
            {renderField("Title", "our_team.title_h2", component.title_h2)}
            {renderField(
              "Description",
              "our_team.description",
              component.description,
              "textarea"
            )}
            <div className={styles["editor-section"]}>
              <h4 className="text-2xl underline font-serif text-[#6247AA]">
                Team Members
              </h4>
              {component.employees?.map((employee: any, index: number) => (
                <div key={index} className={`${styles["team-member"]}`}>
                  {renderField(
                    `Member ${index + 1} Name`,
                    `our_team.employees.${index}.name`,
                    employee.name
                  )}
                  {renderField(
                    `Member ${index + 1} Designation`,
                    `our_team.employees.${index}.designation`,
                    employee.designation
                  )}
                  {/* {renderImageEditor(employee.image, `our_team.employees.${index}.image`,handleChange)} */}
                  <ImageEditor
                    image={employee.image}
                    path={`our_team.employees.${index}.image`}
                    handleChange={handleChange}
                  />
                  
                </div>
              ))}
              {renderAddButton("our_team.employees", component.employees || [])}
            </div>
          </>
        );

      case "our_product":
        return (
          <>
          {renderField("Title", "our_product.product_category", component.product_category)}
          {renderField(
              "Description",
              "our_product.category_description",
              component.category_description,
              "textarea"
            )}
          <div className={styles["editor-section"]}>
              <h4 className="text-2xl underline font-serif text-[#6247AA]">
                Team Members
              </h4>
              {component.products?.map((product: any, index: number) => (
                <div key={index} className={`${styles["team-member"]}`}>
                  {renderField(
                    `product ${index + 1} Name`,
                    `our_product.products.${index}.product_name`,
                    product.product_name
                  )}
                  {renderField(
                    `product ${index + 1} Description`,
                    `our_product.products.${index}.product_description`,
                    product.product_description
                  )}
                  
                  {/* {renderImageEditor(employee.image, `our_team.employees.${index}.image`,handleChange)} */}
                  <ImageEditor
                    image={product.product_image}
                    path={`our_product.products.${index}.product_image`}
                    handleChange={handleChange}
                  />
                {renderField(
                  `product ${index + 1} Price`,
                  `our_product.products.${index}.product_price`,
                  product.product_price,
                  "number"
                )}
                </div>
                
              ))}
              {renderAddButton("our_product.product", component.products || [])}
            </div>
          </>
        );

      case "from_blog":
        return (
          <>
            {renderField("Title", "from_blog.title_h2", component.title_h2)}
            <div className={styles["editor-section"]}>
              <h4>Featured Blogs</h4>
              {component.featured_blogs?.map((blog: any, index: number) => (
                <div key={index} className={styles["blog-item"]}>
                  {renderField(
                    `Blog ${index + 1} Title`,
                    `from_blog.featured_blogs.${index}.title`,
                    blog.title
                  )}
                  {renderField(
                    `Blog ${index + 1} Body`,
                    `from_blog.featured_blogs.${index}.body`,
                    blog.body,
                    "textarea"
                  )}
                  {renderField(
                    `Blog ${index + 1} URL`,
                    `from_blog.featured_blogs.${index}.url`,
                    blog.url
                  )}
                  {/* {renderImageEditor(blog.featured_image, `from_blog.featured_blogs.${index}.featured_image`,handleChange)} */}
                  <ImageEditor
                    image={component.image}
                    path={`from_blog.featured_blogs.${index}.featured_image`}
                    handleChange={handleChange}
                  />
                </div>
              ))}
              {renderAddButton(
                "from_blog.featured_blogs",
                component.featured_blogs || []
              )}
            </div>
          </>
        );

      default:
        return (
          <p className="text-2xl font-serif text-[#6247AA]">
            No editor available for this component type.
          </p>
        );
    }
  };

  return (
    <div className={styles["right-panel"]}>
      <h3 className="text-center font-bold font-serif underline text-2xl mb-3">
        Edit Component
      </h3>
      {renderComponentEditor()}
    </div>
  );
};

export default RightPanel;
