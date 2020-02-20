import {
  Printer, Style, Align, WebUSB, Model,
} from 'escpos-buffer';

let printer;

const EPSON_VENDOR_ID = 1208;
const output = 'Hello Elephants! Receipt printing working directly from the browser! No drivers required! :D'.replace(/ /g, '\n');

async function setup(device) {
  const model = new Model('TM-T20');
  const connection = new WebUSB(device);
  await connection.open();
  return new Printer(model, connection);
}

async function getDevice() {
  try {
    // Re-setup previously allowed devices
    let [device] = await navigator.usb.getDevices();
    if (!device) {
      // Request permission first time
      device = await navigator.usb.requestDevice({
        filters: [{
          vendorId: EPSON_VENDOR_ID,
        }],
      });
    }
    return setup(device);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function connectAndPrint() {
  try {
    if (!printer) {
      printer = await getDevice();
    }
  } catch (err) {
    console.error(err);
  }

  printer.writeln('MALINDI SUB-COUNTY HOSPITAL', Style.DoubleHeight | Style.Bold, Align.Center);
  printer.writeln('P.O. BOX 4- 80200', null, Align.Center);
  printer.writeln('MALINDI', null, Align.Center);
  printer.writeln('Tel No: 0702744917, 0725784998', null, Align.Center);
  printer.writeln('0787080746, 0771086431', null, Align.Center);
  printer.writeln(output);
  printer.feed(6);
  printer.cutter();
}

document.querySelector('button').addEventListener('click', connectAndPrint);
