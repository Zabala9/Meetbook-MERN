import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import image from '../../assets/logo.jpg';
import './NavBar.css';

function NavBar () {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        let path = '/';
        history.push(path);
    };

    return (
        <div className='container-navbar'>
            <div id='container-right-side-nav'>
                <Link id='link-main' to='/'>
                    <img src={image} alt='' id='img-main'/>
                </Link>
                <Link id='link-profile' to='/profile'>
                    Profile
                </Link>
            </div>
            <div id='container-left-side-nav'>
                <button id='user-button'>
                    <img src={user.profileImageUrl} alt='' id='profile-img'/>
                </button>
                <button id='logout-button'
                    onClick={logoutUser}
                >
                    Log out
                </button>
            </div>
        </div>
    )
};

export default NavBar;