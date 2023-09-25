import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './EditDetails.css';

function EditDetails({ closeModal, userInfo }){
    const previousCity = userInfo.city;
    const previousStatus = userInfo.status;
    // const [city, setCity] = useState(userInfo.city);
    const [status, setStatus] = useState(userInfo.status);
    const [showOptions, setShowOptions] = useState(false);
    const dispatch = useDispatch();
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
    }, []);

    const close = () => {
        userInfo.city = previousCity;
        userInfo.status = previousStatus;
        closeModal(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (originCity.current.value === '') {
            userInfo.city = previousCity;
        } else {
            userInfo.city = originCity.current.value;
        }
        
        userInfo.status = status;
        // console.log(userInfo, 'userInfo');
        dispatch(updateUser(userInfo));
        closeModal(false);
    };

    const changeStatusToSingle = () => {
        setStatus('Single');
        setShowOptions(false);
    };

    const changeStatusToRelationship = () => {
        setStatus('Relationship');
        setShowOptions(false);
    };

    const changeStatusToDivorced = () => {
        setStatus('Divorced');
        setShowOptions(false);
    };

    const changeStatusToMarried = () => {
        setStatus('Married');
        setShowOptions(false);
    };

    const changeStatusToSeparated = () => {
        setStatus('Separated');
        setShowOptions(false);
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
                <div className='dropdown-options-details' >
                    <button id='button-dropdown-details'
                        onClick={openOptions}
                    >
                        {status === "" ? <label id='label-options-details'> Select an option
                            <i className="fa-solid fa-caret-down" id='arrow-drop-details'></i>
                        </label> : status}
                    </button>
                    {showOptions && (
                        <div className='dropdown-content-details'>
                            <button id='button-single' onClick={changeStatusToSingle}>Single</button>
                            <button id='button-relationship' onClick={changeStatusToRelationship}>In a relationship</button>
                            <button id='button-married' onClick={changeStatusToMarried}>Married</button>
                            <button id='button-divorced' onClick={changeStatusToDivorced}>Divorced</button>
                            <button id='button-separated' onClick={changeStatusToSeparated}>Separated</button>
                        </div>
                    )}
                </div>
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
                        // disabled={!status || userInfo.city !== previousCity}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
};

export default EditDetails;