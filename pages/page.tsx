import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getHeaderRes, getFooterRes, getAllEntries } from '../helper';
import { useState } from 'react';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

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
        <h2>Pages</h2>
        {pages.length === 0 ? (
          <p>No pages available.</p>
        ) : (
          <ul>
            {pages.map((page) => (
              <li key={page.uid} style={{ marginBottom: '10px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => toggleDropdown(page.uid)}
                >
                  <h3>{page.title}</h3>
                  <div>
                    <button style={{ marginRight: '10px' }}>Preview</button>
                    <button>Edit</button>
                  </div>
                </div>
                {openDropdown === page.uid && (
                  <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <p><strong>URL:</strong> {page.url}</p>
                    {/* You can add more information about the page here if necessary */}
                  </div>
                )}
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
