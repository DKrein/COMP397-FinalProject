module objects {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    export class Stalactite extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor() {
            super("stalactite");
            
           this._reset(this._leftBounds);
           this.name = "stalactite";
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
            
            this.x = value;
            this.y = 1;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds + 100);
        }
    }
}