import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import './BookingForm.css';
import TermsModal from '../TermsModal/TermsModal.tsx';

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

const BookingForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY || '';

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const userID = import.meta.env.VITE_EMAILJS_USER_ID;

        if (!serviceID || !templateID || !userID) {
            console.error('EmailJS environment variables are not set');
            alert('Email service is currently unavailable. Please try again later.');
            return;
        }

        if (!captchaToken) {
            alert('Please complete the reCAPTCHA.');
            return;
        }

        const emailData = { ...data, 'g-recaptcha-response': captchaToken };

        emailjs.send(serviceID, templateID, emailData, userID)
            .then(() => {
                alert('Booking request sent successfully!');
                setCaptchaToken(null);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('There was a problem sending your request.');
            });
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const openTermsModal = () => setTermsModalOpen(true);
    const closeTermsModal = () => setTermsModalOpen(false);

    return (
        <>
            <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="booking-form__label">Name</label>
                    <input type="text" className="booking-form__input" {...register('name', { required: true })} placeholder="Enter your name" />
                    {errors.name && <p className="booking-form__error">Name is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Check-in Date</label>
                    <input type="date" className="booking-form__input" {...register('checkinDate', { required: true })} />
                    {errors.checkinDate && <p className="booking-form__error">Check-in date is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Check-out Date</label>
                    <input type="date" className="booking-form__input" {...register('checkoutDate', { required: true })} />
                    {errors.checkoutDate && <p className="booking-form__error">Check-out date is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Number of Adults</label>
                    <input type="number" className="booking-form__input" {...register('adults', { required: true, min: 1 })} placeholder="Enter number of adults" />
                    {errors.adults && <p className="booking-form__error">At least 1 adult is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Number of Kids</label>
                    <input type="number" className="booking-form__input" {...register('kids', { required: true, min: 0 })} placeholder="Enter number of kids" />
                    {errors.kids && <p className="booking-form__error">Number of kids is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Phone Number</label>
                    <input type="tel" className="booking-form__input" {...register('phone', { required: true, pattern: /^\+?\d{10,15}$/ })} placeholder="Enter your phone number" />
                    {errors.phone && <p className="booking-form__error">Valid phone number is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Email</label>
                    <input type="email" className="booking-form__input" {...register('email', { required: true })} placeholder="Enter your email" />
                    {errors.email && <p className="booking-form__error">Email is required</p>}
                </div>
                <div>
                    <label className="booking-form__label">Description</label>
                    <textarea className="booking-form__textarea" {...register('description')} placeholder="Additional information" />
                </div>
                <div>
                    <input type="checkbox" className="booking-form__checkbox" {...register('terms', { required: true })} />
                    <label className="booking-form__terms">
                        I agree to the <a className='terms' onClick={openTermsModal}>terms and conditions</a>
                    </label>
                    {errors.terms && <p className="booking-form__error">You must agree to the terms and conditions</p>}
                </div>

                <div className="captcha-container">
                    <ReCAPTCHA
                        sitekey={siteKey}
                        onChange={handleCaptchaChange}
                    />
                </div>

                <button type="submit" className="booking-form__button">Submit</button>
            </form>

            <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
        </>
    );
};

export default BookingForm;
