/** Terms and conditions, in both languages. */

import type { Lang } from './config';

export interface TermsCopy {
  title: string;
  close: string;
  sections: { title: string; clauses: string[] }[];
}

const ro: TermsCopy = {
  title: 'Termeni și condiții',
  close: 'Închide',
  sections: [
    {
      title: '1. Informații generale',
      clauses: [
        '1.1 Acești Termeni și condiții reglementează rezervarea, șederea și utilizarea serviciilor la Pensiunea LaDespani. Prin efectuarea unei rezervări, oaspeții sunt de acord să respecte acești termeni.',
        '1.2 Pensiunea LaDespani se află pe strada Mihai Viteazul 128, Brașov, România.',
        '1.3 Date de contact: +40721373747, anudani241@hotmail.com',
      ],
    },
    {
      title: '2. Rezervări și plăți',
      clauses: [
        '2.1 O rezervare este confirmată doar după primirea emailului de confirmare și, dacă este cazul, a avansului.',
        '2.2 Avansul nu este rambursabil.',
        '2.3 Diferența de plată se achită la sosire, dacă nu s-a convenit altfel.',
        '2.4 Plata se poate face în numerar.',
      ],
    },
    {
      title: '3. Cazare și eliberarea camerei',
      clauses: [
        '3.1 Cazarea se face între orele 15:00 și 22:00 în ziua sosirii.',
        '3.2 Camera trebuie eliberată între orele 08:00 și 11:00 în ziua plecării.',
        '3.3 Cazarea mai devreme sau eliberarea mai târziu sunt posibile la cerere, în funcție de disponibilitate și contra cost.',
      ],
    },
    {
      title: '4. Politica de anulare',
      clauses: [
        '4.1 Rezervările nu sunt rambursabile. Nu există o perioadă de anulare gratuită: odată confirmată, o rezervare nu poate fi anulată fără costuri.',
        '4.2 Anulările, modificările de dată și neprezentările duc la pierderea avansului și/sau a plății integrale.',
        '4.3 Vă recomandăm să încheiați o asigurare de călătorie dacă doriți protecție în cazul unei anulări.',
      ],
    },
    {
      title: '5. Responsabilitățile oaspeților',
      clauses: [
        '5.1 Oaspeții sunt rugați să respecte proprietatea, mobilierul și spațiile din jur.',
        '5.2 Pagubele sau pierderile provocate de oaspeți vor fi facturate la costul de reparație sau de înlocuire.',
        '5.3 Pensiunea LaDespani își rezervă dreptul de a întrerupe șederea oaspeților care deranjează sau au un comportament neadecvat, fără rambursare.',
      ],
    },
    {
      title: '6. Animale de companie și fumat',
      clauses: [
        '6.1 Animalele de companie nu sunt acceptate la Pensiunea LaDespani.',
        '6.2 Fumatul este strict interzis în interiorul pensiunii. În exterior există zone amenajate pentru fumat.',
      ],
    },
    {
      title: '7. Răspundere',
      clauses: [
        '7.1 Pensiunea LaDespani nu răspunde pentru accidente, vătămări sau pierderea bunurilor personale.',
        '7.2 Oaspeții răspund de propria siguranță și de siguranța minorilor sau a persoanelor aflate în grija lor.',
      ],
    },
    {
      title: '8. Forță majoră',
      clauses: [
        '8.1 Pensiunea LaDespani nu răspunde pentru anulări sau modificări cauzate de evenimente independente de voința noastră, precum calamități naturale, greve sau alte situații neprevăzute.',
      ],
    },
    {
      title: '9. Confidențialitate și protecția datelor',
      clauses: [
        '9.1 Colectăm și prelucrăm datele oaspeților (nume, date de contact, informații despre rezervare și date de plată) pentru gestionarea rezervărilor, prestarea serviciilor și respectarea obligațiilor legale.',
        '9.2 Temeiurile juridice ale prelucrării sunt executarea contractului, respectarea obligațiilor legale și, unde este cazul, consimțământul oaspetelui (de exemplu pentru comunicări de marketing).',
        '9.3 Datele oaspeților sunt păstrate în siguranță și nu sunt transmise terților, cu excepția furnizorilor implicați în procesarea rezervărilor (procesatori de plăți, platforme de rezervare sau contabili) ori atunci când legea o cere.',
        '9.4 Oaspeții au dreptul de acces, de rectificare și de ștergere a datelor personale, precum și celelalte drepturi prevăzute de GDPR. Pentru detalii, consultați Politica de confidențialitate sau scrieți-ne la anudani241@hotmail.com.',
      ],
    },
    {
      title: '10. Reclamații și soluționarea litigiilor',
      clauses: [
        '10.1 Reclamațiile se transmit în scris la anudani241@hotmail.com.',
        '10.2 Litigiile se soluționează conform legislației aplicabile din România.',
      ],
    },
    {
      title: '11. Legea aplicabilă',
      clauses: ['11.1 Acești Termeni și condiții sunt guvernați de legea română.'],
    },
  ],
};

