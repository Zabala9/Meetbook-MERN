import './Games.css';

function Games() {
    const currentUrl = window.location.pathname;

    if (currentUrl === '/games'){
        document.getElementById('img-home-button-nav').style.color = "#000000";
        document.getElementById('img-groups-button-nav').style.color = "#000000";
        document.getElementById('img-market-button-nav').style.color = "#000000";
        document.getElementById('img-games-button-nav').style.color = "#469663";
    }

    return (
        <label>Test</label>
    )
};

export default Games;