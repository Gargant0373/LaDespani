import React from 'react';
import './TermsModal.css';
import { useI18n } from '../../i18n/LanguageContext';
import { TERMS } from '../../i18n/legal';

type TermsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    const { lang } = useI18n();
    if (!isOpen) return null;

    const terms = TERMS[lang];

    return (
        <div className="terms-modal" role="dialog" aria-modal="true" aria-label={terms.title}>
            <div className="terms-modal__content">
                <h2>{terms.title}</h2>
                {terms.sections.map((section) => (
                    <div key={section.title}>
                        <h3>{section.title}</h3>
                        {section.clauses.map((clause, idx) => (
                            <p key={idx}>{clause}</p>
                        ))}
                    </div>
                ))}
                <button className="terms-modal__close" onClick={onClose}>{terms.close}</button>
            </div>
        </div>
    );
};

export default TermsModal;
