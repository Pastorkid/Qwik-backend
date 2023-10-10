configFunction=(data)=>{
  return  config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://frc.aviapages.com/flight_calculator/",
    headers: {
      "Content-Type": "text/plain",
      Authorization: process.env.AVID_API_TOKEN,
    },
    data
  };
}
module.exports={configFunction}