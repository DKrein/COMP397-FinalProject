module objects {
    // FIREBALL CLASS ++++++++++++++++++++++++++++++++++++
    export class PlayerFireball extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        private _player: objects.Player;

        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor(player: objects.Player) {
            super("fireball");

            this._player = player;
            this._speed.x = 5;
            this._reset(this._rightBounds);
            this.name = "fireball";
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++


        // PROTECTED METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value: number): void {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x <= value) {
                this._reset(this._rightBounds + 100);
            }
        }

        // reset the fireball offscreen
        protected _reset(value: number): void {
            //this._speed.x = Math.floor(Math.random() * 5 + 1) + 5;
            //this._speed.y = Math.floor(Math.random() * 4 + 1) - 2;

            this.x = this._rightBounds;
            this.y = this._bottomBounds + 100;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update(): void {
            // scroll the fireball down the screen
            this.x -= this._speed.x;
            //this.y -= this._speed.y;
            this._checkBounds(this._leftBounds + 100);
        }

        public PositionFireBall(): void {

            console.log("_postionFireBall called");
            this.y = this._player.y;
            this.x = this._player.x;
        }

    }
}