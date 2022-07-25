ESP8266.onWifiConnected(function () {
    basic.showIcon(IconNames.Yes)
})
ESP8266.onMQTTDisonnected(function () {
    basic.showIcon(IconNames.Sad)
})
ESP8266.onMQTTConnected(function () {
    basic.showIcon(IconNames.Heart)
})
ESP8266.initializeWifi(SerialPin.P1, SerialPin.P2, BaudRate.BaudRate115200)
ESP8266.setWifi("Logos_Other", "Wifi2235")
ESP8266.setMQTT(
"broker.hivemq.com",
1883,
"",
"",
""
)
let trigger = false
let here = false
basic.pause(5000)
ESP8266.connectmqtt()
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        trigger = false
        for (let index = 0; index <= 30; index++) {
            basic.pause(1000)
            if (pins.digitalReadPin(DigitalPin.P8) == 1) {
                trigger = true
                break;
            }
        }
        if (trigger) {
            here = true
        } else {
            here = false
        }
    } else {
        here = true
    }
})
basic.forever(function () {
    if (here) {
        ESP8266.mqttpub("testtopic/18193", "Available")
    } else {
        ESP8266.mqttpub("testtopic/18193", "Do Not Disturb")
    }
})
