import React, { useState } from 'react';

const RunActor = ({ runactor, status, output }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(input);
      setIsLoading(true);
      await runactor(parsed); // Wait for actor to finish
    } catch (err) {
      console.error('JSON parsing error:', err);
      alert('Invalid JSON input!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-[70vh] flex flex-col gap-4 w-[25%] bg-gray-100 py-4 px-5 rounded-xl'>
      <div className='text-lg font-medium'>Run Actor</div>
      <div className='border border-blue-400 w-full'></div>

      <form className='flex flex-col items-start gap-2 mt-2'>
        <label>Enter Input & Run</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          cols={5}
          placeholder='Add JSON input'
          className='w-full px-1 py-1 bg-white rounded-lg outline-none placeholder:text-gray-400 placeholder:px-2'
        />
        <button
          className='px-3 py-1 bg-blue-500 rounded-sm text-white font-medium text-sm hover:bg-blue-600 hover:cursor-pointer'
          onClick={handleRun}
        >
          Run
        </button>
      </form>

      <div className='border border-blue-400 w-full'></div>

      <div className='h-full w-full overflow-scroll'>
        <div className='font-semibold'>Status:</div>
        <div className='text-blue-600 text-sm'>{status || 'No status yet'}</div>

        <div className='mt-2 font-semibold'>Output:</div>

        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && (
          <pre className='whitespace-pre-wrap text-xs'>
            {output ? output : 'No output available'}
          </pre>
        )}
      </div>
    </div>
  );
};

export default RunActor;
