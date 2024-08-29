import { useState } from 'react';
import Pototo from './Pototo';

const App = () => {
  const [status] = useState('home');

  return (
    <main className='md:w-full lg:w-[500px] h-screen lg:h-[calc(100vh-1rem)] lg:my-2 max-h-[890px] m-auto rounded-lg bg-main-bg overflow-auto flex flex-col'>
      {status === 'home' ? (
        <div className='flex flex-col h-full'>
          <div className='my-2 justify-center items-center w-full text-center'>
            <h2>blah blah</h2>
          </div>
          <div className='flex gap-2 justify-between h-32 p-2'>
            <div className=' w-1/2 bg-common rounded-lg flex justify-center items-center'>
              1
            </div>
            <div className=' w-1/2 bg-common rounded-lg flex justify-center items-center'>
              2
            </div>
          </div>

          <div className='bg-white mt-5 flex-grow overflow-auto grid grid-cols-3 gap-1'>
            <div className='bg-red-300 aspect-9/16'>1</div>
            <div className='bg-red-300 aspect-9/16'>2</div>
            <div className='bg-red-300 aspect-9/16'>3</div>
            <div className='bg-red-300 aspect-9/16'>3</div>
            <div className='bg-red-300 aspect-9/16'>3</div>
            <div className='bg-red-300 aspect-9/16'>3</div>
            <div className='bg-red-300 aspect-9/16'>3</div>
            <div className='bg-red-300 aspect-9/16'>3</div>
            <div className='bg-red-300 aspect-9/16'>3</div>

          </div>
        </div>
      ) : (
        <Pototo />
      )}
    </main>
  );
};

export default App;
