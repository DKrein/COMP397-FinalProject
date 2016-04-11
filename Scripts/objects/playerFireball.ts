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
            this.x = this._rightBounds;
            this.y = this._bottomBounds + 100;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update(): void {
            // scroll the fireball left the screen
            this.x -= this._speed.x;
            this._checkBounds(this._leftBounds);
        }

        public PositionFireBall(): void {
            this.y = this._player.y - 30;
            this.x = this._player.x - 80;
        }

    }
}