const axios = require('axios');

const shortenUrl = async () => {
  const options = {
    method: 'POST',
    url: 'https://url-shortener23.p.rapidapi.com/shorten',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '214317bfbemsh07407bb72ed8ccfp103ee4jsn9f28f2238dca',
      'X-RapidAPI-Host': 'url-shortener23.p.rapidapi.com'
    },
    data: {
      url: 'https://www.google.com',
      alias: 'google123'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Call the asynchronous function
shortenUrl();
