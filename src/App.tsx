import { useState } from 'react';
import Pototo from './Pototo';

const App = () => {
  const [status, setStatus] = useState('canvas');

  return (
    <main className='md:w-full lg:w-[1024px] max-h-screen m-auto bg-green-500 overflow-auto'>
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
    </main>
  );
};

export default App;
