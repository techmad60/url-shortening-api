import axios from "axios";

const fetchData = async (url) => {
  try {
    const res = await axios.post(
      "https://url-shortener23.p.rapidapi.com/shorten",
      { url },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": '214317bfbemsh07407bb72ed8ccfp103ee4jsn9f28f2238dca',
          "X-RapidAPI-Host": "url-shortener23.p.rapidapi.com",
        },
      }
    );

    return res.data.short_url;
  } catch (error) {
    console.error(error);
    throw new Error("Error shortening URL. Please try again.");
  }
};

export default fetchData;