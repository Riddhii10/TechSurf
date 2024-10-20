import { Component } from './component';

export const sampleData: Component[] = [
  {
    hero_banner: {
      banner_title: "Welcome to Our Website",
      banner_description: "Explore our amazing features and services!",
      bg_color: "#4A90E2",
      call_to_action: {
          title: "Learn More",
          href: "/learn-more",
          $: {
              url: '',
              title: ''
          }
      },
      banner_image: {
          url: "https://example.com/banner-image.jpg",
          filename: "A beautiful banner image",
          $: {
              url: '',
              title: ''
          }
      },
      text_color: "#FFFFFF",
      $: {
          title: "Hero Section",
          title_h2: '',
          title_h3: '',
          description: '',
          banner_title: '',
          banner_description: '',
          designation: '',
          name: '',
          html_code: '',
          body: '',
          date: ''
      }
    }
  },
  {
    our_team: {
      title_h2: "Meet Our Team",
      description: "We have a talented group of individuals ready to assist you.",
      $: {
          title: '',
          title_h2: '',
          title_h3: '',
          description: '',
          banner_title: '',
          banner_description: '',
          designation: '',
          name: '',
          html_code: '',
          body: '',
          date: ''
      },
      employees: [
        {
          image: {
              url: "https://example.com/employee1.jpg",
              filename: "Employee 1",
              $: {
                  url: '',
                  title: ''
              }
          },
          name: "John Doe",
          designation: "CEO",
          $: {
            title: "John Doe Profile",
            copyright: "© 2024 Company Name",
            announcement_text: "John is the visionary behind our success.",
            label: {},
            url: "https://example.com/john-doe"
          }
        },
        {
          image: {
            src: "https://example.com/employee2.jpg",
            alt: "Employee 2"
          },
          name: "Jane Smith",
          designation: "CTO",
          $: {
            title: "Jane Smith Profile",
            copyright: "© 2024 Company Name",
            announcement_text: "Jane drives our technology forward.",
            label: {},
            url: "https://example.com/jane-smith"
          }
        }
      ]
    }
  },
  {
    section_with_buckets: {
      bucket_tabular: true,
      title_h2: "Our Services",
      description: "We offer a range of services to help you.",
      buckets: [
        {
          title_h3: "Web Development",
          description: "Building responsive and modern websites.",
          url: "/services/web-development",
          call_to_action: {
            label: "Get Started",
            url: "/contact"
          },
          icon: {
            src: "https://example.com/icons/web-development.png",
            alt: "Web Development Icon"
          },
          $: {
            title: "Web Development Bucket",
            copyright: "© 2024 Company Name",
            announcement_text: "Get a free quote today!",
            label: {},
            url: "https://example.com/services"
          }
        },
        {
          title_h3: "Mobile App Development",
          description: "Creating user-friendly mobile applications.",
          url: "/services/mobile-app-development",
          call_to_action: {
            label: "Learn More",
            url: "/contact"
          },
          icon: {
            src: "https://example.com/icons/mobile-app.png",
            alt: "Mobile App Icon"
          },
          $: {
            title: "Mobile App Development Bucket",
            copyright: "© 2024 Company Name",
            announcement_text: "Inquire about our services!",
            label: {},
            url: "https://example.com/services"
          }
        }
      ],
      $: {
        title: "Services Section",
        copyright: "© 2024 Company Name",
        announcement_text: "Explore our offerings!",
        label: {},
        url: "https://example.com/services"
      }
    }
  },
  {
    from_blog: {
      title_h2: "Latest Blog Posts",
      view_articles: {
        href: "/blog",
        title: "View All Articles",
        $: {
          title: "Blog Articles",
          copyright: "© 2024 Company Name",
          announcement_text: "Stay updated with our latest news.",
          label: {},
          url: "https://example.com/blog"
        }
      },
      featured_blogs: [
        {
          title: "How to Build a Website",
          featured_image: {
            src: "https://example.com/blog-image1.jpg",
            alt: "Blog post image"
          },
          body: "In this article, we explore the steps to building a website.",
          url: "/blog/how-to-build-a-website",
          $: {
            title: "Blog Post",
            copyright: "© 2024 Company Name",
            announcement_text: "Check out our guide!",
            label: {},
            url: "https://example.com/blog/how-to-build-a-website"
          }
        },
        {
          title: "Understanding React",
          featured_image: {
            src: "https://example.com/blog-image2.jpg",
            alt: "Blog post image"
          },
          body: "A deep dive into React and its features.",
          url: "/blog/understanding-react",
          $: {
            title: "Blog Post",
            copyright: "© 2024 Company Name",
            announcement_text: "Learn more about React!",
            label: {},
            url: "https://example.com/blog/understanding-react"
          }
        }
      ],
      $: {
        title: "Blog Section",
        copyright: "© 2024 Company Name",
        announcement_text: "Read our latest articles!",
        label: {},
        url: "https://example.com/blog"
      }
    }
  }
];
