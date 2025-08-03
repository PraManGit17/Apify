import React, { useState } from 'react';

const Actors = ({ apikey, setApikey, actors, fetchactors, selectedActor, setSelectedActor }) => {
  const [showActors, setShowActors] = useState(false);
  const [loading, setLoading] = useState(false); 
  

  const handleValidate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetchactors();
    setShowActors(true);
    setLoading(false); 
  };

  const handleActorChange = (e) => {
    const selectedId = e.target.value;
    const fullActor = actors.find(actor => actor.id === selectedId);
    setSelectedActor(fullActor);
  };

  return (
    <div className='h-[70vh] flex flex-col gap-4 w-[25%] bg-gray-100 py-4 px-5 rounded-xl'>
      <div className='text-lg font-medium'>Actors list</div>
      <div className='border border-blue-400 w-full'></div>

      <form className='flex flex-col items-start gap-2 mt-2'>
        <label>Validate Your Api-Key</label>
        <input
          type='text'
          name='api-key'
          value={apikey}
          onChange={e => setApikey(e.target.value)}
          placeholder='Enter Your Api-Key'
          className='w-full px-1 py-1 bg-white rounded-lg outline-none placeholder:text-gray-400 placeholder:px-2 '
        />
        <button
          className='flex items-center justify-center gap-2 px-3 py-1 bg-blue-500 rounded-sm text-white font-medium text-sm hover:bg-blue-600 hover:cursor-pointer disabled:opacity-60'
          onClick={handleValidate}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a10 10 0 100 20v-4l-4 4 4 4v-4a8 8 0 01-8-8z" />
              </svg>
              Validating...
            </>
          ) : (
            'Validate'
          )}
        </button>
      </form>

      <div className='border border-blue-400 w-full'></div>

      <div className='h-full w-full'>
        {apikey && showActors ? (
          actors.length === 0 ? (
            <div className='flex items-center justify-center'>
              No actors for this API key. Verify Your Api-Key
            </div>
          ) : (
            <div className='flex flex-col px-8'>
              <div className='text-lg font-medium'>Available Actors:</div>
              <ul className="list-disc">
                {actors.map((actor) => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>

              <div className='mt-4'>
                <label htmlFor="actor-select" className="text-md font-medium">Select an Actor:</label>
                <select
                  id="actor-select"
                  className="border border-gray-400 px-2 py-1 rounded w-full mt-1"
                  onChange={handleActorChange}
                  value={selectedActor?.id || ''}
                >
                  <option value="">-- Choose an actor --</option>
                  {actors.map((actor) => (
                    <option key={actor.id} value={actor.id}>
                      {actor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )
        ) : (
          <div className='text-sm text-gray-600'>Enter Your Api-Key To View Your Actors</div>
        )}
      </div>
    </div>
  );
};

export default Actors;
