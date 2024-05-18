import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FirstForm = () => {
    const [formDataOne, setFormDataOne] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataOne({
            ...formDataOne,
            [name]: value
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        };

        if (formDataOne.firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
            valid = false;
        }

        if (formDataOne.lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }

        const phoneNumber = formDataOne.phone.trim();
        if (phoneNumber === '') {
            newErrors.phone = 'Please enter the number';
            valid = false;
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            newErrors.phone = 'Please enter a 10 digit number';
            valid = false;
        }

        if (!formDataOne.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully', formDataOne);
            const queryString = `?firstName=${formDataOne.firstName}&lastName=${formDataOne.lastName}&phone=${formDataOne.phone}&email=${formDataOne.email}`;
            history(`/secondstep${queryString}`);
        } else {
            console.log('Form has validation errors');
        }
    };

    return (
        <div>
            <div className='container mt-5'>
                <Link to='/apitask' style={{textDecoration:'none'}}>
                    <div className="row justify-content-center align-items-center mt-4">
                        <button className="mt-4 btn bg-info" style={{ color: 'white' }}> You Second Task</button>
                    </div>
                </Link>

                <h1 className='text-center mt-3'>React Assignment</h1>
                <h3 className='text-center mt-3'>Form First Step</h3>
            </div>

            <div className='container mt-5'>
                <div className="row justify-content-center align-items-center mt-4">
                    <div className="col m-2">
                        <label htmlFor="firstName">Enter the First name</label>
                        <input type="text" className="form-control" name="firstName" value={formDataOne.firstName} onChange={handleChange} placeholder="First name" />
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>
                    <div className="col m-2">
                        <label htmlFor="lastName">Enter the Last name</label>
                        <input type="text" className="form-control" name="lastName" value={formDataOne.lastName} onChange={handleChange} placeholder="Last name" />
                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mt-4">
                    <div className="col m-2">
                        <label htmlFor="phone">Enter the Phone</label>
                        <input type="tel" className="form-control" name="phone" value={formDataOne.phone} onChange={handleChange} placeholder="Enter the Phone" />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                    <div className="col m-2">
                        <label htmlFor="email">Enter the Email</label>
                        <input type="email" className="form-control" name="email" value={formDataOne.email} onChange={handleChange} placeholder="Enter the Email" />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mt-4">
                    <button className="mt-4 btn btn-primary" onClick={handleSubmit}>Next Step</button>
                </div>
            </div>
        </div>
    );
};

export default FirstForm;
