import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import image from '../../assets/logo.jpg';
import './NavBar.css';

function NavBar () {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(state => state.session.user);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        let path = '/';
        history.push(path);
    };

    return (
        <div className='container-navbar'>
            <div id='left-side-nav'>
                <Link id='link-main' to='/'>
                    <img src={image} alt='' id='img-main'/>
                </Link>
            </div>
            <div id='right-side-nav'>
                <div id='dropdown-navbar' style={{ textAlign: 'right' }}>
                    <button id='button-dropdown' onClick={openMenu}>
                        <img src={user.profileImageUrl} alt='' id='profile-img'/>
                        <i className="fa-solid fa-caret-down" id='arrow-drop'></i>
                    </button>
                </div>
                { showMenu && (
                    <div className='dropdown-content'>
                        <Link id='link-profile' to='/profile'>
                            Profile
                        </Link>
                        <Link to='/about' id='about-link'> About us
                            <i className="fa-regular fa-circle-question" id='about-link-img'></i>
                        </Link>
                        <button id='logout-button'
                            onClick={logoutUser}
                        > Log out
                            <i className="fa-solid fa-arrow-right-from-bracket" id='logout-img'></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default NavBar;