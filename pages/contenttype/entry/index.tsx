import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getHeaderRes, getFooterRes, getAllEntries, deleteEntry } from "../../../helper";
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
import { useRouter } from 'next/router';
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import React from "react";

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
  const [items, setItems] = useState<Page[]>(pages);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const toggleDropdown = (uid: string) => {
    setOpenDropdown((prev) => (prev === uid ? null : uid));
  };

  const handlePreview = (url : string) =>{
    router.push(`/${url}`);
  };

  const handleEdit = (uid : string) => { 
    router.push(`/playground/page/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      const success = await deleteEntry('page',uid);
      if (success) {
        setItems((prevItems) => prevItems.filter((page) => page.uid !== uid));
        setShowModal(false);
      } else {
        console.error("Failed to delete entry from backend.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const performDelete = async (uid : string) =>{
    setDeleteId(uid);
    setShowModal(true);
  }

  return (
    <div className="bg-slate-200">
      {/* Header */}

      <div className="mb-4 pt-5">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-4 text-white rounded-xl ml-5">
          PAGES
        </div>

        {items.length === 0 ? (
          <p>No pages available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4">
            {items.map((page) => (
                // <React.Fragment key={page.uid+"-reactfrag"}>
                <div
                  className="relative flex flex-col items-center border border-gray-300 rounded-3xl pb-3 pt-14 bg-gray-100
                       transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                       key={page.uid+"firstdiv"}
                >
                  <Link key={page.uid} href={`/playground/page/${page.uid}`}>
                  <Image
                    src="/h2.jpg"
                    alt="box"
                    width={400}
                    height={250}
                    className="rounded-3xl"
                    key={page.uid+"img"}
                  />
                  </Link>
                  <div className="absolute top-2 right-16 flex space-x-2 " key={page.uid+"seconddiv"} >
              <span className="text-2xl font-semibold font-serif mt-1 mr-20 text-[#6247AA]" key={page.uid+"span"}>{page.title}</span>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>handleEdit(page.uid)} key={page.uid+"edit"}><FaEdit size={30}/></button>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>handlePreview(page.url)}><FaEye size={30} key={page.uid+"prev"}/></button>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>performDelete(page.uid)}><FaTrashAlt size={30} key={page.uid+"del"}/></button>
            </div>
                </div>
              
              // </React.Fragment>

            ))}

            <div
              className="relative w-full h-[310px] border border-4 rounded-3xl bg-gray-100 group 
                   transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                   onClick={()=>{router.push('/playground/page')}}
            >
              <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
              <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="mt-28" >Customize your own</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      {showModal && deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
            <p className="text-gray-600 mt-2">This action cannot be undone.</p>

            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                Cancel
              </button>
              <button 
                onClick={()=>handleDelete(deleteId)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesPage;
