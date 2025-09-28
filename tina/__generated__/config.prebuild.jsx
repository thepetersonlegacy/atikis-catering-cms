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
        name: "menuCategories",
        label: "Menu Categories",
        path: "content/menu-categories",
        format: "json",
        ui: {
          allowedActions: { create: true, delete: true }
        },
        fields: [
          { type: "string", name: "name", label: "Category Name", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Sort Order" }
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
                    "Executive Express Selections"
                  ]
                }
              },
              optionComponent: (props, _internalSys) => {
                try {
                  const path = _internalSys?.path || "";
                  const slug = path.split("/").pop() || "";
                  const orderMap = {
                    "signature-breakfast-collection.json": 1,
                    "artisan-salad-and-grain-bowls.json": 2,
                    "in-flight-lunch-selections.json": 3,
                    "midwest-heritage-classics.json": 4,
                    "gourmet-creations.json": 5,
                    "plant-based-culinary-selections.json": 6,
                    "elegant-desserts-and-confections.json": 7,
                    "executive-express-selections.json": 8
                  };
                  const prefix = orderMap[slug] ? `${orderMap[slug]} \u2014 ` : "";
                  return `${prefix}${props?.name || path}`;
                } catch {
                  return props?.name || _internalSys.path;
                }
              }
            }
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
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Section" })
            },
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "items", label: "Items", list: true }
            ]
          },
          {
            type: "number",
            name: "boxMaxItemsPerBox",
            label: "Max Items per Box (for Box Options)"
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
          { type: "string", name: "language", label: "Language Code", required: true },
          // Navigation
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
          // Hero Section
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
          // About Section
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description1", label: "Description 1", ui: { component: "textarea" } },
              { type: "string", name: "description2", label: "Description 2", ui: { component: "textarea" } }
            ]
          },
          // Aviation Message
          {
            type: "object",
            name: "aviationMessage",
            label: "Aviation Message",
            fields: [
              { type: "string", name: "title", label: "Title" }
            ]
          },
          // Menu copy
          {
            type: "object",
            name: "menu",
            label: "Menu Copy",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "heroTitle", label: "Hero Title" },
              { type: "string", name: "heroSubtitle", label: "Hero Subtitle" },
              { type: "string", name: "customMenuTitle", label: "Custom Menus Title" },
              { type: "string", name: "customMenuDescription", label: "Custom Menus Description", ui: { component: "textarea" } },
              { type: "string", name: "requestCustomMenu", label: "Request Custom Menu Button" },
              { type: "string", name: "qualityTitle", label: "Quality Title" },
              { type: "string", name: "qualityDescription1", label: "Quality Description 1", ui: { component: "textarea" } },
              { type: "string", name: "qualityDescription2", label: "Quality Description 2", ui: { component: "textarea" } },
              {
                type: "object",
                name: "boxOptions",
                label: "Box Selection UI",
                fields: [
                  { type: "string", name: "selectItemsToAdd", label: "Select Items To Add" },
                  { type: "string", name: "addItemsPrefix", label: "Add Items Prefix" },
                  { type: "string", name: "itemSingular", label: "Item (singular)" },
                  { type: "string", name: "itemPlural", label: "Item (plural)" },
                  { type: "string", name: "toastAddedPrefix", label: "Toast Added Prefix" },
                  { type: "string", name: "toastFrom", label: "Toast From" },
                  { type: "string", name: "perOptionNotePlaceholder", label: "Per-option Note Placeholder" },
                  { type: "string", name: "validationSelectAtLeastOne", label: "Validation Message" },
                  { type: "string", name: "addToOrder", label: "Add To Order Button" },
                  { type: "string", name: "selectedItemsLabel", label: "Selected Items Label" },
                  { type: "string", name: "inlineAdded", label: "Inline Added Text" },
                  { type: "string", name: "selectionHeader", label: "Selection Header" },
                  { type: "string", name: "numberOfBoxesLabel", label: "Number of Boxes Label" },
                  { type: "string", name: "quantityLabel", label: "Quantity Label" },
                  { type: "string", name: "chooseUpTo", label: "Choose Up To" },
                  { type: "string", name: "reachedMax", label: "Reached Max" },
                  { type: "string", name: "clearSelections", label: "Clear Selections" }
                ]
              }
            ]
          },
          // Testimonials Page
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials Page",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "viewAll", label: "View All Button" },
              { type: "string", name: "joinClients", label: "Join Clients Heading" },
              { type: "string", name: "experienceDescription", label: "Experience Description", ui: { component: "textarea" } }
            ]
          },
          // Gallery Page
          {
            type: "object",
            name: "gallery",
            label: "Gallery Page",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "prev", label: "Previous Label" },
              { type: "string", name: "next", label: "Next Label" }
            ]
          },
          // Common UI
          {
            type: "object",
            name: "common",
            label: "Common UI",
            fields: [
              { type: "string", name: "loading", label: "Loading" },
              { type: "string", name: "error", label: "Error" },
              { type: "string", name: "tryAgain", label: "Try Again" },
              { type: "string", name: "close", label: "Close" },
              { type: "string", name: "save", label: "Save" },
              { type: "string", name: "cancel", label: "Cancel" },
              { type: "string", name: "confirm", label: "Confirm" },
              { type: "string", name: "delete", label: "Delete" },
              { type: "string", name: "edit", label: "Edit" },
              { type: "string", name: "add", label: "Add" },
              { type: "string", name: "remove", label: "Remove" },
              { type: "string", name: "search", label: "Search" },
              { type: "string", name: "filter", label: "Filter" },
              { type: "string", name: "sort", label: "Sort" },
              { type: "string", name: "next", label: "Next" },
              { type: "string", name: "previous", label: "Previous" },
              { type: "string", name: "page", label: "Page" },
              { type: "string", name: "of", label: "of" },
              { type: "string", name: "results", label: "results" },
              { type: "string", name: "noResults", label: "No Results" },
              { type: "string", name: "selectLanguage", label: "Select Language" }
            ]
          },
          // SEO & Meta
          {
            type: "object",
            name: "meta",
            label: "SEO & Meta",
            fields: [
              { type: "string", name: "homeTitle", label: "Home Title" },
              { type: "string", name: "homeDescription", label: "Home Description", ui: { component: "textarea" } },
              { type: "string", name: "menuTitle", label: "Menu Title" },
              { type: "string", name: "menuDescription", label: "Menu Description", ui: { component: "textarea" } },
              { type: "string", name: "testimonialsTitle", label: "Testimonials Title" },
              { type: "string", name: "testimonialsDescription", label: "Testimonials Description", ui: { component: "textarea" } },
              { type: "string", name: "contactTitle", label: "Contact Title" },
              { type: "string", name: "contactDescription", label: "Contact Description", ui: { component: "textarea" } },
              { type: "string", name: "ogImage", label: "Default OG Image Path" }
            ]
          },
          // Contact copy
          {
            type: "object",
            name: "contact",
            label: "Contact Copy",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "getInTouch", label: "Get In Touch Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "phone", label: "Phone Label" },
              { type: "string", name: "email", label: "Email Label" },
              { type: "string", name: "address", label: "Address Label" },
              { type: "string", name: "hours", label: "Hours Label" },
              { type: "string", name: "hoursText", label: "Hours Text" },
              { type: "string", name: "fastResponse", label: "Fast Response Label" },
              // Form fields
              { type: "string", name: "name", label: "Form: Name" },
              { type: "string", name: "phoneLabel", label: "Form: Phone" },
              { type: "string", name: "deliveryDate", label: "Form: Delivery Date" },
              { type: "string", name: "wheelsUpTime", label: "Form: Wheels Up Time" },
              { type: "string", name: "specialRequests", label: "Form: Special Requests" },
              { type: "string", name: "specialRequestsPlaceholder", label: "Form: Special Requests Placeholder", ui: { component: "textarea" } },
              // Submit
              { type: "string", name: "submitInquiry", label: "Submit Inquiry Button" },
              { type: "string", name: "submitting", label: "Submitting State" },
              { type: "string", name: "thankYou", label: "Thank You Title" },
              { type: "string", name: "thankYouMessage", label: "Thank You Message", ui: { component: "textarea" } },
              { type: "string", name: "sendAnother", label: "Send Another Button" },
              // Contact info text
              { type: "string", name: "phoneMain", label: "Phone (Main)" },
              { type: "string", name: "phoneDirect", label: "Phone (Direct)" },
              { type: "string", name: "emailAddress", label: "Email Address" },
              { type: "string", name: "addressLine1", label: "Address Line 1" },
              { type: "string", name: "addressLine2", label: "Address Line 2" },
              { type: "string", name: "addressCountry", label: "Address Country" }
            ]
          },
          // Footer
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "airportsServed", label: "Airports Served Title" },
              { type: "string", name: "emailDescription", label: "Email Description", ui: { component: "textarea" } },
              { type: "string", name: "quickLinks", label: "Quick Links" },
              { type: "string", name: "legal", label: "Legal" },
              { type: "string", name: "privacyPolicy", label: "Privacy Policy" },
              { type: "string", name: "termsOfService", label: "Terms of Service" },
              { type: "string", name: "copyright", label: "Copyright" }
            ]
          },
          // How It Works copy
          {
            type: "object",
            name: "howItWorks",
            label: "How It Works",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" }
            ]
          },
          // Page strings
          {
            type: "object",
            name: "page",
            label: "Page Strings",
            fields: [
              { type: "string", name: "airportKMSP", label: "Airport KMSP" },
              { type: "string", name: "airportKSTP", label: "Airport KSTP" },
              { type: "string", name: "airportKFCM", label: "Airport KFCM" },
              { type: "string", name: "airportKANE", label: "Airport KANE" }
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
