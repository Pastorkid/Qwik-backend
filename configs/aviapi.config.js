// aviapages.config.js
const axios = require('axios');

const buildRequestConfig=(data) =>{
  return {
    method: 'post',
    url: 'https://frc.aviapages.com/flight_calculator/',
    headers: {
      'Content-Type':'application/json',
      Authorization: process.env.AVID_API_TOKEN, // Replace with your Aviapages API token
    },
    data: data,
  };
}

module.exports = { buildRequestConfig };
