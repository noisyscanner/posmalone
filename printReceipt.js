/* eslint-disable no-param-reassign */
import { Align, Image, Style } from 'escpos-buffer';
import moment from 'moment';
import { PNG } from 'pngjs';
import { getBorderCharacters, table } from 'table';
import logoUrl from './elephant.png';

const CASH = 'CASH';
const MPESA = 'M-PESA';

let logo;
async function getLogo() {
  if (!logo) {
    logo = await fetch(logoUrl)
      .then((response) => response.arrayBuffer())
      .then(
        (buffer) => new Promise((resolve, reject) => {
          new PNG({ filterType: 4 }).parse(buffer, (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(data);
          });
        }),
      )
      .then((png) => new Image(png));
  }
  return logo;
}

function printClinicDetails(printer, receipt) {
  const { invoice, clinic } = receipt;
  const { type } = invoice;
  const [address] = clinic.addresses;

  printer.writeln(clinic.name, Style.DoubleHeight | Style.Bold, Align.Center);
  printer.writeln([address.street, address.city].join('\n'), null, Align.Center);
  printer.writeln(
    `${type} payment receipt`,
    Style.DoubleHeight | Style.Bold,
    Align.Center,
  );
  printer.writeln('');
}

function printHeader(printer, receipt) {
  printClinicDetails(printer, receipt);
  const { patientDetails, passportID, invoice } = receipt;
  const { firstname, lastname } = patientDetails.basicInformation;
  printer.writeln(`Patient name: ${firstname} ${lastname}`);
  printer.writeln(`Patient ID: ${passportID}\n`);
  printer.writeln(`Invoice number: ${invoice.invoiceNumber}\n`, Style.Bold);
}

function printItems(printer, receipt) {
  const { columns } = printer;
  const paddingRight = 1;
  const qtyWidth = 5;
  const currencyWidth = 10;
  const nameWidth = columns - qtyWidth - currencyWidth - paddingRight * 3;

  const tableData = receipt.invoice.careEvents.map((careEvent) => {
    const { eventPrice, quantity, price } = careEvent;
    const { totalAmount, currency } = price;
    return [eventPrice.name, `x${quantity}`, `${totalAmount} ${currency}`];
  });

  const careEventTable = table(tableData, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight,
      width: columns / 3,
    },
    drawHorizontalLine: (i, size) => i * 2 < size,
    columns: {
      0: {
        width: nameWidth,
      },
      1: {
        width: qtyWidth,
        alignment: 'right',
      },
      2: {
        width: currencyWidth,
        alignment: 'right',
      },
    },
  });
  printer.write(careEventTable);
  printer.writeln(
    Array(printer.columns)
      .fill('_')
      .join(''),
    Style.DoubleHeight | Style.Bold | Style.Underline,
    Align.Center,
  );
  printer.writeln('');
}

function printTotal(printer, receipt) {
  const { columns } = printer;
  const { totalPaid, currency } = receipt.invoice;
  const leftText = 'Paid';
  const rightText = `${totalPaid} ${currency.toUpperCase()}`;
  const spaceCount = columns - leftText.length - rightText.length;
  const spaces = Array(spaceCount)
    .fill(' ')
    .join('');
  printer.writeln(
    `${leftText}${spaces}${rightText}`,
    Style.DoubleHeight | Style.Bold,
  );
  printer.writeln('');
}

async function printFooter(printer, receipt) {
  const {
    transactions,
    meta: { created },
    issuer: {
      reporterDetails: { person: reporter },
    },
  } = receipt.invoice;
  const paymentMethod = transactions[0].method === 'MPESA' ? MPESA : CASH;
  const paymentAuthCode = transactions[0].authCode;
  const timestamp = moment(created).format('DD/MM/YYYY hh:mm');

  printer.writeln(`Payment type: ${paymentMethod}`);
  if (paymentAuthCode) {
    printer.writeln(`Safaricom code: ${paymentAuthCode}`);
  }
  printer.writeln(`Served by: ${reporter.firstname} ${reporter.lastname}`);
  printer.writeln(`On: ${timestamp}`);
  printer.writeln('');
  printer.alignment = Align.Center;
  printer.draw(await getLogo());
  printer.alignment = Align.Left;
}

export default async function printReceipt(printer, receipt) {
  printHeader(printer, receipt);
  printItems(printer, receipt);
  printTotal(printer, receipt);
  await printFooter(printer, receipt);
  printer.feed(6);
  printer.cutter();
}
