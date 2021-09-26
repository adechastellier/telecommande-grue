let action_en_cours = ""
let action = ""
let v_x = 0
let bouton = 0
let v_y = 0
radio.setGroup(1)
basic.forever(function () {
    v_y = Math.trunc(4.7 - Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, 0, 5))
    bouton = pins.analogReadPin(AnalogPin.P0)
    v_x = Math.trunc(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, 0, 5))
    basic.clearScreen()
    if (bouton < 10) {
        led.plot(0, 4)
        led.plot(4, 0)
        led.plot(4, 4)
        led.plot(0, 0)
        if (v_x > 2) {
            action = "droite"
        } else if (v_x < 2) {
            action = "gauche"
        } else {
            action = "stop"
        }
    } else {
        if (v_x > 2) {
            action = "eloigne"
        } else if (v_x < 2) {
            action = "rapproche"
        } else {
            if (v_y > 2) {
                action = "descend"
            } else if (v_y < 2) {
                action = "monte"
            } else {
                action = "stop"
            }
        }
    }
    led.plot(v_x, v_y)
    if (action != action_en_cours) {
        action_en_cours = action
        radio.sendString("" + (action))
    }
    basic.pause(100)
})
