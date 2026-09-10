/**
 * All user-facing copy, in both languages.
 *
 * Positioning note: search demand for this property is overwhelmingly generic
 * accommodation intent ("cazare Brasov", "pensiune Brasov", "hotel Brasov"),
 * so titles and headings lead with accommodation and carry the secure indoor
 * motorcycle parking as the differentiator rather than the headline.
 */

import type { Lang, PageKey } from './config';

export interface SeoCopy {
  title: string;
  description: string;
}

export interface Copy {
  /** <html lang> value and locale used in OpenGraph. */
  htmlLang: string;
  ogLocale: string;
  langName: string;

  seo: Record<PageKey, SeoCopy>;

  nav: Record<Exclude<PageKey, 'card'>, string>;

  hero: { welcome: string; tagline: string };
  common: {
    bookNow: string;
    explore: string;
    scroll: string;
    goBack: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    languageLabel: string;
  };

  home: {
    h1: string;
    intro: string;
    cards: { title: string; content: string; image: string; page: PageKey }[];
    testimonialsTitle: string;
    testimonialSource: string;
    prevTestimonial: string;
    nextTestimonial: string;
  };

  rooms: {
    h1: string;
    intro: string;
    perNight: string;
    prevPhoto: string;
    nextPhoto: string;
    amenities: Record<string, string>;
    items: { key: string; title: string; description: string }[];
  };

  facilities: {
    h1: string;
    intro: string;
    items: Record<string, string>;
  };

  gallery: { h1: string; intro: string; photoAlt: (n: number) => string };

  about: { h1: string; body: string; imageAlt: string };

  contact: {
    h1: string;
    heading: string;
    title: string;
    text: string;
    viewMap: string;
    phone: string;
    email: string;
  };

  card: { visitWebsite: string; qrAlt: string };

  form: {
    name: string; namePh: string;
    checkin: string; checkout: string;
    adults: string; adultsPh: string;
    kids: string; kidsPh: string;
    phone: string; phonePh: string;
    email: string; emailPh: string;
    description: string; descriptionPh: string;
    errName: string; errCheckin: string; errCheckout: string; errAdults: string;
    errKids: string; errPhone: string; errEmail: string; errTerms: string;
    agreePrefix: string; termsLink: string;
    captchaUnavailable: string; captchaRequired: string;
    serviceUnavailable: string; sendError: string;
    submit: string; sending: string;
    successTitle: string; successText: string;
    confirmationPrefix: string; confirmationSuffix: string;
    sendAnother: string;
  };

  footer: {
    findUs: string;
    contact: string;
    terms: string;
    address1: string;
    address2: string;
  };
}

