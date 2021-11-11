require('./reset.css');
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

  let index = 0;

board.on("ready", () => {
    const potentiometer1 = new Sensor("A0");
    potentiometer1.on("change", () => {
        const {value, raw} = potentiometer1;
        $rot1.textContent = value;
        console.log("test")
        document.querySelector(".img2-container").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer2 = new Sensor("A2");
    potentiometer2.on("change", () => {
        const {value, raw} = potentiometer2;
        $rot2.textContent = value;
        document.querySelector(".img3-container").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer3 = new Sensor("A5");
    potentiometer3.on("change", () => {
        const {value, raw} = potentiometer3;
        $rot3.textContent = value;
        document.querySelector(".img4-container").style.transform = `rotate(${value/2.84}deg)`;
    });

    const potentiometer4 = new Sensor("A4");
    potentiometer4.on("change", () => {
        const {value, raw} = potentiometer4;
        $rot4.textContent = value;
         document.querySelector(".img5-container").style.transform = `rotate(${value/2.84}deg)`;
    });

    // const proximity1 = new Proximity({controller: "HCSR04",pin: 7});
    // proximity1.on("change", () => {
    //     const { centimeters } = proximity1;
    //     //console.log(centimeters);
    //     const opacity = ostop - map(centimeters);
    //     $dis1.textContent = centimeters;
    //     if (centimeters < 1000){
    //      //document.querySelector(".img1").style.opacity = opacity;
    //      //console.log("de persoon is aanwezig")
    //     } else {
    //         //console.log("de persoon is weg")
    //     }
    // });

    // const proximity2 = new Proximity({controller: "HCSR04",pin: 4});
    // proximity2.on("change", () => {
    //     const { centimeters } = proximity2;
    //     //console.log(centimeters);
    //     const opacity = ostop - map(centimeters);
    //     $dis2.textContent = centimeters;
    //     if (centimeters < 1000){
    //      //document.querySelector(".img1").style.opacity = opacity;
    //      //console.log("de persoon is aanwezig")
    //     } else {
    //        // console.log("de persoon is weg")
    //     }
    // });

    // const proximity3 = new Proximity({controller: "HCSR04",pin: 8});
    // proximity3.on("change", () => {
    //     const { centimeters } = proximity3;
    //     //console.log(centimeters);
    //     const opacity = ostop - map(centimeters);
    //     $dis3.textContent = centimeters;
    //     if (centimeters < 1000){
    //      //document.querySelector(".img1").style.opacity = opacity;
    //     // console.log("de persoon is aanwezig")
    //     } else {
    //       //  console.log("de persoon is weg")
    //     }
    // });


    // const proximity4 = new Proximity({controller: "HCSR04",pin: 12});
    // proximity4.on("change", () => {
    //     const { centimeters } = proximity4;
    //    // console.log(centimeters);
    //     const opacity = ostop - map(centimeters);
    //     $dis4.textContent = centimeters;
    //     if (centimeters < 1000){
    //      //document.querySelector(".img1").style.opacity = opacity;
    //     // console.log("de persoon is aanwezig")
    //     } else {
    //       //  console.log("de persoon is weg")
    //     }
    // });


    
    const button = new Button(2);

    button.on("down", function() {
        console.log("down");
        $button1.textContent = "yes"
        handlePushButton();
    });
    

});



const handlePushButton  = () => {
    index ++;
    index%=2;

    document.querySelector(`.img1`).classList.toggle(`flipped`);
           setTimeout(() => {
       
        document.querySelector(`.img1`).setAttribute(`src`, `/${index}/ring-00.png`);
       
        }, 500);

    setTimeout(() => {
        document.querySelector(`.img2`).classList.toggle(`flipped`);
        setTimeout(() => {
       
        document.querySelector(`.img2`).setAttribute(`src`, `/${index}/ring-01.png`);
       
        }, 500);
    }, 200);

    setTimeout(() => {
        document.querySelector(`.img3`).classList.toggle(`flipped`);
        setTimeout(() => {
       
        document.querySelector(`.img3`).setAttribute(`src`, `/${index}/ring-02.png`);
       
        }, 500);
    }, 400);

    setTimeout(() => {

        document.querySelector(`.img4`).classList.toggle(`flipped`);
        setTimeout(() => {
       
        document.querySelector(`.img4`).setAttribute(`src`, `/${index}/ring-03.png`);
       
        }, 500);
    }, 600);

    setTimeout(() => {
        document.querySelector(`.img5`).classList.toggle(`flipped`);
         setTimeout(() => {
       
        document.querySelector(`.img5`).setAttribute(`src`, `/${index}/ring-04.png`);
       
        }, 500);
    }, 800);
    



   

}

document.addEventListener(`keyup`, handlePushButton);

  const map = (value) => {
    if (value < istart) value = istart;
    if (value > istop) value = istop;
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };  



