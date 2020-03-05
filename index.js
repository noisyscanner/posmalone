import { Model, Printer, WebUSB } from 'escpos-buffer';
import printReceipt from './printReceipt';
import receipt from './receipt';

let printer;

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
        filters: [
          {
            classCode: 7,
          },
        ],
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

  printReceipt(printer, receipt);
}

document.querySelector('button').addEventListener('click', connectAndPrint);
