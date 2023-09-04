import './Games.css';

function Games() {
    const currentUrl = window.location.pathname;

    if (currentUrl === '/games'){
        const buttonHome = document.getElementById('img-home-button-nav');
        if (buttonHome) buttonHome.style.color = "#000000";
        const buttonGroup = document.getElementById('img-groups-button-nav');
        if (buttonGroup) buttonGroup.style.color = "#000000";
        const buttonMarket = document.getElementById('img-market-button-nav');
        if (buttonMarket) buttonMarket.style.color = "#000000";
        const buttonGames = document.getElementById('img-games-button-nav');
        if (buttonGames) buttonGames.style.color = "#469663";
    }

    return (
        <label>Test</label>
    )
};

export default Games;