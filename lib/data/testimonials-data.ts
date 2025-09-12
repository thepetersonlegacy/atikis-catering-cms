export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
}

export interface TestimonialTranslations {
  [language: string]: {
    [testimonialId: string]: {
      title: string;
      quote: string;
    };
  };
}

export const testimonialTranslations: TestimonialTranslations = {
  en: {
    '1': {
      title: 'Flight Attendant',
      quote: 'I just wanted you to know that the pax LOVED the Lasagna both beef and vegan 🤩 this was my 1st time serving pasta and was trying something new. Thank you so much for an awesome meal to serve 🥳'
    },
    '2': {
      title: 'Aviation Professional',
      quote: 'Hello!! Just wanted to send a THANK YOU for all you guys do at Atiki\'s. I\'ve been so happy with every order I\'ve placed. They all come on time, look amazing and your team is so great at communicating and providing exactly what I\'m looking for. My passengers are always giving compliments so I wanted to pass that along.'
    },
    '3': {
      title: 'Flight Crew',
      quote: 'We just wanted to take a moment to express our gratitude to you and your team for the fantastic job with the catering the other day. They truly enjoyed everything, and they ended up taking it all home with them. They were so appreciative! Thank you once again for pulling this together on such short notice.'
    },
    '4': {
      title: 'Flight Attendant',
      quote: 'Thank YOU so much for pulling off the cute cake today! I know it was short notice and that you guys went above and beyond. The passenger (who\'s leaving) was touched and really appreciated it. We appreciate you guys!'
    },
    '5': {
      title: 'Regular Client',
      quote: 'I just wanted to say thank you! I enjoyed my Apple Chia Baked Oatmeal again today! It was delicious. I also wanted to tell you that we have gotten a lot of great feedback on the breakfast sandwiches and the Mexican breakfast bowls.'
    },
    '6': {
      title: 'Flight Crew',
      quote: 'Crew Food Ratings: Overall Satisfaction: Very satisfied, Quality of Food: Very satisfied, Order Accuracy: Very satisfied, Presentation of food: Very satisfied, Packaging of food: Very satisfied. This was phenomenal. This food was clearly made by individuals who care for their craft. Artistically and professionally packaged. Extremely delicious. I am very much looking forward to my next stop here.'
    }
  },
  es: {
    '1': {
      title: 'Auxiliar de Vuelo',
      quote: 'Solo quería que supieras que a los pasajeros les ENCANTÓ la Lasaña tanto la de carne como la vegana 🤩 esta fue mi primera vez sirviendo pasta y estaba probando algo nuevo. ¡Muchas gracias por una comida increíble para servir! 🥳'
    },
    '2': {
      title: 'Profesional de Aviación',
      quote: '¡¡Hola!! Solo quería enviar un AGRADECIMIENTO por todo lo que hacen en Atiki\'s. He estado muy contento con cada pedido que he hecho. Todos llegan a tiempo, se ven increíbles y su equipo es excelente comunicándose y proporcionando exactamente lo que busco. Mis pasajeros siempre dan cumplidos, así que quería transmitir eso.'
    },
    '3': {
      title: 'Tripulación de Vuelo',
      quote: 'Solo queríamos tomarnos un momento para expresar nuestra gratitud a ti y a tu equipo por el trabajo fantástico con el catering el otro día. Realmente disfrutaron todo, y terminaron llevándoselo todo a casa. ¡Estaban muy agradecidos! Gracias una vez más por organizar esto con tan poca antelación.'
    },
    '4': {
      title: 'Auxiliar de Vuelo',
      quote: '¡Muchas GRACIAS por lograr ese lindo pastel hoy! Sé que fue con poca antelación y que ustedes fueron más allá de lo esperado. El pasajero (que se va) se sintió conmovido y realmente lo apreció. ¡Los apreciamos!'
    },
    '5': {
      title: 'Cliente Regular',
      quote: '¡Solo quería decir gracias! ¡Disfruté mi Avena Horneada de Manzana y Chía otra vez hoy! Estaba deliciosa. También quería decirte que hemos recibido muchos comentarios positivos sobre los sándwiches de desayuno y los bowls de desayuno mexicano.'
    },
    '6': {
      title: 'Tripulación de Vuelo',
      quote: 'Calificaciones de Comida de Tripulación: Satisfacción General: Muy satisfecho, Calidad de la Comida: Muy satisfecho, Precisión del Pedido: Muy satisfecho, Presentación de la comida: Muy satisfecho, Empaque de la comida: Muy satisfecho. Esto fue fenomenal. Esta comida fue claramente hecha por individuos que se preocupan por su oficio. Empacada artística y profesionalmente. Extremadamente deliciosa. Espero con ansias mi próxima parada aquí.'
    }
  },
  'zh-CN': {
    '1': {
      title: '空乘人员',
      quote: '我只是想让你知道乘客们非常喜欢千层面，无论是牛肉的还是素食的🤩这是我第一次提供意面，想尝试一些新的东西。非常感谢你们提供了这么棒的餐食🥳'
    },
    '2': {
      title: '航空专业人士',
      quote: '你好！！只是想对Atiki\'s的所有工作人员表示感谢。我对每一次订餐都非常满意。它们都准时到达，看起来很棒，你们的团队在沟通方面非常出色，总是提供我所寻找的确切服务。我的乘客总是给予赞美，所以我想传达这一点。'
    },
    '3': {
      title: '机组人员',
      quote: '我们只是想花一点时间向你和你的团队表达我们的感激之情，感谢前几天出色的餐饮服务。他们真的很享受一切，最后把所有东西都带回家了。他们非常感激！再次感谢你们在如此短的时间内完成这项工作。'
    },
    '4': {
      title: '空乘人员',
      quote: '非常感谢你们今天制作了那个可爱的蛋糕！我知道时间很紧，你们超越了期望。那位乘客（即将离开的）很感动，真的很感激。我们很感激你们！'
    },
    '5': {
      title: '常客',
      quote: '我只是想说谢谢！我今天又享受了苹果奇亚籽烤燕麦！很美味。我还想告诉你，我们收到了很多关于早餐三明治和墨西哥早餐碗的好评。'
    },
    '6': {
      title: '机组人员',
      quote: '机组餐食评级：总体满意度：非常满意，食物质量：非常满意，订单准确性：非常满意，食物呈现：非常满意，食物包装：非常满意。这太棒了。这些食物显然是由关心自己手艺的人制作的。包装精美且专业。极其美味。我非常期待下次再来这里。'
    }
  },
  fr: {
    '1': {
      title: 'Agent de Bord',
      quote: 'Je voulais juste vous faire savoir que les passagers ont ADORÉ les Lasagnes, à la fois au bœuf et végétaliennes 🤩 c\'était ma première fois à servir des pâtes et j\'essayais quelque chose de nouveau. Merci beaucoup pour un repas formidable à servir 🥳'
    },
    '2': {
      title: 'Professionnel de l\'Aviation',
      quote: 'Bonjour !! Je voulais juste envoyer un MERCI pour tout ce que vous faites chez Atiki\'s. J\'ai été très heureux de chaque commande que j\'ai passée. Elles arrivent toutes à l\'heure, ont l\'air incroyables et votre équipe est excellente pour communiquer et fournir exactement ce que je recherche. Mes passagers font toujours des compliments, alors je voulais vous le transmettre.'
    },
    '3': {
      title: 'Équipage de Vol',
      quote: 'Nous voulions juste prendre un moment pour exprimer notre gratitude à vous et à votre équipe pour le travail fantastique avec le traiteur l\'autre jour. Ils ont vraiment tout apprécié, et ils ont fini par tout ramener chez eux. Ils étaient si reconnaissants ! Merci encore d\'avoir organisé cela avec un préavis si court.'
    },
    '4': {
      title: 'Agent de Bord',
      quote: 'Merci BEAUCOUP d\'avoir réalisé ce joli gâteau aujourd\'hui ! Je sais que c\'était un court préavis et que vous avez fait plus que prévu. Le passager (qui part) a été touché et l\'a vraiment apprécié. Nous vous apprécions !'
    },
    '5': {
      title: 'Client Régulier',
      quote: 'Je voulais juste dire merci ! J\'ai encore apprécié mon Porridge Cuit aux Pommes et Graines de Chia aujourd\'hui ! C\'était délicieux. Je voulais aussi vous dire que nous avons reçu beaucoup de bons retours sur les sandwichs de petit-déjeuner et les bols de petit-déjeuner mexicain.'
    },
    '6': {
      title: 'Équipage de Vol',
      quote: 'Évaluations de Nourriture d\'Équipage : Satisfaction Générale : Très satisfait, Qualité de la Nourriture : Très satisfait, Précision de la Commande : Très satisfait, Présentation de la nourriture : Très satisfait, Emballage de la nourriture : Très satisfait. C\'était phénoménal. Cette nourriture a été clairement préparée par des individus qui se soucient de leur métier. Emballée artistiquement et professionnellement. Extrêmement délicieuse. J\'ai très hâte de revenir ici.'
    }
  },
  ar: {
    '1': {
      title: 'مضيفة طيران',
      quote: 'أردت فقط أن أخبركم أن الركاب أحبوا اللازانيا سواء باللحم أو النباتية 🤩 هذه كانت المرة الأولى التي أقدم فيها المعكرونة وكنت أجرب شيئاً جديداً. شكراً جزيلاً لكم على وجبة رائعة للتقديم 🥳'
    },
    '2': {
      title: 'محترف طيران',
      quote: 'مرحباً!! أردت فقط أن أرسل شكراً لكل ما تفعلونه في أتيكيس. لقد كنت سعيداً جداً بكل طلب قدمته. كلها تأتي في الوقت المحدد، تبدو رائعة وفريقكم ممتاز في التواصل وتقديم ما أبحث عنه بالضبط. ركابي يقدمون المجاملات دائماً لذا أردت أن أنقل ذلك إليكم.'
    },
    '3': {
      title: 'طاقم الطيران',
      quote: 'أردنا فقط أن نأخذ لحظة للتعبير عن امتناننا لك ولفريقك للعمل الرائع مع تقديم الطعام في اليوم الآخر. لقد استمتعوا حقاً بكل شيء، وانتهى بهم الأمر بأخذ كل شيء إلى المنزل. كانوا ممتنين جداً! شكراً مرة أخرى لتنظيم هذا في مثل هذا الإشعار القصير.'
    },
    '4': {
      title: 'مضيفة طيران',
      quote: 'شكراً جزيلاً لكم على إنجاز تلك الكعكة الجميلة اليوم! أعلم أنه كان إشعاراً قصيراً وأنكم تجاوزتم التوقعات. الراكب (الذي يغادر) كان متأثراً وقدر ذلك حقاً. نحن نقدركم!'
    },
    '5': {
      title: 'عميل منتظم',
      quote: 'أردت فقط أن أقول شكراً! استمتعت بشوفان التفاح والشيا المخبوز مرة أخرى اليوم! كان لذيذاً. أردت أيضاً أن أخبركم أننا حصلنا على الكثير من التعليقات الرائعة حول سندويشات الإفطار وأطباق الإفطار المكسيكية.'
    },
    '6': {
      title: 'طاقم الطيران',
      quote: 'تقييمات طعام الطاقم: الرضا العام: راضٍ جداً، جودة الطعام: راضٍ جداً، دقة الطلب: راضٍ جداً، عرض الطعام: راضٍ جداً، تغليف الطعام: راضٍ جداً. كان هذا رائعاً. هذا الطعام تم إعداده بوضوح من قبل أشخاص يهتمون بحرفتهم. معبأ بشكل فني ومهني. لذيذ للغاية. أتطلع بشدة لزيارتي القادمة هنا.'
    }
  }
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jodi',
    title: 'Flight Attendant',
    quote: 'I just wanted you to know that the pax LOVED the Lasagna both beef and vegan 🤩 this was my 1st time serving pasta and was trying something new. Thank you so much for an awesome meal to serve 🥳'
  },
  {
    id: '2',
    name: 'Anonymous Client',
    title: 'Aviation Professional',
    quote: 'Hello!! Just wanted to send a THANK YOU for all you guys do at Atiki\'s. I\'ve been so happy with every order I\'ve placed. They all come on time, look amazing and your team is so great at communicating and providing exactly what I\'m looking for. My passengers are always giving compliments so I wanted to pass that along.'
  },
  {
    id: '3',
    name: 'Erin & Heidi',
    title: 'Flight Crew',
    quote: 'We just wanted to take a moment to express our gratitude to you and your team for the fantastic job with the catering the other day. They truly enjoyed everything, and they ended up taking it all home with them. They were so appreciative! Thank you once again for pulling this together on such short notice.'
  },
  {
    id: '4',
    name: 'Linda',
    title: 'Flight Attendant',
    quote: 'Thank YOU so much for pulling off the cute cake today! I know it was short notice and that you guys went above and beyond. The passenger (who\'s leaving) was touched and really appreciated it. We appreciate you guys!'
  },
  {
    id: '5',
    name: 'Sonja',
    title: 'Regular Client',
    quote: 'I just wanted to say thank you! I enjoyed my Apple Chia Baked Oatmeal again today! It was delicious. I also wanted to tell you that we have gotten a lot of great feedback on the breakfast sandwiches and the Mexican breakfast bowls.'
  },
  {
    id: '6',
    name: 'Flight Crew Member',
    title: 'Flight Crew',
    quote: 'Crew Food Ratings: Overall Satisfaction: Very satisfied, Quality of Food: Very satisfied, Order Accuracy: Very satisfied, Presentation of food: Very satisfied, Packaging of food: Very satisfied. This was phenomenal. This food was clearly made by individuals who care for their craft. Artistically and professionally packaged. Extremely delicious. I am very much looking forward to my next stop here.'
  }
];

// Helper function to get translated testimonial
export const getTranslatedTestimonial = (testimonial: Testimonial, language: string): Testimonial => {
  const translation = testimonialTranslations[language]?.[testimonial.id];
  
  if (translation) {
    return {
      ...testimonial,
      title: translation.title,
      quote: translation.quote
    };
  }
  
  // Fallback to English if translation not found
  const englishTranslation = testimonialTranslations.en[testimonial.id];
  return {
    ...testimonial,
    title: englishTranslation?.title || testimonial.title,
    quote: englishTranslation?.quote || testimonial.quote
  };
};