import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getHeaderRes, getFooterRes, getAllEntries } from "../../../helper";
import { useState } from "react";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import Link from "next/link";
import Image from "next/image";
// import { FaPlus } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
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
    console.error("Error fetching pages:", error);
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
    <div className="bg-slate-200">
      {/* Header */}
      <div className="mb-4">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-5 text-white">
          HEADER
        </div>

        <div className="pt-4 mx-4 flex flex-col md:flex-row gap-8">
          {/* Image with Hover and Light Background */}
          <div
            className="flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-gray-100 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Image
              src="/box.png"
              alt="box"
              width={400}
              height={250}
              className="rounded-3xl"
            />
          </div>

          {/* Customization Section with Hover Effect */}
          <div
            className="relative w-[400px] h-[250px] border border-4 rounded-3xl bg-gray-100 group 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
            <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="mt-28">Customize your own</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-5 text-white">
          Pages
        </div>

        {pages.length === 0 ? (
          <p>No pages available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-4">
            {pages.map((page) => (
              <Link key={page.uid} href={`/playground/page/${page.uid}`}>
                <div
                  className="flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-gray-100 
                       transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <h3 className="mb-2 text-xl font-semibold text-center">
                    {page.title}
                  </h3>
                  <Image
                    src="/box.png"
                    alt="box"
                    width={400}
                    height={250}
                    className="rounded-3xl"
                  />
                </div>
              </Link>
            ))}

            <div
              className="relative w-full h-[250px] border border-4 rounded-3xl bg-gray-100 group 
                   transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
              <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="mt-28">Customize your own</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="mb-4">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-5 text-white">
          Footer
        </div>

        <div className="pt-4 mx-4 flex flex-col md:flex-row gap-8">
          {/* Image with Hover and Light Background */}
          <div
            className="flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-gray-100 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Image
              src="/box.png"
              alt="box"
              width={400}
              height={250}
              className="rounded-3xl"
            />
          </div>

          {/* Customization Section with Hover Effect */}
          <div
            className="relative w-[400px] h-[250px] border border-4 rounded-3xl bg-gray-100 group 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
            <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="mt-28">Customize your own</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PagesPage;
