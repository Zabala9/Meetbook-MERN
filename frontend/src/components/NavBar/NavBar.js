import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import image from '../../assets/logo.jpg';
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
            <Link id='link-main' to='/'>
                <img src={image} alt='' />
            </Link>
            <Link id='link-profile' to='/profile'>
                Profile
            </Link>
            {/* <button id='logout-button'
                onClick={logoutUser}
            >
                Log out
            </button> */}
        </div>
    )
};

export default NavBar;