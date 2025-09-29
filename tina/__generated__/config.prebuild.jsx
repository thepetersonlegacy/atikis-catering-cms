// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
      static: false
    },
    accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      // ========================================
      // 🏢 WEBSITE CONTENT
      // Core website settings and content
      // ========================================
      {
        name: "siteSettings",
        label: "\u{1F3E2} Website Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "contact",
            label: "\u{1F4DE} Contact Information",
            description: "Your business contact details displayed throughout the website",
            fields: [
              {
                type: "string",
                name: "email",
                label: "Business Email Address",
                description: "Primary email for customer inquiries and orders"
              },
              {
                type: "string",
                name: "phone",
                label: "Business Phone Number",
                description: "Main phone number for customer contact"
              },
              {
                type: "string",
                name: "address",
                label: "Business Address",
                description: "Full business address for location and delivery information",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "\u{1F3AF} Homepage Hero Section",
            description: "The main banner area that visitors see first on your homepage",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Main Headline",
                description: "The primary headline that captures attention (keep it compelling and concise)"
              },
              {
                type: "string",
                name: "subtitle",
                label: "Supporting Message",
                description: "Additional text that explains your value proposition (2-3 lines recommended)",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Hero Background Image",
                description: "High-quality image that represents your brand (recommended: 1920x1080px, under 500KB)"
              }
            ]
          }
        ]
      },
      // ========================================
      // 🍽️ MENU MANAGEMENT
      // Organize your catering menu and offerings
      // ========================================
      {
        name: "menuCategories",
        label: "\u{1F3F7}\uFE0F Menu Categories",
        path: "content/menu-categories",
        format: "json",
        ui: {
          allowedActions: { create: true, delete: true },
          filename: {
            slugify: (values) => {
              return `${values?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "\u{1F4DD} Category Display Name",
            required: true,
            description: "The name customers will see (e.g., 'Signature Breakfast Collection', 'Elegant Desserts')",
            ui: {
              validate: (value) => {
                if (!value || value.length < 3) {
                  return "Category name must be at least 3 characters long";
                }
                if (value.length > 50) {
                  return "Category name should be 50 characters or less for better display";
                }
              }
            }
          },
          {
            type: "string",
            name: "description",
            label: "\u{1F4C4} Category Description",
            ui: {
              component: "textarea"
            },
            description: "Optional description to help customers understand this category's offerings"
          },
          {
            type: "number",
            name: "order",
            label: "\u{1F4CA} Display Order",
            description: "Controls the order categories appear on your menu (1 = first, 2 = second, etc.)",
            ui: {
              validate: (value) => {
                if (value && (value < 1 || value > 100)) {
                  return "Display order should be between 1 and 100";
                }
                if (value && !Number.isInteger(value)) {
                  return "Display order must be a whole number";
                }
              }
            }
          }
        ]
      },
      {
        name: "menuItems",
        label: "\u{1F37D}\uFE0F Menu Items",
        path: "content/menu",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
            }
          }
        },
        fields: [
          // === BASIC INFORMATION ===
          {
            type: "string",
            name: "name",
            label: "\u{1F3F7}\uFE0F Item Name",
            required: true,
            description: "The name customers will see on your menu",
            ui: {
              validate: (value) => {
                if (!value || value.length < 3) {
                  return "Item name must be at least 3 characters long";
                }
                if (value.length > 80) {
                  return "Item name should be 80 characters or less for better display";
                }
              }
            }
          },
          {
            type: "string",
            name: "description",
            label: "\u{1F4DD} Item Description",
            ui: {
              component: "textarea",
              validate: (value) => {
                if (value && value.length > 500) {
                  return "Description should be 500 characters or less for better readability";
                }
                if (value && value.length < 10) {
                  return "Description should be at least 10 characters to be helpful to customers";
                }
              }
            },
            description: "Detailed description that helps customers understand what they're ordering (10-500 characters recommended)"
          },
          // === CATEGORIZATION ===
          {
            type: "reference",
            name: "category",
            label: "\u{1F3F7}\uFE0F Menu Category",
            collections: ["menuCategories"],
            required: true,
            description: "Which category should this item appear under?",
            ui: {}
          },
          // === VISUAL & PROMOTION ===
          {
            type: "image",
            name: "image",
            label: "\u{1F4F8} Item Photo",
            description: "High-quality photo of this menu item (recommended: 800x600px, under 200KB)"
          },
          {
            type: "boolean",
            name: "featured",
            label: "\u2B50 Featured Item",
            description: "Mark as featured to highlight this item prominently on your menu"
          },
          // === ADVANCED OPTIONS ===
          {
            type: "object",
            name: "sections",
            label: "\u{1F4CB} Item Sections & Options",
            list: true,
            description: "Add sections like 'Includes', 'Box Options', or 'Available Sides' (optional - expand for advanced features)",
            ui: {},
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                description: "e.g., 'Includes', 'Box Options', 'Available Sides'"
              },
              {
                type: "string",
                name: "items",
                label: "Section Items",
                list: true,
                description: "List the items included in this section"
              }
            ]
          },
          {
            type: "number",
            name: "boxMaxItemsPerBox",
            label: "\u{1F4E6} Maximum Items Per Box",
            description: "For box-style items, set the maximum number of items customers can select (leave empty if not applicable)"
          }
        ]
      },
      // ========================================
      // 💬 CUSTOMER TESTIMONIALS
      // ========================================
      {
        name: "testimonials",
        label: "\u{1F4AC} Customer Testimonials",
        path: "content/testimonials",
        format: "json",
        ui: {},
        fields: [
          {
            type: "string",
            name: "name",
            label: "\u{1F464} Customer Name",
            required: true,
            description: "Full name of the customer (will be displayed publicly)"
          },
          {
            type: "string",
            name: "company",
            label: "\u{1F3E2} Company or Title",
            description: "Company name, job title, or organization (optional but adds credibility)"
          },
          {
            type: "string",
            name: "content",
            label: "\u{1F4AD} Testimonial Text",
            required: true,
            ui: {
              component: "textarea"
            },
            description: "The customer's feedback in their own words"
          },
          {
            type: "number",
            name: "rating",
            label: "\u2B50 Star Rating",
            ui: {
              validate: (value) => {
                if (value && (value < 1 || value > 5)) {
                  return "Rating must be between 1 and 5 stars";
                }
              }
            },
            description: "How many stars did they give? (1-5 stars)"
          },
          {
            type: "image",
            name: "avatar",
            label: "\u{1F4F7} Customer Photo",
            description: "Optional photo of the customer (adds authenticity, but respect privacy)"
          }
        ]
      },
      // ========================================
      // 📸 MEDIA ASSETS
      // ========================================
      {
        name: "galleryImages",
        label: "\u{1F4F8} Photo Gallery",
        path: "content/gallery",
        format: "json",
        ui: {},
        fields: [
          {
            type: "image",
            name: "src",
            label: "\u{1F4F7} Upload Photo",
            required: true,
            description: "Upload your image (JPG, PNG, or WebP recommended \u2022 Max 2MB for best performance)"
          },
          {
            type: "string",
            name: "alt",
            label: "\u{1F50D} Image Description (Alt Text)",
            required: true,
            description: "Describe what's in the image for accessibility and search engines"
          },
          {
            type: "string",
            name: "caption",
            label: "\u{1F4AC} Photo Caption",
            description: "Optional caption that visitors will see (keep it engaging!)"
          },
          {
            type: "string",
            name: "album",
            label: "\u{1F4C1} Photo Album",
            description: "Organize your photos into albums for easy browsing",
            options: [
              { value: "general", label: "\u{1F31F} General Gallery" },
              { value: "food", label: "\u{1F37D}\uFE0F Food & Catering" },
              { value: "events", label: "\u{1F389} Events & Celebrations" },
              { value: "behind-scenes", label: "\u{1F468}\u200D\u{1F373} Behind the Scenes" }
            ]
          }
        ]
      },
      // ========================================
      // 🌐 WEBSITE TEXT & TRANSLATIONS
      // ========================================
      {
        name: "translations",
        label: "\u{1F310} Website Text & Translations",
        path: "content/translations",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "language",
            label: "\u{1F30D} Language Code",
            required: true,
            description: "Language code for this translation (e.g., 'en' for English, 'es' for Spanish)"
          },
          {
            type: "object",
            name: "nav",
            label: "\u{1F9ED} Navigation Menu",
            description: "Text for your website's main navigation links",
            fields: [
              { type: "string", name: "home", label: "Home Link" },
              { type: "string", name: "menu", label: "Menu Link" },
              { type: "string", name: "gallery", label: "Gallery Link" },
              { type: "string", name: "testimonials", label: "Testimonials Link" },
              { type: "string", name: "contact", label: "Contact Link" },
              { type: "string", name: "orderNow", label: "Order Now Button" }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "\u{1F3AF} Homepage Hero Section",
            description: "The main banner text that visitors see first",
            fields: [
              { type: "string", name: "title", label: "Main Headline" },
              { type: "string", name: "subtitle", label: "Supporting Text" },
              { type: "string", name: "viewMenu", label: "Call-to-Action Button" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "\u2139\uFE0F About Section",
            description: "Tell your story and explain what makes your catering special",
            fields: [
              { type: "string", name: "title", label: "Section Heading" },
              { type: "string", name: "description1", label: "First Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "description2", label: "Second Paragraph", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "aviationMessage",
            label: "\u2708\uFE0F Aviation Message",
            fields: [
              { type: "string", name: "title", label: "Title" }
            ]
          },
          {
            type: "object",
            name: "menu",
            label: "\u{1F37D}\uFE0F Menu Page Content",
            description: "All text content for your menu page",
            fields: [
              { type: "string", name: "title", label: "Page Title" },
              { type: "string", name: "subtitle", label: "Page Subtitle" },
              { type: "string", name: "heroTitle", label: "Hero Banner Title" },
              { type: "string", name: "heroSubtitle", label: "Hero Banner Subtitle" },
              { type: "string", name: "customMenuTitle", label: "Custom Menu Section Title" },
              { type: "string", name: "customMenuDescription", label: "Custom Menu Description", ui: { component: "textarea" } },
              { type: "string", name: "requestCustomMenu", label: "Custom Menu Button Text" },
              { type: "string", name: "qualityTitle", label: "Quality Promise Title" },
              { type: "string", name: "qualityDescription1", label: "Quality Description - Part 1", ui: { component: "textarea" } },
              { type: "string", name: "qualityDescription2", label: "Quality Description - Part 2", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
