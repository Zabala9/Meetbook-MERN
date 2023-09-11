import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import './EditDetails.css';

function EditDetails({ closeModal, userInfo }){
    const previousCity = userInfo.city;
    const previousStatus = userInfo.status;
    const [city, setCity] = useState(userInfo.city);
    const [status, setStatus] = useState(userInfo.status);
    const body = document.body;

    useEffect(() => {
        body.style.overflow = 'hidden';
    });
    
    const close = () => {
        closeModal(false);
    };

    const updateCity = e => setCity(e.currentTarget.value);
    const updateStatus = e => setStatus(e.currentTarget.value);

    const handleSubmit = e => {
        e.preventDefault();
        userInfo.city = city;
        userInfo.status = status;
        // dispatch
        closeModal(false);
    };

    return (
        <div className='container-edit-details'>
            <label onClick={close}>Test</label>
        </div>
    )
};

export default EditDetails;