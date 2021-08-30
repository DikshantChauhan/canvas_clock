const canvas = <HTMLCanvasElement>document.getElementById("canvas")
const audio = <HTMLAudioElement>document.getElementById("sound")
const butt = <HTMLButtonElement>document.getElementById("button")

const ctx = canvas.getContext("2d")

const canvasHeight = canvas.height
const canvasWidth = canvas.width

const clockRadius = canvasWidth/2 * 0.95
const numberDistance = clockRadius - 22

const handelSound = () =>{
    audio.currentTime = 0
    audio.play().then(() =>{
        butt.style.display = "none"
    }).catch(() =>{
        butt.style.display = "block"
        butt.innerHTML = "click to play sound"
    })
}

const drawCloakOuterFrame = () =>{
    ctx.save()
    ctx.translate(canvasWidth/2, canvasHeight/2)
    ctx.beginPath()
    ctx.arc(0, 0, clockRadius, 0, Math.PI*2)
    let gradient = ctx.createRadialGradient(0, 0, clockRadius*0.95, 0, 0, clockRadius)
    gradient.addColorStop(0, "white")
    gradient.addColorStop(0.2, "gray")
    gradient.addColorStop(0.6, "white")
    gradient.addColorStop(1, "gray")
    ctx.fillStyle = gradient
    ctx.fill()
}

const drawClockMiddelDot = () =>{
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, Math.PI*2)
    ctx.fillStyle = "black"
    ctx.fill()
}

const drawClockNumbers = () =>{
    ctx.rotate(Math.PI/180 * 180)
    ctx.font = `${clockRadius*0.08}px Arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for(let i = 1; i <= 12; i++){
        ctx.rotate(Math.PI/180 * 30)
        ctx.save()
        ctx.translate(4.1, numberDistance)
        ctx.rotate((Math.PI/180) * (180 - (30 * i)))
        ctx.fillText(i.toString(), 0, 0);
        ctx.restore()
    }
}

const drawHand = (time: number, length: number, thickness: number) =>{
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.rotate(Math.PI/180 * time)
    ctx.fillRect(-thickness/2, 0, thickness, length)
    ctx.beginPath()
    ctx.arc(0, length, thickness/2, 0, Math.PI*2)
    ctx.fill()
    ctx.restore()
}

const drawClockHands = () =>{
    let currentTime = new Date()
    const sec = currentTime.getSeconds()
    const min = currentTime.getMinutes()
    const hr = currentTime.getHours()
    let hrAngel
    if(hr > 12){
        hrAngel = (30 * (hr - 12)) + (1/2 * min)
    }else{
        hrAngel = (1/2*min) + (30 * hr)
    }
    
    drawHand(sec * 6, clockRadius*0.80, 1)
    drawHand(min * 6, clockRadius*0.60, 3)
    drawHand(hrAngel, clockRadius*0.40, 6)
}

const drawClock = () =>{
    drawCloakOuterFrame()
    drawClockMiddelDot()
    drawClockNumbers()
    drawClockHands()
}
ctx.save()
drawClock()
ctx.restore()
setInterval(() =>{
    ctx.save()
    ctx.clearRect(-canvasWidth/2, -canvasWidth/2, canvasWidth, canvasHeight)
    drawClock()
    handelSound()
    ctx.restore()
}, 1000)

