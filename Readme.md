# TinyCade Pico8 Boilerplate

Hi! This repo should have everything you need to get started making games for the Tinycade project with Pico 8. We chose Pico 8 because it is a super accessible game making tool and comes with a really simple build for web export.

## Getting Started
First you are going to want to download/clone this repository. It would also be good to make sure you have Pico 8 installed already at this time. Once you have the folder installed, you will also need to set up some kind of localhost server. If you are at all familiar with [Nodejs](https://nodejs.org/en/) we recommend using the npm package `http-server`.

### Android
To test your code on android without having to upload your files to a remote surver, follow [these steps](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/) to get port forwarding set up in with the device.

### iOS
TBD, Right now I am using [NGROK](https://ngrok.com/) to test on iPhone, since I don't know how to do port forwarding just yet

## Using your own Cart
To use your own cart simply export your Pico 8 project for web as you normally would, then replace `cart.js` in this directory with the generated javascript file and rename it to cart.js.

## Beholder Controls
Details for the API behind how the controls work can be found in the [beholder-detection](https://www.npmjs.com/package/beholder-detection) package's documentation. For a simple example of passing data directly in to Pico 8, check out tinycade-controls.

### Making Your Own
To create controls, you will need to use markers from the Original Aruco marker dictionary. You can grab svgs of these markers from [here](https://chev.me/arucogen/). We recommend you stick within the range of 0-99 for marker ids. Make sure to select `Original Aruco` from the dropdown.

To program controls there are two approaches you can take. One is via passing data through the GPIO as shown in the example included in this repo, the other is by manually triggering Pico8 inputs by modifying the controls array. To do this simply push bits to the buttons array at index 0 like so.
```
pico8_buttons[0] |= 1; // Set left to on
pico8_buttons[0] &= ~1; // Set left to off

pico8_buttons[0] |= 2; // Set right to on
pico8_buttons[0] &= ~2; // Set right to off
```

## TODO
Add pdf of instructions or at least a link to it from here