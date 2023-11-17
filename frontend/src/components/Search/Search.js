import './Search.css';

function Search({ usersSearch }){
    console.log(usersSearch, 'searchhhh');

    return (
        <div className='container-users-search'>
            { usersSearch.length > 0 ?
                <label>test</label>
                :
                <label>nothing</label>
            }
        </div>
    )
};

export default Search;