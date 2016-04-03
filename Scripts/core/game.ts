/*
Author: Christine Cho
Last Modified by: Christine Cho
Last Modified: 03/28/2016
File description: Manages assets and scene changes

Revision:
1. Added the Instructions and more images
2. Added Gameover image and hit/collect sounds
3. Added sounds to the scenes
*/

/// <reference path = "_reference.ts" />

// global variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;

var currentScene: objects.Scene;
var scene: number;

// Game Scenes
var menu: scenes.Menu;
var instruction: scenes.Instruction;
var play: scenes.Play;
var end: scenes.End;

var assetData: objects.Asset[] = [
    // Add your Assets here
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "InstructionButton", src: "../../Assets/images/InstructionButton.png" },
    { id: "RestartButton", src: "../../Assets/images/RestartButton.png" },
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "mountain", src: "../../Assets/images/mountains.png" },
    { id: "dragon", src: "../../Assets/images/dragon.png" },
    { id: "fire", src: "../../Assets/images/fire.png" },
    { id: "fireball", src: "../../Assets/images/fireball.png" },
    { id: "background", src: "../../Assets/images/background.png" },
    { id: "gameover", src: "../../Assets/images/gameover.png" },
    { id: "instruction", src: "../../Assets/images/instruction.png" },
    { id: "hit", src: "../../Assets/audio/hit.mp3" },
    { id: "collect", src: "../../Assets/audio/collect.mp3" },
    { id: "gameovermusic", src: "../../Assets/audio/gameover.mp3" },
    { id: "menumusic", src: "../../Assets/audio/opening.mp3" },
    { id: "backgroundmusic", src: "../../Assets/audio/background.mp3" }
];

function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init(): void {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    
    // create our main display list container
    stage = new createjs.Stage(canvas);
    
    // Enable mouse events
    stage.enableMouseOver(20);
    
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    
    // sets up our stats counting workflow
    setupStats(); 
    
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}

// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event: createjs.Event): void {
    // start collecting stats for this frame
    stats.begin(); 
    
    // calling State's update method
    currentScene.update(); 
    
    // redraw/refresh stage every frame
    stage.update();
    
    // stop collecting stats for this frame
    stats.end();
}

// Setup Game Stats
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            createjs.Sound.stop();
            createjs.Sound.play("menumusic");
            console.log("Starting MENU Scene");
            break;
        case config.Scene.INSTRUCTION:
            // show the INSTRUCTION scene
            stage.removeAllChildren();
            instruction = new scenes.Instruction();
            currentScene = instruction;
            console.log("Starting INSTRUCTION Scene");
            break;
        case config.Scene.PLAY:
            // show the PLAY scene
            stage.removeAllChildren();
            play = new scenes.Play();
            currentScene = play;
            createjs.Sound.stop();
            createjs.Sound.play("backgroundmusic");
            console.log("Starting PLAY Scene");
            break;
        case config.Scene.END:
            // show the END scene
            stage.removeAllChildren();
            end = new scenes.End();
            currentScene = end;
            createjs.Sound.stop();
            createjs.Sound.play("gameovermusic");
            console.log("Starting END Scene");
            break;
    }

    console.log(currentScene.numChildren);
}

window.onload = preload;