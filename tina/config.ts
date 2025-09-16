import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
      static: false,
    },
    accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
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
            delete: false,
          },
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
                label: "Email",
              },
              {
                type: "string",
                name: "phone",
                label: "Phone",
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
      },
      {
        name: "menuCategories",
        label: "Menu Categories",
        path: "content/menu-categories",
        format: "json",
        ui: {
          allowedActions: { create: true, delete: true },
        },
        fields: [
          { type: "string", name: "name", label: "Category Name", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Sort Order" },
        ],
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
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "reference",
            name: "category",
            label: "Category",
            collections: ["menuCategories"],
            required: true,
            ui: {
              // Limit to exactly the 8 canonical categories and show human-friendly names
              collectionFilter: {
                menuCategories: {
                  name: [
                    "Signature Breakfast Collection",
                    "Artisan Salad and Grain Bowls",
                    "In-Flight Lunch Selections",
                    "Midwest Heritage Classics",
                    "Gourmet Creations",
                    "Plant-Based Culinary Selections",
                    "Elegant Desserts and Confections",
                    "Executive Express Selections",
                  ],
                },
              },
              optionComponent: (
                props: { name?: string },
                _internalSys: { path: string }
              ) => {
                try {
                  const path = _internalSys?.path || "";
                  const slug = path.split("/").pop() || "";
                  const orderMap: Record<string, number> = {
                    "signature-breakfast-collection.json": 1,
                    "artisan-salad-and-grain-bowls.json": 2,
                    "in-flight-lunch-selections.json": 3,
                    "midwest-heritage-classics.json": 4,
                    "gourmet-creations.json": 5,
                    "plant-based-culinary-selections.json": 6,
                    "elegant-desserts-and-confections.json": 7,
                    "executive-express-selections.json": 8,
                  };
                  const prefix = orderMap[slug] ? `${orderMap[slug]} — ` : "";
                  return `${prefix}${props?.name || path}`;
                } catch {
                  return props?.name || _internalSys.path;
                }
              },
            },
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Item",
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Section" }),
            },
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "items", label: "Items", list: true },
            ],
          },
          {
            type: "number",
            name: "boxMaxItemsPerBox",
            label: "Max Items per Box (for Box Options)",
          },
        ],
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
            required: true,
          },
          {
            type: "string",
            name: "company",
            label: "Company/Title",
          },
          {
            type: "string",
            name: "content",
            label: "Testimonial",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1-5)",
          },
          {
            type: "image",
            name: "avatar",
            label: "Avatar Image",
          },
        ],
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
            required: true,
          },
          {
            type: "string",
            name: "alt",
            label: "Alt Text",
            required: true,
          },
          {
            type: "string",
            name: "caption",
            label: "Caption",
          },
          {
            type: "string",
            name: "album",
            label: "Album/Category",
          },
        ],
      },
      {
        name: "translations",
        label: "Translations",
        path: "content/translations",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "language",
            label: "Language Code",
            required: true,
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
              { type: "string", name: "orderNow", label: "Order Now" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "viewMenu", label: "View Menu Button" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "quickLinks", label: "Quick Links" },
              { type: "string", name: "contactInfo", label: "Contact Info" },
              { type: "string", name: "followUs", label: "Follow Us" },
            ],
          },
        ],
      },
    ],
  },
});
