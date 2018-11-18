const broadlink = require('broadlinkjs');
const b = new broadlink();
const AWS = require("aws-sdk")

const { AWS_IOT_ENDPOINT_HOST, POLLING_TIME } = process.env

const iot = new AWS.Iot()

const iotdata = new AWS.IotData({ endpoint: AWS_IOT_ENDPOINT_HOST, })

const update_thing = async (thingName, payload) => iotdata.updateThingShadow({
  thingName: thingName,
  payload: JSON.stringify({ state: { reported: payload } })
}).promise()

b.on("deviceReady", async dev => {
  const thing = {
    thingName: `broadlink_${dev.mac.toString('hex')}`,
    thingTypeName: "broadlink",
    attributePayload: {
      attributes:
      {
        model: dev.type,
        ip: dev.host.address,
      }
    }
  }

  try {
    await iot.updateThing(thing).promise()
  } catch (error) {
    await iot.createThing(thing).promise()
  }

  if (dev.type === "A1") {
    dev.on("payload", (err, payload) =>
      update_thing(thing.thingName, { temperature: (payload[0x4] * 10 + payload[0x5]) / 10.0, humidity: (payload[0x6] * 10 + payload[0x7]) / 10.0, light: payload[0x8], air_quality: payload[0x0a], noise: payload[0xc] })
    )
    setInterval(() => dev.check_sensors(), POLLING_TIME || 60000)
  }
  // if (dev.type === "RM2") {
  //   dev.on("rawData", (err, rawData) =>
  //     publish(dev.mac.toString('hex'), { rawData: rawData })
  //   )
  //   setInterval(() => dev.checkData(), POLLING_TIME)
  // }
  console.log("found device", thing.thingName, thing)
});

b.discover();