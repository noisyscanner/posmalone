import {Printer, Style, Align, Model, WebUSB} from 'escpos-buffer'

let printer;

const EPSON_VENDOR_ID = 1208;
const output = 'Hello Elephants! Receipt printing working directly from the browser! No drivers required! :D'.replace(/ /g, '\n');

async function getDevice() {
  try {
    // Re-setup previously allowed devices
    let [device] = await navigator.usb.getDevices()
    if (!device) {
      // Request permission first time
      device = await navigator.usb.requestDevice({
        filters: [{
          vendorId: EPSON_VENDOR_ID
        }]
      });
    }
    return setup(device);
  } catch {
    console.error(err);
  }
}

async function setup(device) {
  const model = new Model('TM-T20')
  const connection = new WebUSB(device)
  await connection.open();
  return new Printer(model, connection)
}

async function connectAndPrint() {
  try {
    if (!printer) {
      printer = await getDevice();
    }
  } catch (err) {
    console.error(err);
  }

  printer.writeln(output);
  printer.feed(6)
  printer.cutter()
  printer.write(connection.buffer())
}

document.querySelector('button').addEventListener('click', connectAndPrint)
