let saveOne;
let saveTwo;
let saveThree;

function saveButtons() {

    saveOne = createButton("SAVE ONE");
    saveOne.size(width / 5, height / 8);
    saveOne.position(width / 2 - saveOne.width / 2, height * 1/4);
    saveOne.style("background-color", color(66, 135, 245));
    saveOne.style("font-family", "Georgia")
    saveOne.style('border-radius', '8px'); 
    saveOne.style('cursor', 'pointer');

    saveOne.mousePressed(() => {
        loadGame(0)
    });

    saveTwo = createButton("SAVE TWO");
    saveTwo.size(width / 5, height / 8);
    saveTwo.position(width / 2 - saveTwo.width / 2, height *  2/4);
    saveTwo.style("background-color", color(138, 67, 209));
    saveTwo.style("font-family", "Georgia")
    saveTwo.style('border-radius', '8px'); 
    saveTwo.style('cursor', 'pointer');

    saveTwo.mousePressed(() => {
        loadGame(1)
    });

    saveThree = createButton("SAVE THREE");
    saveThree.size(width / 5, height / 8);
    saveThree.position(width / 2 - saveThree.width / 2, height * 3/4);
    saveThree.style("background-color", color(209, 56, 199));
    saveThree.style("font-family", "Georgia")
    saveThree.style('border-radius', '8px'); 
    saveThree.style('cursor', 'pointer');

    saveThree.mousePressed(() => {
        loadGame(2)
    });
}

function saveGame(file) {
    let gameData = {
        mageType: mageType,
    }

    if (file === 0) {
        storeItem("saveOne", gameData);
    } else if (file === 1) {
        storeItem("saveTwo", gameData);
    } else if (file === 2) {
        storeItem("saveThree", gameData);
    }
}

function loadGame(file) {

    let save = "";

    if (file === 0) {
        save = "saveOne";
    } else if (file === 1) {
        save = "saveTwo";
    } else if (file === 2) {
        save = "saveThree";
    }

    let savedData = getItem(save);

    if (savedData !== null) {
        mageType = savedData.mageType;
        gameState = "game";
    } else {
        fireButton.show();
        iceButton.show();
        mindButton.show();
        gameState = "mageSelect";
    }

    saveOne.hide();
    saveTwo.hide();
    saveThree.hide();
}