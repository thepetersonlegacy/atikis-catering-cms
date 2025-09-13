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
    accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    maxSize: 10 * 1024 * 1024
    // 10MB limit
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Site Settings",
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
            label: "Contact Information",
            fields: [
              {
                type: "string",
                name: "email",
                label: "Email"
              },
              {
                type: "string",
                name: "phone",
                label: "Phone"
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image"
              }
            ]
          }
        ]
      },
      {
        name: "menuItems",
        label: "Menu Items",
        path: "content/menu",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Item Name",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "number",
            name: "price",
            label: "Price"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "appetizers",
              "entrees",
              "desserts",
              "beverages"
            ]
          },
          {
            type: "image",
            name: "image",
            label: "Image"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Item"
          }
        ]
      },
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Customer Name",
            required: true
          },
          {
            type: "string",
            name: "company",
            label: "Company/Title"
          },
          {
            type: "string",
            name: "content",
            label: "Testimonial",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1-5)"
          },
          {
            type: "image",
            name: "avatar",
            label: "Avatar Image"
          }
        ]
      },
      {
        name: "galleryImages",
        label: "Gallery Images",
        path: "content/gallery",
        format: "json",
        fields: [
          {
            type: "image",
            name: "src",
            label: "Image",
            required: true
          },
          {
            type: "string",
            name: "alt",
            label: "Alt Text",
            required: true
          },
          {
            type: "string",
            name: "caption",
            label: "Caption"
          },
          {
            type: "string",
            name: "album",
            label: "Album/Category"
          }
        ]
      },
      {
        name: "translations",
        label: "Translations",
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
            label: "Language Code",
            required: true
          },
          {
            type: "object",
            name: "nav",
            label: "Navigation",
            fields: [
              { type: "string", name: "home", label: "Home" },
              { type: "string", name: "menu", label: "Menu" },
              { type: "string", name: "gallery", label: "Gallery" },
              { type: "string", name: "testimonials", label: "Testimonials" },
              { type: "string", name: "contact", label: "Contact" },
              { type: "string", name: "orderNow", label: "Order Now" }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "viewMenu", label: "View Menu Button" }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "quickLinks", label: "Quick Links" },
              { type: "string", name: "contactInfo", label: "Contact Info" },
              { type: "string", name: "followUs", label: "Follow Us" }
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
