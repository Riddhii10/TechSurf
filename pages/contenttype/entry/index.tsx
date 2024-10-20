import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getHeaderRes, getFooterRes, getAllEntries } from '../../../helper';
import { useState } from 'react';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import Link from 'next/link';

interface Page {
  uid: string;
  title: string;
  url: string; 
}

interface PagesPageProps {
  pages: Page[];
  header: any; 
  footer: any; 
}

export const getStaticProps: GetStaticProps<PagesPageProps> = async () => {
  try {
    const pages = await getAllEntries();
    const header = await getHeaderRes();
    const footer = await getFooterRes();

    return {
      props: { pages, header, footer },
    };
  } catch (error) {
    console.error('Error fetching pages:', error);
    return {
      props: { pages: [], header: null, footer: null },
    };
  }
};

const PagesPage = ({
  pages,
  header,
  footer,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (uid: string) => {
    setOpenDropdown((prev) => (prev === uid ? null : uid));
  };

  return (
    <div>
      {/* Header Component */}
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1>{header?.title}</h1> {/* Assuming the header has a title */}
        <nav>
          <ul>
            {header?.navigation_menu?.map((item: { uid: Key | null | undefined; url: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
              <li key={item.uid}>
                <a href={item.url}>{item.title}</a> {/* Assuming navigation has title and URL */}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '20px' }}>
        <h2 className='text-red-800'>Pages</h2>
        {pages.length === 0 ? (
          <p>No pages available.</p>
        ) : (
          <ul>
            {pages.map((page) => (
              <li key={page.uid} style={{ marginBottom: '10px' }}>
                <Link href={`/playground/page/${page.uid}`}>
                  <a style={{ textDecoration: 'none', color: 'black' }}>
                    <h3>{page.title}</h3>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>


      {/* Footer Component */}
      <footer style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <p>{footer?.copyright}</p> {/* Assuming the footer has a copyright field */}
      </footer>
    </div>
  );
};

export default PagesPage;
