import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css';

function NavBar () {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        let path = '/';
        history.push(path);
    };

    return (
        <div className='container-navbar'>
            <button id='logout-button'
                onClick={logoutUser}
            >
                Log out
            </button>
        </div>
    )
};

export default NavBar;