const ro: Copy = {
  htmlLang: 'ro',
  ogLocale: 'ro_RO',
  langName: 'Română',

  seo: {
    home: {
      title: 'Cazare Brașov | Pensiunea LaDespani – parcare interioară',
      description:
        'Cazare în Brașov la Pensiunea LaDespani: camere cu baie proprie de la 200 lei/noapte, parcare interioară securizată, grădină, bucătărie și spălătorie. Vă primim din 2007.',
    },
    rooms: {
      title: 'Camere de cazare în Brașov | Pensiunea LaDespani',
      description:
        'Camere de cazare în Brașov: budget, standard și cu balcon, toate cu baie proprie, TV și seif. Prețuri de la 200 lei pe noapte, parcare interioară inclusă.',
    },
    facilities: {
      title: 'Facilități și parcare interioară | Pensiunea LaDespani Brașov',
      description:
        'Facilitățile pensiunii LaDespani din Brașov: parcare interioară securizată pentru mașini și motociclete, bucătărie, spălătorie, grătar, ping pong și seif.',
    },
    gallery: {
      title: 'Galerie foto | Pensiunea LaDespani Brașov',
      description:
        'Galerie foto cu pensiunea LaDespani din Brașov: camerele, grădina, parcarea interioară și zonele comune ale pensiunii noastre de familie.',
    },
    contact: {
      title: 'Contact și rezervări | Pensiunea LaDespani Brașov',
      description:
        'Rezervă o cameră la Pensiunea LaDespani din Brașov: sună, scrie-ne pe email sau completează formularul de rezervare. Mihai Viteazul 128, Brașov.',
    },
    about: {
      title: 'Despre noi | Pensiunea LaDespani Brașov',
      description:
        'Povestea familiei estono-române din spatele pensiunii LaDespani din Brașov: 15 ani de călătorii prin lume și, din 2007, o casă deschisă pentru oaspeți.',
    },
    card: {
      title: 'Carte de vizită digitală | Pensiunea LaDespani',
      description: 'Date de contact și locație pentru Pensiunea LaDespani din Brașov.',
    },
  },

  nav: {
    home: 'Acasă',
    facilities: 'Facilități',
    rooms: 'Camere',
    gallery: 'Galerie',
    contact: 'Contact',
    about: 'Despre noi',
  },

  hero: { welcome: 'BINE AȚI VENIT LA', tagline: 'Cazare de familie în Brașov din 2007' },

  common: {
    bookNow: 'REZERVĂ',
    explore: 'DESCOPERĂ',
    scroll: 'Derulează',
    goBack: 'Înapoi',
    openMenu: 'Deschide meniul de navigare',
    closeMenu: 'Închide meniul de navigare',
    mainNav: 'Navigare principală',
    languageLabel: 'Alegeți limba',
  },

  home: {
    h1: 'Cazare în Brașov la Pensiunea LaDespani – camere primitoare și parcare interioară securizată',
    intro:
      'Pensiunea LaDespani se află în Brașov, pe strada Mihai Viteazul 128, la câteva minute de centrul vechi. Oferim camere cu baie proprie, o grădină liniștită și parcare interioară securizată pentru mașini și motociclete.',
    cards: [
      {
        title: 'Parcare interioară securizată',
        content:
          'Mașina sau motocicleta dumneavoastră doarme sub acoperiș, într-un spațiu închis și supravegheat. Brașovul este poarta către cele mai frumoase drumuri din România – Transfăgărășanul, Transalpina și pasurile Carpaților sunt la o zi distanță – iar noi primim călători pe două și pe patru roți din 2007.',
        image: 'parking.webp',
        page: 'facilities',
      },
      {
        title: 'Camere curate și primitoare',
        content:
          'Camerele noastre sunt gândite pentru odihnă: lumină naturală, baie proprie, TV și priveliște spre grădină. Lăsați grijile de acasă și găsiți-vă colțul liniștit.',
        image: 'content1.webp',
        page: 'rooms',
      },
      {
        title: 'O grădină pentru toate anotimpurile',
        content:
          'Am amenajat o oază verde de care vă puteți bucura în orice sezon. Din clipa în care intrați în grădină, aerul e mai răcoros vara, mai primitor iarna, iar natura vă înconjoară în nuanțe vii tot anul.',
        image: 'content2.webp',
        page: 'facilities',
      },
    ],
    testimonialsTitle: 'Ce spun oaspeții',
    testimonialSource: 'pe Google',
    prevTestimonial: 'Recenzia anterioară',
    nextTestimonial: 'Recenzia următoare',
  },

  rooms: {
    h1: 'Camere de cazare în Brașov',
    intro:
      'Fiecare cameră luminoasă are tot ce vă trebuie pentru un sejur confortabil: baie proprie, TV, seif și prosoape. Mobilierul contemporan se împacă cu tonurile calde ale naturii, vizibile pe ferestrele și terasele care dau spre grădină. Orice rezervare include parcare interioară securizată pentru mașină sau motocicletă.',
    perNight: ' / noapte',
    prevPhoto: 'Fotografia anterioară',
    nextPhoto: 'Fotografia următoare',
    amenities: {
      privateBathroom: 'Baie proprie',
      bathtub: 'Cadă',
      shower: 'Duș',
      balcony: 'Balcon',
      safeDeposit: 'Seif',
      TV: 'TV',
      towels: 'Prosoape',
    },
    items: [
      {
        key: 'budget',
        title: 'Cameră budget',
        description:
          'O cameră economică, potrivită pentru un sejur scurt. Are pat matrimonial și baie proprie, cu priveliște spre grădină.',
      },
      {
        key: 'standard1',
        title: 'Cameră standard 1',
        description:
          'O cameră standard, potrivită pentru un cuplu. Are pat matrimonial și baie proprie cu cadă.',
      },
      {
        key: 'standard2',
        title: 'Cameră standard 2',
        description:
          'O cameră standard, potrivită pentru un cuplu. Are pat matrimonial și baie proprie cu cadă.',
      },
      {
        key: 'balcony1',
        title: 'Cameră cu balcon 1',
        description:
          'O cameră cu balcon, potrivită pentru un cuplu. Are pat matrimonial și baie proprie cu duș.',
      },
      {
        key: 'balcony2',
        title: 'Cameră cu balcon 2',
        description:
          'O cameră cu balcon, potrivită pentru un cuplu. Are pat matrimonial și baie proprie cu duș.',
      },
    ],
  },

  facilities: {
    h1: 'Facilitățile pensiunii',
    intro:
      'Ne dorim ca sejurul dumneavoastră la pensiunea noastră să fie unul special, așa că avem grijă la fiecare detaliu. Mașinile și motocicletele stau peste noapte sub acoperiș, în parcarea interioară securizată, iar spălătoria vă stă la dispoziție după un drum lung. Vă așteaptă priveliști frumoase, o atmosferă caldă și oameni prietenoși.',
    items: {
      parking: 'Parcare interioară securizată',
      pingpong: 'Ping pong',
      grill: 'Grătar',
      trampoline: 'Trambulină',
      kitchen: 'Bucătărie',
      laundry: 'Spălătorie',
      safe: 'Seif',
    },
  },

  gallery: {
    h1: 'Galerie foto',
    intro:
      'Camerele, grădina, parcarea interioară și zonele comune ale pensiunii LaDespani din Brașov.',
    photoAlt: (n) =>
      `Pensiunea LaDespani Brașov — fotografia ${n} cu camerele, grădina și facilitățile noastre`,
  },

  about: {
    h1: 'Despre noi',
    body:
      'Suntem o familie mixtă, estono-română. După 15 ani de călătorii prin lume, în 2007 am hotărât că e timpul să ne așezăm. Ne-am gândit să dăm mai departe bunătatea pe care am primit-o de la oameni pe drumurile noastre, așa că am deschis pensiunea și o ținem de atunci. Aici au crescut copiii noștri, aici am legat multe prietenii și de aici nu ne mai putem despărți. Fiindcă am petrecut noi înșine atâția ani pe șosea, avem o slăbiciune pentru cei care călătoresc pe motocicletă: cine străbate Carpații găsește la noi un loc sigur pentru motor și o primire caldă. Vorbim română, engleză, germană, italiană, spaniolă, franceză, estonă, rusă, finlandeză și, cu puțin ajutor de la inteligența artificială, practic orice limbă. Veniți la noi, vă așteptăm cu drag!',
    imageAlt: 'Familia care conduce Pensiunea LaDespani din Brașov',
  },

  contact: {
    h1: 'Contact și rezervări',
    heading: 'CONTACT',
    title: 'SUNTEM AICI PENTRU DUMNEAVOASTRĂ',
    text:
      'La Pensiunea LaDespani ne luăm oaspeții în serios. Dacă aveți întrebări, cereri sau nemulțumiri, sunați-ne și vă răspundem cât putem de repede. Călătoriți cu motocicleta? Spuneți-ne și pregătim un loc în parcarea interioară.',
    viewMap: 'Vezi harta →',
    phone: 'Telefon',
    email: 'Email',
  },

  card: { visitWebsite: 'Vizitează site-ul', qrAlt: 'Cod QR către site-ul oficial' },

  form: {
    name: 'Nume', namePh: 'Numele dumneavoastră',
    checkin: 'Data sosirii', checkout: 'Data plecării',
    adults: 'Număr de adulți', adultsPh: 'Câți adulți',
    kids: 'Număr de copii', kidsPh: 'Câți copii',
    phone: 'Telefon', phonePh: 'Numărul de telefon',
    email: 'Email', emailPh: 'Adresa de email',
    description: 'Mesaj', descriptionPh: 'Informații suplimentare',
    errName: 'Numele este obligatoriu',
    errCheckin: 'Data sosirii este obligatorie',
    errCheckout: 'Data plecării este obligatorie',
    errAdults: 'Este necesar cel puțin un adult',
    errKids: 'Numărul de copii este obligatoriu',
    errPhone: 'Introduceți un număr de telefon valid',
    errEmail: 'Adresa de email este obligatorie',
    errTerms: 'Trebuie să acceptați termenii și condițiile',
    agreePrefix: 'Sunt de acord cu ',
    termsLink: 'termenii și condițiile',
    captchaUnavailable: 'Verificarea CAPTCHA nu este disponibilă. Puteți trimite cererea; o vom verifica manual.',
    captchaRequired: 'Vă rugăm să completați verificarea CAPTCHA înainte de a trimite.',
    serviceUnavailable: 'Serviciul de email nu este disponibil momentan. Vă rugăm încercați mai târziu.',
    sendError: 'A apărut o problemă la trimiterea cererii. Încercați din nou sau sunați-ne direct.',
    submit: 'Trimite cererea', sending: 'Se trimite...',
    successTitle: 'Cererea de rezervare a fost trimisă!',
    successText: 'Vă mulțumim că ați ales LaDespani. Am primit cererea dumneavoastră și vă răspundem cât putem de repede.',
    confirmationPrefix: 'Un email de confirmare este pe drum către ',
    confirmationSuffix: '.',
    sendAnother: 'Trimite o altă cerere',
  },

  footer: {
    findUs: 'Cum ajungeți',
    contact: 'Contact',
    terms: 'Termeni și condiții',
    address1: 'Mihai Viteazul 128',
    address2: 'Brașov, România',
  },
};

