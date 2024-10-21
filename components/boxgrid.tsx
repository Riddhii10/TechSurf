// components/AboutUs.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';

interface BoxGridProps {
  pages: { uid: string; title: string }[];
}

const BoxGrid: React.FC<BoxGridProps> = ({ pages }) => {
  return (
    <div className="mb-4">
      {/* About Us Header */}
      <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-5 text-white">
        ABOUT US
      </div>

      {/* Content Section */}
      <div className="pt-4 mx-4 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div>
          <Image
            src="/box.png"
            alt="box"
            width={400}
            height={250}
            className="rounded-3xl"
          />
        </div>

        {/* Customizable Box */}
        <div className="relative w-[400px] h-[250px] border border-4 rounded-3xl bg-gray-300 group">
          <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />

          <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="mt-28">Customize your own</span>
          </div>
        </div>
      </div>

      {/* Page List Section */}
      <main style={{ padding: '20px' }}>
        <h2 className="text-red-800">Page</h2>
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
    </div>
  );
};

export default BoxGrid;
