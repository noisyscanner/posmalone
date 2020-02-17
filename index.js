let device;

const EPSON_VENDOR_ID = 1208;
const output = 'Hello Elephants! Receipt printing working directly from the browser! No drivers required! :D'.replace(/ /g, '\n');

function setup(device) {
  return device.open()
    .then(() => device.selectConfiguration(1))
    .then(() => device.claimInterface(0))
}

async function print(text) {
  const bottomPadding = '\n\n\n\n\n';
  const encoder = new TextEncoder();
  const cutCommand = "\x1B@\x1DV1";
  const data = encoder.encode(text + bottomPadding + cutCommand);
  try {
    await device.transferOut(1, data);
  } catch (err) {
    console.error(err);
  }
}

function connectAndPrint() {
  if (device == null) {
    navigator.usb.requestDevice({
      filters: [{ vendorId: EPSON_VENDOR_ID }]
    })
      .then(selectedDevice => {
        device = selectedDevice;
        return setup(device);
      })
      .then(() => print(output))
      .catch(console.error)
  } else {
    print(output);
  }
}

navigator.usb.getDevices()
  .then(devices => {
    if (devices.length > 0) {
      device = devices[0];
      setup(device);
    }
  })
  .catch(console.error);

document.querySelector('button').addEventListener('click', connectAndPrint)
