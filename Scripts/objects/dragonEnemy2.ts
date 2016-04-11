/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- dragonEnemy2 object
Revision:
1. Created class for dragonEnemy2 object
2. fixed the name of the class
    
*/

module objects {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    export class DragonEnemy2 extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor() {
            super("dragonEnemy2");
            
           this._reset(this._leftBounds);
           this.name = "dragonEnemy2";
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if(this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        }
        
        // reset the fireball offscreen
        protected _reset(value:number):void {
            this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            //this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;
            
            this.x = value;
            this.y = (Math.floor(Math.random() * this._bottomBounds) + this._topBounds) - (this.height);
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        }
    }
}