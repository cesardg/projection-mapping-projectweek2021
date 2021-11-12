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

let rotChange1 = 0;
let rotChange2 = 0;
let rotChange3 = 0;
let rotChange4 = 0;
const rotChangeTreshold = 3;

let idle = true;
let time = 0;
let previousTime = 0;
let timer = 0;

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
        if (Math.abs(rotChange1 - value) > rotChangeTreshold)
        {
            //$rot1.textContent = value;
            document.querySelector(".img2-container").style.transform = `rotate(${value/2.84}deg)`;
            console.log("ik krijg iets binnen")
            previousTime = time;
        }
        rotChange1 = value;
    });

    const potentiometer2 = new Sensor("A2");
    potentiometer2.on("change", () => {
        const {value, raw} = potentiometer2;
        if (Math.abs(rotChange2 - value) > rotChangeTreshold)
        {
            document.querySelector(".img3-container").style.transform = `rotate(${value/2.84}deg)`;
            console.log("ik krijg iets binnen")
            previousTime = time;
        }
        rotChange2 = value;
    });

    const potentiometer3 = new Sensor("A5");
    potentiometer3.on("change", () => {
        const {value, raw} = potentiometer3;
        if (Math.abs(rotChange3 - value) > rotChangeTreshold)
        {
            document.querySelector(".img4-container").style.transform = `rotate(${value/2.84}deg)`;
            console.log("ik krijg iets binnen")
            previousTime = time;
        }
        rotChange3 = value;
    });

    const potentiometer4 = new Sensor("A4");
    potentiometer4.on("change", () => {
        const {value, raw} = potentiometer4;
        if (Math.abs(rotChange4 - value) > rotChangeTreshold)
        {
            document.querySelector(".img5-container").style.transform = `rotate(${value/2.84}deg)`;
            console.log("ik krijg iets binnen")
            previousTime = time;
        }
        rotChange4 = value;
    });

   

    
    const button = new Button(2);

    button.on("down", function() {
        console.log("down");
        //$button1.textContent = "yes"
        handlePushButton();
    });

    
});



const handlePushButton  = () => {

    console.log(`previousTime: ${previousTime}`);

    previousTime = time;

    if (idle){
        awake()
    } else {

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
}

document.addEventListener(`keyup`, handlePushButton);

const draw = ($time = 0) => {
    requestAnimationFrame(draw);
    time = Math.round($time/1000);
    timer = time - previousTime;

    if (timer > 8 && !idle){
        hibernate();
    }

}

const hibernate = () => {
    idle =  true;
    console.log(`kaat was hier`);
   
    if (document.querySelector(`.intro`).classList.contains(`invisible`)){
                     console.log("hier? 2")
        document.querySelector(`.intro`).classList.remove(`invisible`);
        }
    if (!document.querySelector(`.circles`).classList.contains(`scaling`)){
                    console.log("hier? 3")
        document.querySelector(`.circles`).classList.add(`scaling`);
        }

}

const map = (value) => {
    if (value < istart) value = istart;
    if (value > istop) value = istop;
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };  

const awake = () => {
          if (!document.querySelector(`.intro`).classList.contains(`invisible`)){
            document.querySelector(`.intro`).classList.add(`invisible`);
        }
        if (document.querySelector(`.circles`).classList.contains(`scaling`)){
            document.querySelector(`.circles`).classList.remove(`scaling`);
        }
       
        idle = false
}


draw();


