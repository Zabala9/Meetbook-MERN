import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { fetchNotifications } from '../../store/notifications';
import { fetchSearch } from '../../store/search';
import image from '../../assets/logo.jpg';
import AllNotifications from '../Notifications/AllNotifications';
import Search from '../Search/Search';
import './NavBar.css';

function NavBar () {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const user = useSelector(state => state.session.user);
    const notifications = useSelector(state => Object.values(state.notifications.all));
    const usersSearch = useSelector(state => Object.values(state.search.all));

    const openMenu = () => {
        if(showMenu){
            setShowMenu(false);
        } else {
            setShowNotifications(false);
            setShowMenu(true);
        }
    };

    const openNotifications = () => {
        if(showNotifications){
            setShowNotifications(false);
        } else {
            setShowMenu(false);
            setShowNotifications(true);
        }
    };

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        let path = '/';
        history.push(path);
    };

    const updateSearch = e => setSearchText(e.currentTarget.value);

    useEffect(() => {
        const splitedSearch = searchText.split(' ');

        if(splitedSearch.length > 1){
            let searchData = {
                name: splitedSearch[0],
                lastname: splitedSearch[1]
            };
            dispatch(fetchSearch(searchData));
            setShowSearch(true);
        } else if (splitedSearch.length === 1 && splitedSearch[0] !== "") {
            let searchData = {
                name: splitedSearch[0],
                lastname: ''
            };
            dispatch(fetchSearch(searchData));
            setShowSearch(true);
        } else if(splitedSearch.length === 1 && splitedSearch[0] === ""){
            let searchData = {
                name: "999abbbs",
                lastname: "999abbbs"
            };
            dispatch(fetchSearch(searchData));
            setShowSearch(false);
        }
    }, [searchText]);

    useEffect(() => {
        dispatch(fetchNotifications(user._id));
    }, [showNotifications]);

    return (
        <div className='container-navbar'>
            <div className='left-side-nav'>
                <Link id='link-main' to='/'>
                    <img src={image} alt='' id='img-main'/>
                </Link>
                <div>
                    <i className="fa-solid fa-magnifying-glass" id='img-search-navbar'></i>
                    <input type='text'
                        id='input-search-navbar'
                        placeholder='Search Meetbook'
                        onChange={updateSearch}
                    />
                </div>
                {showSearch && (
                    <Search usersSearch={usersSearch} />
                )}
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
                <div className='dropdown-notifications-navbar'>
                    <button id='button-notifications-navbar' onClick={openNotifications}>
                        <i className="fa-solid fa-bell" id='img-notifications-navbar'></i>
                    </button>
                </div>
                { showNotifications && (
                    <div className='container-dropdown-notifications'>
                        <AllNotifications notifications={notifications} closeNotification={setShowNotifications} />
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