import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({ key: "LoadScene" });
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("smb_tiles", "mapPack_tilesheet.png");

        const loadingBar = this.add.graphics();
        loadingBar.fillStyle(0x0000ff, 1);
        this.load.on('progress', (value: number) => {
            loadingBar.clear();
            loadingBar.fillRect(320, 240, 200 * value, 20);
        });

        this.add.text(320, 200, 'Loading...', { font: '24px Arial', color: '#ffffff' }).setOrigin(0.5);
    }

    create() {
        // this.scene.start('GenMapScene');
        const sprite = this.add.sprite(320, 240, "smb_tiles");

        sprite.setScale(0.5);
    }
}
