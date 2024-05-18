import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate} from 'react-router-dom';

const SecondStep = () => {
    const [familyMembersSecond, setFamilyMembersSecond] = useState([{ name: '', age: '' }]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formDataOne, setFormDataOne] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const firstName = params.get('firstName');
        const lastName = params.get('lastName');
        const phone = params.get('phone');
        const email = params.get('email');
        setFormDataOne({ firstName, lastName, phone, email });
    }, []); 

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newMembers = [...familyMembersSecond];
        newMembers[index] = {
            ...newMembers[index],
            [name]: value
        };
        setFamilyMembersSecond(newMembers);
        clearError(index);
    };

    const clearError = (index) => {
        const newErrors = [...errors];
        newErrors[index] = '';
        setErrors(newErrors);
    };

    const addFamilyMember = () => {
        const newErrors = familyMembersSecond.map(member => {
            if (member.name.trim() === '' && member.age.trim() === '') {
                return 'Name and Age are required';
            } else if (member.name.trim() === '') {
                return 'Name is required';
            } else if (member.age.trim() === '') {
                return 'Age is required';
            } else {
                return '';
            }
        });

        const hasErrors = newErrors.some(error => error !== '');

        if (!hasErrors) {
            setFamilyMembersSecond([...familyMembersSecond, { name: '', age: '' }]);
            setErrors([...errors, '']);
        } else {
            setErrors(newErrors);
        }
    };

    const handleNext = () => {
        const newErrors = familyMembersSecond.map(member => {
            if (member.name.trim() === '' && member.age.trim() === '') {
                return 'Name and Age are required';
            } else if (member.name.trim() === '') {
                return 'Name is required';
            } else if (member.age.trim() === '') {
                return 'Age is required';
            } else {
                return '';
            }
        });
        setErrors(newErrors);
        const hasErrors = newErrors.some(error => error !== '');
        if (hasErrors) {
            return;
        }
        console.log('Received data from console:', formDataOne, familyMembersSecond);
        navigate('/displaydata', { state: { formDataOne: formDataOne, familyMembersSecond: familyMembersSecond } });
    };

    const removeFamilyMember = (index) => {
        const newMembers = [...familyMembersSecond];
        newMembers.splice(index, 1);
        setFamilyMembersSecond(newMembers);
        const newErrors = [...errors];
        newErrors.splice(index, 1);
        setErrors(newErrors);
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className='container mt-5 overflow-hidden'>
                <h1 className='text-center mt-3'>React Assignment</h1>
                <h3 className='text-center mt-3'>Second Step Family Info</h3>
            </div>

            {familyMembersSecond.map((member, index) => (
                <div key={index} className='container mt-1 overflow-hidden'>
                    <div className="row justify-content-center align-items-center mt-4 overflow-hidden">
                        <div className="col m-1">
                            <label>Father Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={member.name}
                                onChange={(event) => handleChange(index, event)}
                                name="name"
                                placeholder='Enter The Father Name'
                            />
                            {errors[index] && errors[index].includes('Name') && <div className="text-danger">{errors[index]}</div>}
                        </div>
                        <div className="col m-1">
                            <label>Age:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={member.age}
                                onChange={(event) => handleChange(index, event)}
                                name="age"
                                placeholder='Enter The Age'
                            />
                            {errors[index] && errors[index].includes('Age') && <div className="text-danger">{errors[index]}</div>}
                        </div>
                        {index > 0 && (
                            <div className='btn btn-danger mt-4' onClick={() => removeFamilyMember(index)}>
                                <DeleteIcon />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <div className="row justify-content-center align-items-center mt-4">
                <button type="button" className='mt-1 btn btn-success m-2' onClick={addFamilyMember}>Add More Family Member</button>
                <button type="button" className='mt-1 btn btn-primary m-2' onClick={handleNext}>Next Step</button>
            </div>

        </div>
    );
};

export default SecondStep;

