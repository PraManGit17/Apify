import React from 'react'
import { useState } from 'react';
import { use } from 'react';

const Actors = ({ apikey, setApikey, actors, fetchactors }) => {

  const [showActors, setShowActors] = useState(false);

  if (!Array.isArray(actors)) return <p>Loading actors...</p>;

  const handleValidate = (e) => {
    e.preventDefault();
    fetchactors();
    setShowActors(true);
  }

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
        <button className='px-3  py-1 bg-blue-500 rounded-sm text-white font-medium text-sm hover:bg-blue-600 hover:cursor-pointer'
          onClick={handleValidate}>Validate</button>
      </form>
      <div className='border border-blue-400 w-full'></div>

      <div className='h-full w-full flex items-center justify-center'>
        {showActors ?

          (actors.length === 0 ?
            (
              <div>No actors for this API key. Verify Your Api-Key</div>
            ) :
            (
              <ul className="list-disc list-inside space-y-1">
                {actors.map((actor) => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            )

          )
          :
          (
            <div className='text-sm text-gray-600'>Enter Your Api-Key To View Your Actors</div>
          )
        }
      </div>
    </div>
  )
}

export default Actors
