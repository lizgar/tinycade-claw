// this is the js file to edit to change the control code
const Beholder = window['beholder-detection'];
let sliderMarker; // Global reference for our marker
let leftM, rightM, shootM;

// Update function for the Beholder detection. This causes the markers to update, all input code should be done here
function bUpdate() {
  // This updates Beholder and makes sure the computer vision code is run every frame.
  Beholder.update();
  
  // If marker 0 is present, lerp it's position from a pre-determined range to fit within 0-128 for pico 8
  // if (sliderMarker.center.x !== NaN && sliderMarker.center.x !== 0 && pico8_gpio) {
  //   let newTarget = (sliderMarker.center.x - 151) / (120) * 128;
  //   currx = currx + (newTarget - currx) * 0.4;

  //   // This sets data inside of the pico8_gpio array.
  //   // This value can be read from within the cart with   PEEK(0x5f80)
  //   pico8_gpio[0] = currx;

  //   // If you want to push a value to another spot in pico 8 memory just use another index in the array
  //   // You should only push numbers to this array :)
  //   pico8_gpio[1] = 42

  //   // To access this use PEEK(0x5f81), or PEEK(0x5f80 + 1) this can be usefull if you are looping through memory
  // }

  pico8_gpio[0] = leftM.present ? 0 : 1;
  pico8_gpio[1] = rightM.present ? 0 : 1;
  pico8_gpio[2] = shootM.present ? 0 : 1;

  // Queue up the next update iteration for the next frame
  requestAnimationFrame(bUpdate);
}

window.onload = () => {
  // Initialize the beholder detection library

  // This will not work on desktop, comment it out if you wish to test on desktop first for whatever reason
  Beholder.init('#tinycade-div', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  // For desktop testing only use this line
  // Beholder.init('#tinycade-div', { overlay_params: { present: true }, camera_params: { rearCamera: false, torch: false, videoSize: 0 } });

  // Get a reference to the marker with the id 0
  shootM = Beholder.getMarker(5);
  leftM = Beholder.getMarker(3)
  rightM = Beholder.getMarker(4);
  leftM.timeout = 150
  bUpdate()
}
