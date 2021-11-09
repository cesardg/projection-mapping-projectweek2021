require('./style.css');
const { Board, Sensor, Proximity, Button } = require("johnny-five");
const board = new Board({
    repl: false
});

const $rot1 = document.querySelector(".rot1")
const $rot2 = document.querySelector(".rot2")
const $rot3 = document.querySelector(".rot3")
const $rot4 = document.querySelector(".rot4")

const $dis1 = document.querySelector(".dis1")
const $button1 = document.querySelector(".button1")

board.on("ready", () => {
    const potentiometer1 = new Sensor("A5");
    potentiometer1.on("change", () => {
        const {value, raw} = potentiometer1;
        $rot1.textContent = value;
        document.querySelector(".img1").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer2 = new Sensor("A4");
    potentiometer2.on("change", () => {
        const {value, raw} = potentiometer2;
        $rot2.textContent = value;
        document.querySelector(".img2").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer3 = new Sensor("A2");
    potentiometer3.on("change", () => {
        const {value, raw} = potentiometer3;
        $rot3.textContent = value;
        document.querySelector(".img3").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer4 = new Sensor("A0");
    potentiometer4.on("change", () => {
        const {value, raw} = potentiometer4;
        $rot4.textContent = value;
         document.querySelector(".img4").style.transform = `rotate(${value/2.84}deg)`;
    });

    const proximity1 = new Proximity({controller: "HCSR04",pin: 7});
    proximity1.on("change", () => {
        const { centimeters } = proximity1;
        $dis1.textContent = centimeters
    });

    const button = new Button(12);

    button.on("down", function() {
        console.log("down");
        $button1.textContent = "yes"
    });

});

