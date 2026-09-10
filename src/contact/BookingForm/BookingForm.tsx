import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import './BookingForm.css';
import TermsModal from '../TermsModal/TermsModal.tsx';
import { useI18n } from '../../i18n/LanguageContext';

type FormValues = {
    name: string;
    checkinDate: string;
    checkoutDate: string;
    adults: number;
    kids: number;
    phone: string;
    email: string;
    description: string;
    terms: boolean;
};

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const BookingForm: React.FC = () => {
    const { c } = useI18n();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [status, setStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY || '';
    if (!siteKey) {
        console.warn('VITE_CAPTCHA_SITE_KEY is not set. reCAPTCHA will not render.');
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const userID = import.meta.env.VITE_EMAILJS_USER_ID;
        const confirmationTemplateID = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;

        if (!serviceID || !templateID || !userID) {
            console.error('EmailJS environment variables are not set');
            setErrorMessage(c.form.serviceUnavailable);
            setStatus('error');
            return;
        }

        if (!captchaToken) {
            setErrorMessage(c.form.captchaRequired);
            setStatus('error');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        const emailData = { ...data, 'g-recaptcha-response': captchaToken };

        try {
            // Booking request to the guesthouse.
            await emailjs.send(serviceID, templateID, emailData, userID);

            // Confirmation email back to the guest. Their booking already went
            // through, so a failure here should not surface as an error.
            let confirmationSent = false;
            if (confirmationTemplateID) {
                try {
                    await emailjs.send(serviceID, confirmationTemplateID, emailData, userID);
                    confirmationSent = true;
                } catch (confirmationError) {
                    console.error('Error sending confirmation email:', confirmationError);
                }
            }

            setConfirmationEmail(confirmationSent ? data.email : '');
            setStatus('success');
            reset();
            setCaptchaToken(null);
            recaptchaRef.current?.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage(c.form.sendError);
            setStatus('error');
            setCaptchaToken(null);
            recaptchaRef.current?.reset();
        }
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
        if (token && status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const openTermsModal = () => setTermsModalOpen(true);
    const closeTermsModal = () => setTermsModalOpen(false);

    if (status === 'success') {
        return (
            <div className="booking-confirmation" role="status">
                <div className="booking-confirmation__icon" aria-hidden="true">
                    <svg viewBox="0 0 52 52">
                        <circle className="booking-confirmation__circle" cx="26" cy="26" r="24" fill="none" />
                        <path className="booking-confirmation__check" fill="none" d="M14 27l8 8 16-17" />
                    </svg>
                </div>
                <h3 className="booking-confirmation__title">{c.form.successTitle}</h3>
                <p className="booking-confirmation__text">{c.form.successText}</p>
                {confirmationEmail && (
                    <p className="booking-confirmation__text">
                        {c.form.confirmationPrefix}<b>{confirmationEmail}</b>{c.form.confirmationSuffix}
                    </p>
                )}
                <button
                    type="button"
                    className="booking-confirmation__button"
                    onClick={() => setStatus('idle')}
                >
                    {c.form.sendAnother}
                </button>
            </div>
        );
    }

    return (
        <>
            <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.name}</label>
                    <input type="text" className="booking-form__input" {...register('name', { required: true })} placeholder={c.form.namePh} />
                    {errors.name && <p className="booking-form__error">{c.form.errName}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.checkin}</label>
                    <input type="date" className="booking-form__input" {...register('checkinDate', { required: true })} />
                    {errors.checkinDate && <p className="booking-form__error">{c.form.errCheckin}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.checkout}</label>
                    <input type="date" className="booking-form__input" {...register('checkoutDate', { required: true })} />
                    {errors.checkoutDate && <p className="booking-form__error">{c.form.errCheckout}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.adults}</label>
                    <input type="number" className="booking-form__input" {...register('adults', { required: true, min: 1 })} placeholder={c.form.adultsPh} />
                    {errors.adults && <p className="booking-form__error">{c.form.errAdults}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.kids}</label>
                    <input type="number" className="booking-form__input" {...register('kids', { required: true, min: 0 })} placeholder={c.form.kidsPh} />
                    {errors.kids && <p className="booking-form__error">{c.form.errKids}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.phone}</label>
                    <input type="tel" className="booking-form__input" {...register('phone', { required: true, pattern: /^\+?\d{10,15}$/ })} placeholder={c.form.phonePh} />
                    {errors.phone && <p className="booking-form__error">{c.form.errPhone}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.email}</label>
                    <input type="email" className="booking-form__input" {...register('email', { required: true })} placeholder={c.form.emailPh} />
                    {errors.email && <p className="booking-form__error">{c.form.errEmail}</p>}
                </div>
                <div className="booking-form__field">
                    <label className="booking-form__label">{c.form.description}</label>
                    <textarea className="booking-form__textarea" {...register('description')} placeholder={c.form.descriptionPh} />
                </div>
                <div>
                    <input id="booking-terms" type="checkbox" className="booking-form__checkbox" {...register('terms', { required: true })} />
                    {/* The trigger sits outside the label so clicking it opens the
                        terms instead of toggling the checkbox. */}
                    <label className="booking-form__terms" htmlFor="booking-terms">{c.form.agreePrefix}</label>
                    <button type="button" className="terms as-link" onClick={openTermsModal}>{c.form.termsLink}</button>
                    {errors.terms && <p className="booking-form__error">{c.form.errTerms}</p>}
                </div>

                <div className="captcha-container">
                    {siteKey ? (
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={siteKey}
                            onChange={handleCaptchaChange}
                        />
                    ) : (
                        <div className="booking-form__error" role="alert">
                            {c.form.captchaUnavailable}
                        </div>
                    )}
                </div>

                {status === 'error' && errorMessage && (
                    <div className="booking-form__alert" role="alert">
                        {errorMessage}
                    </div>
                )}

                <button type="submit" className="booking-form__button" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                        <>
                            <span className="booking-form__spinner" aria-hidden="true"></span>
                            {c.form.sending}
                        </>
                    ) : (
                        c.form.submit
                    )}
                </button>
            </form>

            <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
        </>
    );
};

export default BookingForm;
