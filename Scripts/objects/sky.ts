module objects {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++
    export class Sky extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        
        
        // PUBLIC INSTANCE VARIABLES
        public skyResetCount:number;
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor(background) {
            super(background);
            
           this._speed.x = 5; //sky speed
           this._reset(0);
           this.skyResetCount = 0;
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check to see if the top of the sky 
            // is met the top of the scene
            
            //console.log(this.x);
            if(this.x >= value) {
                this._reset(-1219);
            }
        }
        
        // reset the sky offscreen
        protected _reset(value:number):void {
            this.x = value;
            this.skyResetCount += 1;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            // scroll the sky 5 px per frame
            this.x += this._speed.x;
            this._checkBounds(0);
        }
    }
}