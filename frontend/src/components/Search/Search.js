import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNotification } from '../../store/notifications';
import './Search.css';

function Search({ usersSearch, closeSearch, searchText }){
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user._id);
    const maxUsersToShow = 4;
    const description = " has saw your profile.";

    // Determine the number of users to display (its selecting a number between max and length)
    const numUsersToDisplay = Math.min(maxUsersToShow, usersSearch.length);
    // Select the first users to display
    const displayedUsers = usersSearch.slice(0, numUsersToDisplay);

    const goToProfileSearch = (_id) => {
        closeSearch(false);
        if(_id === currentUserId){
            let path = '/profile';
            history.push(path);
        } else{
            let path = `/profile/${_id}`;
            history.push(path);
        }
    };

    const goToSearchComplete = () => {
        closeSearch(false);
        let path = `/search`;
        history.push(path);
    };

    return (
        <div className='container-dropdown-search'>
            {displayedUsers.map((userSearch) => (
                <div className='container-each-search-rsl' onClick={() => goToProfileSearch(userSearch._id)}>
                    <div className='left-side-search-rsl'>
                        <img src={userSearch.profileImageUrl} alt='' id='img-user-search-rsl' />
                    </div>
                    <div className='right-side-search-rsl'>
                        <label id='name-user-search-rsl'>{userSearch.name + " " + userSearch.lastname}</label>
                    </div>
                </div>
            ))}
            <button id='button-all-search' onClick={goToSearchComplete}>
                <i className="fa-solid fa-magnifying-glass" id='img-search-all-rsl'></i>
                <label id='label-search-for'>Search for <label>{searchText}</label> </label>
            </button>
        </div>
    )
};

export default Search;