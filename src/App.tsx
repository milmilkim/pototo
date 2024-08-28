import { useState } from 'react';
import Pototo from './Pototo';

const App = () => {
  const [status, setStatus] = useState('home');

  return (
    <div className='bg-slate-500'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <button
        onClick={() =>
          setStatus((prev) => (prev === 'home' ? 'canvas' : 'home'))
        }>
        toggle
      </button>
      {status === 'home' ? (
        <div>
          <h1>home</h1>
        </div>
      ) : (
        <Pototo />
      )}
    </div>
  );
};

export default App;
