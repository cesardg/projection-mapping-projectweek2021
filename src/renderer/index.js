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
const $dis2 = document.querySelector(".dis2")
const $dis3 = document.querySelector(".dis3")
const $dis4 = document.querySelector(".dis4")

const $button1 = document.querySelector(".button1")

  // Initial range
  const istart = 40;
  const istop = 100;
  // Desired range
  const ostart = 0;
  const ostop = 1;

board.on("ready", () => {
    const potentiometer1 = new Sensor("A0");
    potentiometer1.on("change", () => {
        const {value, raw} = potentiometer1;
        $rot1.textContent = value;
        document.querySelector(".img1").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer2 = new Sensor("A2");
    potentiometer2.on("change", () => {
        const {value, raw} = potentiometer2;
        $rot2.textContent = value;
        document.querySelector(".img2").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer3 = new Sensor("A5");
    potentiometer3.on("change", () => {
        const {value, raw} = potentiometer3;
        $rot3.textContent = value;
        document.querySelector(".img3").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer4 = new Sensor("A4");
    potentiometer4.on("change", () => {
        const {value, raw} = potentiometer4;
        $rot4.textContent = value;
         document.querySelector(".img4").style.transform = `rotate(${value/2.84}deg)`;
    });

    const proximity1 = new Proximity({controller: "HCSR04",pin: 7});
    proximity1.on("change", () => {
        const { centimeters } = proximity1;
        console.log(centimeters);
        const opacity = ostop - map(centimeters);
        $dis1.textContent = centimeters;
        if (centimeters < 1000){
         //document.querySelector(".img1").style.opacity = opacity;
         console.log("de persoon is aanwezig")
        } else {
            console.log("de persoon is weg")
        }
    });

    const proximity2 = new Proximity({controller: "HCSR04",pin: 4});
    proximity2.on("change", () => {
        const { centimeters } = proximity2;
        console.log(centimeters);
        const opacity = ostop - map(centimeters);
        $dis2.textContent = centimeters;
        if (centimeters < 1000){
         //document.querySelector(".img1").style.opacity = opacity;
         console.log("de persoon is aanwezig")
        } else {
            console.log("de persoon is weg")
        }
    });

    const proximity3 = new Proximity({controller: "HCSR04",pin: 8});
    proximity3.on("change", () => {
        const { centimeters } = proximity3;
        console.log(centimeters);
        const opacity = ostop - map(centimeters);
        $dis3.textContent = centimeters;
        if (centimeters < 1000){
         //document.querySelector(".img1").style.opacity = opacity;
         console.log("de persoon is aanwezig")
        } else {
            console.log("de persoon is weg")
        }
    });


    const proximity4 = new Proximity({controller: "HCSR04",pin: 12});
    proximity4.on("change", () => {
        const { centimeters } = proximity4;
        console.log(centimeters);
        const opacity = ostop - map(centimeters);
        $dis4.textContent = centimeters;
        if (centimeters < 1000){
         //document.querySelector(".img1").style.opacity = opacity;
         console.log("de persoon is aanwezig")
        } else {
            console.log("de persoon is weg")
        }
    });


    /*
    const button = new Button(12);

    button.on("down", function() {
        console.log("down");
        $button1.textContent = "yes"
    });
    */

});

  const map = (value) => {
    if (value < istart) value = istart;
    if (value > istop) value = istop;
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };  



