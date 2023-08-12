import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import Modal from '../Modal/Modal';
import SignupForm from './SignupForm';
import './LoginForm.css';

function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    const changeButton = (e) => {
        e.preventDefault();
        const passwordField = document.getElementById('password-field-login');
        if(passwordField.type === 'password') {
            passwordField.type = 'text';
        } else if(passwordField.type === 'text') passwordField.type = 'password';
    }

    return (
        <>
            {showModal && (
                <Modal closeModal={() => setShowModal(false)} component={<SignupForm />}/>
            )}
            <div id='container-login'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label id='login-title'>Log In</label>
                    <div className='errors'>{errors?.email}</div>
                    <input type='text'
                        value={email}
                        onChange={update('email')}
                        placeholder='Email'
                        id='email-field-login'
                    />
                    <div className='errors'>{errors?.password}</div>
                    <div id='wrapper-pass-button'>
                        <input type='password'
                            value={password}
                            onChange={update('password')}
                            placeholder='Password'
                            id='password-field-login'
                        />
                        <button id='see-pass-button'
                            onClick={changeButton}
                        >
                            <i className="fa-solid fa-eye"></i>
                        </button>
                    </div>
                    <input type='submit'
                        value='Log In'
                        disabled={!email || !password}
                        id='login-button'
                    />
                </form>
                <div>
                    <label id='label-no-account'>
                        Don't have an account? 
                    </label>
                    <button id='signup-button-login'
                            onClick={() => setShowModal(prev => !prev)}
                    >Sign up</button>
                </div>
            </div>
        </>
    )
};

export default LoginForm;