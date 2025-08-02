import React from 'react';
import Actors from './components/Actors';
import Input_Schema from './components/Input_Schema';
import axios from 'axios';
import { useState } from 'react';

const API_BASE = 'http://localhost:5000/apify';


const App = () => {

  const [apikey, setApikey] = useState('');
  const [actors, setActors] = useState([]);
  const [runId, setRunId] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const [schema, setSchema] = useState(null);


  const fetchactors = async () => {
    try {
      const res = await axios.post(`${API_BASE}/actors`, { apikey });
      setActors(res.data.data.items);
    } catch (err) {
      console.log(err.response?.data?.error || 'Failed To Fetch Actors');
    }
  }

  const fetchinputschema = async () => {
    console.log(apikey)
    console.log(actors);
    console.log(selectedActor);
    console.log(schema);
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


  return (
    <div className='flex flex-col'>
      <div className='w-full h-full py-4 px-30 flex items-center gap-2 shadow-sm shadow-gray-900'>
        <div className='py-6 w-2 bg-blue-500 rounded-full'></div>
        <div className='text-4xl font-semibold'>Apify</div>
      </div>

      <div className='flex items-center justify-center gap-5 px-10 py-15 w-full'>
        <Actors apikey={apikey} setApikey={setApikey} actors={actors} fetchactors={fetchactors} selectedActor={selectedActor} setSelectedActor={setSelectedActor} />
        <Input_Schema selectedActor={selectedActor} fetchinputschema={fetchinputschema} schema={schema} />
      </div>
    </div>
  )
}

export default App
