import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DataDisplay = () => {
    const location = useLocation();
    const formDataOne = location.state ? location.state.formDataOne : null;
    const familyMembersSecond = location.state ? location.state.familyMembersSecond : null;

    return (
        <div style={{overflow:'hidden'}}>
            <div className='container mt-4 overflow-hidden'>
                <h3 className='text-center mt-3 mb-3'>Form Data</h3>
            </div>

            {formDataOne && (
                <>
                    <div className='container'>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">SN.</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col container">Email</th>
                                    <th scope="col">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td style={{ whiteSpace: 'nowrap' }}>{formDataOne.firstName} {formDataOne.lastName}</td>
                                    <td style={{ paddingRight: '10px' }}>{formDataOne.email}</td>
                                    <td>{formDataOne.phone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <div className='container mt-4 overflow-hidden'>
                <h3 className='text-center mt-3 mb-3'>Family Members</h3>
            </div>
            <div className='container'>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">SN.</th>
                            <th scope="col">Father Name</th>
                            <th scope="col container">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {familyMembersSecond && familyMembersSecond.map((member, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td style={{ whiteSpace: 'nowrap' }}>{member.name}</td>
                                <td style={{ paddingRight: '10px' }}>{member.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to='/' style={{textDecoration:'none'}}>
                <div className="row justify-content-center align-items-center mt-4">
                    <button type="button" className='mt-1 btn btn-success m-2' >Back to Home</button>

                </div>
            </Link>


        </div>
    );
};

export default DataDisplay;
