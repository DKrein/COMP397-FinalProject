/*
Author: Douglas Krein, Christine Cho, Francis Ofougwuka
Last Modified by: Christine Cho
Last Modified: 04/9/2016
File description: 
- Object for enemy's fireball
Revision:
1. Created class for enemy's fireball object
    
*/

module objects {
    // playerFireball CLASS ++++++++++++++++++++++++++++++++++++
    export class BossFireball extends objects.GameObject {

        public isAvailable: boolean;

        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        private _boss: objects.Boss;

        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor(boss: objects.Boss) {
            super("enemyFireball");
            this.isAvailable = true;

            this._boss = boss;
            this._speed.x = 10;
            this.x = this._rightBounds + 100;
            this.name = "enemyFireball";
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++


        // PROTECTED METHODS ++++++++++++++++++++++++++++
        // reset the playerFireball offscreen
        protected _reset(value: number): void {
            this.isAvailable = true;
            this.x = this._leftBounds;
            this.y = this._bottomBounds + 100;
        }

        protected _checkBounds(value: number): void {
            // check to see if the top of the fireball 
            // is outside the viewport         
            if (this.x >= value) {
                this._reset(this._leftBounds - 100);
            }
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update(): void {
            // scroll the fireball left the screen
            this.x += this._speed.x;
            this._checkBounds(this._rightBounds);
        }

        public PositionFireBall(): void {
            this.isAvailable=false;
            this.y = this._boss.y + 30;
            this.x = this._boss.x + 80;
        }
      
    }
}