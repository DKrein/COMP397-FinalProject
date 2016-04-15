module objects {
    // KeyboardControls Class +++++++++++++++
    export class KeyboardControls {
        // PUBLIC INSTANCE VARIABLES ++++++++++++
        public changeToLevel2: boolean;
        public changeToLevel3: boolean;
        public enabled: boolean;
        public paused: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        constructor() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }

        // PUBLIC METHODS
        
        public onKeyDown(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case 50: /* Number 2 */
                    this.changeToLevel2 = true;
                    break;
                case 51: /* Number 3 */
                    this.changeToLevel3 = true;
                    break;
            }
        }

        public onKeyUp(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case 50: /* Number 2 */
                    this.changeToLevel2 = false;
                    break;
                case 51: /* Number 3 */
                    this.changeToLevel3 = false;
                    break;
            }
        }
    }
}