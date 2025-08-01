
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

export const getActorSchema = async (req, res) => {
  const { apikey, actorId } = req.body;

  console.log('Running actor with:', { actorId, apikey, input });

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
    const response = await axios.post(
      `https://api.apify.com/v2/acts/${actorId}/runs`,
      input,
      {
        params: { token: apikey },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {

    // console.error('Run error:', err?.response?.data || err.message);
    res.status(400).json({
      error: 'Actor run failed',
      details: err?.response?.data || err.message,
    });
  }
};


export const getRunStatus = async (req, res) => {
  const { apikey, actorId } = req.body;

  try {
    const response = await axios.get(
      `https://api.apify.com/v2/acts/${actorId}/runs/last`,
      {
        params: { token: apikey },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const fullData = response.data.data;
    const filtered = {
      status: fullData.status,
    };

    //     const filtered = {
    //   id: fullData.id,
    //   actId: fullData.actId,
    //   userId: fullData.userId,
    //   startedAt: fullData.startedAt,
    //   finishedAt: fullData.finishedAt,
    //   status: fullData.status,
    //   meta: fullData.meta,
    // };

    res.status(200).json(filtered);
  } catch (err) {
    res.status(400).json({ error: 'Failed to check run status' });
  }
};

