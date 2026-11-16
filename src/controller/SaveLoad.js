let saveOne;
let saveTwo;
let saveThree;

let gameState;

function saveButtons() {
    
    gameState = [null, null, null];

    storeItem("saveData", gameState);

    let savedData = getItem("saveData");

    if (savedData[0] !== null) {
        mageType = savedData[0].mageType;
    }
    if (savedData[1] !== null) {
        mageType = savedData[1].mageType;
    }
    if (savedData[2] !== null) {
        mageType = savedData[2].mageType;
    }

    saveOne = createButton("Save One");
    saveOne.position(width / 2 - saveOne.width / 2, height / 2 + 100);
    saveOne.size(width / 6, height / 10);
    saveOne.style("background-color", color(52, 235, 113));
    saveOne.style("font-family", "Georgia")
    saveOne.style('border-radius', '8px'); 
    saveOne.style('cursor', 'pointer');

    saveOne.mousePressed(() => {
        loadGame(0)
    });

    saveTwo = createButton("Save Two");
    saveTwo.position(width / 2 - saveTwo.width / 2, height / 2 + 50);
    saveTwo.size(width / 6, height / 10);
    saveTwo.style("background-color", color(52, 235, 113));
    saveTwo.style("font-family", "Georgia")
    saveTwo.style('border-radius', '8px'); 
    saveTwo.style('cursor', 'pointer');

    saveTwo.mousePressed(() => {
        loadGame(1)
    });

    saveThree = createButton("Save Three");
    saveThree.position(width / 2 - saveThree.width / 2, height / 2 + 0);
    saveThree.size(width / 6, height / 10);
    saveThree.style("background-color", color(52, 235, 113));
    saveThree.style("font-family", "Georgia")
    saveThree.style('border-radius', '8px'); 
    saveThree.style('cursor', 'pointer');

    saveThree.mousePressed(() => {
        loadGame(2)
    });
}

function saveGame(file) {
    gameState[file] = {
        mageType: mageType,
    }

    storeItem("saveData", gameState);
}

function loadGame(file) {
    let savedData = getItem("saveData");

    if (savedData[file] !== null) {
        mageType = savedData[file].mageType;
    }
}