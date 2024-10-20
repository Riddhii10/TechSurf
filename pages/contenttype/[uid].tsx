import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSpecificContentTypeRes } from "../../helper";

export interface Block {
  title: string;
  uid: string;
  schema: any[];
}

export interface Schema {
  display_name: string;
  uid: string;
  data_type: string;
  blocks?: Block[];
}

export interface ContentType {
  title: string;
  uid: string;
  schema: Schema[];
}

interface Props {
  contentType: ContentType;
}

const ContentTypePage = ({ contentType }: Props) => {
  return (
    <div >
      <h1>{contentType.title}</h1>
      <h2>UID: {contentType.uid}</h2>
      
      {contentType.schema.map((schema) => (
        <div key={schema.uid}>
          <h3>{schema.display_name} (UID: {schema.uid})</h3>
          {schema.blocks && schema.blocks.length > 0 ? (
            <div>
              <Dropdown blocks={schema.blocks} />
            </div>
          ) : (
            <p>No blocks available</p>
          )}
        </div>
      ))}
    </div>
  );
};

const Dropdown = ({ blocks }: { blocks: Block[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {blocks.map((block, index) => (
        <div key={block.uid}>
          <button onClick={() => toggleDropdown(index)}>
            {block.title} (UID: {block.uid})
          </button>
          {openIndex === index && (
            <div style={{ paddingLeft: "20px" }}>
              {block.schema.map((field) => (
                <div key={field.uid}>
                  <p>{field.display_name} (UID: {field.uid})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query; 
  const content_type = await getSpecificContentTypeRes(uid);

  return {
    props: {
      contentType: content_type, 
    },
  };
};

export default ContentTypePage;
