const cutCommand = "\x1B@\x1DV1";
const bottomPadding = '\n\n\n\n\n';

export default class Printer {
  constructor(device) {
    this.device = device;
  }

  static async setup(device) {
    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    return new Printer(device);
  }

  async print(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text + bottomPadding + cutCommand);
    await this.device.transferOut(1, data);
  }
}
