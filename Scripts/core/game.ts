﻿/*
Author: Christine Cho, Douglas Krein, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/10/2016
File description: Manages assets and scene changes

Revision:
1. Added the Instructions and more images
2. Added Gameover image and hit/collect sounds
3. Added sounds to the scenes
4. Added exit button asset
5. Added Stalactite asset
6. Removed sounds from here, changed for scenes
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
var end: scenes.End;
var level1: scenes.Level1;
var level2: scenes.Level2;
var level3: scenes.Level3;

//GameController
var gameController: managers.DragonGameController;

var assetData: objects.Asset[] = [
    // Add your Assets here
    //Buttons
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "InstructionButton", src: "../../Assets/images/InstructionButton.png" },
    { id: "RestartButton", src: "../../Assets/images/RestartButton.png" },
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "ExitButton", src: "../../Assets/images/ExitButton.png" },
    
    //backgrounds
    { id: "menuBackground", src: "../../Assets/images/menuBackground.png" },
    { id: "instructionBackground", src: "../../Assets/images/instructionBackground.png" },
    { id: "gameOverBackground", src: "../../Assets/images/gameOverBackground.png" },
    { id: "level1Background", src: "../../Assets/images/level1Background.png" },
    { id: "level2Background", src: "../../Assets/images/level2Background.png" },
    
    //player
    { id: "playerBaby", src: "../../Assets/images/playerBaby.png" },
    { id: "player", src: "../../Assets/images/player.png" },
    { id: "playerFireball", src: "../../Assets/images/playerFireball.png" },
    
    //Enemies and Hazards
    { id: "dragonEnemy1", src: "../../Assets/images/dragonEnemy1.png" },
    { id: "dragonEnemy2", src: "../../Assets/images/dragonEnemy2.png" },
    { id: "dragonEnemy3", src: "../../Assets/images/dragonEnemy3.png" },
    { id: "dragonEnemy4", src: "../../Assets/images/dragonEnemy4.png" },
    { id: "stalactite", src: "../../Assets/images/stalactite.png" },
    { id: "stalagmite", src: "../../Assets/images/stalagmite.png" },
    { id: "boss", src: "../../Assets/images/boss.png" },
    
    //Collectbles 
    { id: "fire", src: "../../Assets/images/fire.png" },
    { id: "egg1", src: "../../Assets/images/egg1.png" },
    { id: "egg2", src: "../../Assets/images/egg2.png" },
    { id: "egg3", src: "../../Assets/images/egg3.png" },
    { id: "egg4", src: "../../Assets/images/egg4.png" },
    
    //collision musics
    { id: "hit", src: "../../Assets/audio/hit.mp3" },
    { id: "collect", src: "../../Assets/audio/collect.mp3" },
    
    //background musics
    { id: "gameOverBgMusic", src: "../../Assets/audio/gameover.mp3" },
    { id: "menuBgMusic", src: "../../Assets/audio/opening.mp3" },
    { id: "gameBgMusic", src: "../../Assets/audio/background.mp3" }
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
    
    // Intialize DragonGameController
    gameController = new managers.DragonGameController();

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
            console.log("Starting MENU Scene");
            break;
        case config.Scene.INSTRUCTION:
            // show the INSTRUCTION scene
            stage.removeAllChildren();
            instruction = new scenes.Instruction();
            currentScene = instruction;
            console.log("Starting INSTRUCTION Scene");
            break;
        case config.Scene.LEVEL1:
            // show the LEVEL1 scene
            stage.removeAllChildren();
            level1 = new scenes.Level1();
            currentScene = level1;
            console.log("Starting LEVEL1 Scene");
            break;
        case config.Scene.LEVEL2:
            // show the LEVEL2 scene
            stage.removeAllChildren();
            level2 = new scenes.Level2();
            currentScene = level2;
            console.log("Starting LEVEL2 Scene");
            break;
         case config.Scene.LEVEL3:
            // show the LEVEL3 scene
            stage.removeAllChildren();
            level3 = new scenes.Level3();
            currentScene = level3;
            console.log("Starting LEVEL3 Scene");
            break;
        case config.Scene.END:
            // show the END scene
            stage.removeAllChildren();
            end = new scenes.End();
            currentScene = end;
            console.log("Starting END Scene");
            break;

    }

}

window.onload = preload;