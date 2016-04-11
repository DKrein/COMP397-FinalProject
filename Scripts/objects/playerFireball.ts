/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- Object for player's fireball
Revision:
1. Created class for player's fireball object
    
*/

module objects {
    // playerFireball CLASS ++++++++++++++++++++++++++++++++++++
    export class PlayerFireball extends objects.GameObject {

        public isAvailable: boolean;

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        private _player: objects.Player;

        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor(player: objects.Player) {
            super("playerFireball");
            this.isAvailable = true;

            this._player = player;
            this._speed.x = 5;
            this.x = this._leftBounds - 100;
            this.name = "playerFireball";
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++


        // PROTECTED METHODS ++++++++++++++++++++++++++++
        // reset the playerFireball offscreen
        protected _reset(value: number): void {
            this.isAvailable = true;
            this.x = this._rightBounds;
            this.y = this._bottomBounds + 100;
        }

        protected _checkBounds(value: number): void {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x <= value) {
                this._reset(this._rightBounds + 100);
            }
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update(): void {
            // scroll the fireball left the screen
            this.x -= this._speed.x;
            this._checkBounds(this._leftBounds);
        }

        public PositionFireBall(): void {
            this.isAvailable=false;
            this.y = this._player.y - 30;
            this.x = this._player.x - 80;
        }

    }
}