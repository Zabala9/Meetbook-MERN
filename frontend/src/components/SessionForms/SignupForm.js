import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import './SignupForm.css';

function SignupForm(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const city = "";
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = field => {
        let setState;

        switch (field) {
            case 'email':
                setState = setEmail;
                break;
            case 'name':
                setState = setName;
                break;
            case 'lastname':
                setState = setLastname;
                break;
            case 'birthdate':
                setState = setBirthdate;
                break;
            case 'phoneNumber':
                setState = setPhoneNumber;
                break;
            case 'password':
                setState = setPassword;
                break;
            case 'confirmPassword':
                setState = setConfirmPassword;
                break;
            default:
                throw Error('Unkown field in Signup');
        }

        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            name,
            lastname,
            email,
            phoneNumber,
            birthdate,
            city,
            password
        };

        dispatch(signup(user));
    }

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <label id='title-signup'>Sign up</label>
            <input type='text'
                value={name}
                onChange={update('name')}
                placeholder='Name'
                id='name-field-sign'
            />
            <input type='text'
                value={lastname}
                onChange={update('lastname')}
                placeholder='Lastname'
                id='lastname-field-sign'
            />
            <div className='errors'>{errors?.email}</div>
            <input type='text'
                value={email}
                onChange={update('email')}
                placeholder='Email'
                id='email-field-sign'
            />
            <input type='number'
                value={phoneNumber}
                onChange={update('phoneNumber')}
                placeholder='Phone number'
                id='number-field-sign'
            />
            <input type='date'
                value={birthdate}
                onChange={update('birthdate')}
                placeholder='Birthdate'
                id='birthdate-field-sign'
            />
            <div className='errors'>{errors?.password}</div>
            <input type='password'
                value={password}
                onChange={update('password')}
                placeholder='Password'
                id='password-field-sign'
            />
            <div className='errors'>
                {password !== confirmPassword && 'Confirm password field must match'}
            </div>
            <input type='password'
                value={confirmPassword}
                onChange={update('confirmPassword')}
                placeholder='Confirm Password'
                id='confirm-pass-field-sign'
            />
            <input type='submit'
                value="Sign up"
                id='button-signup'
                disabled={!email || !name || !lastname || !phoneNumber || !birthdate || password !== confirmPassword}
            />
        </form>
    )
};

export default SignupForm;