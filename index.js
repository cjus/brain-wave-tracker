/**
* @name brain-wave-tracker
* @summary entry point
* @description Brain Wave Tracker
*/

const dgram = require('dgram');
const oscmin = require('osc-min');

/**
* @name main
* @description dddd
* @returns {undefined}
*/
let main = async () => {
  const server = dgram.createSocket('udp4');
  server.on('message', (msg, rinfo) => {
    const message = oscmin.fromBuffer(msg);
    const type = message.elements[0].address;
    const args = message.elements[0].args;

    if (type.includes('eeg') || type.includes('acc')) {
      return;
    }

    // console.log(JSON.stringify(message, null, 2));

    // if (type.includes('touching_forehead')) {
    //   console.log(' ');
    //   console.log(`Headset: ${args[0].value === 1 ? 'On' : 'Off'}`);
    // }

    if (type.includes('gyro')) {
      console.log(`Head tracking: X:${args[0].value}, Y:${args[1].value}, Z:${args[2].value}`);
    }

    // if (type.includes('alpha')) {
    //   console.log(`  Alpha: ${args[0].value}`);
    // }
    // if (type.includes('beta')) {
    //   console.log(`  Beta : ${args[0].value}`);
    // }
    // if (type.includes('delta')) {
    //   console.log(`  Delta: ${args[0].value}`);
    // }
    // if (type.includes('theta')) {
    //   console.log(`  Theta: ${args[0].value}`);
    // }
    // if (type.includes('gamma')) {
    //   console.log(`  Gamma: ${args[0].value}`);
    // }
  });

  server.on('listening', () => {
    let address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(43134);
};

main();
