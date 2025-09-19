export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [language: string]: Translation;
}

export const translations: Translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      menu: "Menu",
      gallery: "Gallery",
      testimonials: "Testimonials",
      contact: "Contact",
      orderNow: "Order Now"
    },
    // Hero Section
    hero: {
      title: "Atikis Minnesota Aviation Catering",
      subtitle: "Authentic flavors, delivered with five-star service—elevating every moment of your in-flight dining.",
      viewMenu: "View Menu"
    },
    // Aviation Message
    aviationMessage: {
      title: "We Cater Exclusively to the Aviation Community"
    },
    // About Section
    about: {
      title: "Culinary Excellence at Altitude",
      description1: "Founded in 2008, Atikis Minnesota Aviation Catering has set a new standard for in-flight dining. Our culinary team crafts exquisite meals designed to preserve both flavor and presentation at high altitudes.",
      description2: "We source only the finest ingredients, with a focus on local and sustainable selections whenever possible. Our dedication to quality goes beyond the cuisine—premium packaging, thoughtful presentation, and reliable delivery ensure excellence in every detail."
    },
    // Menu
    menu: {
      title: "Our Aviation Catering Menu",
      subtitle: "Browse our carefully curated menu selections, each designed to provide an exceptional dining experience at altitude.",
      heroTitle: "Making Your Taste Buds Soar Above 10,000 Feet",
      heroSubtitle: "Exquisite dining experiences curated for discerning travelers",
      customMenuTitle: "Custom Menus Available",
      customMenuDescription: "Our executive chef can create bespoke menus tailored to your specific preferences and dietary requirements.",
      requestCustomMenu: "Request Custom Menu",
      qualityTitle: "Committed to Quality",
      qualityDescription1: "We source only the finest ingredients, focused on local and other sustainable market options.",
      qualityDescription2: "All meals are prepared in our state-of-the-art kitchen facility by our team and packaged using specialized techniques to ensure optimal flavor and presentation at altitude.",
      boxOptions: {
        selectItemsToAdd: "Select items to add",
        addItemsPrefix: "Add",
        // plural base for helper tp('menu.boxOptions.item', count)
        item: {
          one: "item",
          other: "items"
        },
        itemSingular: "item",
        itemPlural: "items",
        toastAddedPrefix: "Added",
        toastFrom: "from",
        perOptionNotePlaceholder: "Add note (optional)",
        validationSelectAtLeastOne: "Please select at least one item from the box options above.",
        addToOrder: "Add to Order",
        selectedItemsLabel: "Selected Items:",
        inlineAdded: "Selections added",
        selectionHeader: "Select items and quantities for your box:",
        numberOfBoxesLabel: "Number of Boxes:",
        quantityLabel: "Quantity:",
        chooseUpTo: "Choose up to",
        reachedMax: "Reached max of",

        clearSelections: "Clear selections"
      }
    },
    // Testimonials
    testimonials: {
      title: "Client Testimonials",
      subtitle: "Hear what our clients have to say about their experiences with Atikis Aviation Catering.",
      viewAll: "View All Testimonials",
      joinClients: "Join Our Satisfied Clients",
      experienceDescription: "Experience the Atikis difference for yourself. Contact us today to discuss your in-flight catering needs."
    },
    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "We're here to help with all your aviation catering needs",
      getInTouch: "Get In Touch",
      description: "We're here to answer any questions you may have about our services. Reach out to us and we'll respond as soon as possible.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Hours",
      hoursText: "Email us 24 hours, 7 days a week",
      fastResponse: "Fast Response Time",
      fastResponseDescription: "We pride ourselves on our responsiveness. For urgent inquiries, please call us directly for immediate assistance.",
      formTitle: "Ready to elevate your next flight?",
      schedule: "Schedule",
      scheduleDescription: "Book a consultation with our executive chef",
      bookAppointment: "Book Appointment",
      contactNow: "Contact Us Now",
      name: "Name",
      phoneLabel: "Phone",
      deliveryDate: "Delivery Date",
      wheelsUpTime: "Wheels Up Time",
      specialRequests: "Special Requests/Dietary Notes",
      specialRequestsPlaceholder: "Tell us about any special requirements or dietary restrictions",
      submitInquiry: "Submit Inquiry",
      submitting: "Submitting...",
      thankYou: "Thank You!",
      thankYouMessage: "Your inquiry has been received. We'll contact you as soon as possible.",
      sendAnother: "Send Another Inquiry",
      phoneMain: "(651) 647-4940 (Main)",
      phoneDirect: "(612) 900-8667 (Direct)",
      emailAddress: "order@atikismn.com",
      addressLine1: "2850 Anthony Ln S",
      addressLine2: "Minneapolis, MN 55418",
      addressCountry: "United States"
    },
    // Footer
    footer: {
      airportsServed: "We Proudly Serve the Following Airports:",
      emailDescription: "Send us your inquiry for a detailed response",
      quickLinks: "Quick Links",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      copyright: "Atikis Minnesota Aviation Catering. All rights reserved."
    },
    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred",
      tryAgain: "Try Again",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      remove: "Remove",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      next: "Next",
      previous: "Previous",
      page: "Page",
      of: "of",
      results: "results",
      noResults: "No results found",
      selectLanguage: "Select Language"
    },
    // Menu Categories
    menuCategories: {
      signatureBreakfast: "Signature Breakfast Collection",
      artisanSalad: "Artisan Salad and Grain Bowls",
      inFlightLunch: "In-Flight Lunch Selections",
      midwestHeritage: "Midwest Heritage Classics",
      gourmetCreations: "Gourmet Creations",
      plantBased: "Plant-Based Culinary Selections",
      proteinTray: "Protein Tray",
      elegantDesserts: "Elegant Desserts and Confections",
      executiveExpress: "Executive Express Selections"
    },
    // Meta and SEO
    meta: {
      homeTitle: "Premium Aviation Catering Services in Minnesota | Atikis",
      homeDescription: "Atikis Minnesota Aviation Catering provides exceptional in-flight dining for private jets. Serving KMSP, KSTP, KFCM, and KANE airports with gourmet meals crafted for altitude dining.",
      menuTitle: "Gourmet Aviation Menu | In-Flight Dining Options",
      menuDescription: "Explore our extensive aviation catering menu featuring signature breakfast collections, artisan salads, premium entrées, and plant-based selections. Custom menus available for private jets.",
      testimonialsTitle: "Client Reviews & Testimonials | Aviation Catering Excellence",
      testimonialsDescription: "Read testimonials from satisfied clients about Atikis Minnesota Aviation Catering services. Flight attendants and aviation professionals praise our exceptional in-flight dining.",
      contactTitle: "Contact Aviation Catering Services | Get Quote",
      contactDescription: "Contact Atikis Minnesota Aviation Catering for premium in-flight dining services. Call (651) 647-4940 or email order@atikismn.com for quotes and consultations."
    },
    // Page content
    page: {
      wheelsUpMessage: "Wheels Up? We've Got Your Plates Covered.",
      execsMessage: "Got a jet full of execs? A team en route to the big game? A family escaping to paradise?",
      understandMessage: "We understand how important your orders are—and we treat them with the care they deserve. Our team is ready to assist. Please email for specific accommodations to deliver with precision, professionalism, and pride.",
      valuedMessage: "At Atikis Minnesota Flight Catering, you're not just a client—you're valued, heard, and truly appreciated.",
      airportsTitle: "We proudly deliver sky-high meals to the following Minnesota airports:",
      airportKMSP: "Minneapolis–St. Paul International (KMSP)",
      airportKSTP: "St. Paul Downtown (KSTP)",
      airportKFCM: "Flying Cloud – Eden Prairie (KFCM)",
      airportKANE: "Anoka County–Blaine (KANE)",
      takeoffMessage: "Just say when—your feast is cleared for takeoff."
    },
    // How It Works Section
    howItWorks: {
      title: "How It Works",
      subtitle: "From selection to service, we make exceptional aviation catering effortless",
      browse: {
        title: "Browse",
        description: "Explore chef-crafted menus"
      },
      select: {
        title: "Select",
        description: "Customize boxes & add-ons"
      },
      schedule: {
        title: "Schedule",
        description: "Choose delivery window & FBO"
      },
      confirm: {
        title: "Confirm",
        description: "Receive order confirmation"
      },
      enjoy: {
        title: "Enjoy",
        description: "Plated perfection at altitude"
      }
    }
  },
  es: {
    // Navigation
    nav: {
      home: "Inicio",
      menu: "Menú",
      gallery: "Galería",
      testimonials: "Testimonios",
      contact: "Contacto",
      orderNow: "Ordenar Ahora"
    },
    // Hero Section
    hero: {
      title: "Atikis Minnesota Catering de Aviación",
      subtitle: "Sabores auténticos, entregados con servicio de cinco estrellas—elevando cada momento de tu experiencia gastronómica en vuelo.",
      viewMenu: "Ver Menú"
    },
    // Aviation Message
    aviationMessage: {
      title: "Atendemos Exclusivamente a la Comunidad de Aviación"
    },
    // About Section
    about: {
      title: "Excelencia Culinaria en Altitud",
      description1: "Fundada en 2008, Atikis Minnesota Aviation Catering ha redefinido el estándar para la comida en vuelo. Nuestro equipo de chefs crea comidas exquisitas que están específicamente diseñadas para mantener su perfil de sabor y presentación a gran altitud.",
      description2: "Obtenemos solo los mejores ingredientes, priorizando opciones locales y sostenibles siempre que sea posible. Nuestro compromiso con la calidad se extiende más allá del plato: desde nuestro empaque premium hasta nuestro servicio de entrega, cada detalle se considera cuidadosamente."
    },

    // Menu
    menu: {
      title: "Nuestro Menú de Catering de Aviación",
      subtitle: "Explore nuestras selecciones de menú cuidadosamente curadas, cada una diseñada para proporcionar una experiencia gastronómica excepcional en altitud.",
      heroTitle: "Haciendo que Sus Papilas Gustativas Vuelen por Encima de 10,000 Pies",
      heroSubtitle: "Experiencias gastronómicas exquisitas seleccionadas para viajeros exigentes",
      customMenuTitle: "Menús Personalizados Disponibles",
      customMenuDescription: "Nuestro chef ejecutivo puede crear menús personalizados adaptados a sus preferencias específicas y requisitos dietéticos.",
      requestCustomMenu: "Solicitar Menú Personalizado",
      qualityTitle: "Comprometidos con la Calidad",
      qualityDescription1: "Obtenemos solo los mejores ingredientes, enfocados en opciones locales y otras opciones de mercado sostenibles.",
      qualityDescription2: "Todas las comidas se preparan en nuestra instalación de cocina de última generación por nuestro equipo y se empaquetan utilizando técnicas especializadas para garantizar un sabor y presentación óptimos en altitud.",
      boxOptions: {
        selectionHeader: "Selecciona artículos y cantidades para tu caja:",
        numberOfBoxesLabel: "Número de cajas:",
        quantityLabel: "Cantidad:",
        chooseUpTo: "Elige hasta",
        reachedMax: "Alcanzaste el máximo de",
        item: {
          one: "artículo",
          other: "artículos"
        },
        itemSingular: "artículo",
        itemPlural: "artículos",

        clearSelections: "Borrar selecciones"
      }
    },
    // Testimonials
    testimonials: {
      title: "Testimonios de Clientes",
      subtitle: "Escuche lo que nuestros clientes tienen que decir sobre sus experiencias con Atikis Aviation Catering.",
      viewAll: "Ver Todos los Testimonios",
      joinClients: "Únase a Nuestros Clientes Satisfechos",
      experienceDescription: "Experimente la diferencia de Atikis por usted mismo. Contáctenos hoy para discutir sus necesidades de catering en vuelo."
    },
    // Contact
    contact: {
      title: "Contáctanos",
      subtitle: "Estamos aquí para ayudar con todas sus necesidades de catering de aviación",
      getInTouch: "Ponerse en Contacto",
      description: "Estamos aquí para responder cualquier pregunta que pueda tener sobre nuestros servicios. Contáctenos y responderemos lo antes posible.",
      phone: "Teléfono",
      email: "Correo Electrónico",
      address: "Dirección",
      hours: "Horarios",
      hoursText: "Envíanos un correo electrónico las 24 horas, los 7 días de la semana",
      fastResponse: "Tiempo de Respuesta Rápido",
      fastResponseDescription: "Nos enorgullecemos de nuestra capacidad de respuesta. Para consultas urgentes, llámenos directamente para obtener asistencia inmediata.",
      formTitle: "¿Listo para elevar tu próximo vuelo?",
      schedule: "Programar",
      scheduleDescription: "Reserve una consulta con nuestro chef ejecutivo",
      bookAppointment: "Reservar Cita",
      contactNow: "Contáctanos Ahora",
      name: "Nombre",
      phoneLabel: "Teléfono",
      deliveryDate: "Fecha de Entrega",
      wheelsUpTime: "Hora de Despegue",
      specialRequests: "Solicitudes Especiales/Notas Dietéticas",
      specialRequestsPlaceholder: "Cuéntanos sobre cualquier requisito especial o restricciones dietéticas",
      submitInquiry: "Enviar Consulta",
      submitting: "Enviando...",
      thankYou: "¡Gracias!",
      thankYouMessage: "Su consulta ha sido recibida. Nos pondremos en contacto con usted lo antes posible.",
      sendAnother: "Enviar Otra Consulta",
      phoneMain: "(651) 647-4940 (Principal)",
      phoneDirect: "(612) 900-8667 (Directo)",
      emailAddress: "order@atikismn.com",
      addressLine1: "2850 Anthony Ln S",
      addressLine2: "Minneapolis, MN 55418",
      addressCountry: "Estados Unidos"
    },
    // Footer
    footer: {
      airportsServed: "Servimos con Orgullo los Siguientes Aeropuertos:",
      emailDescription: "Envíanos tu consulta para una respuesta detallada",
      quickLinks: "Enlaces Rápidos",
      legal: "Legal",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      copyright: "Atikis Minnesota Aviation Catering. Todos los derechos reservados."
    },
    // Common
    common: {
      loading: "Cargando...",
      error: "Ocurrió un error",
      tryAgain: "Intentar de Nuevo",
      close: "Cerrar",
      save: "Guardar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      delete: "Eliminar",
      edit: "Editar",
      add: "Agregar",
      remove: "Quitar",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
      next: "Siguiente",
      previous: "Anterior",
      page: "Página",
      of: "de",
      results: "resultados",
      noResults: "No se encontraron resultados",
      selectLanguage: "Seleccionar Idioma"
    },
    // Menu Categories
    menuCategories: {
      signatureBreakfast: "Colección de Desayunos Exclusivos",
      artisanSalad: "Ensaladas Artesanales y Tazones de Granos",
      inFlightLunch: "Selecciones de Almuerzo en Vuelo",
      midwestHeritage: "Clásicos del Patrimonio del Medio Oeste",
      gourmetCreations: "Creaciones Gourmet",
      plantBased: "Selecciones Culinarias Basadas en Plantas",
      proteinTray: "Bandeja de Proteínas",
      elegantDesserts: "Postres y Dulces Elegantes",
      executiveExpress: "Selecciones Express Ejecutivas"
    },
    // Meta and SEO
    meta: {
      homeTitle: "Servicios Premium de Catering de Aviación en Minnesota | Atikis",
      homeDescription: "Atikis Minnesota Aviation Catering proporciona comidas excepcionales en vuelo para jets privados. Sirviendo aeropuertos KMSP, KSTP, KFCM y KANE con comidas gourmet diseñadas para altitud.",
      menuTitle: "Menú Gourmet de Aviación | Opciones de Comida en Vuelo",
      menuDescription: "Explore nuestro extenso menú de catering de aviación con colecciones de desayuno exclusivas, ensaladas artesanales, platos principales premium y selecciones basadas en plantas.",
      testimonialsTitle: "Reseñas de Clientes y Testimonios | Excelencia en Catering de Aviación",
      testimonialsDescription: "Lea testimonios de clientes satisfechos sobre los servicios de Atikis Minnesota Aviation Catering. Auxiliares de vuelo y profesionales de aviación elogian nuestra excepcional comida en vuelo.",
      contactTitle: "Contactar Servicios de Catering de Aviación | Obtener Cotización",
      contactDescription: "Contacte a Atikis Minnesota Aviation Catering para servicios premium de comida en vuelo. Llame al (651) 647-4940 o envíe un email a order@atikismn.com para cotizaciones y consultas."
    },
    // Page content
    page: {
      wheelsUpMessage: "¿DESPEGANDO? TENEMOS SUS PLATOS CUBIERTOS.",
      execsMessage: "¿Tienes un jet lleno de ejecutivos? ¿Un equipo en camino al gran juego? ¿Una familia escapando al paraíso?",
      understandMessage: "Entendemos lo importantes que son sus pedidos y los tratamos con el cuidado que merecen. Nuestro equipo está listo para ayudar. Por favor envíe un email para acomodaciones específicas para entregar con precisión, profesionalismo y orgullo.",
      valuedMessage: "En Atikis Minnesota Flight Catering, no eres solo un cliente—eres valorado, escuchado y verdaderamente apreciado.",
      airportsTitle: "Entregamos con orgullo comidas a gran altura a los siguientes aeropuertos de Minnesota:",
      airportKMSP: "Internacional Minneapolis–St. Paul (KMSP)",
      airportKSTP: "Centro de St. Paul (KSTP)",
      airportKFCM: "Flying Cloud – Eden Prairie (KFCM)",
      airportKANE: "Condado de Anoka–Blaine (KANE)",
      takeoffMessage: "Solo diga cuándo—su banquete está autorizado para despegar."
    },
    // How It Works Section
    howItWorks: {
      title: "Cómo Funciona",
      subtitle: "Desde la selección hasta el servicio, hacemos que el catering de aviación excepcional sea sin esfuerzo",
      browse: {
        title: "Explorar",
        description: "Explore menús creados por chefs"
      },
      select: {
        title: "Seleccionar",
        description: "Personalice cajas y complementos"
      },
      schedule: {
        title: "Programar",
        description: "Elija ventana de entrega y FBO"
      },
      confirm: {
        title: "Confirmar",
        description: "Reciba confirmación del pedido"
      },
      enjoy: {
        title: "Disfrutar",
        description: "Perfección emplastada en altitud"
      }
    }
  },
  'zh-CN': {
    // Navigation
    nav: {
      home: "首页",
      menu: "菜单",
      gallery: "画廊",
      testimonials: "客户评价",
      contact: "联系我们",
      orderNow: "立即订购"
    },
    // Box Options
    boxOptions: {
      selectItemsToAdd: "选择要添加的项目",
      addItemsPrefix: "添加",
      // plural base for helper tp('menu.boxOptions.item', count)
      item: {
        other: "个项目"
      },
      itemSingular: "个项目",
      itemPlural: "个项目",
      toastAddedPrefix: "已添加",
      toastFrom: "来自",
      perOptionNotePlaceholder: "添加备注（可选）",
      validationSelectAtLeastOne: "请从上面的盒装选项中至少选择一个项目。",
      addToOrder: "加入订单",
      selectedItemsLabel: "已选择项目：",
      inlineAdded: "已添加所选内容",
      chooseUpTo: "最多可选",
      reachedMax: "已达上限"
    },
    // Hero Section
    hero: {
      title: "Atikis明尼苏达航空餐饮",
      subtitle: "正宗风味，五星级服务——提升您机上用餐的每一刻。",
      viewMenu: "查看菜单"
    },
    // Aviation Message
    aviationMessage: {
      title: "我们专门为航空社区提供餐饮服务"
    },
    // About Section
    about: {
      title: "高空烹饪卓越",
        chooseUpTo: "最多可选",
        reachedMax: "已达上限",

      description1: "成立于2008年，Atikis明尼苏达航空餐饮重新定义了机上用餐标准。我们的厨师团队创造精美的餐食，专门设计以在高海拔保持其风味特征和呈现效果。",
      description2: "我们只采购最优质的食材，尽可能优先选择本地和可持续的选择。我们对质量的承诺超越了餐盘——从我们的优质包装到我们的配送服务，每个细节都经过仔细考虑。"
    },
    // Menu
    menu: {
      title: "我们的航空餐饮菜单",
      subtitle: "浏览我们精心策划的菜单选择，每一道都旨在在高空提供卓越的用餐体验。",
      heroTitle: "让您的味蕾在10,000英尺高空翱翔",
      heroSubtitle: "为挑剔的旅客精心策划的精致用餐体验",
      customMenuTitle: "提供定制菜单",
      customMenuDescription: "我们的行政主厨可以根据您的具体偏好和饮食要求创建定制菜单。",
      requestCustomMenu: "申请定制菜单",
      qualityTitle: "致力于品质",
      qualityDescription1: "我们只采购最优质的食材，专注于本地和其他可持续市场选择。",
      qualityDescription2: "所有餐食都在我们最先进的厨房设施中由我们的团队准备，并使用专业技术包装，以确保在高空的最佳风味和呈现效果。",
      boxOptions: {
        selectionHeader: "为您的餐盒选择项目和数量：",
        numberOfBoxesLabel: "盒数：",
        quantityLabel: "数量：",
        clearSelections: "清除所选"
      }
    },
    // Testimonials
    testimonials: {
      title: "客户评价",
      subtitle: "听听我们的客户对Atikis航空餐饮体验的评价。",
      viewAll: "查看所有评价",
      joinClients: "加入我们满意的客户",
      experienceDescription: "亲自体验Atikis的不同之处。今天就联系我们讨论您的机上餐饮需求。"
    },
    // Contact
    contact: {
      title: "联系我们",
      subtitle: "我们在这里帮助您满足所有航空餐饮需求",
      getInTouch: "取得联系",
      description: "我们在这里回答您可能对我们服务有的任何问题。请联系我们，我们会尽快回复。",
      phone: "电话",
      email: "电子邮件",
      address: "地址",
      hours: "营业时间",
      hoursText: "每周7天，每天24小时发送电子邮件给我们",
      fastResponse: "快速响应时间",
      fastResponseDescription: "我们以响应能力为傲。对于紧急咨询，请直接致电我们以获得即时帮助。",
      formTitle: "准备提升您的下次飞行？",
      schedule: "预约",
      scheduleDescription: "与我们的行政主厨预约咨询",
      bookAppointment: "预约",
      contactNow: "立即联系我们",
      name: "姓名",
      phoneLabel: "电话",
      deliveryDate: "交付日期",
      wheelsUpTime: "起飞时间",
      specialRequests: "特殊要求/饮食备注",
      specialRequestsPlaceholder: "告诉我们任何特殊要求或饮食限制",
      submitInquiry: "提交咨询",
      submitting: "提交中...",
      thankYou: "谢谢！",
      thankYouMessage: "您的咨询已收到。我们会尽快与您联系。",
      sendAnother: "发送另一个咨询",
      phoneMain: "(651) 647-4940 (主要)",
      phoneDirect: "(612) 900-8667 (直接)",
      emailAddress: "order@atikismn.com",
      addressLine1: "2850 Anthony Ln S",
      addressLine2: "Minneapolis, MN 55418",
      addressCountry: "美国"
    },
    // Footer
    footer: {
      airportsServed: "我们自豪地为以下机场提供服务：",
      emailDescription: "发送您的咨询以获得详细回复",
      quickLinks: "快速链接",
      legal: "法律",
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      copyright: "Atikis明尼苏达航空餐饮。保留所有权利。"
    },
    // Common
    common: {
      loading: "加载中...",
      error: "发生错误",
      tryAgain: "重试",
      close: "关闭",
      save: "保存",
      cancel: "取消",
      confirm: "确认",
      delete: "删除",
      edit: "编辑",
      add: "添加",
      remove: "移除",
      search: "搜索",
      filter: "筛选",
      sort: "排序",
      next: "下一页",
      previous: "上一页",
      page: "页面",
      of: "的",
      results: "结果",
      noResults: "未找到结果",
      selectLanguage: "选择语言"
    },
    // Menu Categories
    menuCategories: {
      signatureBreakfast: "招牌早餐系列",
      artisanSalad: "手工沙拉和谷物碗",
      inFlightLunch: "机上午餐精选",
      midwestHeritage: "中西部传统经典",
      gourmetCreations: "美食创作",
      plantBased: "植物性烹饪精选",
      proteinTray: "蛋白质拼盘",
      elegantDesserts: "精致甜点和糖果",
      executiveExpress: "行政快选"
    },
    // Meta and SEO
    meta: {
      homeTitle: "明尼苏达州优质航空餐饮服务 | Atikis",
      homeDescription: "Atikis明尼苏达航空餐饮为私人飞机提供卓越的机上用餐服务。为KMSP、KSTP、KFCM和KANE机场提供专为高空用餐设计的美食。",
      menuTitle: "美食航空菜单 | 机上用餐选择",
      menuDescription: "探索我们广泛的航空餐饮菜单，包括招牌早餐系列、手工沙拉、优质主菜和植物性选择。为私人飞机提供定制菜单。",
      testimonialsTitle: "客户评价和推荐 | 航空餐饮卓越",
      testimonialsDescription: "阅读满意客户对Atikis明尼苏达航空餐饮服务的推荐。空乘人员和航空专业人士赞扬我们卓越的机上用餐。",
      contactTitle: "联系航空餐饮服务 | 获取报价",
      contactDescription: "联系Atikis明尼苏达航空餐饮获取优质机上用餐服务。致电(651) 647-4940或发送邮件至order@atikismn.com获取报价和咨询。"
    },
    // Page content
    page: {
      wheelsUpMessage: "起飞了？我们为您准备好了餐盘。",
      execsMessage: "有一架满载高管的飞机？一支前往重大比赛的团队？一个逃往天堂的家庭？",
      understandMessage: "我们理解您的订单有多重要——我们以应有的关怀对待它们。我们的团队随时准备协助。请发送邮件说明具体要求，我们将以精确、专业和自豪的态度交付。",
      valuedMessage: "在Atikis明尼苏达航空餐饮，您不仅仅是客户——您被重视、被倾听、被真正欣赏。",
      airportsTitle: "我们自豪地为以下明尼苏达机场提供高空美食：",
      airportKMSP: "明尼阿波利斯-圣保罗国际机场 (KMSP)",
      airportKSTP: "圣保罗市中心机场 (KSTP)",
      airportKFCM: "飞云机场 – 伊甸草原 (KFCM)",
      airportKANE: "阿诺卡县-布莱恩机场 (KANE)",
      takeoffMessage: "只需说何时——您的盛宴已获准起飞。"
    },
    // How It Works Section
    howItWorks: {
      title: "工作流程",
      subtitle: "从选择到服务，我们让卓越的航空餐饮变得轻松",
      browse: {
        title: "浏览",
        description: "探索主厨精心制作的菜单"
      },
      select: {
        title: "选择",
        description: "定制餐盒和附加服务"
      },
      schedule: {
        title: "安排",
        description: "选择配送时间和FBO"
      },
      confirm: {
        title: "确认",
        description: "接收订单确认"
      },
      enjoy: {
        title: "享用",
        description: "高空完美呈现"
      }
    }
  },
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      menu: "Menu",
      gallery: "Galerie",
      testimonials: "Témoignages",
      contact: "Contact",
      orderNow: "Commander Maintenant"
    },
    // Hero Section
    hero: {
      title: "Atikis Minnesota Restauration Aérienne",
      subtitle: "Saveurs authentiques, livrées avec un service cinq étoiles—élevant chaque moment de votre expérience culinaire en vol.",
      viewMenu: "Voir le Menu"
    },
    // Aviation Message
    aviationMessage: {
      title: "Nous Servons Exclusivement la Communauté Aéronautique"
    },
    // About Section
    about: {
      title: "Excellence Culinaire en Altitude",
      description1: "Fondée en 2008, Atikis Minnesota Aviation Catering a redéfini la norme pour la restauration en vol. Notre équipe de chefs crée des repas exquis spécialement conçus pour maintenir leur profil de saveur et leur présentation à haute altitude.",
      description2: "Nous ne nous approvisionnons qu'avec les meilleurs ingrédients, privilégiant les options locales et durables chaque fois que possible. Notre engagement envers la qualité s'étend au-delà de l'assiette - de notre emballage premium à notre service de livraison, chaque détail est soigneusement considéré."
    },
    // Menu
    menu: {
      title: "Notre Menu de Restauration Aérienne",
      subtitle: "Parcourez nos sélections de menu soigneusement organisées, chacune conçue pour offrir une expérience culinaire exceptionnelle en altitude.",
        item: {
          one: "article",
          other: "articles"
        },
        itemSingular: "article",
        itemPlural: "articles",

      heroTitle: "Faire Planer Vos Papilles au-dessus de 10 000 Pieds",
      heroSubtitle: "Expériences culinaires exquises organisées pour les voyageurs exigeants",
      customMenuTitle: "Menus Personnalisés Disponibles",
      customMenuDescription: "Notre chef exécutif peut créer des menus sur mesure adaptés à vos préférences spécifiques et exigences alimentaires.",
      requestCustomMenu: "Demander un Menu Personnalisé",
      qualityTitle: "Engagés envers la Qualité",
      qualityDescription1: "Nous ne nous approvisionnons qu'avec les meilleurs ingrédients, en nous concentrant sur les options locales et autres options de marché durables.",
      qualityDescription2: "Tous les repas sont préparés dans notre installation de cuisine à la pointe de la technologie par notre équipe et emballés en utilisant des techniques spécialisées pour assurer une saveur et une présentation optimales en altitude.",
      boxOptions: {
        selectionHeader: "Sélectionnez les articles et quantités pour votre boîte :",
        numberOfBoxesLabel: "Nombre de boîtes :",
        quantityLabel: "Quantité :",
        clearSelections: "Effacer les sélections",
        item: {
          one: "article",
          other: "articles"
        },
        itemSingular: "article",
        itemPlural: "articles"
      }
    },
    // Testimonials
    testimonials: {
      title: "Témoignages Clients",
      subtitle: "Écoutez ce que nos clients ont à dire sur leurs expériences avec Atikis Aviation Catering.",
      viewAll: "Voir Tous les Témoignages",
      joinClients: "Rejoignez Nos Clients Satisfaits",
      experienceDescription: "Découvrez la différence Atikis par vous-même. Contactez-nous aujourd'hui pour discuter de vos besoins de restauration en vol."
    },
    // Contact
    contact: {
      title: "Contactez-Nous",
      subtitle: "Nous sommes là pour vous aider avec tous vos besoins de restauration aérienne",
      getInTouch: "Entrer en Contact",
      description: "Nous sommes là pour répondre à toutes les questions que vous pourriez avoir sur nos services. Contactez-nous et nous répondrons dès que possible.",
      phone: "Téléphone",
      email: "E-mail",
      address: "Adresse",
      hours: "Heures",
      hoursText: "Envoyez-nous un e-mail 24 heures sur 24, 7 jours sur 7",
      fastResponse: "Temps de Réponse Rapide",
      fastResponseDescription: "Nous sommes fiers de notre réactivité. Pour les demandes urgentes, veuillez nous appeler directement pour une assistance immédiate.",
      formTitle: "Prêt à élever votre prochain vol ?",
      schedule: "Planifier",
      scheduleDescription: "Réservez une consultation avec notre chef exécutif",
      bookAppointment: "Prendre Rendez-vous",
      contactNow: "Contactez-nous Maintenant",
      name: "Nom",
      phoneLabel: "Téléphone",
      deliveryDate: "Date de Livraison",
      wheelsUpTime: "Heure de Décollage",
      specialRequests: "Demandes Spéciales/Notes Alimentaires",
      specialRequestsPlaceholder: "Parlez-nous de toute exigence spéciale ou restriction alimentaire",
      submitInquiry: "Soumettre la Demande",
      submitting: "Soumission...",
      thankYou: "Merci !",
      thankYouMessage: "Votre demande a été reçue. Nous vous contacterons dès que possible.",
      sendAnother: "Envoyer une Autre Demande",
      phoneMain: "(651) 647-4940 (Principal)",
      phoneDirect: "(612) 900-8667 (Direct)",
      emailAddress: "order@atikismn.com",
      addressLine1: "2850 Anthony Ln S",
      addressLine2: "Minneapolis, MN 55418",
      addressCountry: "États-Unis"
    },
    // Footer
    footer: {
      airportsServed: "Nous Servons Fièrement les Aéroports Suivants :",
      emailDescription: "Envoyez-nous votre demande pour une réponse détaillée",
      quickLinks: "Liens Rapides",
      legal: "Légal",
      privacyPolicy: "Politique de Confidentialité",
      termsOfService: "Conditions de Service",
      copyright: "Atikis Minnesota Aviation Catering. Tous droits réservés."
    },
    // Common
    common: {
      loading: "Chargement...",
      error: "Une erreur s'est produite",
      tryAgain: "Réessayer",
      close: "Fermer",
      save: "Sauvegarder",
      cancel: "Annuler",
      confirm: "Confirmer",
      delete: "Supprimer",
      edit: "Modifier",
      add: "Ajouter",
      remove: "Supprimer",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      next: "Suivant",
      previous: "Précédent",
      page: "Page",
      of: "de",
      results: "résultats",
      noResults: "Aucun résultat trouvé",
      selectLanguage: "Sélectionner la Langue"
    },
    // Menu Categories
    menuCategories: {
      signatureBreakfast: "Collection de Petits-Déjeuners Signature",
      artisanSalad: "Salades Artisanales et Bols de Céréales",
      inFlightLunch: "Sélections de Déjeuner en Vol",
      midwestHeritage: "Classiques du Patrimoine du Midwest",
      gourmetCreations: "Créations Gourmet",
      plantBased: "Sélections Culinaires Végétales",
      proteinTray: "Plateau de Protéines",
      elegantDesserts: "Desserts et Confiseries Élégants",
      executiveExpress: "Sélections Express Exécutives"
    },
    // Meta and SEO
    meta: {
      homeTitle: "Services Premium de Restauration Aérienne au Minnesota | Atikis",
      homeDescription: "Atikis Minnesota Aviation Catering fournit une restauration exceptionnelle en vol pour jets privés. Desservant les aéroports KMSP, KSTP, KFCM et KANE avec des repas gastronomiques conçus pour l'altitude.",
      menuTitle: "Menu Gastronomique d'Aviation | Options de Restauration en Vol",
      menuDescription: "Explorez notre vaste menu de restauration aérienne avec des collections de petit-déjeuner signature, des salades artisanales, des plats principaux premium et des sélections végétales.",
      testimonialsTitle: "Avis Clients et Témoignages | Excellence en Restauration Aérienne",
      testimonialsDescription: "Lisez les témoignages de clients satisfaits sur les services d'Atikis Minnesota Aviation Catering. Les agents de bord et professionnels de l'aviation louent notre restauration en vol exceptionnelle.",
      contactTitle: "Contacter les Services de Restauration Aérienne | Obtenir un Devis",
      contactDescription: "Contactez Atikis Minnesota Aviation Catering pour des services premium de restauration en vol. Appelez le (651) 647-4940 ou envoyez un email à order@atikismn.com pour des devis et consultations."
    },
    // Page content
    page: {
      wheelsUpMessage: "DÉCOLLAGE ? NOUS AVONS VOS ASSIETTES COUVERTES.",
      execsMessage: "Vous avez un jet plein d'exécutifs ? Une équipe en route vers le grand match ? Une famille s'échappant au paradis ?",
      understandMessage: "Nous comprenons l'importance de vos commandes et nous les traitons avec le soin qu'elles méritent. Notre équipe est prête à vous aider. Veuillez envoyer un email pour des accommodations spécifiques afin de livrer avec précision, professionnalisme et fierté.",
      valuedMessage: "Chez Atikis Minnesota Flight Catering, vous n'êtes pas seulement un client—vous êtes valorisé, entendu et vraiment apprécié.",
      airportsTitle: "Nous livrons fièrement des repas à haute altitude aux aéroports suivants du Minnesota :",
      airportKMSP: "International Minneapolis–St. Paul (KMSP)",
      airportKSTP: "Centre-ville de St. Paul (KSTP)",
      airportKFCM: "Flying Cloud – Eden Prairie (KFCM)",
      airportKANE: "Comté d'Anoka–Blaine (KANE)",
      takeoffMessage: "Dites simplement quand—votre festin est autorisé au décollage."
    },
    // How It Works Section
    howItWorks: {
      title: "Comment Ça Marche",
      subtitle: "De la sélection au service, nous rendons le traiteur d'aviation exceptionnel sans effort",
      browse: {
        title: "Parcourir",
        description: "Explorez les menus créés par des chefs"
,
      boxOptions: {
        selectItemsToAdd: "اختر عناصر لإضافتها",
        addItemsPrefix: "إضافة",
        // plural base for helper tp('menu.boxOptions.item', count)
        item: {
          zero: "عناصر",
          one: "عنصر",
          two: "عنصران",
          few: "عناصر",
          many: "عناصر",
          other: "عناصر"
        },
        itemSingular: "عنصر",
        itemPlural: "عناصر",
        toastAddedPrefix: "تمت إضافة",
        toastFrom: "من",
        perOptionNotePlaceholder: "إضافة ملاحظة (اختياري)",
        validationSelectAtLeastOne: "يرجى اختيار عنصر واحد على الأقل من خيارات الصندوق أعلاه.",
        addToOrder: "أضف إلى الطلب",
        selectedItemsLabel: "العناصر المختارة:",
        inlineAdded: "تمت إضافة التحديدات"
      }
      },
      select: {
        title: "Sélectionner",
        description: "Personnalisez les boîtes et les extras"
      },
      schedule: {
        title: "Planifier",
        description: "Choisissez la fenêtre de livraison et FBO"
      },
      confirm: {
        title: "Confirmer",
        description: "Recevez la confirmation de commande"
      },
      enjoy: {
        title: "Savourer",
        description: "Perfection dressée en altitude"
      }
    }
  },
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      menu: "القائمة",
      gallery: "معرض",
      testimonials: "الشهادات",
      contact: "اتصل بنا",
      orderNow: "اطلب الآن"
    },
    // Hero Section
    hero: {
      title: "أتيكيس مينيسوتا لتقديم الطعام للطيران",
      subtitle: "نكهات أصيلة، مقدمة بخدمة خمس نجوم—ترفع من كل لحظة في تجربة تناول الطعام أثناء الطيران.",
      viewMenu: "عرض القائمة"
    },
    // Aviation Message
    aviationMessage: {
      title: "نحن نخدم حصرياً مجتمع الطيران"
    },
    // About Section
    about: {
      title: "التميز الطهي على الارتفاع",
      description1: "تأسست في عام 2008، أعادت أتيكيس مينيسوتا لتقديم الطعام للطيران تعريف معيار تناول الطعام أثناء الطيران. يقوم فريق الطهاة لدينا بإنشاء وجبات رائعة مصممة خصيصاً للحفاظ على نكهتها وعرضها على ارتفاعات عالية.",
      description2: "نحن نحصل فقط على أجود المكونات، مع إعطاء الأولوية للخيارات المحلية والمستدامة كلما أمكن ذلك. التزامنا بالجودة يمتد إلى ما وراء الطبق - من التعبئة المتميزة إلى خدمة التوصيل، كل التفاصيل يتم النظر فيها بعناية."
    },
    // Menu
    menu: {
      title: "قائمة تقديم الطعام للطيران",
      subtitle: "تصفح مجموعة القوائم المنسقة بعناية، كل منها مصممة لتوفير تجربة طعام استثنائية على الارتفاع.",
      heroTitle: "جعل براعم التذوق تحلق فوق 10,000 قدم",
      heroSubtitle: "تجارب طعام رائعة منسقة للمسافرين المميزين",
      customMenuTitle: "قوائم مخصصة متاحة",
      customMenuDescription: "يمكن لطاهينا التنفيذي إنشاء قوائم مخصصة مصممة خصيصاً لتفضيلاتك المحددة ومتطلباتك الغذائية.",
      requestCustomMenu: "طلب قائمة مخصصة",
      qualityTitle: "ملتزمون بالجودة",
      qualityDescription1: "نحن نحصل فقط على أجود المكونات، مع التركيز على الخيارات المحلية وخيارات السوق المستدامة الأخرى.",
      qualityDescription2: "يتم إعداد جميع الوجبات في منشأة المطبخ المتطورة لدينا من قبل فريقنا وتعبئتها باستخدام تقنيات متخصصة لضمان النكهة والعرض الأمثل على الارتفاع.",
      boxOptions: {
        selectionHeader: "اختر العناصر والكميات لصندوقك:",
        numberOfBoxesLabel: "عدد الصناديق:",
        quantityLabel: "الكمية:",
        clearSelections: "مسح التحديدات",
        itemZero: "عناصر",
        itemOne: "عنصر",
        itemTwo: "عنصران",
        itemFew: "عناصر",
        itemMany: "عناصر",
        itemOther: "عناصر"
      }
    },
    // Testimonials
    testimonials: {
      title: "شهادات العملاء",
      subtitle: "اسمع ما يقوله عملاؤنا عن تجاربهم مع أتيكيس لتقديم الطعام للطيران.",
      viewAll: "عرض جميع الشهادات",
      joinClients: "انضم إلى عملائنا الراضين",
      experienceDescription: "اختبر الفرق الذي تقدمه أتيكيس بنفسك. اتصل بنا اليوم لمناقشة احتياجات تقديم الطعام أثناء الطيران."
    },
    // Contact
    contact: {
      title: "اتصل بنا",
      subtitle: "نحن هنا للمساعدة في جميع احتياجات تقديم الطعام للطيران",
      getInTouch: "تواصل معنا",
      description: "نحن هنا للإجابة على أي أسئلة قد تكون لديك حول خدماتنا. تواصل معنا وسنرد في أقرب وقت ممكن.",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      hours: "ساعات العمل",
      hoursText: "راسلنا عبر البريد الإلكتروني 24 ساعة، 7 أيام في الأسبوع",
      fastResponse: "وقت استجابة سريع",
      fastResponseDescription: "نحن نفخر بقدرتنا على الاستجابة. للاستفسارات العاجلة، يرجى الاتصال بنا مباشرة للحصول على المساعدة الفورية.",
      formTitle: "مستعد لرفع مستوى رحلتك القادمة؟",
      schedule: "جدولة",
      scheduleDescription: "احجز استشارة مع طاهينا التنفيذي",
      bookAppointment: "حجز موعد",
      contactNow: "اتصل بنا الآن",
      name: "الاسم",
      phoneLabel: "الهاتف",
      deliveryDate: "تاريخ التسليم",
      wheelsUpTime: "وقت الإقلاع",
      specialRequests: "الطلبات الخاصة/ملاحظات غذائية",
      specialRequestsPlaceholder: "أخبرنا عن أي متطلبات خاصة أو قيود غذائية",
      submitInquiry: "إرسال الاستفسار",
      submitting: "جاري الإرسال...",
      thankYou: "شكراً لك!",
      thankYouMessage: "تم استلام استفسارك. سنتواصل معك في أقرب وقت ممكن.",
      sendAnother: "إرسال استفسار آخر",
      phoneMain: "(651) 647-4940 (الرئيسي)",
      phoneDirect: "(612) 900-8667 (المباشر)",
      emailAddress: "order@atikismn.com",
      addressLine1: "2850 Anthony Ln S",
      addressLine2: "Minneapolis, MN 55418",
      addressCountry: "الولايات المتحدة"
    },
    // Footer
    footer: {
      airportsServed: "نحن نخدم بفخر المطارات التالية:",
      emailDescription: "أرسل لنا استفسارك للحصول على رد مفصل",
      quickLinks: "روابط سريعة",
      legal: "قانوني",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      copyright: "أتيكيس مينيسوتا لتقديم الطعام للطيران. جميع الحقوق محفوظة."
    },
    // Common
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      tryAgain: "حاول مرة أخرى",
      close: "إغلاق",
      save: "حفظ",
      cancel: "إلغاء",
      confirm: "تأكيد",
      delete: "حذف",
      edit: "تحرير",
      add: "إضافة",
      remove: "إزالة",
      search: "بحث",
      filter: "تصفية",
      sort: "ترتيب",
      next: "التالي",
      previous: "السابق",
      page: "صفحة",
      of: "من",
      results: "نتائج",
      noResults: "لم يتم العثور على نتائج",
      selectLanguage: "اختر اللغة"
    },
    // Menu Categories
    menuCategories: {
      signatureBreakfast: "مجموعة الإفطار المميزة",
      artisanSalad: "السلطات الحرفية وأطباق الحبوب",
      inFlightLunch: "مختارات الغداء أثناء الطيران",
      midwestHeritage: "كلاسيكيات تراث الغرب الأوسط",
      gourmetCreations: "الإبداعات الفاخرة",
      plantBased: "مختارات الطبخ النباتي",
      proteinTray: "صينية البروتين",
      elegantDesserts: "الحلويات والمعجنات الأنيقة",
      executiveExpress: "مختارات تنفيذية سريعة"
    },
    // Meta and SEO
    meta: {
      homeTitle: "خدمات تقديم الطعام المتميزة للطيران في مينيسوتا | أتيكيس",
      homeDescription: "تقدم أتيكيس مينيسوتا لتقديم الطعام للطيران وجبات استثنائية أثناء الطيران للطائرات الخاصة. تخدم مطارات KMSP وKSTP وKFCM وKANE بوجبات فاخرة مصممة لتناول الطعام على الارتفاع.",
      menuTitle: "قائمة الطعام الفاخرة للطيران | خيارات الطعام أثناء الطيران",
      menuDescription: "استكشف قائمة تقديم الطعام الواسعة للطيران التي تضم مجموعات الإفطار المميزة والسلطات الحرفية والأطباق الرئيسية المتميزة والاختيارات النباتية.",
      testimonialsTitle: "مراجعات العملاء والشهادات | التميز في تقديم الطعام للطيران",
      testimonialsDescription: "اقرأ شهادات العملاء الراضين حول خدمات أتيكيس مينيسوتا لتقديم الطعام للطيران. مضيفو الطيران ومحترفو الطيران يشيدون بطعامنا الاستثنائي أثناء الطيران.",
      contactTitle: "اتصل بخدمات تقديم الطعام للطيران | احصل على عرض سعر",
      contactDescription: "اتصل بأتيكيس مينيسوتا لتقديم الطعام للطيران للحصول على خدمات طعام متميزة أثناء الطيران. اتصل على (651) 647-4940 أو أرسل بريد إلكتروني إلى order@atikismn.com للحصول على عروض أسعار واستشارات."
    },
    // Page content
    page: {
      wheelsUpMessage: "الإقلاع؟ لدينا أطباقكم مغطاة.",
      execsMessage: "لديك طائرة مليئة بالمديرين التنفيذيين؟ فريق في طريقه إلى المباراة الكبيرة؟ عائلة تهرب إلى الجنة؟",
      understandMessage: "نحن نفهم مدى أهمية طلباتكم ونتعامل معها بالعناية التي تستحقها. فريقنا مستعد للمساعدة. يرجى إرسال بريد إلكتروني للترتيبات المحددة للتسليم بدقة ومهنية وفخر.",
      valuedMessage: "في أتيكيس مينيسوتا لتقديم الطعام للطيران، أنت لست مجرد عميل—أنت مُقدر ومسموع ومُقدر حقاً.",
      airportsTitle: "نحن نقدم بفخر وجبات عالية الارتفاع إلى مطارات مينيسوتا التالية:",
      airportKMSP: "مطار مينيابوليس-سانت بول الدولي (KMSP)",
      airportKSTP: "مطار وسط مدينة سانت بول (KSTP)",
      airportKFCM: "مطار فلاينغ كلاود – إيدن بريري (KFCM)",
      airportKANE: "مطار مقاطعة أنوكا-بلين (KANE)",
      takeoffMessage: "فقط قل متى—وليمتك مُخولة للإقلاع."
    },
    // How It Works Section
    howItWorks: {
      title: "كيف يعمل",
      subtitle: "من الاختيار إلى الخدمة، نجعل تقديم الطعام الاستثنائي للطيران أمراً سهلاً",
      browse: {
        title: "تصفح",
        description: "استكشف القوائم المصنوعة من قبل الطهاة"
      },
      select: {
        title: "اختر",
        description: "خصص الصناديق والإضافات"
      },
      schedule: {
        title: "جدول",
        description: "اختر نافذة التسليم و FBO"
      },
      confirm: {
        title: "أكد",
        description: "استلم تأكيد الطلب"
      },
      enjoy: {
        title: "استمتع",
        description: "الكمال المقدم على الارتفاع"
      }
    }
  }
};

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];

export const defaultLanguage = 'en';