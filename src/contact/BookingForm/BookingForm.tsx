import React from 'react';
import './BookingForm.css';
import { useI18n } from '../../i18n/LanguageContext';

/**
 * Reservation requests go through ajuns.ro. Its widget script is loaded once
 * in index.html with data-button="none" and opens the request form in an
 * overlay when any element carrying data-ajuns-open is clicked, so the button
 * here keeps the site's own styling.
 */
const BookingForm: React.FC = () => {
    const { c } = useI18n();

    return (
        <div className="booking-form">
            <h3 className="booking-form__title">{c.form.title}</h3>
            <p className="booking-form__text">{c.form.text}</p>
            <button type="button" className="booking-form__button" data-ajuns-open>
                {c.form.submit}
            </button>
        </div>
    );
};

export default BookingForm;
