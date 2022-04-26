import _ from "../cradova/index.js";
export default function timer() {
    let second = 60,
    minute = 60,
    hour = 1,
    c = 0,
    w = 3,
    water = 3,
    showHour = document.getElementById('hour'),
    showMinute = document.getElementById('minute'),
    showSecond = document.getElementById('second'),
        t = false;
    
    
    /**
     * There are probably ten billion way to do this, it's my first coding project i took and am
     *  not ashamed of being too lazy to refractor the code
     */
    
    const set = {
        time: ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
             "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",  "25", "26",
            "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
            "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54",
            "55", "56", "57", "58", "59"], hr: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    }

    function timeCB(){
        try {
            return showSecond.innerText = set.time[second], showMinute.innerText = set.time[minute], showHour.innerText = set.hr[hour];
        } catch (e) {
        console.log(e);
        };
    }
    timeCB()
    if (minute === 0  && hour === 0) {
        t = true
    }
    // for seconds
function seconds() {
    if (second > 0 && !t) {
        second--
        if (second === 0) {
            second = 60
        }
    }else{
        if (t && second > 0) {
            second--
        }
    }
}
// for minutes
function minutes() {
    if (minute > 0) {
        minute--
        if (minute === 0) {
            minute = 60
        }
    }else{
        if (hour === 0 && minute > 0) {
            minute--
    }
    }
}
// for hours
function hours() {
    if (hour > 0 ) {
        hour--
    }
}
setInterval(timeCB, 458);
setInterval(seconds, 1000);
setInterval(minutes, 60000);
setInterval(hours, 3600000);
function waterUp(){
    c += 5
    if (water < 50) {
        water += Math.random() * 10
        w += Math.random() * 4
    }else{
        water = 3
        water -= Math.random() * 3
        w = 1
        w -= Math.random() * 10
    };

    _.dispatch({ style: { top: `${w * Math.random() * 10}px`, right: `${w * Math.random() * 120}px`, background: `linear-gradient(0deg,hsla(${c}, 97%, 58%, 0.8) 40%, hsla(105, 14%, 95%, 0.6) 65%)` } }, "ball1")
    _.dispatch({style: {top: `${w * Math.random() * 10}px`, right : `${w * Math.random() * 60}px`, background : `linear-gradient(0deg,hsla(${c}, 97%, 58%, 0.8) 40%, hsla(105, 14%, 95%, 0.6) 65%)`} }, "ball2");
    _.dispatch({style: {top: `${w * Math.random() * 10}px`, right : `${w * Math.random() * 30}px`, background : `linear-gradient(0deg,hsla(${c}, 97%, 58%, 0.8) 40%, hsla(105, 14%, 95%, 0.6) 65%)`} }, "ball3")
    _.dispatch({style: {background : `linear-gradient(0deg,rgba(0, 255, 255, 1) ${water}%, rgba(0, 255, 255, 0.7) 0%)`} }, "time")
}
waterUp()
setInterval(() => {
waterUp()
}, 900);
}