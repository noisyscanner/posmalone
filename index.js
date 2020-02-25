import {
  Align, Model, Printer, Style, WebUSB,
} from 'escpos-buffer';

let printer;

const EPSON_VENDOR_ID = 1208;

const getOutput = () => document.getElementById('output').value;

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

  printer.writeln('JACKSON COUNTY HOSPITAL', Style.DoubleHeight | Style.Bold, Align.Center);
  printer.writeln('P.O. BOX 4- 01001', null, Align.Center);
  printer.writeln('AMERICA', null, Align.Center);
  printer.writeln('Tel No: 15552022, 29933392', null, Align.Center);
  printer.writeln('hospital@jackson.tx', null, Align.Center);
  printer.writeln(getOutput());
  printer.feed(6);
  printer.cutter();
}

document.querySelector('button').addEventListener('click', connectAndPrint);
