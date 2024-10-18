import { GetServerSideProps } from 'next';
import { getSpecificEntry } from '../../../helper'; // A function to fetch entry by UID

interface EntryProps {
  entry: {
    title: string;
    url: string;
    page_components: any[];
  };
}

const EntryPage = ({ entry }: EntryProps) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{entry.title}</h1>
      <p>URL: {entry.url}</p>

      {/* Render only the first key-value pair of each component */}
      {entry.page_components.map((component, index) => {
        // Extract the first key-value pair
        const [key, value] = Object.entries(component)[0];

        return (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h2>Component: {key}</h2>

            
            {/* Optionally display some values */}
            <>
            {/* {value && typeof value === 'object' && (
              // <pre style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
              //   {JSON.stringify(value, null, 2)}
              // </pre>
            )} */}
            </>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;
  const entry_page = await getSpecificEntry(uid);

  return {
    props: {
      entry: entry_page,
    },
  };
};

export default EntryPage;
