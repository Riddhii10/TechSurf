import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getContentTypesRes } from '../../helper';
import Link from 'next/link';
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
            <Link href={'contenttype/'+contentType.uid}>
                <a>
                <li key={contentType.uid}>
                <strong>{contentType.title}</strong> (UID: {contentType.uid})
                </li>
                </a>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No content types available</p>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  console.log("i got hitted!!!");
  const contentTypes = await getContentTypesRes();
  return {
    props: {
      contentTypes,
    },
  };
};
