import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { Image, Action } from "../typescript/action";

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  html_code: string;
  designation: string;
  name: string;
};

type RichTextNode = {
  type: string;
  children?: Array<RichTextNode | { text: string }>;
};

type Buckets = {
  title_h3: string;
  description: string | RichTextNode;
  call_to_action: Action;
  icon: Image;
  $: AdditionalParam;
};

export type BucketProps = {
  title_h2: string;
  description: string | RichTextNode;
  buckets: [Buckets];
  $: AdditionalParam;
};

// Helper function to extract text from rich text objects
const extractTextFromRichText = (node: RichTextNode): string => {
  if (!node.children) return '';

  return node.children
    .map((child) => {
      if (typeof child === 'string') return child;
      if ('text' in child) return child.text;
      return extractTextFromRichText(child); // Recursive extraction
    })
    .join(' ');
};

export default function SectionBucket({ section }: { section: BucketProps }) {
  // Handle section description as a string or rich text
  const sectionDescription =
    typeof section.description === 'string'
      ? section.description
      : extractTextFromRichText(section.description);

  return (
    <div className='member-main-section'>
      <div className='member-head'>
        {section.title_h2 && (
          <h2 {...(section.$?.title_h2 as {})}>{section.title_h2}</h2>
        )}
        {sectionDescription && (
          <p {...(section.$?.description as {})}>{parse(sectionDescription)}</p>
        )}
      </div>
      <div className='member-section'>
        {section.buckets?.map((bucket, index) => {
          // Handle bucket description dynamically
          const bucketDescription =
            typeof bucket.description === 'string'
              ? bucket.description
              : extractTextFromRichText(bucket.description);

          return (
            <div className='content-section' key={index}>
              {bucket.icon && (
                <img
                  {...(bucket.icon.$?.url as {})}
                  src={bucket.icon.url}
                  alt='bucket icon'
                />
              )}

              {bucket.title_h3 && (
                <h3 {...(bucket.$?.title_h3 as {})}>{bucket.title_h3}</h3>
              )}

              <div {...(bucket.$?.description as {})}>
                {parse(bucketDescription)}
              </div>

              {bucket.call_to_action?.title && (
                <Link
                  href={
                    bucket.call_to_action.href
                      ? bucket.call_to_action.href
                      : '#'
                  }
                >
                  {`${bucket.call_to_action.title} -->`}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
