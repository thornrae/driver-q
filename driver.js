'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

io.connect(host);

const faker = require('faker');

const capsConnection = io.connect(`${host}/caps`);

require('dotenv').config();

capsConnection.on('pickup', pickUp);
capsConnection.on('in-transit', delivered);
capsConnection.on('received', removed)

function pickUp(payload){
  setTimeout( () => {
    console.log(`DRIVER: picked up ${payload.storeName} order # ${payload.orderId}`);
    capsConnection.emit('in-transit', payload)
  }, 1000)
}

function delivered(payload){
  setTimeout( () => {
    console.log(`DRIVER: delivered ${payload.storeName} order #: ${payload.orderId}`);

    // let messageId = faker.datatype.number();

    capsConnection.emit('delivered', payload)
    console.log('delivered payload', payload)
  
  }, 3000)


}
//is this the right place to emmit recieved? 

function removed(payload){
  console.log('order has been removed from q')
}