import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllEntries, getSpecificEntry } from '../../../helper'; // A function to fetch entry by UID

interface EntryProps {
  entry: {
    title: string;
    url: string;
    page_components: any[];
  };
}




const EntryPage = ({
  entry
}: EntryProps) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{entry.title}</h1>
      <p>URL: {entry.url}</p>

      {/* Render page components */}
      {entry.page_components.map((component, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          {component.hero_banner && (
            <div
              style={{
                backgroundColor: component.hero_banner.bg_color,
                color: component.hero_banner.text_color,
                padding: '20px',
              }}
            >
              <h2>{component.hero_banner.banner_title}</h2>
              <p>{component.hero_banner.banner_description}</p>
              <a href={component.hero_banner.call_to_action.href}>
                {component.hero_banner.call_to_action.title}
              </a>
            </div>
          )}

          {component.section_with_buckets && (
            <div>
              <h2>{component.section_with_buckets.title_h2}</h2>
              <p>{component.section_with_buckets.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) =>{
    const {uid} = context.query;
    const entry_page = await getSpecificEntry(uid);

    return {
        props:{
            entry : entry_page,
        },
    };
};

export default EntryPage;
