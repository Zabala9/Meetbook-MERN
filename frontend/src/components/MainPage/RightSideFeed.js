import './RightSideFeed.css';

function RightSideFeed(){
    
    return (
        <div className='right-feed' style={{overflowY: 'auto'}}>
            <div className='container-pages'>
                <label id='label-your-pages'>Your pages</label>
                <button id='divider-pages-feed-right'></button>
            </div>
            <div className='container-friends-request'>
                <label id='label-friend-request'>Friend request</label>
                <button id='divider-request-feed-right'></button>
            </div>
            <div className='container-events'>
                <label id='label-events'>Events</label>
                <button id='divider-events-feed-right'></button>
            </div>
            <div className='container-contacts'>
                <label id='label-contacts'>Contacts</label>
                {/* <button id='divider-contacts-feed-right'></button> */}
            </div>
        </div>
    )
};

export default RightSideFeed;