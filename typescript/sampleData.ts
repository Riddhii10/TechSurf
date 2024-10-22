// sampleData.ts
import {
  Component,
  Banner,
  TeamProps,
  SectionWithBucket,
  Cards,
  SectionProps,
  AdditionalParamProps,
  FeaturedBlogData,
} from "../typescript/component";
import { HeaderProps, FooterProps } from "../typescript/layout";

export const sampleData = {
  pageComponents: {
    hero_banner: {
      banner_title: "Welcome to Our Platform",
      banner_description: "Discover amazing features and possibilities",
      bg_color: "#f5f5f5",
      call_to_action: {
        title: "Get Started",
        href: "/signup",
      },
      banner_image: {
        filename: "hero-banner.jpg",
        url: "https://eu-images.contentstack.com/v3/assets/blt76651d6fca0c7bd9/blt863a12a8e3f348b4/6715017a3c5c34908d766024/6f3879f3ba91deb7fdd5def4416ec48e.jpg",
        title: "Hero Banner",
        uid: "blt863a12a8e3f348b4",
      },
      text_color: "#333333",
    },

    our_team: {
      title_h2: "Meet Our Team",
      description: "Get to know the amazing people behind our success",
      employees: [
        {
          image: {
            filename: "employee1.jpg",
            url: "/api/placeholder/300/300",
            title: "John Doe",
            uid: "bltc0d51168008c8e9c",
          },
          name: "John Doe",
          designation: "CEO",
        },
      ],
    },

    our_product : {
      product_category: "Product Category 1",
      category_description: "Category description ",
      products : [
        {
          image:{
            "uid": "blta40dd13ff6965586",
            "filename": "modern-cloud-ecosystem.svg",
            "url": "https://eu-images.contentstack.com/v3/assets/blt76651d6fca0c7bd9/blta40dd13ff6965586/670a09a212df9eb579ac3f25/modern-cloud-ecosystem.svg",
            "title": "Modern Cloud Ecosystem",
          },
          product_description: "product description ",
          product_price: 1500
        },
        {
          image:{
            "uid": "blta40dd13ff6965586",
            "filename": "modern-cloud-ecosystem.svg",
            "url": "https://eu-images.contentstack.com/v3/assets/blt76651d6fca0c7bd9/blta40dd13ff6965586/670a09a212df9eb579ac3f25/modern-cloud-ecosystem.svg",
            "title": "Modern Cloud Ecosystem",
          },
          product_description: "product description ",
          product_price: 1500
        },
        {
          image:{
            "uid": "blta40dd13ff6965586",
            "filename": "modern-cloud-ecosystem.svg",
            "url": "https://eu-images.contentstack.com/v3/assets/blt76651d6fca0c7bd9/blta40dd13ff6965586/670a09a212df9eb579ac3f25/modern-cloud-ecosystem.svg",
            "title": "Modern Cloud Ecosystem",
          },
          product_description: "product description ",
          product_price: 1500
        },
        {
          image:{
            "uid": "blta40dd13ff6965586",
            "filename": "modern-cloud-ecosystem.svg",
            "url": "https://eu-images.contentstack.com/v3/assets/blt76651d6fca0c7bd9/blta40dd13ff6965586/670a09a212df9eb579ac3f25/modern-cloud-ecosystem.svg",
            "title": "Modern Cloud Ecosystem",
          },
          product_description: "product description ",
          product_price: 1500
        },
        {
          image:{
            "uid": "blta40dd13ff6965586",
            "filename": "modern-cloud-ecosystem.svg",
            "url": "https://eu-images.contentstack.com/v3/assets/blt76651d6fca0c7bd9/blta40dd13ff6965586/670a09a212df9eb579ac3f25/modern-cloud-ecosystem.svg",
            "title": "Modern Cloud Ecosystem",
          },
          product_description: "product description ",
          product_price: 1500
        },
      ],
    },

    section_with_buckets: {
      bucket_tabular: false,
      title_h2: "Our Services",
      description: "Explore our range of services",
      buckets: [
        {
          title_h3: "Web Development",
          description: {
            type: "doc",
            attrs: {},
            children: [
              {
                type: "p",
                attrs: {},
                children: [
                  {
                    text: "Web Development cources will include html css js reactjs nodejs ..",
                  },
                ],
              },
            ],
          },

          url: "/services/web",
          call_to_action: {
            title: "Learn More",
            href: "/services/web",
          },
          icon: {
            filename: "web-icon.svg",
            url: "/api/placeholder/64/64",
            title: "Web Development",
            uid: "bltf146e1ec56825d6b",
          },
        },
      ],
    },

    section: {
      title_h2: "About Us",
      description: "Learn more about our company and mission",
      call_to_action: {
        title: "Learn More",
        href: "/about",
      },
      image: {
        filename: "about.jpg",
        url: "/api/placeholder/800/600",
        title: "About Us Image",
        uid: "bltf146e1ec56825d6b",
      },
      image_alignment: "left",
    },

    section_with_cards: {
      cards: [
        {
          title_h3: "Feature 1",
          description: "Amazing feature description",
          call_to_action: {
            title: "Learn More",
            href: "/features/1",
          },
        },
      ],
    },

    section_with_html_code: {
      html_code_alignment: "center",
      title: "Custom HTML Section",
      description: "This section contains custom HTML",
      html_code:
        "<div class='custom-section'><h3>Custom Content</h3><p>This is custom HTML content.</p></div>",
    },

    from_blog: {
      title_h2: "Latest Updates",
      view_articles: {
        href: "/blog",
        title: "View All Posts",
        $: {
          title: "Blog Archive",
        },
      },
      featured_blogs: [
        {
          title: "First Blog Post",
          featured_image: {
            filename: "blog1.jpg",
            url: "/api/placeholder/800/400",
            title: "Blog Post 1",
            uid: "bltf146e1ec56825d6b",
          },
          body: "Sample blog post content...",
          url: "/blog/post-1",
        },
      ],
    },
  },
};
