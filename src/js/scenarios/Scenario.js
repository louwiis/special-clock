import Scene from "../canvas/Scene"
import { Clock } from "../canvas/clock"
import { Numbers } from "../data"

export default class Scenario extends Scene {
    constructor(id, props = {}) {
        super(id)

        // Set initial values for properties
        this.number = props.number; // Set a default number if not provided
        this.clocks = [];

        // Initialize the canvas and elements
        this.initCanvas();
        this.initClocks();
        this.drawUpdate(); // Initial draw

        // debug
        this.params['line-width'] = 5
        this.params.color = "#000000"
        this.params['hide-circle'] = false

        // Debug setup
        this.setupDebug();
    }

    initCanvas() {
        // Perform any necessary canvas initialization here
        // For example, setting up the canvas dimensions
        this.resize();
    }

    initClocks() {
        const numbers = Numbers[this.number];
        for (let i = 1; i <= 6; i++) {
            const number = numbers[i];
            this.clocks.push(new Clock(i, this.width, this.height, number.hours, number.minutes, number.seconds, this.mainRadius, this.params.color, this.params['line-width']));
        }
    }

    setupDebug() {
        if (this.debug.active) {
            this.debugFolder.add(this.params, 'line-width', 2, 10)
            this.debugFolder.addColor(this.params, 'color')
            this.debugFolder.add(this.params, 'hide-circle')
        }
    }

    resize() {
        super.resize();

        // Set up dimensions and properties based on canvas size
        this.mainRadius = this.width < this.height ? this.width / 1.33 : this.height / 1.33;
        this.mainRadius *= .5;
        this.mainRadius *= .65;
        this.deltaRadius = this.mainRadius * .075;

        // Update clocks' positions and sizes
        this.updateClocks();
    }

    updateClocks() {
        if (!!this.clocks) {
            this.clocks.forEach((clock, index) => {
                clock.x = this.width / 2;
                clock.y = this.height / 2;
                clock.mainRadius = this.mainRadius;
            });
        }
    }

    update(props = {}) {
        if (!super.update()) return;

        if (props.number !== undefined) {
            this.number = props.number;
            this.initClocks();
            this.drawUpdate();
        }
    }

    drawUpdate(props = {}) {
        this.clear();

        if (!!this.clocks) {
            const numbers = Numbers[this.number];

            for (let i = 0; i < 6; i++) {
                const clock = this.clocks[i];
                const number = numbers[i + 1];
                clock.update(number.hours, number.minutes, number.seconds, this.params['line-width'], this.params.color, this.params['hide-circle']);
                clock.draw(this.context);
            }
        }

        // Style settings
        this.context.lineCap = 'round';
        this.context.strokeStyle = this.params.color;
        this.context.lineWidth = this.params['line-width'];
    }
}
