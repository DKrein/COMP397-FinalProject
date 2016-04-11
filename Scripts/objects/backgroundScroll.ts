/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- Class which take care about the scroll of the background
Revision:
1. Since we don't have sky, the name was changed to better understanding
    
*/


module objects {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++
    export class BackgroundScroll extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        private _resetSize;
        
        // PUBLIC INSTANCE VARIABLES
        public backgroundResetCount:number;
        
        
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor(background) {
            super(background);
            this._resetSize = (this.width - config.Screen.WIDTH) * -1;
            
            this._speed.x = 5; //speed which background moves
            this._reset(this._resetSize);
            this.backgroundResetCount = 0;
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check bounds of background and reset if needed
            
            if(this.x >= value) {
                this._reset(this._resetSize);
            }
        } 
        
        // reset the background offscreen
        protected _reset(value:number):void {
            this.x = value;
            this.backgroundResetCount += 1;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            // scroll the background 5 px per frame
            this.x += this._speed.x;
            this._checkBounds(0);
        }
    }
}