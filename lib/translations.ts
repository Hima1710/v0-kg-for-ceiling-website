export type Language = "ar" | "en"

export const translations = {
  ar: {
    // Navbar
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      gallery: "معرض الأعمال",
      process: "طريقة العمل",
      contact: "تواصل معنا",
      getQuote: "احصل على عرض سعر",
    },
    // Hero
    hero: {
      subtitle: "مدينة السادات",
      title: "تصميمات أسقف جبسية",
      titleHighlight: "استثنائية",
      description: "نحول مساحاتك إلى تحف فنية من خلال حلول الأسقف الجبسية والتشطيبات الداخلية المتميزة",
      cta: "احصل على عرض سعر",
      learnMore: "تعرف على المزيد",
    },
    // Services
    services: {
      title: "خدماتنا",
      subtitle: "حلول متكاملة للتشطيبات الداخلية تجمع بين الجودة والإبداع",
      ceiling: {
        title: "أسقف جبسية",
        description: "تصميمات أسقف جبسية بأحدث التقنيات مع إضاءة مدمجة وتشطيبات فاخرة",
      },
      partitions: {
        title: "قواطيع وحوائط",
        description: "قواطيع جبسية عازلة للصوت وحوائط ديكورية بتصميمات عصرية تناسب جميع المساحات",
      },
      custom: {
        title: "أعمال مخصصة",
        description: "تصميمات ديكورية مخصصة من كرانيش وزخارف وإضاءة مخفية حسب رغبتك",
      },
      learnMore: "اعرف المزيد",
    },
    // Gallery
    gallery: {
      title: "معرض أعمالنا",
      subtitle: "اكتشف مجموعة من مشاريعنا المميزة التي تعكس خبرتنا وجودة أعمالنا",
      viewProject: "عرض المشروع",
      close: "إغلاق",
      previous: "السابق",
      next: "التالي",
      projects: {
        luxury: { title: "غرفة نوم فاخرة", category: "سكني" },
        kitchen: { title: "مطبخ عصري", category: "سكني" },
        office: { title: "استقبال مكتبي", category: "تجاري" },
        bathroom: { title: "حمام أنيق", category: "سكني" },
        conference: { title: "قاعة اجتماعات", category: "تجاري" },
        retail: { title: "متجر تجزئة", category: "تجاري" },
      },
    },
    // Process
    process: {
      title: "طريقة عملنا",
      subtitle: "نتبع منهجية واضحة لضمان تنفيذ مشروعك بأعلى معايير الجودة",
      steps: {
        consultation: {
          title: "الاستشارة",
          description: "نستمع لاحتياجاتك ونفهم رؤيتك للمشروع",
        },
        design: {
          title: "التصميم",
          description: "نقدم تصميمات مبتكرة تناسب ذوقك وميزانيتك",
        },
        implementation: {
          title: "التنفيذ",
          description: "فريق متخصص ينفذ المشروع بدقة واحترافية",
        },
        delivery: {
          title: "التسليم",
          description: "نسلم المشروع في الموعد المحدد بأعلى جودة",
        },
      },
    },
    // Contact
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للإجابة على استفساراتك وتقديم أفضل الحلول لمشروعك",
      form: {
        name: "الاسم",
        namePlaceholder: "أدخل اسمك",
        phone: "رقم الهاتف",
        phonePlaceholder: "أدخل رقم هاتفك",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        service: "نوع الخدمة",
        servicePlaceholder: "اختر الخدمة",
        serviceOptions: {
          ceiling: "أسقف جبسية",
          partitions: "قواطيع وحوائط",
          custom: "أعمال مخصصة",
          other: "أخرى",
        },
        message: "رسالتك",
        messagePlaceholder: "اكتب تفاصيل مشروعك أو استفسارك",
        submit: "إرسال الرسالة",
        sending: "جاري الإرسال...",
      },
      info: {
        location: "الموقع",
        locationDetails: ["مدينة السادات", "محافظة المنوفية، مصر"],
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        hours: "مواعيد العمل",
        hoursDetails: ["السبت - الخميس: 9ص - 6م", "الجمعة: إجازة"],
      },
    },
    // Footer
    footer: {
      description: "متخصصون في تصميم وتنفيذ الأسقف الجبسية والتشطيبات الداخلية بأعلى معايير الجودة في مدينة السادات",
      quickLinks: "روابط سريعة",
      ourServices: "خدماتنا",
      contactUs: "تواصل معنا",
      rights: "جميع الحقوق محفوظة",
      developer: "Developer",
    },
  },
  en: {
    // Navbar
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      process: "Our Process",
      contact: "Contact",
      getQuote: "Get a Quote",
    },
    // Hero
    hero: {
      subtitle: "Sadat City",
      title: "Exceptional Ceiling",
      titleHighlight: "Designs",
      description: "Transform your spaces into masterpieces with premium gypsum board ceilings and interior finishing solutions",
      cta: "Get a Quote",
      learnMore: "Learn More",
    },
    // Services
    services: {
      title: "Our Services",
      subtitle: "Comprehensive interior finishing solutions combining quality and creativity",
      ceiling: {
        title: "Gypsum Ceilings",
        description: "Suspended and gypsum ceiling designs with the latest technologies, integrated lighting, and premium finishes",
      },
      partitions: {
        title: "Partitions & Walls",
        description: "Soundproof gypsum partitions and decorative walls with modern designs suitable for all spaces",
      },
      custom: {
        title: "Custom Work",
        description: "Custom decorative designs including cornices, ornaments, and hidden lighting to your specifications",
      },
      learnMore: "Learn More",
    },
    // Gallery
    gallery: {
      title: "Our Portfolio",
      subtitle: "Discover our outstanding projects that reflect our expertise and quality",
      viewProject: "View Project",
      close: "Close",
      previous: "Previous",
      next: "Next",
      projects: {
        luxury: { title: "Luxury Bedroom", category: "Residential" },
        kitchen: { title: "Modern Kitchen", category: "Residential" },
        office: { title: "Office Reception", category: "Commercial" },
        bathroom: { title: "Elegant Bathroom", category: "Residential" },
        conference: { title: "Conference Room", category: "Commercial" },
        retail: { title: "Retail Store", category: "Commercial" },
      },
    },
    // Process
    process: {
      title: "How We Work",
      subtitle: "We follow a clear methodology to ensure your project is executed with the highest quality standards",
      steps: {
        consultation: {
          title: "Consultation",
          description: "We listen to your needs and understand your project vision",
        },
        design: {
          title: "Design",
          description: "We provide innovative designs that suit your taste and budget",
        },
        implementation: {
          title: "Implementation",
          description: "A specialized team executes the project with precision and professionalism",
        },
        delivery: {
          title: "Delivery",
          description: "We deliver the project on time with the highest quality",
        },
      },
    },
    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "We're here to answer your questions and provide the best solutions for your project",
      form: {
        name: "Name",
        namePlaceholder: "Enter your name",
        phone: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        email: "Email",
        emailPlaceholder: "Enter your email",
        service: "Service Type",
        servicePlaceholder: "Select a service",
        serviceOptions: {
          ceiling: "Gypsum Ceilings",
          partitions: "Partitions & Walls",
          custom: "Custom Work",
          other: "Other",
        },
        message: "Message",
        messagePlaceholder: "Describe your project or inquiry",
        submit: "Send Message",
        sending: "Sending...",
      },
      info: {
        location: "Location",
        locationDetails: ["Sadat City", "Menoufia Governorate, Egypt"],
        phone: "Phone",
        email: "Email",
        hours: "Working Hours",
        hoursDetails: ["Sat - Thu: 9AM - 6PM", "Friday: Closed"],
      },
    },
    // Footer
    footer: {
      description: "Specialists in designing and implementing gypsum ceilings and interior finishing with the highest quality standards in Sadat City",
      quickLinks: "Quick Links",
      ourServices: "Our Services",
      contactUs: "Contact Us",
      rights: "All rights reserved",
      developer: "Developer",
    },
  },
}

export function getTranslation(lang: Language) {
  return translations[lang]
}
