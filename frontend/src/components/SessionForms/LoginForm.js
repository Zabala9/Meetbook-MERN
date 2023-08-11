import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import './LoginForm.css';

function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    return (
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
            <input type='password'
                value={password}
                onChange={update('password')}
                placeholder='Password'
                id='password-field-login'
            />
            <input type='submit'
                value='Log In'
                disabled={!email || !password}
                id='login-button'
            />
        </form>
    )
};

export default LoginForm;