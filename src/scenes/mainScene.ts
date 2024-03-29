import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export interface MainSceneData {
    score: number;
}

export default class MainScene extends Phaser.Scene {
    fpsText: FpsText;
    score: number;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("button", "assets/button.png");
    }
    create() {
        this.fpsText = new FpsText(this);

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        const button = this.add.image(400, 300, "button").setInteractive();
        this.score = 0;
        let scoreText = this.add.text(50, 50, "Score: 0", {
            fontSize: "30px",
            color: "black",
        });

        button.on("pointerup", () => {
            this.score++;
            scoreText.setText("Score: " + this.score);

            if (this.score === 5) {
                this.scene.start("scene1", { score: this.score });
            }
        });
    }

    update() {
        this.fpsText.update();
    }
}
