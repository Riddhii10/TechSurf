// sampleData.ts
import { Component, Banner, TeamProps, SectionWithBucket, Cards, SectionProps, AdditionalParamProps, FeaturedBlogData } from '../typescript/component';
import { HeaderProps, FooterProps } from '../typescript/layout';

export const sampleData = {
  pageComponents: {
    hero_banner: {
      banner_title: "Welcome to Our Platform",
      banner_description: "Discover amazing features and possibilities",
      bg_color: "#f5f5f5",
      call_to_action: {
        title: "Get Started",
        href: "/signup"
      },
      banner_image: {
        filename: "hero-banner.jpg",
        url: "/api/placeholder/1200/600",
        title: "Hero Banner"
      },
      text_color: "#333333",
      $: {
        title: "Hero Banner",
        banner_title: "Welcome to Our Platform",
        banner_description: "Discover amazing features"
      }
    },
    
    our_team: {
      title_h2: "Meet Our Team",
      description: "Get to know the amazing people behind our success",
      employees: [{
        image: {
          filename: "employee1.jpg",
          url: "/api/placeholder/300/300",
          title: "John Doe"
        },
        name: "John Doe",
        designation: "CEO",
        $: {
          name: "John Doe",
          designation: "Chief Executive Officer",
          description: "Leadership"
        }
      }],
      $: {
        title_h2: "Team Section",
        description: "Our team members"
      }
    },

    section_with_buckets: {
      bucket_tabular: false,
      title_h2: "Our Services",
      description: "Explore our range of services",
      buckets: [{
        title_h3: "Web Development",
        description: "Custom web solutions",
        url: "/services/web",
        call_to_action: {
          title: "Learn More",
          href: "/services/web"
        },
        icon: {
          filename: "web-icon.svg",
          url: "/api/placeholder/64/64",
          title: "Web Development"
        },
        $: {
          title_h3: "Web Development",
          description: "Web services"
        }
      }],
      $: {
        title: "Services",
        description: "Our offerings"
      }
    },

    section: {
      title_h2: "About Us",
      description: "Learn more about our company and mission",
      call_to_action: {
        title: "Learn More",
        href: "/about"
      },
      image: {
        filename: "about.jpg",
        url: "/api/placeholder/800/600",
        title: "About Us Image"
      },
      image_alignment: "left",
      $: {
        title_h2: "About Section",
        description: "Company information"
      }
    },

    section_with_cards: {
      cards: [{
        title_h3: "Feature 1",
        description: "Amazing feature description",
        call_to_action: {
          title: "Learn More",
          href: "/features/1"
        },
        $: {
          title_h3: "Feature 1",
          description: "Feature details"
        }
      }]
    },

    section_with_html_code: {
      html_code_alignment: "center",
      title: "Custom HTML Section",
      description: "This section contains custom HTML",
      html_code: "<div class='custom-section'><h3>Custom Content</h3><p>This is custom HTML content.</p></div>",
      $: {
        title: "HTML Section",
        html_code: "Custom HTML"
      }
    },

    from_blog: {
      title_h2: "Latest Updates",
      view_articles: {
        href: "/blog",
        title: "View All Posts",
        $: {
          title: "Blog Archive"
        }
      },
      featured_blogs: [{
        title: "First Blog Post",
        featured_image: {
          filename: "blog1.jpg",
          url: "/api/placeholder/800/400",
          title: "Blog Post 1"
        },
        body: "Sample blog post content...",
        url: "/blog/post-1",
        $: {
          title: "Blog Post 1",
          body: "Sample content",
          date: "2024-10-20"
        }
      }],
      $: {
        title_h2: "Blog Section",
        description: "Latest posts"
      }
    }
  }
};