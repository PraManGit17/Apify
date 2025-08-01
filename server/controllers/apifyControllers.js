
import axios from 'axios';

const BASE_URL = "https://api.apify.com/v2";

export const getUserActors = async (req, res) => {
  const { apikey } = req.body;
  try {
    const response = await axios.get(`${BASE_URL}/acts`, {
      params: { token: apikey }
    });

    res.json(response.data);

  } catch (error) {

    console.log(`Fetching error ${error}`);
    res.status(400).json({
      error: 'Invalid API key or fetch failed'
    });
  }
}

export const getactorsSchema = async (req, res) => {
  const { apikey, actorId } = req.body;

  try {

    const response = await axios.get(`${BASE_URL}/acts/${actorId}/input-schema`, {
      params: { token: apikey }
    })

    res.status(200).json(response.data);

  } catch (error) {

    res.status(400).json({
      error: 'Failed To fetch Input Schema'
    })
  }
}

export const runActor = async (req, res) => {
  const { apikey, actorId, input } = req.body;

  try {
    const response = await axios.post(`${BASE_URL}/acts/${actorId}/runs`, input, {
      params: { token: apikey }
    });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Actor run failed' });
  }
}
