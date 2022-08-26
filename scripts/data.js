DATA = (()=>{
    const _CONTINENTS = { 	
        Africa: {
            Algeria: {colors: ["green", "white", "red"], abbreviation: "ALG"},
            Angola: {colors: ["red", "black", "yellow"], abbreviation: "ANG"},
            Benin: {colors: ["green", "yellow", "red"], abbreviation: "BEN"}
        },
        Asia: {
            Afghanistan: {colors: ["black", "red", "green"], abbreviation: "AFG"},
            Bahrain: {colors: ["white", "red", "red"], abbreviation: "BAR"}
        },
        Europe: {
            Albania: {colors: ["red", "red", "black"], abbreviation: "ALB"},
            Andorra: {colors: ["blue", "yellow", "red"], abbreviation: "AND"},
            Armenia: {colors: ["red", "blue", "yellow"], abbreviation: "ARM"},
            // ...
            England: {colors: ["white", "red", "blue"], abbreviation: "ENG"}
        }
    }
      
    const _LEAGUES = {
        Europe: {
            "Bundesliga": {"Bayern": {colors:["red", "white", "blue"], abbreviation: "FCB"}, "Borussia Dortmund": {colors: ["yellow", "yellow", "black"], abbreviation: "BVB"}},
            "English Premier League": {"Arsenal": {colors: ["red", "red", "white"], abbreviation: "ARS"} ,"Aston Villa FC": {colors: ["purple", "purple", "skyblue"], abbreviation: "AVL"}, "Brentford": {colors:["red", "red", "white"], abbreviation: "BFD"},"Brighton & Hove Albion":{colors:["blue", "blue", "white"], abbreviation: "BRI"}, "Burnley FC":{colors:["purple", "purple", "skyblue"], abbreviation: "BLY"}, "Chelsea":{colors:["blue", "blue", "white"], abbreviation: "CHE"}, "Crystal Palace":{colors:["blue", "blue", "red"], abbreviation: "CPL"}},
            // "Eredivise": "",
            // "Greek Super League": "",
            "La Liga": {"Real Madrid": {colors:["white", "white", "black"], abbreviation: "RMD"}, "Barcelona": {colors: ["red", "blue", "golden"], abbreviation: "FCB"}},
            // "Ligue 1": "",
            // "Primeira Liga": "",
            // "Russian Premier League": "",
            // "Serie A": "",
            // "Turkish Super League": "",
            // "Ukranian Premier League": ""
        },
        Africa: {
            "Egyptian Premier League": {"Al Ahly": {colors:["255, 0, 0", "255, 255, 255", "0, 0, 0"], abbreviation: "AHL"}, "Pyramids FC": {colors: ["0, 0, 255", "100, 100, 255", "255, 255, 255"], abbreviation: "PYR"}}
        },
        Asia: {
            "J1 League": {"Cerezo Osaka": {colors:["pink", "pink", "purple"], abbreviation: "CZO"}, "FC Tokyo": {colors: ["0, 0, 255", "0, 0, 255", "255, 0, 0"], abbreviation: "TKY"}},
        }
    }
      
    function getContinents(){
        return Object.keys(_CONTINENTS);
    }
       function getCountries(continent){
            console.log(continent);
            return Object.keys(_CONTINENTS[continent])
    }
    function getCountryInfo(continent, country){
        const abbreviation = _CONTINENTS[continent][country]["abbreviation"];
        const colors = _CONTINENTS[continent][country]["colors"];
        return {abbreviation, colors};
    }
    function getLeagues(continent){
        return Object.keys(_LEAGUES[continent]);
    }
    function getClubs(continent, league){
        return Object.keys(_LEAGUES[continent][league]);
    }
    function getClubInfo(continent, league, club){
        const abbreviation = _LEAGUES[continent][league][club]["abbreviation"];
        const colors = _LEAGUES[continent][league][club]["colors"];
        return {abbreviation, colors};
    }
    return {getContinents, getCountries, getCountryInfo, getLeagues, getClubs, getClubInfo};
})();