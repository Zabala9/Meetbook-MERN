import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CompleteSearch.css';

function CompleteSearch(){
    const history = useHistory();
    const currentUserId = useSelector(state => state.session.user._id);
    const usersSearch = useSelector(state => state.search.all);

    const goToProfileSearch = (_id) => {
        if(_id === currentUserId){
            let path = '/profile';
            history.push(path);
        } else{
            let path = `/profile/${_id}`;
            history.push(path);
        }
    };

    return(
        <div className='container-complete-search'>
            <label id='label-search-result'>Search Result</label>
            <button id='divider-search-result'></button>
            {usersSearch.map((userSearch) => (
                <div className='container-each-complete-search'>
                    <div className='left-side-complete-search'>
                        <img src={userSearch.profileImageUrl} alt='' id='img-user-complete-search' onClick={() => goToProfileSearch(userSearch._id)}/>
                    </div>
                    <div className='right-side-complete-search'>
                        <div className='inside-right-side-search'>
                            <label id='name-user-complete-search'
                                onClick={() => goToProfileSearch(userSearch._id)}
                            >
                                {userSearch.name + " " + userSearch.lastname}
                            </label>
                            <label id='city-user-complete-search'>{userSearch.city}</label>
                        </div>
                        <button id='button-add-friend-complete-search'>
                            <i className="fa-solid fa-user-plus" id='img-add-friend-complete-search'></i>
                            Add as a friend
                            {/* check if is a friend al ready and change the text */}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default CompleteSearch;