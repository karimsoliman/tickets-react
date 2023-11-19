import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch('/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({phoneNumber: phoneNumber, governorate: governorate, city: city, district: district})
        });
        if (response.ok) {
            navigate('/');
        }
    };

    return (
        <main className="d-flex justify-content-center text-center">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Add Ticket</h1>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="number" className="form-control" id="phone" placeholder="Phone number" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="governorate">Governorate</label>
                    <select className="custom-select d-block w-100" id="governorate" required value={governorate} onChange={e => setGovernorate(e.target.value)}>
                        <option value="">Choose...</option>
                        <option>Alex</option>
                        <option>Aswan</option>
                        <option>Cairo</option>
                        <option>Giza</option> 
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select className="custom-select d-block w-100" id="city" required value={city} onChange={e => setCity(e.target.value)}>
                        <option value="">Choose...</option>
                        <option>Alex</option>
                        <option>Aswan</option>
                        <option>Cairo</option>
                        <option>Giza</option> 
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="district">District</label>
                    <select className="custom-select d-block w-100" id="district" required value={district} onChange={e => setDistrict(e.target.value)}>
                        <option value="">Choose...</option>
                        <option>Abdeen</option>
                        <option>6 October</option>
                        <option>Agouza</option>
                        <option>Shorouk</option> 
                    </select>
                </div>
                <button className="btn btn-primary py-2" style={{ marginTop: '10px' }} type="submit">Submit</button>
            </form>
        </main>
    );
};

export default AddProduct;
