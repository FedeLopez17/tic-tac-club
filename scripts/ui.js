const ui = (()=>{

    const _body = $("body");

    function _addNameInput(){
        const nameInput = document.createElement("input");
        helperFunctions.setAttributes(nameInput, ["id", "type","placeholder"], ["player-two-name", "text", "What's your name?"]);
        nameInput.autocomplete = "off";
        const opponentSelector = document.querySelector(".initial-settings .right > select");
        opponentSelector.nextElementSibling.before(nameInput);
    }
    
    function _makeInvalidMessage(message){
        const invalidMessage = document.createElement("p");
        invalidMessage.classList.add("invalid-message");
        invalidMessage.innerText = message;
        return invalidMessage;
    }

    function _addBotsName(){
        const nameInput = document.createElement("input");
        const BOT_NAMES = ["Botaldo", "Botaldinho", "Botssi", "Botzema", "Botandowski", "Botistuta", "Botti", "Bottenbauer"];
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        helperFunctions.setAttributes(nameInput, ["id", "type","value"], ["bot-name", "text", botName]);
        nameInput.disabled = true;
        const opponentSelector = $(".initial-settings .right > select");
        opponentSelector.nextElementSibling.before(nameInput);
    }

    function _addDifficultyToggle(){
        const difficultyToggle = document.createElement("button");
        helperFunctions.setAttributes(difficultyToggle, ["type", "class",], ["button", "difficulty-toggle"]);
        difficultyToggle.innerText = game.getDifficulty();
        difficultyToggle.addEventListener("click", _toggleDifficulty);
        const previousInput = $(".initial-settings .right > input");
        previousInput.nextElementSibling.before(difficultyToggle);
    }

    function _removeDifficultyToggle(){
        const difficultyToggle = $("button.difficulty-toggle");
        difficultyToggle.parentElement.removeChild(difficultyToggle);
    }

    function _toggleDifficulty(){
        if(game.soundActivated()) sounds.selectionOne.play();
        const difficultyToggle = $("button.difficulty-toggle");
        const currentDifficulty = difficultyToggle.innerText;
        game.setDifficulty((currentDifficulty === "EASY") ?  "NORMAL" : (currentDifficulty === "NORMAL") ? "HARD" : (currentDifficulty === "HARD") ? "UNBEATABLE" : "EASY");
        difficultyToggle.innerText = game.getDifficulty();
    }

    function _changeOpponent(e){
        const opponentContainer = $(".initial-settings .right");
        const previousInput = $(".initial-settings .right > input");
        opponentContainer.removeChild(previousInput);
        const isHumanPlayer = (e.target.value === "PLAYER TWO");
        if (isHumanPlayer) {
            _addNameInput();
            _removeDifficultyToggle();
        }
        else{
            _addBotsName();
            _addDifficultyToggle();
            const previousInvalidMessage = $(".right .invalid-name");
            if(previousInvalidMessage) previousInvalidMessage.parentElement.removeChild(previousInvalidMessage);
        }
        game.updateTeam(opponentContainer, null, null, null, null);
        _displaySelectTeamScreen(opponentContainer);
    }

    function _removePreviousSelector(container){
        const previousSelector = $(`.initial-settings .${container.getAttribute("class")} > [class*="selector"]`);
        if (previousSelector) {container.removeChild(previousSelector)};
    }

    function _removePreviousTeamChosenScreen(container){
        const previousTeamChosenScreen = $(`.initial-settings .${container.getAttribute("class")} > [class*="chosen"]`);
        if (previousTeamChosenScreen) {container.removeChild(previousTeamChosenScreen)};
    }

    function _toggleSound(e){
        if(!game.soundActivated()) sounds.selectionTwo.play();
        if(game.soundActivated()) {
            sounds.stadiumAtmosphere.pause();
            sounds.goal.pause();
            sounds.goal.currentTime = 0;
            sounds.tie.pause();
            sounds.tie.currentTime = 0;
        };
        if(!game.soundActivated() && $(".game-screen")) sounds.stadiumAtmosphere.play();
        game.toggleSound();
        e.target.classList.toggle("fa-volume-xmark");
        e.target.classList.toggle("fa-volume-high");
    }

    function _addVolumeToggle(parentElement){
        const volumeToggle = document.createElement("i");
        volumeToggle.classList.add("volume-toggle", "fa-solid", "fa-volume-xmark");
        volumeToggle.setAttribute("title", "Toggle volume");
        volumeToggle.addEventListener("click", _toggleSound);
        parentElement.appendChild(volumeToggle);
    }

    function _toggleMusic(e){
        if(game.soundActivated()) sounds.selectionTwo.play();
        if(sounds.music.paused){
            e.target.classList.toggle("music-on");
            sounds.music.play();
            sounds.displaySong();
            return;
        }
        e.target.classList.toggle("music-on");
        sounds.music.pause();
    }

    function _addMusicToggle(parentElement){
        const musicToggle = document.createElement("i");
        musicToggle.classList.add("music-toggle", "fa-solid", "fa-music");
        musicToggle.addEventListener("click", _toggleMusic);
        musicToggle.setAttribute("title", "Toggle music");
        parentElement.appendChild(musicToggle);
    }

    function displaySong(song){
        const songTitleContainer = document.createElement("section");
        songTitleContainer.classList.add("song-title-container");
        const songTitle = document.createElement("p");
        songTitle.classList.add("song-title");
        songTitle.innerText = song;
        songTitle.style.animation = "fade-in-and-out 8s forwards";
        songTitleContainer.appendChild(songTitle);
        _body.appendChild(songTitleContainer);
        setTimeout(()=>{_body.removeChild(songTitleContainer)}, 8000);
    }

    function _addReturnButton(container){
        const returnButton = document.createElement("i");
        returnButton.classList.add("return-button", "fa-solid", "fa-caret-left");
        returnButton.setAttribute("title", "Return");
        returnButton.addEventListener("click", ()=>{_goBack(container)});
        returnButton.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        container.appendChild(returnButton);
    }

    function _goBack(container){
        _removeLastRandom(container);
        const isContinentSelector = $(`.initial-settings .${container.getAttribute("class")} > .continent-selector`);
        const isNationalTeamsSelector = $(`.initial-settings .${container.getAttribute("class")} > .national-teams-selector`);
        const isNationalTeamChosen = $(`.initial-settings .${container.getAttribute("class")} > .national-team-chosen`);
        const isLeaguesSelector = $(`.initial-settings .${container.getAttribute("class")} > .leagues-selector`);
        const isClubsSelector = $(`.initial-settings .${container.getAttribute("class")} > .clubs-selector`);
        const isClubChosen = $(`.initial-settings .${container.getAttribute("class")} > .club-chosen`);
        if(isContinentSelector){
            _displayCategorySelector(container);
            const returnButton = $(`.initial-settings .${container.getAttribute("class")} > .return-button`);
            container.removeChild(returnButton);
        }
        if(isNationalTeamsSelector){
            _displayContinentSelector(container, "national-teams");
        }
        if(isNationalTeamChosen){
            const continent = isNationalTeamChosen.getAttribute("data-continent");
            _displayNationalTeamsSelector(container, continent)
        }
        if(isLeaguesSelector){
            _displayContinentSelector(container, "clubs")
        }
        if(isClubsSelector){
            const continent = isClubsSelector.getAttribute("data-continent");
            _displayLeaguesSelector(container, continent)
        }
        if(isClubChosen){
            const continent = isClubChosen.getAttribute("data-continent");
            const league = isClubChosen.getAttribute("data-league");
            _displayClubsSelector(container, continent, league);
        }
    }

    function _addLabel(){
        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container");
        const label = document.createElement("p");
        label.classList.add("label");
        labelContainer.appendChild(label);
        return labelContainer;
    }

    function _updateLabel(label, text){
        label.innerText = text;
    }

    function _removePreviousLabel(container){
        const labelContainer = $(`.initial-settings .${container.getAttribute("class")} > .label-container`);
        if(labelContainer){
            container.removeChild(labelContainer);
        }
    }

    function _addRandomButton(container){
        const randomButton = document.createElement("i");
        randomButton.classList.add("random-button", "fa-solid", "fa-dice", "fa-2x");
        randomButton.setAttribute("title", "Random selection");
        randomButton.addEventListener("click", ()=>_randomize(container));
        randomButton.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()});
        container.appendChild(randomButton);
    }

    let lastRandoms = {"left": null, "right": null};

    function _updateLastRandom(container, lastRandom){
        lastRandoms[container.getAttribute("class")] = lastRandom;
    }

    function _removeLastRandom(container){
        lastRandoms[container.getAttribute("class")] = null;
    }

    function _chooseRandomContinent(){
        const continents = DATA.getContinents();
        const continent = continents[Math.floor(Math.random() * continents.length)];
        return continent;
    }

    function _chooseRandomLeague(continent){
        const leagues = DATA.getLeagues(continent);
        const league = leagues[Math.floor(Math.random() * leagues.length)];
        return league;
    }

    function _chooseRandomNationalTeam(container, continent){
        const player = (container.getAttribute("class") === "left") ? "one" : "two";
        const currentTeams = {"one": game.getPlayer(1).team.name, "two": game.getPlayer(2).team.name};
        if(!continent){continent = _chooseRandomContinent()};
        const countries = DATA.getCountries(continent);
        let country;
        do{
            country = countries[Math.floor(Math.random() * countries.length)];
        } while(country === currentTeams[player]);
        const countryInfo = DATA.getCountryInfo(continent, country);
        const kebabCaseContinent = helperFunctions.toKebabCase(continent);
        const kebabCaseCountry = helperFunctions.toKebabCase(country);
        const imagePath = `./images/continents/${kebabCaseContinent}/national-teams/${kebabCaseCountry}.svg`;
        _displayNationalTeamChosen(container, country, countryInfo.abbreviation, imagePath, continent, countryInfo.colors);
    }

    function _chooseRandomClub(container, continent, league){
        const player = (container.getAttribute("class") === "left") ? "one" : "two";
        const currentTeams = {"one": game.getPlayer(1).team.name, "two": game.getPlayer(2).team.name};
        if(!continent){continent = _chooseRandomContinent()};
        if(!league){league = _chooseRandomLeague(continent)};
        const clubs = DATA.getClubs(continent, league);
        let club;
        do{
            club = clubs[Math.floor(Math.random() * clubs.length)];
        } while(club === currentTeams[player]);
        const clubInfo = DATA.getClubInfo(continent, league, club);
        const kebabCaseContinent = helperFunctions.toKebabCase(continent);
        const kebabCaseLeague = helperFunctions.toKebabCase(league);
        const kebabCaseClub = helperFunctions.toKebabCase(club);
        const imagePath = `./images/continents/${kebabCaseContinent}/leagues/${kebabCaseLeague}/clubs/${kebabCaseClub}.svg`;
        _displayClubChosen(container, club, clubInfo.abbreviation, imagePath, continent, league, clubInfo.colors);
    }

    function _chooseRandomNationalTeamOrClub(container){
        const category = ["clubs", "national-teams"][Math.floor(Math.random() * 2)];
        const isClubs = (category === "clubs") ? true : false;
        let lastRandom = ()=>{_chooseRandomNationalTeamOrClub(container)};
        _updateLastRandom(container, lastRandom);
        (isClubs) ? _chooseRandomClub(container) : _chooseRandomNationalTeam(container);
    }

    function _randomize(container){
        const isCategorySelector = $(`.initial-settings .${container.getAttribute("class")} > .category-selector`);
        const isContinentSelector = $(`.initial-settings .${container.getAttribute("class")} > .continent-selector`);
        const isNationalTeamsSelector = $(`.initial-settings .${container.getAttribute("class")} > .national-teams-selector`);
        const isNationalTeamChosen = $(`.initial-settings .${container.getAttribute("class")} > .national-team-chosen`);
        const isLeaguesSelector = $(`.initial-settings .${container.getAttribute("class")} > .leagues-selector`);
        const isClubsSelector = $(`.initial-settings .${container.getAttribute("class")} > .clubs-selector`);
        const isClubChosen = $(`.initial-settings .${container.getAttribute("class")} > .club-chosen`);

        if(isCategorySelector){
            _chooseRandomNationalTeamOrClub(container);
        }
        if(isContinentSelector){
            const category = isContinentSelector.getAttribute("data-category");
            const isNationalTeams = category === "national-teams";
            const isClubs = !isNationalTeams;
            if(isClubs){
                const lastRandom = ()=>{_chooseRandomClub(container)};
                _updateLastRandom(container, lastRandom);
                _chooseRandomClub(container);
            }
            if(isNationalTeams){
                const lastRandom = ()=>{_chooseRandomNationalTeam(container)};
                _updateLastRandom(container, lastRandom);
                _chooseRandomNationalTeam(container);
            }
        }
        if(isNationalTeamsSelector){
            const continent = isNationalTeamsSelector.getAttribute("data-continent");
            const lastRandom = ()=>{_chooseRandomNationalTeam(container, continent)};
            _updateLastRandom(container, lastRandom);
            _chooseRandomNationalTeam(container, continent);
        }
        if(isNationalTeamChosen){
            if(!lastRandoms[container.getAttribute("class")]){
                const continent = isNationalTeamChosen.getAttribute("data-continent");
                const lastRandom = ()=>{_chooseRandomNationalTeam(container, continent)};
                _updateLastRandom(container, lastRandom);
            }
            lastRandoms[container.getAttribute("class")]();
        }
        if(isLeaguesSelector){
            const continent = isLeaguesSelector.getAttribute("data-continent");
            const lastRandom = ()=>{_chooseRandomClub(container, continent)};
            _updateLastRandom(container, lastRandom);
            _chooseRandomClub(container, continent);
        }
        if(isClubsSelector){
            const continent = isClubsSelector.getAttribute("data-continent");
            const league = isClubsSelector.getAttribute("data-league");
            const lastRandom = ()=>{_chooseRandomClub(container, continent, league)};
            _updateLastRandom(container, lastRandom);
            _chooseRandomClub(container, continent, league);
        }
        if(isClubChosen){
            if(!lastRandoms[container.getAttribute("class")]){
                const continent = isClubChosen.getAttribute("data-continent");
                const league = isClubChosen.getAttribute("data-league");
                const lastRandom = ()=>{_chooseRandomClub(container, continent, league)};
                _updateLastRandom(container, lastRandom);
            }
            lastRandoms[container.getAttribute("class")]();
        }
    }

    function _validate(){
        const left = $(".initial-settings .left");
        const right = $(".initial-settings .right");
        const nameInput = $(".initial-settings .left > input");
        const name = nameInput.value;
        const opponentType = $(".initial-settings .right > select").value;
        const opponentInput = $(".right input");
        const opponentName = opponentInput.value;
        const playerOne = game.getPlayer(1);
        const playerTwo = game.getPlayer(2);
        if($(".invalid-message")){
            const invalidMessages = $$(".invalid-message");
            invalidMessages.forEach((message)=>{
                message.classList.toggle("shake");
                setTimeout(()=>{message.classList.toggle("shake")}, 50);
            })
        }
        if(playerOne.team.name === null){
            window.scrollTo(0, 0);
            alreadyScrolled = true;
            const invalidMessage = $(".initial-settings .left > .invalid-team");
            if(!invalidMessage){
                const selector = $(".initial-settings .left > [class*='select']");
                const message = _makeInvalidMessage("Please select a team!");
                message.classList.add("invalid-team", "shake");
                selector.before(message);
            }
        }
        else{
            const invalidMessage = $(".initial-settings .left > .invalid-team");
            if(invalidMessage){
                left.removeChild(invalidMessage);
            }
        }

        if(playerTwo.team.name === null){
            const invalidMessage = $(".initial-settings .right > .invalid-team");
            if(!invalidMessage){
                const selector = $(".initial-settings .right > [class*='select']");
                const message = _makeInvalidMessage("Please select a team!");
                message.classList.add("invalid-team", "shake");
                selector.before(message);
            }
        }
        else{
            const invalidMessage = $(".initial-settings .right > .invalid-team");
            if(invalidMessage){
                right.removeChild(invalidMessage);
            }
        }

        if(!name || name[0]===" "){
            window.scrollTo(0, 0);
            const invalidMessage = $(".initial-settings .left > .invalid-name");
            if(!invalidMessage){
                nameInput.classList.toggle("invalid");
                const message = _makeInvalidMessage("Required field!");
                message.classList.add("invalid-name", "shake");
                nameInput.nextElementSibling.before(message);
            }
        }
        else{
            if(nameInput.classList.contains("invalid")){nameInput.classList.toggle("invalid")};
            const invalidMessage = $(".initial-settings .left > .invalid-name");
            if(invalidMessage){left.removeChild(invalidMessage)};
        }
        if(opponentType === "PLAYER TWO"){
            if(!opponentName || opponentName[0]===" "){
                const invalidMessage = $(".initial-settings .right > .invalid-name");
                if(!invalidMessage){
                    opponentInput.classList.toggle("invalid");
                    const message = _makeInvalidMessage("Required field!");
                    message.classList.add("invalid-name", "shake");
                    opponentInput.nextElementSibling.before(message);  
                }
            }
            else{
                if(opponentInput.classList.contains("invalid")){opponentInput.classList.toggle("invalid")};
                const invalidMessage = $(".initial-settings .right > .invalid-name");
                if(invalidMessage){right.removeChild(invalidMessage)};
            }
        }
        else{
            const invalidMessage = $(".initial-settings .right > .invalid-name");
            if(invalidMessage){right.removeChild(invalidMessage)};
        }
        const valid = !$(".invalid-message");
        if(valid){
            if(game.soundActivated()) sounds.selectionTwo.play();
            game.updateName(left, name);
            game.updateName(right, opponentName);
            game.setOpponent(opponentType);
            _flipCoin();
            return;
        }
        if(game.soundActivated()) sounds.errorOne.play();
    }

    function _addBallCursor(container){
        const ball = document.createElement("section");
        ball.classList.add("ball-cursor");
        const root = document.documentElement;
        root.addEventListener("mousemove", e => {
            if(ball.style.display !== "initial"){ball.style.display = "initial"};
            ball.style.left = `${e.clientX - 32}px`;
            ball.style.top = `${e.clientY - 32}px`;
        });
        container.appendChild(ball);
    }

    function updateCurrentPlayerColors(player){
        const root = $(":root");
        const playerAlteredColors = game.getPlayer(player).team.alteredColors;
        for(let colorNumber in playerAlteredColors){
            root.style.setProperty(`--current-player-color${colorNumber}-low-opacity`, `rgba(${playerAlteredColors[colorNumber]}, 50%)`);
        }
    }

    function _changeSaturation(rgbColor, saturationLevel){
        console.log("original color")
        console.log(rgbColor);
        rgbColorArray = rgbColor.split(",");
        const sameColorDifferentSaturation = [];
        let hasToIncrement;
        for (let value of rgbColorArray){
            newValue = parseInt(value);
            if(hasToIncrement === undefined) {hasToIncrement = (newValue >= 127) ? false : true};
            if(hasToIncrement && newValue <= 255 - saturationLevel){
                newValue += saturationLevel;
            }
            else if(!hasToIncrement && newValue >= saturationLevel){
                newValue -= saturationLevel;
            }
            sameColorDifferentSaturation.push(newValue);
        }
        return sameColorDifferentSaturation.toString();
    }   

    function updateTeamColorsCssVariables(player){
        const root = $(":root");
        const playerNumber = (player === 1) ? "one" : "two";
        const playerAlteredColors = game.getPlayer(player).team.alteredColors;
        const playerColors = game.getPlayer(player).team.colors.slice(0);
        const playerColorsLength = playerColors.length;

        if(playerColorsLength === 1){
            const firstColorDifferentSaturationV1 = _changeSaturation(playerColors[0], 20);
            const firstColorDifferentSaturationV2 = _changeSaturation(playerColors[0], 10);
            playerColors.push(firstColorDifferentSaturationV1, firstColorDifferentSaturationV2);
        }

        else if(playerColorsLength === 2){
            const firstColorDifferentSaturation = _changeSaturation(playerColors[0], 10);
            playerColors.push(firstColorDifferentSaturation);
        }

        for(let colorNumber in playerColors){
            playerAlteredColors.push(playerColors[colorNumber]);
            root.style.setProperty(`--player-${playerNumber}-color${colorNumber}`, `rgb(${playerColors[colorNumber]})`);
        }
    }

    function _displayLoadingScreen(){
        const loadingScreen = document.createElement("section");
        loadingScreen.classList.add("loading-screen");
        const ball = document.createElement("span");
        ball.setAttribute("id", "ball");
        const referenceSquare = document.createElement("section");
        referenceSquare.classList.add("reference-square");
        const firstLine = document.createElement("section");
        firstLine.classList.add("first", "line");
        const secondLine = document.createElement("section");
        secondLine.classList.add("second", "line");
        const thirdLine = document.createElement("section");
        thirdLine.classList.add("third", "line");
        const fourthLine = document.createElement("section");
        fourthLine.classList.add("fourth", "line");
        helperFunctions.appendChildren(referenceSquare, [ball, firstLine, secondLine, thirdLine, fourthLine]);
        const loadingTextContainer = document.createElement("section");
        loadingTextContainer.classList.add("loading-text-container");
        const loadingText = document.createElement("p");
        loadingText.classList.add("loading-text");
        loadingText.innerText = "LOADING";
        loadingTextContainer.appendChild(loadingText);
        const dotsContainer = document.createElement("section");
        dotsContainer.classList.add("dots-container");
        const dotOne = document.createElement("div");
        dotOne.classList.add("dot", "one");
        const dotTwo = document.createElement("div");
        dotTwo.classList.add("dot", "two");
        const dotThree = document.createElement("div");
        dotThree.classList.add("dot", "three");
        helperFunctions.appendChildren(dotsContainer, [dotOne, dotTwo, dotThree]);
        loadingTextContainer.appendChild(dotsContainer);
        helperFunctions.appendChildren(loadingScreen, [referenceSquare, loadingTextContainer]);
    
        function _manageAnimationClasses(){
            const LINES = [firstLine, secondLine, thirdLine, fourthLine];
            const GROW_DIRECTIONS = ["grow-wider", "grow-wider", "grow-taller", "grow-taller"];
            const ANIMATION_DURATION = 1500;
            let delay = 0;
            for (let line in LINES){
                setTimeout(()=>{
                    LINES[line].classList.add(GROW_DIRECTIONS[line]);
                    const previousLine = `line-${line - 1}`;
                    if(ball.classList.contains(previousLine)) ball.classList.remove(previousLine);
                    ball.classList.add(`line-${line}`);
                }, delay);
                if(line != 3) delay += ANIMATION_DURATION;
                
                setTimeout(()=>{
                    LINES[line].classList.add("loading-animation-fade-out");
                }, ANIMATION_DURATION * LINES.length);

                setTimeout(()=>{
                    LINES[line].classList.remove(GROW_DIRECTIONS[line]);
                    LINES[line].classList.remove("loading-animation-fade-out");
                    ball.classList.remove("line-3");
                }, (ANIMATION_DURATION * LINES.length) + 375);
            }
        }
        _manageAnimationClasses();

        //Only loads essential images. The rest load on demand if there's a need to use them.
        const ESSENTIAL_IMAGES = ["./images/misc/goal.png", "./images/misc/important-clubs.png", "./images/misc/logo.png", "./images/misc/ttc-top.svg", "./images/misc/ttc-bottom.svg", 
                                "./images/misc/cups/club-world-cup.svg", "./images/misc/cups/world-cup.svg", "./images/misc/cups/winner-award.svg", "./images/misc/coin/head.png", 
                                "./images/misc/coin/tail.png", "./images/continents/africa/africa.svg", "./images/continents/asia/asia.svg", "./images/continents/europe/europe.svg", 
                                "./images/continents/north-america/north-america.svg", "./images/continents/oceania/oceania.svg", "./images/continents/south-america/south-america.svg"];

        let imagesLoaded = 0;
        let allImagesLoaded = false;

        for(const imageSource of ESSENTIAL_IMAGES){
            const image = document.createElement("img");
            image.addEventListener("load", ()=>{
                imagesLoaded++;
                if(imagesLoaded === ESSENTIAL_IMAGES.length) allImagesLoaded = true;
            })
            image.src = imageSource;
        }
        
        const repeatLoadingAnimation = setInterval(()=>{
            if(allImagesLoaded){
                clearInterval(repeatLoadingAnimation);
                _displayIntroAnimation();
                return;
            }
            _manageAnimationClasses();
        }, 6750);

        _body.appendChild(loadingScreen);
    }
    window.addEventListener("load", _displayLoadingScreen);

    function _displayIntroAnimation(){
        const introContainer = document.createElement("section");
        introContainer.classList.add("intro-container");
        const logoImage = document.createElement("img");
        helperFunctions.setAttributes(logoImage, ["class", "src", "alt"], ["logo-image", "./images/misc/logo.png", "Tic Tac Club's logo"]);
        introContainer.appendChild(logoImage);
        helperFunctions.clearPreviousScreen();
        _body.appendChild(introContainer);
        setTimeout(_displayFirstScreen, 1600);
    }

    function _displayFirstScreen(){
        helperFunctions.clearPreviousScreen();
        const firstScreenContainer = document.createElement("section");
        firstScreenContainer.classList.add("first-screen");
        const titleContainer = document.createElement("section");
        titleContainer.classList.add("title-container");
        const titleLeftContainer = document.createElement("section");
        titleLeftContainer.classList.add("title-left");
        const titleLeft = document.createElement("h1");
        titleLeft.innerText = "Tic Tac ";
        const titleLeftSpan = document.createElement("span");
        titleLeftSpan.innerText = "Cl";
        titleLeft.appendChild(titleLeftSpan);
        titleLeftContainer.appendChild(titleLeft);
        const titleMidContainer = document.createElement("section");
        titleMidContainer.classList.add("title-mid");
        const titleMid = document.createElement("h1");
        titleMid.classList.add("letter-u");
        titleMid.innerText = "u";
        const badges = document.createElement("section");
        badges.classList.add("badges");
        badges.setAttribute("alt", "Badges of important clubs");
        helperFunctions.appendChildren(titleMidContainer, [titleMid, badges]);
        const titleRightContainer = document.createElement("section");
        titleRightContainer.classList.add("title-right");
        const titleRight = document.createElement("h1");
        titleRight.innerText = "b";
        titleRightContainer.appendChild(titleRight);
        helperFunctions.appendChildren(titleContainer, [titleLeftContainer, titleMidContainer, titleRightContainer]);
        _addVolumeToggle(_body);
        _addMusicToggle(_body);
        const playButton = document.createElement("section");
        playButton.classList.add("play-button");
        playButton.innerText = "PLAY";
        playButton.addEventListener("click", _displayInitialSetup);
        playButton.addEventListener("click", ()=> {if(game.soundActivated()) sounds.selectionOne.play()});
        helperFunctions.appendChildren(firstScreenContainer, [titleContainer, playButton]);
        _addBallCursor(firstScreenContainer);
        _body.appendChild(firstScreenContainer);
    }

    function _displayInitialSetup(nameOne, nameTwo){
        _body.classList.add("mobile-scroll");
        helperFunctions.clearPreviousScreen();
        const container = document.createElement("div");
        container.classList.add("initial-settings");
        const versusV = document.createElement("div");
        versusV.innerText = "V";
        versusV.classList.add("versus", "v");
        const versusS = document.createElement("div");
        versusS.innerText = "S";
        versusS.classList.add("versus", "s");
        const top = document.createElement("section");
        top.classList.add("top");
        const left = document.createElement("section");
        left.classList.add("left");
        const playerOneLabelContainer = document.createElement("section");
        const playerOneLabel = document.createElement("p");
        playerOneLabel.innerText = "PLAYER ONE";
        playerOneLabelContainer.appendChild(playerOneLabel);
        const nameInput = document.createElement("input");
        nameInput.autocomplete = "off";
        if(nameOne && typeof nameOne === "string"){nameInput.value = nameOne};
        helperFunctions.setAttributes(nameInput, ["id", "type","placeholder"], ["player-one-name", "text", "What's your name?"]);
        nameInput.addEventListener("input", ()=>{
            if(nameInput.value){
                const inavalidNameWarning = $(".initial-settings .left .invalid-name");
                if(inavalidNameWarning) inavalidNameWarning.parentElement.removeChild(inavalidNameWarning);
            }
        });
        helperFunctions.appendChildren(left, [versusV, playerOneLabel, nameInput]);
        const right = document.createElement("section");
        right.classList.add("right");
        const opponentSelector = document.createElement("select");
        opponentSelector.setAttribute("id", "opponent-selector");
        const AI = document.createElement("option");
        AI.setAttribute("value", "AI");
        AI.innerText = "AI";
        const playerTwo = document.createElement("option");
        playerTwo.setAttribute("value", "PLAYER TWO");
        playerTwo.innerText = "PLAYER TWO";
        helperFunctions.appendChildren(opponentSelector, [AI, playerTwo]);
        opponentSelector.addEventListener("change", _changeOpponent);
        const opponentNameInput = document.createElement("input");
        opponentNameInput.disabled = true;
        const BOT_NAMES = ["Botaldo", "Botaldinho", "Botssi", "Botzema", "Botandowski", "Botistuta", "Botti", "Bottenbauer"];
        const botsName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        helperFunctions.setAttributes(opponentNameInput, ["id", "type","value"], ["bot-name", "text", botsName]);
        const difficultyToggle = document.createElement("button");
        helperFunctions.setAttributes(difficultyToggle, ["type", "class",], ["button", "difficulty-toggle"]);
        difficultyToggle.innerText = game.getDifficulty();
        difficultyToggle.addEventListener("click", _toggleDifficulty);
        helperFunctions.appendChildren(right, [versusS, opponentSelector, opponentNameInput, difficultyToggle]);
        if(nameTwo && typeof nameTwo === "string"){
            if(!BOT_NAMES.includes(nameTwo)){
                opponentSelector.value = "PLAYER TWO";
                opponentNameInput.disabled = false;
                right.removeChild(difficultyToggle);
            }
            opponentNameInput.value = nameTwo;
        }
        const bottom = document.createElement("section");
        bottom.classList.add("bottom");
        const button = document.createElement("button");
        button.innerText = "START GAME";
        button.addEventListener("click", _validate)
        bottom.appendChild(button);
        helperFunctions.appendChildren(top, [left, right]);
        helperFunctions.appendChildren(container, [top, bottom]);
        _body.appendChild(container);
        _displaySelectTeamScreen(left);
        _displaySelectTeamScreen(right);
    }

    function _displaySelectTeamScreen(container){
        const alreadyASelecTeamScreen = $(`.initial-settings .${container.getAttribute("class")} > .select-team`);
        if(alreadyASelecTeamScreen) return;
        _removePreviousLabel(container);
        _removePreviousSelector(container);
        _removePreviousTeamChosenScreen(container);
        const randomButton = $(`.initial-settings .${container.getAttribute("class")} > .random-button`);
        if(randomButton){container.removeChild(randomButton)};
        const returnButton = $(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(returnButton){container.removeChild(returnButton)};
        const selectTeamScreen = document.createElement("div");
        selectTeamScreen.classList.add("select-team");
        const selectTeamButton = document.createElement("button");
        selectTeamButton.setAttribute("type", "button");
        selectTeamButton.innerText = "SELECT TEAM";
        selectTeamButton.addEventListener("click", ()=>{_displayCategorySelector(container)});
        selectTeamButton.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()})
        selectTeamScreen.appendChild(selectTeamButton);
        container.appendChild(selectTeamScreen);
    }

    function _displayCategorySelector(container){
        _removePreviousSelector(container);
        const selecTeamScreen = $(`.initial-settings .${container.getAttribute("class")} > .select-team`);
        if(selecTeamScreen){container.removeChild(selecTeamScreen)};
        const noRandomButton = !$(`.initial-settings .${container.getAttribute("class")} > .random-button`);
        if(noRandomButton){_addRandomButton(container)}
        const categorySelector = document.createElement("div");
        categorySelector.classList.add("category-selector");
        const nationalTeams = document.createElement("section");
        nationalTeams.classList.add("national-teams");
        const nationalTeamsTitle = document.createElement("p");
        nationalTeamsTitle.classList.add("category-title", "national-teams-title");
        nationalTeamsTitle.innerText = "NATIONAL TEAMS";
        nationalTeams.appendChild(nationalTeamsTitle);
        nationalTeams.addEventListener("click", (event)=>{_displayContinentSelector(container, event)});
        nationalTeams.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        const clubs = document.createElement("section");
        clubs.classList.add("clubs");
        const clubsTitle = document.createElement("p");
        clubsTitle.classList.add("category-title", "clubs-title");
        clubsTitle.innerText = "CLUBS";
        clubs.appendChild(clubsTitle);
        clubs.addEventListener("click", (event) =>{_displayContinentSelector(container, event)});
        clubs.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        helperFunctions.appendChildren(categorySelector, [nationalTeams, clubs]);
        container.appendChild(categorySelector);
    }

    function _displayContinentSelector(container, event){
        _removePreviousSelector(container);
        _removePreviousLabel(container);
        const thereIsNoReturnButton = !$(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(container)};
        const isNationalTeams = (typeof event === "string") ? (event === "national-teams") : (event.target.getAttribute("class").includes("national-teams"));
        const isClubs = !isNationalTeams;
        const continentSelector = document.createElement("div");
        continentSelector.classList.add("continent-selector");
        continentSelector.setAttribute("data-category", (isNationalTeams) ? "national-teams" : "clubs");
        const CONTINENTS = DATA.getContinents();
        for (let currentContinent of CONTINENTS){
            const continent = document.createElement("section");
            continent.classList.add("continent");
            continentTitle = document.createElement("p");
            continentTitle.innerText = currentContinent;
            continent.appendChild(continentTitle);
            const kebabCaseContinent = helperFunctions.toKebabCase(currentContinent);
            const BACKGROUND_IMAGE_PATH = `./images/continents/${kebabCaseContinent}/${kebabCaseContinent}.svg`;
            continent.setAttribute("style", `background-image: url(${BACKGROUND_IMAGE_PATH})`);
            continent.setAttribute("data-continent", currentContinent);
            if (isNationalTeams){
                continent.addEventListener("click", (event) => {_displayNationalTeamsSelector(container, event)});
            }
            if (isClubs){
                continent.addEventListener("click", (event) => {_displayLeaguesSelector(container, event)});
            }
            continent.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
            continentSelector.appendChild(continent);
        }
        container.appendChild(continentSelector);
    }

    function _displayNationalTeamsSelector(container, event){
        _removePreviousSelector(container);
        _removePreviousTeamChosenScreen(container);
        _removePreviousLabel(container);
        const continent = (typeof event === "string") ? event : event.target.getAttribute("data-continent");
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        const continentAsDemonym = (continent === "Europe") ? continent + "an" : continent + "n";
        const initialMessage = `${continentAsDemonym.toUpperCase()} NATIONAL TEAMS`;
        _updateLabel(label, initialMessage);
        const nationalTeamsSelector = document.createElement("div");
        nationalTeamsSelector.classList.add("national-teams-selector");
        nationalTeamsSelector.setAttribute("data-continent", continent);
        nationalTeamsSelector.addEventListener("mouseleave", ()=>{_updateLabel(label, initialMessage)})
        for (let currentCountry of DATA.getCountries(continent)){
            const countryInfo = DATA.getCountryInfo(continent, currentCountry);
            const country = document.createElement("section");
            country.classList.add("national-team");
            country.setAttribute("data-country", currentCountry);
            const countryBadge = document.createElement("img");
            const kebabCaseContinent = helperFunctions.toKebabCase(continent);
            const kebabCaseCountry = helperFunctions.toKebabCase(currentCountry);
            const imagePath = `./images/continents/${kebabCaseContinent}/national-teams/${kebabCaseCountry}.svg`
            helperFunctions.setAttributes(countryBadge, ["src", "alt"], [imagePath, currentCountry]);
            country.addEventListener("click", ()=>{_displayNationalTeamChosen(container, currentCountry, countryInfo.abbreviation, imagePath, continent, countryInfo.colors)});
            country.addEventListener("mouseenter", ()=>{_updateLabel(label, currentCountry.toUpperCase())});
            country.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()});
            country.appendChild(countryBadge);
            nationalTeamsSelector.appendChild(country);
        }
        helperFunctions.appendChildren(container, [labelContainer, nationalTeamsSelector])
    }

    function _displayNationalTeamChosen(container, country, abbreviation, imagePath, continent, colors){
        _removePreviousSelector(container);
        _removePreviousLabel(container);
        _removePreviousTeamChosenScreen(container);
        game.updateTeam(container, country, abbreviation, imagePath, colors);
        const thereIsNoReturnButton = !$(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(container)};
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        _updateLabel(label, country.toUpperCase());
        const nationalTeamChosen = document.createElement("div");
        nationalTeamChosen.classList.add("national-team-chosen");
        nationalTeamChosen.setAttribute("data-continent", continent);
        const nationalTeamChosenBadge = document.createElement("img");
        helperFunctions.setAttributes(nationalTeamChosenBadge, ["src", "alt"], [imagePath, country]);
        nationalTeamChosen.appendChild(nationalTeamChosenBadge);
        helperFunctions.appendChildren(container, [labelContainer, nationalTeamChosen])
    }

    function _displayLeaguesSelector(container, event){
        _removePreviousSelector(container);
        const continent = (typeof event === "string") ? event : event.target.getAttribute("data-continent");
        _removePreviousLabel(container);
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        const continentAsDemonym = (continent === "Europe") ? continent + "an" : continent + "n";
        const initialMessage = `${continentAsDemonym.toUpperCase()} LEAGUES`;
        _updateLabel(label, initialMessage);
        const leaguesSelector = document.createElement("div");
        leaguesSelector.classList.add("leagues-selector");
        leaguesSelector.setAttribute("data-continent", continent);
        leaguesSelector.addEventListener("mouseleave", ()=>{_updateLabel(label, initialMessage)});
        for (let currentLeague of DATA.getLeagues(continent)){
            const league = document.createElement("section");
            league.classList.add("league");
            league.setAttribute("data-league", currentLeague);
            const leagueLogo = document.createElement("img");
            leagueLogo.setAttribute("data-league", currentLeague);
            const kebabCaseContinent = helperFunctions.toKebabCase(continent);
            const kebabCaseLeague = helperFunctions.toKebabCase(currentLeague);
            const imagePath = `./images/continents/${kebabCaseContinent}/leagues/${kebabCaseLeague}/${kebabCaseLeague}.svg`
            helperFunctions.setAttributes(leagueLogo, ["src", "alt"], [imagePath, currentLeague]);
            league.appendChild(leagueLogo);
            league.addEventListener("click", (event)=>{_displayClubsSelector(container, continent, event)});
            league.addEventListener("mouseenter", ()=>{_updateLabel(label, currentLeague.toUpperCase())});
            league.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
            leaguesSelector.appendChild(league);
        }
        helperFunctions.appendChildren(container, [labelContainer, leaguesSelector]);
    }

    function _displayClubsSelector(container, continent, event){
        _removePreviousSelector(container);
        _removePreviousTeamChosenScreen(container);
        _removePreviousLabel(container);
        const league = (typeof event === "string") ? event : event.target.getAttribute("data-league");
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        const initialMessage = league.toUpperCase();
        _updateLabel(label, initialMessage);
        const clubsSelector = document.createElement("div");
        clubsSelector.classList.add("clubs-selector");
        helperFunctions.setAttributes(clubsSelector, ["data-continent", "data-league"], [continent, league])
        clubsSelector.addEventListener("mouseleave", ()=>{_updateLabel(label, initialMessage)});
        for (let currentClub of DATA.getClubs(continent, league)){
            const clubInfo = DATA.getClubInfo(continent, league, currentClub);
            const club = document.createElement("section");
            club.classList.add("club");
            club.setAttribute("data-club", currentClub);
            const clubBadge = document.createElement("img");
            const kebabCaseContinent = helperFunctions.toKebabCase(continent);
            const kebabCaseLeague = helperFunctions.toKebabCase(league);
            const kebabCaseClub = helperFunctions.toKebabCase(currentClub);
            const imagePath = `./images/continents/${kebabCaseContinent}/leagues/${kebabCaseLeague}/clubs/${kebabCaseClub}.svg`
            helperFunctions.setAttributes(clubBadge, ["src", "alt"], [imagePath, currentClub]);
            club.addEventListener("click", ()=>{ _displayClubChosen(container, currentClub, clubInfo.abbreviation, imagePath, continent, league, clubInfo.colors)});
            club.addEventListener("mouseenter", ()=>{_updateLabel(label, currentClub.toUpperCase())});
            club.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()})
            club.appendChild(clubBadge);
            clubsSelector.appendChild(club);
        }
        helperFunctions.appendChildren(container, [labelContainer, clubsSelector])
    }

    function _displayClubChosen(container, club, abbreviation, imagePath, continent, league, colors){
        _removePreviousSelector(container);
        _removePreviousLabel(container);
        _removePreviousTeamChosenScreen(container);
        game.updateTeam(container, club, abbreviation, imagePath, colors);
        const thereIsNoReturnButton = !$(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(container)};
        const invalidTeamMessage = $(`.initial-settings .${container.getAttribute("class")}  .invalid-team`);
        if(invalidTeamMessage) invalidTeamMessage.parentElement.removeChild(invalidTeamMessage);
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        _updateLabel(label, club.toUpperCase());
        const clubChosen = document.createElement("div");
        clubChosen.classList.add("club-chosen");
        helperFunctions.setAttributes(clubChosen, ["data-continent", "data-league"], [continent, league]);
        const clubChosenBadge = document.createElement("img");
        helperFunctions.setAttributes(clubChosenBadge, ["src", "alt"], [imagePath, club]);
        clubChosen.appendChild(clubChosenBadge);
        helperFunctions.appendChildren(container, [labelContainer, clubChosen]);
    }

    function _flipCoin(){
        helperFunctions.clearPreviousScreen();
        _body.classList.remove("mobile-scroll");
        const coinFlipScreen = document.createElement("div");
        coinFlipScreen.classList.add("coin-flip-screen");
        const instructions = document.createElement("p");
        instructions.classList.add("coin-flip-instructions");
        instructions.innerText = "FLIP THE COIN TO SEE WHO STARTS";
        const playerOne = game.getPlayer(1);
        const playerTwo = game.getPlayer(2);
        const playerOneCoinSide = ["head", "tail"][Math.floor(Math.random() * 2)];
        const playerTwoCoinSide = (playerOneCoinSide === "head") ? "tail" : "head";
        const playerOneCoinSideMessage = document.createElement("p");
        playerOneCoinSideMessage.classList.add(`coin-side-message-${playerOneCoinSide}`);
        playerOneCoinSideMessage.innerText = `${playerOne.name}: `;
        const playerTwoCoinSideMessage = document.createElement("p");
        playerTwoCoinSideMessage.classList.add(`coin-side-message-${playerTwoCoinSide}`);
        playerTwoCoinSideMessage.innerText = `${playerTwo.name}: `;
        const coinMessagesContainer = document.createElement("section");
        coinMessagesContainer.classList.add("coin-messages-container");
        helperFunctions.appendChildren(coinMessagesContainer, [playerOneCoinSideMessage, playerTwoCoinSideMessage]);
        const coinContainer = document.createElement("div");
        coinContainer.classList.add("coin-container");
        const coin = document.createElement("section");
        coin.setAttribute("id", "coin");
        coin.addEventListener("click", ()=>{
            const coinAlreadyFlipped = coin.getAttribute("data-state") == "already-flipped";
            if(coinAlreadyFlipped){return};
            coin.setAttribute("data-state", "already-flipped");
            if(game.soundActivated()) sounds.coinToss.play();
            const result = ["head", "tail"][Math.floor(Math.random() * 2)];
            coin.style.animation = (result === "head") ? "flip-head 1.3s forwards" : "flip-tail 1.3s forwards";
            coin.addEventListener("animationend", ()=>{
                const flipWinner = (result === playerOneCoinSide) ? playerOneCoinSideMessage : playerTwoCoinSideMessage;
                flipWinner.classList.add("flip-winner");
            });
            const winner = (result === playerOneCoinSide) ? playerOne.name : playerTwo.name;
            game.setFirstTurn(winner);

            setTimeout(()=>{
                const winnerMessageContainer = document.createElement("section");
                winnerMessageContainer.classList.add("first-turn-message-container");
                const winnerMessage = document.createElement("p");
                winnerMessage.classList.add("first-turn-message");
                winnerMessage.innerText = `${winner.toUpperCase()} STARTS!`;
                winnerMessageContainer.appendChild(winnerMessage);
                helperFunctions.clearPreviousScreen();
                _body.appendChild(winnerMessageContainer);
            }, 2500);

            const transition = _makeTransition();
            setTimeout(()=>{
                helperFunctions.clearPreviousScreen();
                _body.appendChild(transition);
                setTimeout(_displayGameBoardScreen, 1600);
            }, 4000); 
        })
        coinContainer.appendChild(coin);
        coinHead = document.createElement("section");
        coinHead.classList.add("head");
        const headImage = document.createElement("img");
        helperFunctions.setAttributes(headImage, ["src", "alt"], ["./images/misc/coin/head.png", "Coin's head"]);
        coinHead.appendChild(headImage);
        coinTail = document.createElement("section");
        coinTail.classList.add("tail");
        const tailImage = document.createElement("img");
        helperFunctions.setAttributes(tailImage, ["src", "alt"], ["./images/misc/coin/tail.png", "Coin's tail"]);
        coinTail.appendChild(tailImage);
        helperFunctions.appendChildren(coin, [coinHead, coinTail]);
        helperFunctions.appendChildren(coinFlipScreen, [instructions, coinContainer, coinMessagesContainer]);
        _body.appendChild(coinFlipScreen);
    }

    function _makeTransition(){
        const transitionContainer = document.createElement("section");
        transitionContainer.classList.add("transition-container");
        const top = document.createElement("section");
        top.classList.add("transition-top");
        const upperBadge = document.createElement("img");
        helperFunctions.setAttributes(upperBadge, ["class", "src", "alt"], ["upper-badge", "./images/misc/ttc-top.svg", "Tic Tac Club logo's upper half"]);
        top.appendChild(upperBadge);
        const bottom = document.createElement("section");
        bottom.classList.add("transition-bottom");
        const lowerBadge = document.createElement("img");
        helperFunctions.setAttributes(lowerBadge, ["class", "src", "alt"], ["lower-badge", "./images/misc/ttc-bottom.svg", "Tic Tac Club logo's lower half"]);
        bottom.appendChild(lowerBadge);
        helperFunctions.appendChildren(transitionContainer, [top, bottom]);
        return transitionContainer;
    }

    function _displayGameBoardScreen(){
        helperFunctions.clearPreviousScreen();
        const toggles = $$("i[class*='toggle']");
        toggles.forEach(toggle => toggle.classList.add("bottom-left"));
        const gameScreen = document.createElement("section");
        gameScreen.classList.add("game-screen");
        const localTeamBadge = document.createElement("img");
        localTeamBadge.classList.add("local-team-badge");
        const localTeam = game.getPlayer(1).team;
        helperFunctions.setAttributes(localTeamBadge, ["src", "alt"], [localTeam.imagePath, localTeam.name]);
        const visitorTeamBadge = document.createElement("img");
        visitorTeamBadge.classList.add("visitor-team-badge");
        const visitorTeam = game.getPlayer(2).team;
        helperFunctions.setAttributes(visitorTeamBadge, ["src", "alt"], [visitorTeam.imagePath, visitorTeam.name]);
        helperFunctions.appendChildren(gameScreen, [localTeamBadge, visitorTeamBadge]);
        _displayScoreBoard(gameScreen);
        gameBoard.set(gameScreen);
        _body.appendChild(gameScreen);
    }

    function _displayScoreBoard(parentElement){
        const scoreboard = document.createElement("div");
        scoreboard.classList.add("scoreboard");
        const scoreContainer = document.createElement("section");
        scoreContainer.classList.add("score-container");
        const local = document.createElement("section");
        local.classList.add("local");
        const localAbbreviationAndColors = document.createElement("section");
        localAbbreviationAndColors.classList.add("local-abbreviation-and-colors");
        const localAbbreviation = document.createElement("p");
        localAbbreviation.classList.add("local-abbreviation");
        localAbbreviation.innerText = game.getPlayer(1).team.abbreviation;
        const localColors = document.createElement("section");
        localColors.classList.add("local-colors");
        for(const color in game.getPlayer(1).team.colors){
            const colorSection = document.createElement("section");
            colorSection.classList.add(`local-color-${color}`);
            localColors.appendChild(colorSection);
        }
        helperFunctions.appendChildren(localAbbreviationAndColors, [localAbbreviation, localColors]);
        const localScore = document.createElement("p");
        localScore.classList.add("local-score");
        localScore.innerText = "0";
        helperFunctions.appendChildren(local, [localAbbreviationAndColors, localScore]);
        const visitor = document.createElement("section");
        visitor.classList.add("visitor");
        const visitorAbbreviationAndColors = document.createElement("section");
        visitorAbbreviationAndColors.classList.add("visitor-abbreviation-and-colors");
        const visitorAbbreviation = document.createElement("p");
        visitorAbbreviation.classList.add("visitor-abbreviation");
        visitorAbbreviation.innerText = game.getPlayer(2).team.abbreviation;
        const visitorColors = document.createElement("section");
        visitorColors.classList.add("visitor-colors");
        for(const color in game.getPlayer(2).team.colors){
            const colorSection = document.createElement("section");
            colorSection.classList.add(`visitor-color-${color}`);
            visitorColors.appendChild(colorSection);
        }
        helperFunctions.appendChildren(visitorAbbreviationAndColors, [visitorAbbreviation, visitorColors]);
        const visitorScore = document.createElement("p");
        visitorScore.classList.add("visitor-score");
        visitorScore.innerText = "0";
        helperFunctions.appendChildren(visitor, [visitorScore, visitorAbbreviationAndColors]);
        helperFunctions.appendChildren(scoreContainer, [local, visitor]);
        const timeContainer = document.createElement("section");
        timeContainer.classList.add("time-container");
        const time = document.createElement("p");
        time.classList.add("time");
        timeContainer.appendChild(time);
        helperFunctions.appendChildren(scoreboard, [timeContainer, scoreContainer])
        parentElement.appendChild(scoreboard);
        game.startTime();
    }

    function updateScore(){
        const localScore = $(".scoreboard .local-score");
        const visitorScore = $(".scoreboard .visitor-score");
        localScore.innerText = game.getPlayer(1).score;
        visitorScore.innerText = game.getPlayer(2).score;
    }

    function updateTime(currentTime){
        const time = $(".scoreboard .time");
        time.innerText = currentTime;
    }

    function updateCurrentPlayer(player){
        const isPlayerOne = (player === 1);
        const localTeamBadge = $(".game-screen .local-team-badge");
        const visitorTeamBadge = $(".game-screen .visitor-team-badge");
        if(isPlayerOne){
            localTeamBadge.classList.toggle("current-player");
            if(visitorTeamBadge.classList.contains("current-player")){visitorTeamBadge.classList.toggle("current-player")};
            return;
        }
        visitorTeamBadge.classList.toggle("current-player");
        if(localTeamBadge.classList.contains("current-player")){localTeamBadge.classList.toggle("current-player")};
    }

    function toggleTieAnimation(){
        const gameboard = $(".game-board");
        gameboard.classList.toggle("tie");
        setTimeout(()=>{gameboard.classList.toggle("tie")}, 1000);
    }

    function displayResult(result){
        helperFunctions.clearPreviousScreen();
        const toggles = $$("i[class*='toggle']");
        toggles.forEach(toggle => {if(toggle.classList.contains("bottom-left"))toggle.classList.remove("bottom-left")});
        const playerOne = game.getPlayer(1);
        const playerTwo = game.getPlayer(2);
        const resultOuterContainer = document.createElement("section");
        resultOuterContainer.classList.add("game-result-container");
        const resultContainer = document.createElement("section");
        resultContainer.classList.add("game-result");
        resultOuterContainer.appendChild(resultContainer);
        const top = document.createElement("section");
        top.classList.add("game-result-top");
        const outcome = document.createElement("p");
        const RESULT_MESSAGES = ["IT'S A TIE!", `<span>${playerOne.name.toUpperCase()}</span> WON!`, `<span>${playerTwo.name.toUpperCase()}</span> WON!`];
        outcome.innerHTML = RESULT_MESSAGES[result];
        top.appendChild(outcome);
        const mid = document.createElement("section");
        mid.classList.add("game-result-mid");
        const playerOneTeam = playerOne.team;
        const playerOneBadgeContainer = document.createElement("section");
        playerOneBadgeContainer.classList.add("player-one-badge-container");
        const playerOneBadge = document.createElement("img");
        helperFunctions.setAttributes(playerOneBadge, ["src", "alt", "class"], [playerOneTeam.imagePath, `Flag of ${playerOneTeam.name}`, "player-one-team-badge"]);
        playerOneBadgeContainer.appendChild(playerOneBadge);
        const playerTwoTeam = playerTwo.team;
        const playerTwoBadgeContainer = document.createElement("section");
        playerTwoBadgeContainer.classList.add("player-two-badge-container");
        const playerTwoBadge = document.createElement("img");
        helperFunctions.setAttributes(playerTwoBadge, ["src", "alt", "class"], [playerTwoTeam.imagePath, `Flag of ${playerTwoTeam.name}`, "player-two-team-badge"]);
        playerTwoBadgeContainer.appendChild(playerTwoBadge);
        if(result){
            const winnerAward = document.createElement("img");
            helperFunctions.setAttributes(winnerAward, ["src", "alt", "class"], ["./images/misc/cups/winner-award.svg", "Winner award", "winner-award"]);
            (result == 1) ? playerOneBadgeContainer.appendChild(winnerAward) : playerTwoBadgeContainer.appendChild(winnerAward);
        }
        const finalScoreContainer = document.createElement("section");
        finalScoreContainer.classList.add("final-score-container");
        const finalScore = document.createElement("p");
        finalScore.classList.add("final-score");
        finalScore.innerText = `${playerOne.score} - ${playerTwo.score}`;
        finalScoreContainer.appendChild(finalScore);
        helperFunctions.appendChildren(mid, [playerOneBadgeContainer, finalScoreContainer, playerTwoBadgeContainer]);
        const bottom = document.createElement("section");
        bottom.classList.add("game-result-bottom");
        const selectTeam = document.createElement("i");
        selectTeam.classList.add("fa-solid", "fa-shirt");
        selectTeam.setAttribute("title", "SELECT TEAM");
        selectTeam.addEventListener("click", ()=> {
            if(game.soundActivated()){
                sounds.selectionOne.play();
                sounds.stadiumAtmosphere.pause();
                sounds.stadiumAtmosphere.currentTime = 0;
            }
            const nameOne = playerOne.name;
            const nameTwo = playerTwo.name;
            game.resetTeams();
            _displayInitialSetup(nameOne, nameTwo);
        });
        const playAgain = document.createElement("i");
        playAgain.classList.add("fa-solid", "fa-arrow-rotate-left");
        playAgain.setAttribute("title", "PLAY AGAIN");
        playAgain.addEventListener("click", ()=>{
            if(game.soundActivated()){
                sounds.selectionOne.play();
                sounds.stadiumAtmosphere.pause();
                sounds.stadiumAtmosphere.currentTime = 0;
            }
            _flipCoin();
        });
        helperFunctions.appendChildren(bottom, [selectTeam, playAgain]);
        helperFunctions.appendChildren(resultContainer, [top, mid, bottom]);
        _body.appendChild(resultOuterContainer);
    }

    return {updateScore, updateTime, updateCurrentPlayer, updateCurrentPlayerColors, updateTeamColorsCssVariables, displayResult, displaySong, toggleTieAnimation}
})()