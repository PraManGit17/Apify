import React, { useEffect, useState } from 'react';

const Input_Schema = ({ selectedActor, fetchinputschema, schema }) => {
  const [showSchema, setShowSchema] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false); 
    setShowSchema(!!schema);
    
    console.log(loading)
    console.log(schema)
  }, [schema]);

  const fetchSchema = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowSchema(false); 
    await fetchinputschema();
  };

  const stripDescriptions = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(stripDescriptions);
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (key !== 'description') {
          newObj[key] = stripDescriptions(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };

  return (
    <div className='h-[70vh] flex flex-col gap-4 w-[25%] bg-gray-100 py-4 px-5 rounded-xl'>
      <div className='text-lg font-medium'>Input Schema</div>
      <div className='border border-blue-400 w-full'></div>

      <form className='flex flex-col items-start gap-2 mt-2'>
        <label>Check Input Schema</label>
        <input
          type='text'
          name='api-key'
          value={selectedActor.name || ''}
          className='w-full px-2 py-1 bg-white rounded-lg outline-none hover:cursor-pointer placeholder:text-gray-400 placeholder:px-2'
          readOnly
        />
        <button
          className='px-3 py-1 bg-blue-500 rounded-sm text-white font-medium text-sm hover:bg-blue-600 hover:cursor-pointer'
          onClick={fetchSchema}
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      <div className='border border-blue-400 w-full'></div>

      <div className='h-full w-full overflow-hidden flex items-center justify-center'>
        {loading ? (
          <div className='w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'></div>
        ) : showSchema && schema ? (
          <div className="h-full w-full overflow-auto bg-white p-2 rounded-lg text-sm">
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(stripDescriptions(schema), null, 2)}
            </pre>
          </div>
        ) : (
          <div className='text-gray-500 text-sm'>No Schema For This Actor</div>
        )}
      </div>
    </div>
  );
};

export default Input_Schema;
