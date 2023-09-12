import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './EditDetails.css';

function EditDetails({ closeModal, userInfo }){
    const previousCity = userInfo.city;
    const previousStatus = userInfo.status;
    const [city, setCity] = useState(userInfo.city);
    const [status, setStatus] = useState(userInfo.status);
    const body = document.body;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

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

    if(!isLoaded) return undefined; // loading?

    return (
        <div className='container-edit-details'>
            <div className='top-edit-details'>
                <label id='label-edit-bio'>Edit Details</label>
                <button id='close-edit-details' onClick={close}>
                    <i className="fa-solid fa-xmark" id='img-close-edit-details'></i>
                </button>
            </div>
            <button id='divider-edit-details'></button>
            <div className='bottom-edit-details'>
                <Autocomplete>
                    <input type='text'
                        id='city-edit-details'
                    />
                </Autocomplete>
            </div>
        </div>
    )
};

export default EditDetails;