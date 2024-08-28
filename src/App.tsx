import { useState } from 'react';
import Pototo from './Pototo';

const App = () => {
  const [status, setStatus] = useState('home');

  return (
    <>
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
    </>
  );
};

export default App;
