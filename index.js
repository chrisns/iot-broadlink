const broadlink = require('broadlinkjs')
const b = new broadlink()
const Iot = require("@chrisns/iot-shorthand")
const iot = new Iot()

const { POLLING_TIME = 30 } = process.env

const event_handler = (event, thing_name) => {
  console.log(thing_name, event)
}

b.on("deviceReady", async dev => {
  if (dev.type === "A1") {
    await iot.discovered({
      name: `broadlink_${dev.mac.toString('hex')}`,
      type: "broadlink",
      attributes: {
        model: dev.type,
        ip: dev.host.address,
      }
    })
    dev.on("payload", (err, payload) =>
      iot.report(`broadlink_${dev.mac.toString('hex')}`, {
        temperature: (payload[0x4] * 10 + payload[0x5]) / 10.0,
        humidity: (payload[0x6] * 10 + payload[0x7]) / 10.0,
        light: payload[0x8],
        air_quality: payload[0x0a],
        noise: payload[0xc]
      }))
    setInterval(() => dev.check_sensors(), POLLING_TIME * 1000)
  }
  console.log(dev.type)

  if (dev.type === "RM2") {
    await iot.discovered({
      name: `broadlink_${dev.mac.toString('hex')}`,
      type: "broadlink",
      attributes: {
        model: dev.type,
        ip: dev.host.address,
      }
    }, payload => {
      if (payload.enterLearning === true)
        dev.enterLearning()

      if (payload.checkData === true)
        dev.checkData()

      if (payload.sendData)
        dev.sendData(Buffer.from(payload.sendData, 'binary'))
    })
    dev.on("rawData", rawData => {
      iot.report(`broadlink_${dev.mac.toString('hex')}`, {
        lastreceived: rawData.toString('binary')
      })
    })

  }
})



b.discover()