
import axios from 'axios';

const BASE_URL = "https://api.apify.com/v2";

export const getUserActors = async (req, res) => {
  const { apikey } = req.body;
  try {
    const response = await axios.get(`https://api.apify.com/v2/acts`, {
      params: { token: apikey }
    });

    res.json(response.data);

  } catch (err) {
    console.error('Run error:', err?.response?.data || err.message);
    res.status(400).json({
      error: 'Invalid API key or fetch failed',
      details: err?.response?.data || err.message,
    });
  }
};


export const getActorSchema = async (req, res) => {
  const { apiKey, actorId } = req.body;
  try {
    const response = await axios.get(`${BASE_URL}/acts/${actorId}`, {
      params: { token: apiKey }
    });

    const versions = response.data?.data?.versions || [];
    let inputSchema = null;
    for (const version of versions) {
      inputSchema = version.sourceFiles?.find(file => file.name === 'INPUT_SCHEMA.json');
      if (inputSchema) break;
    }
    if (!inputSchema) {
      return res.status(404).json({ message: "No Input Schema Available" });
    }
    const parsedInputSchema = JSON.parse(inputSchema.content);
    res.json(parsedInputSchema);

  } catch (err) {
    console.error('Run error:', err?.response?.data || err.message);
    res.status(400).json({
      error: 'Failed to fetch input schema',
      details: err?.response?.data || err.message,
    });
  }
};

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
    console.error('Run error:', err?.response?.data || err.message);
    res.status(400).json({
      error: 'Actor run failed',
      details: err?.response?.data || err.message,
    });
  }
};


export const getRunStatus = async (req, res) => {
  const { apikey, runId } = req.body;

  try {
    const response = await axios.get(
      `https://api.apify.com/v2/actor-runs/${runId}`,
      {
        params: { token: apikey },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const fullData = response.data.data;
    const filtered = {
      status: fullData.status,
    };

    res.status(200).json(filtered);
  } catch (err) {
    console.error('Run error:', err?.response?.data || err.message);
    res.status(400).json({
      error: 'Failed to check run status',
      details: err?.response?.data || err.message,
    });
  }
};

export const getRunResults = async (req, res) => {
  const { apikey, runId } = req.body;

  try {

    const response = await axios.get(`${BASE_URL}/actor-runs/${runId}/dataset/items`, {
      params: { token: apikey },
      headers: { 'Content-Type': 'application/json' },
    })

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Run error:', err?.response?.data || err.message);

    res.status(400).json({
      error: 'Failed to fetch actor results',
      details: err?.response?.data || err.message,
    });
  }
}

