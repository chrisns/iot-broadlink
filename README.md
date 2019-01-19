# iot-broadlink

[![](https://images.microbadger.com/badges/image/chrisns/iot-broadlink.svg)](https://microbadger.com/images/chrisns/iot-broadlink "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/chrisns/iot-broadlink.svg)](https://microbadger.com/images/chrisns/iot-broadlink "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/commit/chrisns/iot-broadlink.svg)](https://microbadger.com/images/chrisns/iot-broadlink "Get your own commit badge on microbadger.com")

Wire up the cheap broadlink devices to aws-iot

## Devices supported
 - [x] A1
 - [ ] RM2

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