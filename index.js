const broadlink = require('broadlinkjs')
const b = new broadlink()
const Iot = require("@chrisns/iot-shorthand")
const iot = new Iot()

const { POLLING_TIME = 30 } = process.env

b.on("deviceReady", async dev => {

  iot.discovered({
    name: `broadlink_${dev.mac.toString('hex')}`,
    type: "broadlink",
    attributes: {
      model: dev.type,
      ip: dev.host.address,
    }
  })

  if (dev.type === "A1") {
    dev.on("payload", (err, payload) =>
      iot.report(`broadlink_${dev.mac.toString('hex')}`, {
        temperature: (payload[0x4] * 10 + payload[0x5]) / 10.0,
        humidity: (payload[0x6] * 10 + payload[0x7]) / 10.0,
        light: payload[0x8],
        air_quality: payload[0x0a],
        noise: payload[0xc]
      }))
    setInterval(() => dev.check_sensors(), POLLING_TIME * 1000 || 60000)
  }
  // if (dev.type === "RM2") {
  //   dev.on("rawData", (err, rawData) =>
  //     publish(dev.mac.toString('hex'), { rawData: rawData })
  //   )
  //   setInterval(() => dev.checkData(), POLLING_TIME)
  // }
  console.log("found device", thing.thingName, thing)
})

b.discover()