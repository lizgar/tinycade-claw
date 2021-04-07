// this is the js file to edit to change the control code
const Beholder = window['beholder-detection'];
let sliderMarker; // Global reference for our marker
let currx = 64;

// Update function for the Beholder detection. This causes the markers to update, all input code should be done here
function bUpdate() {
  // This updates Beholder and makes sure the computer vision code is run every frame.
  Beholder.update();
  
  // If marker 0 is present, lerp it's position from a pre-determined range to fit within 0-128 for pico 8
  if (sliderMarker.center.x !== NaN && sliderMarker.center.x !== 0 && pico8_gpio) {
    let newTarget = (sliderMarker.center.x - 151) / (120) * 128;
    currx = currx + (newTarget - currx) * 0.4;
    // This sets data inside of the pico8_gpio array.
    // This value can be read from within the cart with   PEEK(0x5f80)
    pico8_gpio[0] = currx;
  }

  // Queue up the next update iteration for the next frame
  requestAnimationFrame(bUpdate);
}

window.onload = () => {
  // Initialize the beholder detection library
  // This will not work on desktop, comment it out if you wish to test on desktop first for whatever reason
  Beholder.init('#tinycade-div', { overlay_params: { present: true }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  // For desktop testing only use this line
  // Beholder.init('#tinycade-div', { overlay_params: { present: true }, camera_params: { rearCamera: false, torch: false, videoSize: 0 } });

  // Get a reference to the marker with the id 0
  sliderMarker = Beholder.getMarker(0);
  bUpdate()
}