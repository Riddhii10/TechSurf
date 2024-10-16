// pages/content-types.tsx
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { fetchContentTypes } from '../contentstack-sdk'; // Import SDK method
import { getContentTypesRes } from '../helper';
type ContentType = {
  title: string;
  uid: string;
};

type Props = {
  contentTypes: ContentType[];
};

export default function ContentTypesPage({
  contentTypes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Content Types</h1>
      {contentTypes && contentTypes.length > 0 ? (
        <ul>
          {contentTypes.map((contentType) => (
            <li key={contentType.uid}>
              <strong>{contentType.title}</strong> (UID: {contentType.uid})
            </li>
          ))}
        </ul>
      ) : (
        <p>No content types available</p>
      )}
    </div>
  );
}

// Fetch content types data on the server
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  console.log("i got hitted!!!");
  const contentTypes = await getContentTypesRes();
  return {
    props: {
      contentTypes,
    },
  };
};
