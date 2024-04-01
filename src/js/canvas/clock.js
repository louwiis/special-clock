import { deg2rad } from "../utils/MathUtils"

const drawLine = (context, color, x, y, length, angle, lineWidth) => {
    context.save()
    context.beginPath()

    // offset + rotate + color
    context.strokeStyle = color
    context.translate(x, y)
    context.rotate(angle) // ! radian
    context.lineWidth = lineWidth || 5

    // draw line
    context.moveTo(-length / 2, 0)
    context.lineTo(length / 2, 0)
    context.stroke()

    context.closePath()
    context.restore()
}

const drawCircle = (context, color, x, y, radius, lineWidth, hideCircle) => {
    if (hideCircle) return
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.lineWidth = 1
    context.strokeStyle = color
    context.stroke()
    context.closePath()
}

export class Clock {
    constructor(index, x, y, hours, minutes, seconds, mainRadius, color, lineWidth, hideCircle) {
        this.index = index

        switch (index) {
            case 1:
                this.x = x / 2 - mainRadius
                this.y = (y / 3) - mainRadius
                break
            case 2:
                this.x = x / 2 + mainRadius
                this.y = y / 3 - mainRadius
                break
            case 3:
                this.x = x / 2 - mainRadius
                this.y = (y / 3) * 2 - mainRadius
                break
            case 4:
                this.x = x / 2 + mainRadius
                this.y = (y / 3) * 2 - mainRadius
                break
            case 5:
                this.x = x / 2 - mainRadius
                this.y = (y / 3) * 2 + mainRadius
                break
            case 6:
                this.x = x / 2 + mainRadius
                this.y = (y / 3) * 2 + mainRadius
                break
        }
        
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.mainRadius = mainRadius
        this.lineWidth = lineWidth
        this.color = color
        this.hideCircle = hideCircle
    }

    update(hours, minutes, seconds, lineWidth, color, hideCircle) {
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.lineWidth = lineWidth
        this.color = color
        this.hideCircle = hideCircle

        console.log(this.hideCircle)
    }

    draw(context) {
        this.drawMainCircle(context)
        this.drawClockHands(context)
    }

    drawMainCircle(context) {
        const x_ = this.x
        const y_ = this.y
        const radius_ = this.mainRadius
        drawCircle(context, this.color, x_, y_, radius_, this.lineWidth, this.hideCircle)
    }

    drawClockHands(context) {
        const x_ = this.x
        const y_ = this.y
        const radius_ = this.mainRadius

        const hoursAngle = deg2rad(this.hours * 30 - 90)
        const minutesAngle = deg2rad(this.minutes * 30 - 90)
        const secondsAngle = deg2rad(this.seconds * 30 - 90)
        const hourX = x_ + Math.cos(hoursAngle) * (radius_ / 2)
        const hourY = y_ + Math.sin(hoursAngle) * (radius_ / 2)
        const minuteX = x_ + Math.cos(minutesAngle) * (radius_ / 2)
        const minuteY = y_ + Math.sin(minutesAngle) * (radius_ / 2)
        const secondX = x_ + Math.cos(secondsAngle) * (radius_ / 2)
        const secondY = y_ + Math.sin(secondsAngle) * (radius_ / 2)

        drawLine(context, this.color, hourX, hourY, radius_ - 10, hoursAngle, this.hours == 7.5 ? 1 : this.lineWidth)
        drawLine(context, this.color, minuteX, minuteY, radius_ - 10, minutesAngle, this.minutes == 7.5 ? 1 : this.lineWidth)
        drawLine(context, this.color, secondX, secondY, radius_ - 10, secondsAngle, this.seconds == 7.5 ? 1 : this.lineWidth)
    }
}