import React from "react";
import HeroBanner from "../hero-banner";
import TeamSection from "../team-section";
import SectionBucket from "../section-bucket";
import Section from "../section";
import CardSection from "../card-section";
import SectionWithHtmlCode from "../section-with-html-code";
import BlogSection from "../blog-section";
import { sampleData } from "../../typescript/sampleData";
import AboutSectionBucket from "../about-section-bucket";
import ProductsPage from "../product";

export interface FieldType {
  id: string;
  title: string;
  type: string;
  name?: string;
  parent?: string | null;
  placeholder?: string;
  text?: string;
  content?: any;
  fixed? :boolean | null;
}

// Helper function to safely access nested content or return sample data
const getContentOrSample = (props: any, path: string) => {
  const something = props.content.someProperty;
  return props?.content?.[path] || sampleData.pageComponents[path];
};

export const renderers: Record<string, (props: any) => JSX.Element> = {
  input: (props) => {
    return (
      props?.content || <input type="text" placeholder="This is a text input" />
    );
  },
  textarea: (props) => {
    return (
      props?.content || <textarea rows={5} placeholder="This is a text area" />
    );
  },
  text: (props) => {
    return <p>{props?.content || "Lorem Ipsum is simply dummy text"}</p>;
  },
  button: (props) => {
    return <button>{props?.text || "Button"}</button>;
  },
  url: (props) => {
    return props?.content || <a href="#">Sample URL</a>;
  },
  hero_banner: (props) => (
    <HeroBanner banner={getContentOrSample(props, "hero_banner")} />
  ),
  our_team: (props) => (
    <TeamSection ourTeam={getContentOrSample(props, "our_team")} />
  ),
  section_with_buckets: (props) => {
    const sectionWithBuckets = getContentOrSample(props, "section_with_buckets");

    return sectionWithBuckets?.bucket_tabular ? (
      <SectionBucket section={sectionWithBuckets} />
    ) : (
      <AboutSectionBucket sectionWithBuckets={sectionWithBuckets} />
    );
  },
  section: (props) => (
    <Section section={getContentOrSample(props, "section")} />
  ),
  section_with_cards: (props) => (
    <CardSection cards={getContentOrSample(props, "section_with_cards.cards")} />
  ),
  section_with_html_code: (props) => (
    <SectionWithHtmlCode
      embedCode={getContentOrSample(props, "section_with_html_code")}
    />
  ),
  from_blog: (props) => (
    <BlogSection fromBlog={getContentOrSample(props, "from_blog")} />
  ),
  our_product: (props) => (
    <ProductsPage ourProduct={getContentOrSample(props, "our_product")} />
  ),
};
