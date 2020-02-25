# POS-Malone

Simple page to experiment with WebUSB for thermal printers.
Currently supports the Epson TM-T20 but should work with others.
Uses the `[escpos-buffer](https://github.com/grandchef/escpos-buffer)` library for generating the ESC/POS commands.
Uses Parcel for bundling.

## Run
```commandline
$ yarn start
```

Go to https://localhost:1234. It has to be https because WebUSB requires it. Ignore the security warning.


# Debugging
Check the console for errors - nothing will be displayed on the page.
