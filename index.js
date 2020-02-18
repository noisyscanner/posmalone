let device;

const EPSON_VENDOR_ID = 1208;
const output = 'Hello Elephants! Receipt printing working directly from the browser! No drivers required! :D'.replace(/ /g, '\n');

async function setup(device) {
  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);
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

async function connectAndPrint() {
  if (!device) {
    try {
      const selectedDevice = await navigator.usb.requestDevice({
        filters: [{
          vendorId: EPSON_VENDOR_ID
        }]
      });
      device = selectedDevice;
      await setup(device);
    } catch (err) {
      console.error(err);
    }
  }

  await print(output);
}

// Re-setup previously allowed devices
navigator.usb.getDevices()
  .then(devices => {
    if (devices.length > 0) {
      device = devices[0];
      setup(device);
    }
  })
  .catch(console.error);

document.querySelector('button').addEventListener('click', connectAndPrint)
