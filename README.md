# iot-broadlink

[![](https://images.microbadger.com/badges/image/chrisns/iot-broadlink.svg)](https://microbadger.com/images/chrisns/iot-broadlink "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/chrisns/iot-broadlink.svg)](https://microbadger.com/images/chrisns/iot-broadlink "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/commit/chrisns/iot-broadlink.svg)](https://microbadger.com/images/chrisns/iot-broadlink "Get your own commit badge on microbadger.com")

Wire up the cheap broadlink devices to aws-iot

## Devices supported
 - [x] A1
 - [x] RM2 (only IR)

To start either:
```bash
npm install
export AWS_ACCESS_KEY_ID=xxx
export AWS_REGION=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_IOT_ENDPOINT_HOST=xxx
npm start
```

Or to use Docker:
```bash
docker run \
  --rm \
  --net host \ 
  -e AWS_ACCESS_KEY_ID=xxx \ 
  -e AWS_REGION=xxx \
  -e AWS_SECRET_ACCESS_KEY=xxx \
  -e AWS_IOT_ENDPOINT_HOST=xxx \
  chrisns/iot-broadlink
```

Or to use Docker stack:
```bash
export AWS_ACCESS_KEY_ID=xxx
export AWS_REGION=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_IOT_ENDPOINT_HOST=xxx
docker deploy --compose-file docker-compose.yml ble
```

# To learn a new IR code:

Publish:

```json
{
  "state": {
    "desired": {
      "enterLearning":true
    }
  }
}
```

Push the button on the original remote; then publish:

```json
{
  "state": {
    "desired": {
      "checkData":true
    }
  }
}
```

You'll then find:

```json
{
  "reported": {
    "lastreceived": "&\u0000SOMETHING LIKE THIS\u0000"
  }
}
```

You can then send that code back to test you can now control that device:

```json
{
  "state": {
    "desired": {
      "sendData": "&\u0000SOMETHING LIKE THIS\u0000"
    }
  }
}
```

And now rejoice for you have iot-ified an IR device.