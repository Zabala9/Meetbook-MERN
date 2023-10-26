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
    const [showNotifications, setShowNotifications] = useState(false);
    const user = useSelector(state => state.session.user);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    const openNotifications = () => {
        if(showNotifications){
            setShowNotifications(false);
        } else { setShowNotifications(true); }
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

            <div className='middle-side-nav'>
                <Link id='link-home-nav' to='/'>
                    <i className="fa-solid fa-house" id='img-home-button-nav'></i>
                </Link>
                <Link id='link-groups-nav' to='/groups'>
                    <i className="fa-solid fa-people-group" id='img-groups-button-nav'></i>
                </Link>
                <Link id='link-market-nav' to='/market'>
                    <i className="fa-solid fa-money-bill-trend-up" id='img-market-button-nav'></i>
                </Link>
                <Link id='link-games-nav' to='/games'>
                    <i className="fa-solid fa-gamepad" id='img-games-button-nav'></i>
                </Link>
            </div>

            <div className='right-side-nav'>
                <div className='dropdown-notifications-navbar' style={{ textAlign: 'right' }}>
                    <button id='button-notifications-navbar' onClick={openNotifications}>
                        <i className="fa-solid fa-bell" id='img-notifications-navbar'></i>
                    </button>
                </div>
                { showNotifications && (
                    <div className='container-dropdown-notifications'>
                        <label>testttttttttttttttttttttt</label>
                        {/* ADD word-wrap: break-word; IN NOTIFICATION BOX*/}
                    </div>
                )}
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