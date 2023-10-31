import { Link } from 'react-router-dom';
import './LeftSideFeed.css';

function LeftSideFeed({ user }){
    return (
        <div className='left-feed'>
            <Link id='button-profile' to="/profile">
                <img src={user.profileImageUrl} alt='' id='img-button-profile' />
                <label id='label-link-profile'>{user.name + ' ' + user.lastname}</label>
            </Link>
            {/* <button>Friends</button> */}
            <Link id="button-saved" to='/saved'>
                <i className="fa-solid fa-bookmark" id='img-button-saved'></i>
                <label id='label-link-saved'>Saved</label>
            </Link>
            <Link id="button-groups" to="/groups">
                <i className="fa-solid fa-people-group" id='img-button-groups'></i>
                <label id='label-link-groups'>Groups</label>
            </Link>
            <Link id="button-market" to='/market'>
                <i className="fa-solid fa-money-bill-trend-up" id='img-button-market'></i>
                <label id='label-link-market'>Market</label>
            </Link>
        </div>
    )
};

export default LeftSideFeed;