const en: TermsCopy = {
  title: 'Terms and Conditions',
  close: 'Close',
  sections: [
    {
      title: '1. General information',
      clauses: [
        '1.1 These Terms and Conditions govern the booking, stay, and use of services at LaDespani Guesthouse. By making a booking, guests agree to comply with these terms.',
        '1.2 LaDespani Guesthouse is located at Mihai Viteazul 128, Brasov, Romania.',
        '1.3 Contact details: +40721373747, anudani241@hotmail.com',
      ],
    },
    {
      title: '2. Booking and Payments',
      clauses: [
        '2.1 A reservation is only confirmed upon receipt of a booking confirmation email and, if applicable, the deposit payment.',
        '2.2 The deposit is non-refundable.',
        '2.3 The balance of the payment is due upon arrival unless stated otherwise.',
        '2.4 Payments can be made via cash.',
      ],
    },
    {
      title: '3. Check-in and Check-out',
      clauses: [
        '3.1 Check-in is available from 15:00 to 22:00 on the day of arrival.',
        '3.2 Check-out must be completed between 08:00 and 11:00 on the day of departure.',
        '3.3 Early check-in or late check-out may be available upon request, subject to availability and additional charges.',
      ],
    },
    {
      title: '4. Cancellation Policy',
      clauses: [
        '4.1 Bookings are non-refundable. There is no free cancellation period: once a reservation is confirmed, it cannot be cancelled free of charge.',
        '4.2 Cancellations, date changes and no-shows result in the loss of the deposit and/or the full payment.',
        '4.3 We recommend taking out travel insurance if you would like cover in the event of a cancellation.',
      ],
    },
    {
      title: '5. Guest Responsibilities',
      clauses: [
        '5.1 Guests are expected to respect the property, furnishings, and surroundings.',
        '5.2 Damages or losses caused by guests will be charged at repair or replacement cost.',
        '5.3 LaDespani reserves the right to terminate the stay of guests causing a disturbance or engaging in inappropriate behavior, without refund.',
      ],
    },
    {
      title: '6. Pets and Smoking Policy',
      clauses: [
        '6.1 Pets are not allowed at LaDespani Guesthouse.',
        '6.2 Smoking is strictly prohibited inside the guesthouse. Designated smoking areas are available outside the property.',
      ],
    },
    {
      title: '7. Liability',
      clauses: [
        '7.1 LaDespani Guesthouse is not responsible for accidents, injuries, or losses of personal belongings.',
        '7.2 Guests are responsible for their own safety and the safety of minors or dependents traveling with them.',
      ],
    },
    {
      title: '8. Force Majeure',
      clauses: [
        '8.1 LaDespani is not liable for cancellations or changes due to events beyond our control, such as natural disasters, strikes, or other unforeseen events.',
      ],
    },
    {
      title: '9. Privacy and Data Protection',
      clauses: [
        '9.1 We collect and process guest information (such as name, contact details, booking information, and payment details) for the purpose of managing reservations, providing services, and complying with legal obligations.',
        '9.2 The legal bases for processing are contract performance, compliance with legal obligations, and, where applicable, guest consent (for example, for marketing communications).',
        '9.3 Guest information is stored securely and will not be shared with third parties, except with service providers involved in processing bookings (such as payment processors, booking platforms, or accountants) or where required by law.',
        '9.4 Guests have the right to access, correct, or request deletion of their personal data, as well as other rights under GDPR. For details, please see our Privacy Policy or contact us at anudani241@hotmail.com.',
      ],
    },
    {
      title: '10. Complaints and Dispute Resolution',
      clauses: [
        '10.1 Any complaints should be made in writing to anudani241@hotmail.com.',
        '10.2 Disputes will be handled in accordance with the applicable laws of Romania.',
      ],
    },
    {
      title: '11. Governing Law',
      clauses: ['11.1 These Terms and Conditions are governed by the laws of Romania.'],
    },
  ],
};

export const TERMS: Record<Lang, TermsCopy> = { ro, en };
