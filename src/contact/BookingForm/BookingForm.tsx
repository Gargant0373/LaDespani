import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './BookingForm.css';
import '../TermsModal/TermsModal.tsx';
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

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            response.ok
                ? alert('Booking request sent successfully!')
                : alert('There was a problem sending your request.');
        } catch (error) {
            console.error('Error sending email:', error);
        }
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

            <button type="submit" className="booking-form__button">Submit</button>
        </form>

        <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
        </>
    );
};

export default BookingForm;
