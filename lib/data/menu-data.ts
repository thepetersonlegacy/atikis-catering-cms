export interface MenuItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  sections?: {
    title: string;
    items: string[];
  }[];
  // Optional: maximum number of items allowed per box for "Boxes Available" items
  boxMaxItemsPerBox?: number;
}

export const menuCategoryKeys = [
  'signatureBreakfast',
  'artisanSalad',
  'inFlightLunch',
  'midwestHeritage',
  'gourmetCreations',
  'plantBased',
  'elegantDesserts',
  'executiveExpress'
];

export const allMenuItems: MenuItem[] = [
  // Signature Breakfast Collection
  // Continental & European Style
  {
    id: 'continental-breakfast',
    title: 'Continental Breakfast',
    description: 'Yogurt, berry cup, fresh fruit, breakfast bread, granola, hard-boiled egg, jam, and orange juice.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'euro-breakfast',
    title: 'Euro Breakfast',
    description: 'Croissant, fruit,  Hard boil eggs, Cured meats & artisan cheese, and orange juice',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'breakfast-bagel-tray',
    title: 'Breakfast Bagel Tray',
    description: 'Assorted bagels served with jam, whipped cream cheese, and whipped butter.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'variety-breakfast-bread-tray',
    title: 'Variety Breakfast Bread Tray',
    description: 'A selection of scones, muffins, and pastries. sevred with whipped cream cheese and butter ',
    category: 'Signature Breakfast Collection'
  },

  // Healthy Bowls & Oats
  {
    id: 'steel-cut-oats',
    title: 'Steel-Cut Oats',
    description: 'Toasted groats, customizable with your choice of toppings.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'oatmeal-bake-of-the-day',
    title: 'Oatmeal Bake of the Day',
    description: 'Chef\'s rotating specialty oatmeal bake.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'coconut-porridge',
    title: 'Coconut Porridge',
    description: 'Berries, coconut shavings, almonds. Gluten-free.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'apple-chia-breakfast-bowl',
    title: 'Apple Chia Breakfast Bowl',
    description: 'Apples, chia, yogurt, granola, nuts, and dried fruit.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'citrus-breakfast-bowl',
    title: 'Citrus Breakfast Bowl',
    description: 'Steel-cut oats, vanilla yogurt, grapefruit, and orange, with a side of granola and chia seeds',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'vegan-chia-seed-pudding',
    title: 'Vegan Chia Seed Pudding',
    description: 'Chia seeds soaked in coconut milk, cinnamon, vanilla, and maple syrup.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'protein-tray',
    title: 'Protein Tray',
    description: 'Protein Shake - vanilla or chocolate, protein balls, assorted berries, and yogurt.',
    category: 'Signature Breakfast Collection'
  },

  // Toast & Sandwiches
  {
    id: 'avocado-toast',
    title: 'Avocado Toast',
    description: 'Sourdough, feta, tomatoes, radish, and smashed avocado spread.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'a-la-carte-breakfast-sandwich',
    title: 'À la Carte Breakfast Sandwich',
    description: 'Lightly toasted choice of bread—croissant, English muffin, bagel, etc.—with your choice of sausage patty, ham, or bacon, and two fried eggs.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'breakfast-burrito',
    title: 'Breakfast Burrito',
    description: 'Flour tortilla filled with fajita mix, cheddar cheese, and your choice of sausage, ham, or bacon with scrambled eggs. Served with salsa, hot sauce, and sour cream.',
    category: 'Signature Breakfast Collection'
  },

  // Egg Dishes
  {
    id: 'omelet',
    title: 'Omelet',
    description: 'Customize your omelet with your choice of fresh ingredients.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'atikis-omelet',
    title: 'Atikis Omelet with Browned Breakfast Potatoes',
    description: 'Includes crispy bacon, cream cheese, garden herbs, provolone, sausage, and sun-dried tomato. Egg-white and custom options available.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'frittata-of-the-day',
    title: 'Frittata of the Day',
    description: 'Chef\'s rotating specialty frittata.',
    category: 'Signature Breakfast Collection'
  },
  {
    id: 'quiche-of-the-day',
    title: 'Quiche of the Day',
    description: 'Ask about our chef\'s quiche of the day.',
    category: 'Signature Breakfast Collection'
  },

  // Specialty Breakfast Dishes
  {
    id: 'mexican-breakfast-scramble',
    title: 'Mexican Breakfast Scramble',
    description: 'Scrambled eggs, brown rice, chorizo, seasoned black beans, roasted corn, and fresh spinach served with sour cream, salsa, shredded cheddar, hot sauce, avocado, and tortilla strips.',
    category: 'Signature Breakfast Collection'
  },

  // Box Options
  {
    id: 'signature-breakfast-boxes',
    title: 'Signature Breakfast Collection Boxes Available',
    description: 'Select from our signature breakfast items, each individually packaged in convenient boxes for easy in-flight service.',
    category: 'Signature Breakfast Collection',
    sections: [
      {
        title: 'Available Breakfast Box Options',
        items: [
          'Continental Breakfast',
          'Euro Breakfast',
          'Breakfast Bagel Tray',
          'Variety Breakfast Bread Tray',
          'Steel-Cut Oats',
          'Oatmeal Bake of the Day',
          'Coconut Porridge',
          'Apple Chia Breakfast Bowl',
          'Citrus Breakfast Bowl',
          'Vegan Chia Seed Pudding',
          'Protein Tray',
          'Avocado Toast',
          'À la Carte Breakfast Sandwich',
          'Breakfast Burrito',
          'Omelet',
          'Atikis Omelet with Browned Breakfast Potatoes',
          'Frittata of the Day',
          'Quiche of the Day',
          'Mexican Breakfast Scramble'
        ]
      }
    ]
  },

  // Artisan Salad & Grain Bowls
  {
    id: 'buddha-square',
    title: 'Buddha',
    description: 'Brown rice, shelled edamame, snap peas or snow peas, or broccoli florets, reduced-sodium tamari or soy sauce, red cabbage or spinach or romaine lettuce or kale, avocados, pineapple and cucumber, carrot ginger sauce, green onion, lime wedges, sesame seeds. Add protein or tofu.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'power-square',
    title: 'Power',
    description: 'Greens, avocado, beans/lentils, pepitas, hummus, or pesto.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'mediterranean-square',
    title: 'Mediterranean',
    description: 'Mixed greens, feta, olives, cucumber, tomato, gyro meat, hummus, and quinoa.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'shaved-brussels-sprouts-square',
    title: 'Shaved Brussels Sprouts',
    description: 'Shaved Brussels sprouts with cranberries, almonds, and shaved Parmesan.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'wild-rice-arugula-square',
    title: 'Wild Rice Arugula',
    description: 'Minnesota wild rice, arugula, goat cheese, sweet potatoes, chicken, and dried cherries.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'classic-cobb-square',
    title: 'Classic Cobb',
    description: 'Traditional Cobb with chicken, egg, avocado, bacon, tomato, cucumber, and blue cheese.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'cobbrific-square',
    title: 'Cobbrific',
    description: 'Ham, turkey, cheddar cheese, Swiss cheese, blue cheese, cucumbers, broccoli, hard-boiled eggs, and bacon.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'chicken-butternut-squash-square',
    title: 'Chicken and Butternut Squash',
    description: 'Seasonal greens with roasted chicken, butternut squash, cranberries, and pepitas.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'chicken-cashew-square',
    title: 'Chicken Cashew',
    description: 'Shredded chicken, quinoa, parmesan, crispy bacon, cashews and dried cherries over greens',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'peri-peri-chicken-lt-square',
    title: 'Peri Peri Chicken LT',
    description: 'Spicy peri peri chicken, bacon, cucumber, cheddar cheese, wonton strips, lettuce, and tomato.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'banh-mi-square',
    title: 'Banh Mi (Tofu or Chicken)',
    description: 'Vietnamese-style salad with pickled veggies and sriracha aioli.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'pulled-pork-greenery-square',
    title: 'Pulled Pork Greenery',
    description: 'Pulled pork, seasonal berries, goat cheese, and walnuts over romaine.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'ancho-steak-square',
    title: 'Ancho Steak',
    description: 'Grilled shredded filet with mixed greens, roasted corn, black beans, cilantro beer rice, cheddar cheese, salsa, crispy wontons and ancho dressing',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'steak-gorgonzola-square',
    title: 'Steak and Gorgonzola',
    description: 'Grilled filet, pears, grapes, gorgonzola, candied walnuts with mixed greens',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'salmon-farro-square',
    title: 'Salmon Farro',
    description: 'Grilled salmon, farro grain blend, arugula, and shaved fennel.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'blackened-salmon-caesar-square',
    title: 'Blackened Salmon Caesar',
    description: 'Grilled salmon, romaine, carrots parmesan crisps, english cucumbers, homemade croutons and lemon served with a creamy caesar dressing.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'smoked-salmon-arugula-square',
    title: 'Smoked Salmon Arugula',
    description: 'Arugula, smoked salmon, avocado, pear, red onion, with a champagne vinaigrette ',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'ahi-ahi-square',
    title: 'Ahi Ahi',
    description: 'Seared ahi tuna over mixed greens with wasabi dressing.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'nicoise-square',
    title: 'Niçoise',
    description: 'Traditional tuna nicoise salad with potatoes, green beans, olives, and egg.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'poke-square',
    title: 'Poke',
    description: 'Ahi ahi tuna or tuna steak, spicy mayo sauce, brown rice or white rice, diced cucumber, carrots, shelled edamame, avocados, black sesame seeds and green onion',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'pico-suave-square',
    title: 'Pico Suave',
    description: 'Southwest salad with pico de gallo and avocado.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'shrimp-cavatappi-square',
    title: 'Shrimp Cavatappi',
    description: 'cavatappi in a spicy peanut sauce with colossal shrimp, cilantro,carrots, zucchini and pepper flakes.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'taco-salad',
    title: 'Taco Salad',
    description: 'Grilled chicken or steak tossed in house Tex-Mex seasoning, romaine lettuce, tomatoes, black olives, shredded cheddar, red onion, served with sour cream, tortilla strips, and salsa.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'asian-salad',
    title: 'Asian Salad',
    description: 'Grilled chicken, steak, or salmon tossed with teriyaki sauce, romaine lettuce, carrots, red cabbage, pea pods, mandarin oranges, red pepper, cucumber; shaved almonds and wonton strips on the side with Asian vinaigrette.',
    category: 'Artisan Salad and Grain Bowls'
  },
  {
    id: 'italian-salad',
    title: 'Italian Salad',
    description: 'Cubed salami, pepperoni, and prosciutto; tomato, cucumber, black olives, pepperoncini peppers, fresh mozzarella, red onion, and roasted red pepper over romaine lettuce. Side of Italian vinaigrette and croutons.',
    category: 'Artisan Salad and Grain Bowls'
  },

  {
    id: 'artisan-salad-boxes',
    title: 'Artisan Salad & Grain Bowls Boxes Available',
    description: 'Select from our artisan salad and grain bowl items, each individually packaged in convenient boxes for easy in-flight service.',
    category: 'Artisan Salad and Grain Bowls',
    sections: [
      {
        title: 'Available Artisan Salad & Grain Bowl Box Options',
        items: [
          'Buddha',
          'Power',
          'Mediterranean',
          'Shaved Brussels Sprouts',
          'Wild Rice Arugula',
          'Classic Cobb',
          'Cobbrific',
          'Chicken and Butternut Squash',
          'Chicken Cashew',
          'Peri Peri Chicken LT',
          'Banh Mi (Tofu or Chicken)',
          'Pulled Pork Greenery',
          'Ancho Steak',
          'Steak and Gorgonzola',
          'Salmon Farro',
          'Blackened Salmon Caesar',
          'Smoked Salmon Arugula',
          'Ahi Ahi',
          'Niçoise',
          'Poke',
          'Pico Suave',
          'Shrimp Cavatappi'
        ]
      }
    ]
  },

  // Midwest Heritage Classics
  {
    id: 'minnesota-chicken-wild-rice-soup',
    title: 'Minnesota Chicken Wild Rice Soup',
    description: 'Cream-based chicken and wild rice soup with fresh herbs.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'atikis-minnesota-mixed-grill',
    title: 'Atikis Minnesota Mixed Grill',
    description: 'Filet, chicken, colossal shrimp, and seasonal vegetables served cold on a tray ',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'protein-entree',
    title: 'Protein Entrée',
    description: 'Choice of T-bone steak, ribeye, filet, airline chicken, chicken thigh, chicken breast, salmon, or shrimp with starch and seasonal vegetables.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'pumpernickel-crusted-walleye',
    title: 'Pumpernickel-Crusted Walleye',
    description: 'Served with wild rice pilaf.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'walleye-cake',
    title: 'Wild Rice Wallakeseye Cakes',
    description: 'Served with lemon cream sauce.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'tater-tot-hotdish',
    title: 'Tater Tot Hot Dish',
    description: 'Seasoned ground beef, mixed vegetables, cream of mushroom soup, and cheddar cheese, topped with crispy golden tater tots.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'midwest-classic',
    title: 'Midwest Classic',
    description: 'Swedish meatballs served with creamy gravy over mashed potatoes and seasonal vegetables.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'gourmet-mn-tater-tot-hotdish',
    title: 'Gourmet MN Tater Tot Hotdish',
    description: 'Beef short ribs baked to perfection, served with carrots, celery, onions, and mushrooms in a creamy Gruyère black truffle gravy. Topped with tater tots.',
    category: 'Midwest Heritage Classics'
  },

  {
    id: 'st-paul-dip',
    title: 'St. Paul Dip',
    description: 'Roast beef, provolone, giardiniera on bun with au jus.',
    category: 'Midwest Heritage Classics'
  },
  {
    id: 'snack-box',
    title: 'Snack Box',
    description: 'Half sandwich or wrap, shrimp cocktail, meat & cheese, savory salad, dessert, plus extras.',
    category: 'In-Flight Lunch Selections'
  },
  {
    id: 'sandwich-box-lunch',
    title: 'Sandwich Box Lunch',
    description: 'Custom sandwich, fruit, dessert, cookie, savory salad, Chips, mayo, and mustard.',
    category: 'In-Flight Lunch Selections'
  },
  {
    id: 'salad-box',
    title: 'Salad Box',
    description: 'Custom salad, fruit, dessert, cookie, dressing, roll, and butter.',
    category: 'In-Flight Lunch Selections'
  },
  {
    id: 'midwest-heritage-boxes',
    title: 'Midwest Heritage Classics Boxes Available',
    description: 'Select from our Midwest Heritage Classics items, each individually packaged in convenient boxes for easy in-flight service.',
    category: 'Midwest Heritage Classics',
    sections: [
      {
        title: 'Available Midwest Heritage Classics Box Options',
        items: [
          'Atikis Minnesota Mixed Grill',
          'Protein Entrée',
          'Pumpernickel-Crusted Walleye',
          'Wild Rice Wallakeseye Cakes',
          'Tater Tot Hot Dish',
          'St. Paul Dip',
          'Snack Box'
        ]
      }
    ]
  },

  // Gourmet Pasta & Rice Creations
  {
    id: 'brie-chicken',
    title: 'Brie Chicken',
    description: 'Grilled chicken with caramelized apples and walnuts.',
    category: 'Gourmet Creations'
  },
  {
    id: 'harissa-chicken',
    title: 'Harissa Chicken',
    description: 'Pulled chicken with greens, pomegranate, and mushrooms over pasta, quinoa, or greens.',
    category: 'Gourmet Creations'
  },
  {
    id: 'maple-farm-golden-duck',
    title: 'Maple Farm Golden Duck',
    description: 'Roasted duck with root vegetables and balsamic reduction (12–14 oz).',
    category: 'Gourmet Creations'
  },
  {
    id: 'salmon-en-papillote',
    title: 'Salmon en Papillote',
    description: 'Salmon baked with lemon, tomatoes, and olives (à la carte 10–12 oz).',
    category: 'Gourmet Creations'
  },
  {
    id: 'red-curry',
    title: 'Red Curry',
    description: 'Choice of steak, chicken, or shrimp with seasonal vegetables.',
    category: 'Gourmet Creations'
  },
  {
    id: 'firecracker-shrimp-teriyaki-chicken-bowl',
    title: 'Firecracker Shrimp or Teriyaki Chicken Bowl',
    description: 'Rice, vegetables, edamame, avocado, and mandarin oranges.',
    category: 'Gourmet Creations'
  },
  {
    id: 'chicken-entree',
    title: 'Chicken Entrée',
    description: 'Chicken — blackened, pan-seared, roasted, or grilled\nAirline Chicken\nChicken Parmesan\nChicken Piccata\nChicken Marsala\nBrie Chicken\nServed with a starch and seasonal vegetables.',
    category: 'Gourmet Creations'
  },
  {
    id: 'fish-seafood-entree',
    title: 'Fish/Seafood Entrée',
    description: 'Walleye, cod, sea bass, halibut, salmon, shrimp — blackened, pan-seared, roasted, or grilled\nPumpernickel-Crusted Walleye\nEn Papillote\nShrimp Scampi\nBouillabaisse\nLobster Tail\nLobster in Cream Sauce\nServed with a starch and seasonal vegetables.',
    category: 'Gourmet Creations'
  },
  {
    id: 'beef-entree',
    title: 'Beef Entrée',
    description: 'Tenderloin filet, NY strip, ribeye — grilled, seared, or blackened\nSteak Tips\nBolognese\nShort Rib Ragu\nPot Roast\nLasagna\nShort Ribs\nServed with a starch and seasonal vegetables.',
    category: 'Gourmet Creations'
  },
  {
    id: 'other-proteins',
    title: 'Other Proteins',
    description: 'Maple Farm Golden Duck\nLamb Chops.',
    category: 'Gourmet Creations'
  },

  {
    id: 'soups-of-the-day',
    title: 'Soups of the Day',
    description: 'Ask our lovely staff for soups of the day.',
    category: 'In-Flight Lunch Selections'
  },
  {
    id: 'gourmet-creations-boxes',
    title: 'Gourmet Creations Boxes Available',
    description: 'Select from our Gourmet Creations items, each individually packaged in convenient boxes for easy in-flight service.',
    category: 'Gourmet Creations',
    sections: [
      {
        title: 'Available Gourmet Creations Box Options',
        items: [
          'Brie Chicken',
          'Harissa Chicken',
          'Maple Farm Golden Duck',
          'Salmon en Papillote',
          'Red Curry',
          'Firecracker Shrimp or Teriyaki Chicken Bowl'
        ]
      }
    ]
  },

  // Plant-Based Culinary Selections
  {
    id: 'pea-lime-pasta',
    title: 'Pea Lime Pasta',
    description: 'Cashew pesto with campanelle or shirataki noodles.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'vegan-pasta-of-the-day',
    title: 'Vegan Pasta of the Day',
    description: 'Chef\'s rotating vegan pasta dish.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'the-marty',
    title: 'The Marty',
    description: 'Quinoa, mushrooms, tofu, black beans, roasted tomatoes, spinach, and special sauce.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'tofu-fried-rice',
    title: 'Tofu Fried Rice',
    description: 'Tofu, mushrooms, grilled vegetables, and rice.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'vegan-buttered-chicken-tofu',
    title: 'Vegan Buttered Chicken Tofu',
    description: 'Creamy plant-based "butter chicken" with rice and pita.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'hasselback-sweet-potatoes',
    title: 'Hasselback Sweet Potatoes',
    description: 'Served with vegan pesto.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'portafilet',
    title: 'Portafilet',
    description: 'Seasoned portabella served as sandwich, wrap, or entrée with vegetables and starch.',
    category: 'Plant-Based Culinary Selections'
  },
  {
    id: 'plant-based-boxes',
    title: 'Plant-Based Culinary Selections Boxes Available',
    description: 'Select from our Plant-Based Culinary Selections items, each individually packaged in convenient boxes for easy in-flight service.',
    category: 'Plant-Based Culinary Selections',
    sections: [
      {
        title: 'Available Plant-Based Culinary Selections Box Options',
        items: [
          'Pea Lime Pasta',
          'Vegan Pasta of the Day',
          'The Marty',
          'Tofu Fried Rice',
          'Vegan Buttered Chicken Tofu',
          'Hasselback Sweet Potatoes',
          'Portafilet'
        ]
      }
    ]
  },

  // Elegant Desserts & Confections
  {
    id: 'cookies-bars-such',
    title: 'Cookies, Bars, and Brownies',
    description: 'Two per person.',
    category: 'Elegant Desserts and Confections'
  },

  // Protein Tray
  {
    id: 'mousses',
    title: 'Mousses (Chocolate or Lemon)',
    description: '3 oz. portions.',
    category: 'Elegant Desserts and Confections'
  },
  {
    id: 'homemade-crisps',
    title: 'Homemade Crisps',
    description: 'Seasonal fruit crisps.',
    category: 'Elegant Desserts and Confections'
  },
  {
    id: 'mini-desserts',
    title: 'Mini Desserts',
    description: 'Mini cheesecakes, chef\'s choice mini desserts.',
    category: 'Elegant Desserts and Confections'
  },

  {
    id: 'desserts',
    title: 'Desserts',
    description: 'Chef\'s Choice Mini Desserts — 3pp (Make this a dessert tray with a selection of chef\'s choice assorted desserts)\nCookies\nBrownies\nCookie/Brownie Tray\nMousses\nCheesecake\nCarrot Cake\nChocolate Cake',
    category: 'Elegant Desserts and Confections'
  },

  // Executive Express Selections
  {
    id: 'fast-frank',
    title: 'Fast Frank',
    description: 'Need something delicious in a flash? Chef\'s choice quick meal.',
    category: 'Executive Express Selections'
  },
  {
    id: 'executive-express-boxes',
    title: 'Executive Express Selections Boxes Available',
    description: 'Select from our Executive Express Selections items, each individually packaged in convenient boxes for easy in-flight service.',
    category: 'Executive Express Selections',
    sections: [
      {
        title: 'Available Executive Express Selections Box Options',
        items: [
          'Fast Frank'
        ]
      }
    ]
  }
];