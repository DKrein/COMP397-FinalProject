/**
 * Program: Web Gammming @ Centennial College
 * Source file: GameController.ts
 * Author: Francis Ofougwuka, Christine Cho, Douglas
 * Date modified: 14/04/2016
 * Last modified by: Christine Cho
 * Revison history: 
 * 1. Added boss health value
 */
module managers {
    //GameController Class
    //Why the hell the controller with game stuff is called dragon? -.-
    export class DragonGameController {

        //PRIVATE INSTANCE VARIABLE
        private _livesValue: number;
        private _scoreValue: number;
        private _bossValue: number;
        // private _fireValue: number;
        
        constructor() {

            this.reset();
            // this._fireValue = 0;
        }

        //GETTER AND SETTER for livesValuse and ScoreValue
        get LivesValue(): number {
            return this._livesValue;
        }
        set LivesValue(value : number) {
            this._livesValue = value;
        }

        get ScoreValue(): number {
            return this._scoreValue;
        }
        set ScoreValue(value : number) {
            this._scoreValue = value;
        }
        
        get BossValue(): number {
            return this._bossValue;
        }
        set BossValue(value : number) {
            this._bossValue = value;
        }
        
        public reset(): void {
            this._livesValue = 10;
            this._scoreValue = 0;
            this._bossValue = 10;
        }
        
        // get FireValue(): number {
        //     return this._fireValue;
        // }
        // set FireValue(value : number) {
        //     this._fireValue = value;
        // }


    }
}