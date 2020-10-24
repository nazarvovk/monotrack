require('dotenv').config();
const push = require('web-push');

const keys = {
  publicKey: process.env.PUSH_PUBLIC_KEY,
  privateKey: process.env.PUSH_PRIVATE_KEY,
};
console.log('keys : ', keys);

push.setVapidDetails(
  'mailto:donicman@gmail.com',
  keys.publicKey,
  keys.privateKey
);

let sub = {
  endpoint:
    'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABflAEc2VypQqTDZ7r70FcmCqxry3KezO2hEaNb1EMyIGh-ne5x9ZLP0qbb33DqoE9HRVWB3vPi0Uw9u8z7Uv1P0jDb_1t32H2CQVuKhjYihbDyWcUqWQCleZh3AuWSmxiV1ty_RebZ9RRgC02o09jdCW0j6D6KD009zYErkze6GvjG6r4',
  keys: {
    auth: 'nFTLcjKdvsT6cp9c6MttPg',
    p256dh:
      'BEuc2T8xNjwHCFTK5S3ioLCiOfsv2C_hf8UJbkUPywDuKnREJHB2cmHt3K2c8DCnYZC4rcTTbDi7Gq4tm1OGUrQ',
  },
};
push.sendNotification(sub, 'test message');
