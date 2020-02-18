import Printer from './printer';

let printer;

const EPSON_VENDOR_ID = 1208;
const output = 'Hello Elephants! Receipt printing working directly from the browser! No drivers required! :D'.replace(/ /g, '\n');

async function connect() {
  const selectedDevice = await navigator.usb.requestDevice({
    filters: [{
      vendorId: EPSON_VENDOR_ID
    }]
  });
  return Printer.setup(selectedDevice);
}

async function connectAndPrint() {
  try {
    if (!printer) {
      printer = await connect();
    }

    await printer.print(output);
  } catch (err) {
    console.error(err);
  }
}

// Re-setup previously allowed devices
navigator.usb.getDevices()
  .then(async ([device]) => {
    if (!device) return;
    printer = await Printer.setup(device);
  })
  .catch(console.error);

document.querySelector('button').addEventListener('click', connectAndPrint)
