import React, { useState } from 'react';
import axios from 'axios';
import Actors from './components/Actors';
import Input_Schema from './components/Input_Schema';
import RunActor from './components/RunActor';

const API_BASE = 'http://localhost:5000/apify';

const App = () => {
  const [apikey, setApikey] = useState('');
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState('');
  const [schema, setSchema] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');

  const fetchactors = async () => {
    try {
      const res = await axios.post(`${API_BASE}/actors`, { apikey });
      setActors(res.data.data.items);
    } catch (err) {
      console.log(err.response?.data?.error || 'Failed To Fetch Actors');
    }
  };

  const fetchinputschema = async () => {
    if (!selectedActor?.name) {
      alert("Select an actor first!");
      return;
    }
    const id = `apify~${selectedActor.name}`;
    try {
      const res = await axios.post(`${API_BASE}/schema`, {
        apiKey: apikey,
        actorId: id,
      });
      setSchema(res.data);
    } catch (err) {
      setSchema(null);
      console.error(err.response?.data?.error || 'Failed to fetch schema');
    }
  };

  const runactor = async (inputData) => {
    if (!selectedActor || !selectedActor.name) {
      alert("Please select an actor before running!");
      return;
    }

    const id = `apify~${selectedActor.name}`;
    console.log('Running with inputData:', inputData);
    try {
      const run = await axios.post(`${API_BASE}/run`, {
        apikey,
        actorId: id,
        input: inputData
      });

      const runId = run.data.data.id;
      console.log('Run ID:', runId);

      let currentStatus = '';
      do {
        const poll = await axios.post(`${API_BASE}/run-status`, {
          apikey,
          runId,
        });
        currentStatus = poll.data.status;
        setStatus(currentStatus);
        await new Promise(resolve => setTimeout(resolve, 3000));
      } while (!['SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT'].includes(currentStatus));

      if (currentStatus === 'SUCCEEDED') {
        const result = await axios.post(`${API_BASE}/run-results`, {
          apikey,
          runId,
        });
        setOutput(JSON.stringify(result.data.data, null, 2));
        console.log(output);
      } else {
        alert(`Actor run ${currentStatus.toLowerCase()}.`);
      }

    } catch (err) {
      console.log(err.response?.data?.error || 'Failed to run actor');
    }
  };


  return (
    <div className='flex flex-col'>
      <div className='w-full h-full py-4 px-30 flex items-center gap-2 shadow-sm shadow-gray-900'>
        <div className='py-6 w-2 bg-blue-500 rounded-full'></div>
        <div className='text-4xl font-semibold'>Apify</div>
      </div>

      <div className='flex items-center justify-center gap-5 px-10 py-15 w-full'>
        <Actors
          apikey={apikey}
          setApikey={setApikey}
          actors={actors}
          fetchactors={fetchactors}
          selectedActor={selectedActor}
          setSelectedActor={setSelectedActor}
        />
        <Input_Schema
          selectedActor={selectedActor}
          fetchinputschema={fetchinputschema}
          schema={schema}
        />
        <RunActor
          setInputData={setInputData}
          runactor={runactor}
          status={status}
          output={output}
        />
      </div>
    </div>
  );
};

export default App;
