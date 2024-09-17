import React from 'react';
import './TermsModal.css';

type TermsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const termsData = [
    {
        title: "1. General information",
        clauses: [
            "1.1 These Terms and Conditions govern the booking, stay, and use of services at LaDespani Guesthouse. By making a booking, guests agree to comply with these terms.",
            "1.2 LaDespani Guesthouse is located at Mihai Viteazul 128, Brasov, Romania.",
            "1.3 Contact details: +40772269013, anudani241@hotmail.com"
        ]
    },
    {
        title: "2. Booking and Payments",
        clauses: [
            "2.1 A reservation is only confirmed upon receipt of a booking confirmation email and, if applicable, the deposit payment.",
            "2.2 The deposit is non-refundable, except in circumstances outlined in section 5.",
            "2.3 The balance of the payment is due upon arrival unless stated otherwise.",
            "2.4 Payments can be made via cash."
        ]
    },
    {
        title: "3. Check-in and Check-out",
        clauses: [
            "3.1 Check-in is available from 15:00 to 22:00 on the day of arrival.",
            "3.2 Check-out must be completed between 08:00 and 11:00 on the day of departure.",
            "3.3 Early check-in or late check-out may be available upon request, subject to availability and additional charges."
        ]
    },
    {
        title: "4. Cancellation Policy",
        clauses: [
            "4.1 Guests may cancel free of charge until [Alex insert info] before arrival.",
            "4.2 Cancellations made after this period or no-shows will result in the loss of the deposit and/or full payment as per the booking policy."
        ]
    },
    {
        title: "5. Guest Responsibilities",
        clauses: [
            "5.1 Guests are expected to respect the property, furnishings, and surroundings.",
            "5.2 Damages or losses caused by guests will be charged at repair or replacement cost.",
            "5.3 LaDespani reserves the right to terminate the stay of guests causing a disturbance or engaging in inappropriate behavior, without refund."
        ]
    },
    {
        title: "6. Pets and Smoking Policy",
        clauses: [
            "6.1 Pets are not allowed at LaDespani Guesthouse.",
            "6.2 Smoking is strictly prohibited inside the guesthouse. Designated smoking areas are available outside the property."
        ]
    },
    {
        title: "7. Liability",
        clauses: [
            "7.1 LaDespani Guesthouse is not responsible for accidents, injuries, or losses of personal belongings.",
            "7.2 Guests are responsible for their own safety and the safety of minors or dependents traveling with them."
        ]
    },
    {
        title: "8. Force Majeure",
        clauses: [
            "8.1 LaDespani is not liable for cancellations or changes due to events beyond our control, such as natural disasters, strikes, or other unforeseen events."
        ]
    },
    {
        title: "9. Privacy Policy",
        clauses: [
            "9.1 All guest information collected during the booking process is handled in accordance with the applicable data protection laws. Information will not be shared with third parties without consent."
        ]
    },
    {
        title: "10. Complaints and Dispute Resolution",
        clauses: [
            "10.1 Any complaints should be made in writing to anudani241@hotmail.com.",
            "10.2 Disputes will be handled in accordance with the applicable laws of Romania."
        ]
    },
    {
        title: "11. Governing Law",
        clauses: [
            "11.1 These Terms and Conditions are governed by the laws of Romania."
        ]
    }
];

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="terms-modal">
            <div className="terms-modal__content">
                <h2>Terms and Conditions</h2>
                {termsData.map((section, index) => (
                    <div key={index}>
                        <h3>{section.title}</h3>
                        {section.clauses.map((clause, idx) => (
                            <p key={idx}>{clause}</p>
                        ))}
                    </div>
                ))}
                <button className="terms-modal__close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TermsModal;
