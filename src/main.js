import Scenario from "./js/scenarios/Scenario"

const getTime = () => {
    const today = new Date()
    const hours = today.getHours()
    const minutes = today.getMinutes()
    let hour1, hour2, minute1, minute2

    if (hours < 10) {
        hour1 = 0
        hour2 = hours
    } else {
        const split = hours.toString().split('')
        hour1 = parseInt(split[0])
        hour2 = parseInt(split[1])
    }
    
    if (minutes < 10) {
        minute1 = 0
        minute2 = minutes
    } else {
        const split = minutes.toString().split('')
        minute1 = parseInt(split[0])
        minute2 = parseInt(split[1])
    }

    return { hour1, hour2, minute1, minute2 }
}

setInterval(() => {
    let { hour1, hour2, minute1, minute2 } = getTime()
    scene.update({ number: hour1 })
    scene2.update({ number: hour2 })
    scene3.update({ number: minute1 })
    scene4.update({ number: minute2 })
}, 1000);

let { hour1, hour2, minute1, minute2 } = getTime()
const scene = new Scenario('hour1', { number: hour1 })
const scene2 = new Scenario('hour2', { number: hour2 })
const scene3 = new Scenario('minute1', { number: minute1 })
const scene4 = new Scenario('minute2', { number: minute2 })