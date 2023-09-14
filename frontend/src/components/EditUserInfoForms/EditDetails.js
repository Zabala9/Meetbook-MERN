import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './EditDetails.css';

function EditDetails({ closeModal, userInfo }){
    const previousCity = userInfo.city;
    const previousStatus = userInfo.status;
    const [city, setCity] = useState(userInfo.city);
    const [status, setStatus] = useState(userInfo.status);
    const [showOptions, setShowOptions] = useState(false);
    const body = document.body;

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originCity = useRef();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const openOptions = () => {
        if(showOptions){
            setShowOptions(false);
        } else {
            setShowOptions(true);
        }
    };

    useEffect(() => {
        body.style.overflow = 'hidden';
    });

    const close = () => {
        userInfo.city = previousCity;
        userInfo.status = previousStatus;
        closeModal(false);
    };

    // const updateStatus = e => setStatus(e.currentTarget.value);

    const handleSubmit = e => {
        e.preventDefault();
        userInfo.city = originCity.current.value;
        userInfo.status = status;
        // dispatch
        closeModal(false);
    };

    if(!isLoaded) return undefined;

    return (
        <div className='container-edit-details'>
            <div className='top-edit-details'>
                <label id='label-edit-details'>Edit Details</label>
                <button id='close-edit-details' onClick={close}>
                    <i className="fa-solid fa-xmark" id='img-close-edit-details'></i>
                </button>
            </div>
            <button id='divider-edit-details'></button>
            <div className='bottom-edit-details'>
                <Autocomplete>
                    <input type='text'
                        ref={originCity}
                        id='field-city-edit-details'
                        required
                    />
                </Autocomplete>
                <div className='dropdown-options-details' style={{ textAlign: 'left'}}>
                    <button id='button-dropdown-details'
                        onClick={openOptions}
                    >
                        {status === "" ? <label id='label-options-details'> Select an option
                            <i className="fa-solid fa-caret-down" id='arrow-drop-details'></i>
                        </label> : status}
                    </button>
                </div>
                {showOptions && (
                    <div className='dropdown-content-details'>
                        <button id='button-single'>Single</button>
                        <button id='button-relationship'>In a relationship</button>
                        <button id='button-married'>Married</button>
                        <button id='button-divorced'>Divorced</button>
                        <button id='button-separated'>Separated</button>
                    </div>
                )}
                {/* <input type='text'
                    value={status}
                    onChange={updateStatus}
                    id='field-status-edit-details'
                    placeholder={status === '' ? 'Select option' : undefined}
                    required
                /> */}
                <div className='container-buttons-edit-details'>
                    <button id='button-cancel-edit-details'
                        onClick={close}
                    >
                        Cancel
                    </button>
                    <button id='button-save-edit-details'
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
};

export default EditDetails;