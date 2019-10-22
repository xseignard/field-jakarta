# DMX Addressing

## General information

The devices are controlled by DMX, through Vezér, a DMX timeline editor.

DMX is sent thanks to a Enttec OpenDMX ethernet via Art-Net.

## Devices

### Enttec OpenDMX ethernet

Ref: https://www.enttec.com.au/product/lighting-communication-protocols/dmx512/ethernet-dmx-converter/

Configured with:
- IP: 2.0.0.2
- sub universe: 0
- universe: 0

### Francis search light

Custom made, generic ref: https://www.francis.co.uk/wp-content/uploads/2018/11/polaris-moonraker.pdf

DMX chart

| DMX address | function           | notes |
|-------------|--------------------|-------|
| 1           | lamp & focus motor | 0-120: all off, 121-200: lamp on, motor off, 201-250: all on |
| 2 | shutter speed                |       |
| 3 | shutter position             |       |
| 4 | focus speed                  |       |
| 5 | focus position               |       |

### SGM Q-2

Ref: https://sgmlight.com/products/architectural/q%C2%B72-poi

In 6 channels RAW mode (eg. Shutter, intensity, R, G, B, W).

First one has a start address of 6.
Second one has a start address of 12.

| DMX address | function  | notes                   |
|-------------|-----------|-------------------------|
| 1           | shutter   | 0-7: closed, 8-15: open |
| 2           | intensity |                         |
| 3           | R         |                         |
| 4           | G         |                         |
| 5           | B         |                         |
| 6           | W         |                         |

### Fog

Ref: https://www.liteputer.com.tw/products/dx-1220-dx-1210-dx-1230/

Controlled via DMX dimmer, with 2 modules, pump and nozzles. Start address is 18.

| DMX address | function | notes            |
|-------------|----------|------------------|
| 1           | pump     | 0: off, 255: on  |
| 2           | nozzles  | 0: off, 255: on  |