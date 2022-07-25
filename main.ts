ESP8266.onWifiConnected(function () {
    basic.showIcon(IconNames.Yes)
})
ESP8266.onMQTTDisonnected(function () {
    basic.showIcon(IconNames.Sad)
})
ESP8266.onMQTTConnected(function () {
    basic.showIcon(IconNames.Heart)
})
ESP8266.initializeWifi(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200)
ESP8266.setWifi("Logos_Other", "Wifi2235")
ESP8266.setMQTT(
"broker.mqttdashboard.com",
8000,
"",
"",
""
)
let trigger = false
let here = false
ESP8266.connectmqtt()
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        trigger = false
        for (let index = 0; index <= 30; index++) {
            basic.pause(1000)
            if (pins.digitalReadPin(DigitalPin.P1) == 1) {
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