const en: Copy = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  langName: 'English',

  seo: {
    home: {
      title: 'Guesthouse in Brasov, Romania | LaDespani – Indoor Parking',
      description:
        'LaDespani is a family guesthouse in Brasov, Romania: rooms with private bathrooms from 200 RON a night, secure indoor parking for cars and motorcycles, garden and guest kitchen. Hosting since 2007.',
    },
    rooms: {
      title: 'Rooms in Brasov | LaDespani Guesthouse',
      description:
        'Guest rooms in Brasov: budget, standard and balcony options, all with private bathrooms, TV and safe. From 200 RON per night, secure indoor parking included.',
    },
    facilities: {
      title: 'Facilities & Secure Indoor Parking | LaDespani Guesthouse Brasov',
      description:
        'Facilities at LaDespani in Brasov: secure indoor parking for cars and motorcycles, guest kitchen, laundry, grill, trampoline, ping pong and safe lockers.',
    },
    gallery: {
      title: 'Photo Gallery | LaDespani Guesthouse Brasov',
      description:
        'Browse the LaDespani photo gallery: the rooms, the garden, the indoor parking and the common areas of our family guesthouse in Brasov.',
    },
    contact: {
      title: 'Contact & Booking | LaDespani Guesthouse Brasov',
      description:
        'Book a room at LaDespani Guesthouse in Brasov: call, email, or use the booking form. Mihai Viteazul 128, Brasov, Romania.',
    },
    about: {
      title: 'About Us | LaDespani Guesthouse Brasov',
      description:
        'The story of the Estonian-Romanian family behind LaDespani in Brasov: fifteen years of travelling the world and, since 2007, a house open to guests.',
    },
    card: {
      title: 'Digital Card | LaDespani Guesthouse',
      description: 'Contact and location details for LaDespani Guesthouse in Brasov, Romania.',
    },
  },

  nav: {
    home: 'Home',
    facilities: 'Facilities',
    rooms: 'Rooms',
    gallery: 'Gallery',
    contact: 'Contact',
    about: 'About',
  },

  hero: { welcome: 'WELCOME TO', tagline: 'A family guesthouse in Brasov since 2007' },

  common: {
    bookNow: 'BOOK NOW',
    explore: 'EXPLORE',
    scroll: 'Scroll',
    goBack: 'Go back',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    mainNav: 'Main navigation',
    languageLabel: 'Choose language',
  },

  home: {
    h1: 'A guesthouse in Brasov — comfortable rooms and secure indoor parking',
    intro:
      'LaDespani sits at Mihai Viteazul 128 in Brasov, a few minutes from the old town. We offer rooms with private bathrooms, a quiet garden, and secure indoor parking for cars and motorcycles.',
    cards: [
      {
        title: 'Secure indoor parking',
        content:
          'Your car or motorcycle sleeps under a roof, in a closed and watched space. Brasov is the gateway to the best roads in Romania — the Transfagarasan, the Transalpina and the winding Carpathian passes are all within a day — and we have been welcoming travellers on two and four wheels since 2007.',
        image: 'parking.webp',
        page: 'facilities',
      },
      {
        title: 'Cozy and clean',
        content:
          'Our rooms are made for rest: natural light, a private bathroom, a TV and a view over the garden. Take your mind off the day-to-day and find a quiet corner of your own.',
        image: 'content1.webp',
        page: 'rooms',
      },
      {
        title: 'A garden for every season',
        content:
          'We have grown a green oasis you can enjoy all year round. From the moment you step into the garden the air feels cooler in summer, cozier in winter, and nature surrounds you in vivid shades whatever the month.',
        image: 'content2.webp',
        page: 'facilities',
      },
    ],
    testimonialsTitle: 'What our guests say',
    testimonialSource: 'on Google',
    prevTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
  },

  rooms: {
    h1: 'Rooms in Brasov',
    intro:
      'Each of our bright rooms comes with everything you need for a comfortable stay: a private bathroom, a TV, a safe and towels. Contemporary furnishing meets the warm tones of nature, visible from the windows and terraces facing the garden. Every booking includes secure indoor parking for your car or motorcycle.',
    perNight: ' / night',
    prevPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    amenities: {
      privateBathroom: 'Private bathroom',
      bathtub: 'Bathtub',
      shower: 'Shower',
      balcony: 'Balcony',
      safeDeposit: 'Safe deposit',
      TV: 'TV',
      towels: 'Towels',
    },
    items: [
      {
        key: 'budget',
        title: 'Budget Room',
        description:
          'A budget room, perfect for a short stay. It has a double bed and a private bathroom, with a nice view of the garden.',
      },
      {
        key: 'standard1',
        title: 'Standard Room 1',
        description:
          'A standard room, perfect for a couple. It has a double bed and a private bathroom with a bathtub.',
      },
      {
        key: 'standard2',
        title: 'Standard Room 2',
        description:
          'A standard room, perfect for a couple. It has a double bed and a private bathroom with a bathtub.',
      },
      {
        key: 'balcony1',
        title: 'Balcony Room 1',
        description:
          'A room with a balcony, perfect for a couple. It has a double bed and a private bathroom with a shower.',
      },
      {
        key: 'balcony2',
        title: 'Balcony Room 2',
        description:
          'A room with a balcony, perfect for a couple. It has a double bed and a private bathroom with a shower.',
      },
    ],
  },

  facilities: {
    h1: 'Guesthouse facilities',
    intro:
      'We want your stay with us to be genuinely special, so we pay attention to every detail. Cars and motorcycles spend the night under a roof in our secure indoor parking, and the laundry is there for you after a long day on the road. Expect beautiful views, a warm atmosphere and friendly people.',
    items: {
      parking: 'Secure indoor parking',
      pingpong: 'Ping pong',
      grill: 'Grill',
      trampoline: 'Trampoline',
      kitchen: 'Kitchen',
      laundry: 'Laundry',
      safe: 'Safe locker',
    },
  },

  gallery: {
    h1: 'Photo gallery',
    intro:
      'The rooms, the garden, the indoor parking and the common areas of LaDespani Guesthouse in Brasov.',
    photoAlt: (n) =>
      `LaDespani Guesthouse Brasov — photo ${n} of our rooms, garden and facilities`,
  },

  about: {
    h1: 'About us',
    body:
      'We are a mixed Estonian-Romanian family. After fifteen years of travelling around the world, in 2007 we decided it was time to settle down. We thought we would start giving back to fellow travellers the kindness we had received on our journeys, so we opened our guesthouse and have been running it ever since. This place saw our kids grow up, it has brought us a lot of new friends and it has grown very deep into our hearts. Having spent so many years on the road ourselves, we have a soft spot for motorcycle travellers: riders touring the Carpathians have always found a safe place for their bikes and a warm welcome here. We speak Romanian, English, German, Italian, Spanish, French, Estonian, Russian, Finnish and, with a little help from AI, actually every language. Come to us, we welcome you!',
    imageAlt: 'The family who run LaDespani Guesthouse in Brasov',
  },

  contact: {
    h1: 'Contact and booking',
    heading: 'CONTACT-US',
    title: 'WE ARE HERE FOR YOU',
    text:
      'At LaDespani Guesthouse we take our guests seriously. If you have any enquiries, complaints or requests, please call us and we will get back to you as soon as possible. Travelling by motorcycle? Let us know and we will have a spot in the indoor parking ready for your bike.',
    viewMap: 'View map →',
    phone: 'Phone',
    email: 'Email',
  },

  card: { visitWebsite: 'Visit website', qrAlt: 'QR code linking to the official website' },

  form: {
    name: 'Name', namePh: 'Enter your name',
    checkin: 'Check-in date', checkout: 'Check-out date',
    adults: 'Number of adults', adultsPh: 'Enter number of adults',
    kids: 'Number of kids', kidsPh: 'Enter number of kids',
    phone: 'Phone number', phonePh: 'Enter your phone number',
    email: 'Email', emailPh: 'Enter your email',
    description: 'Message', descriptionPh: 'Additional information',
    errName: 'Name is required',
    errCheckin: 'Check-in date is required',
    errCheckout: 'Check-out date is required',
    errAdults: 'At least 1 adult is required',
    errKids: 'Number of kids is required',
    errPhone: 'A valid phone number is required',
    errEmail: 'Email is required',
    errTerms: 'You must agree to the terms and conditions',
    agreePrefix: 'I agree to the ',
    termsLink: 'terms and conditions',
    captchaUnavailable: 'CAPTCHA is unavailable. You can still send your request; we will review it manually.',
    captchaRequired: 'Please complete the CAPTCHA before submitting.',
    serviceUnavailable: 'The email service is currently unavailable. Please try again later.',
    sendError: 'There was a problem sending your request. Please try again, or call us directly.',
    submit: 'Send request', sending: 'Sending...',
    successTitle: 'Booking request sent!',
    successText: 'Thank you for choosing LaDespani. We have received your request and will get back to you as soon as possible.',
    confirmationPrefix: 'A confirmation email is on its way to ',
    confirmationSuffix: '.',
    sendAnother: 'Send another request',
  },

  footer: {
    findUs: 'Find us',
    contact: 'Contact',
    terms: 'Terms and Conditions',
    address1: 'Mihai Viteazul 128',
    address2: 'Brasov, Romania',
  },
};

export const CONTENT: Record<Lang, Copy> = { ro, en };
