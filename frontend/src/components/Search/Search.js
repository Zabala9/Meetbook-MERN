import './Search.css';

function Search({ usersSearch }){
    const maxUsersToShow = 4;

    // Determine the number of users to display (its selecting a number between max and length)
    const numUsersToDisplay = Math.min(maxUsersToShow, usersSearch.length);
    // Select the first users to display
    const displayedUsers = usersSearch.slice(0, numUsersToDisplay);

    console.log(displayedUsers, 'searchhhh');

    return (
        <div className='container-dropdown-search'>
            {displayedUsers.map((userSearch) => (
                <div className='container-each-search-rsl'>
                    <div className='left-side-search-rsl'>
                        <img src={userSearch.profileImageUrl} alt='' id='img-user-search-rsl' />
                    </div>
                    <div className='right-side-search-rsl'>
                        <label id='name-user-search-rsl'>{userSearch.name + " " + userSearch.lastname}</label>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Search;