import { useEffect, useState } from 'react';
import Pototo from './Pototo';
import { BsCardImage, BsFillFolderFill } from 'react-icons/bs';
import { getImageList } from './firebase/storage';
import { type StorageReference } from 'firebase/storage';
import Thumbnail from './components/ui/Thumbnail';

type Status = 'home' | 'canvas';
const App = () => {
  const [status, setStatus] = useState<Status>('home');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<StorageReference[] | any[]>([]);

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [gradientColors, setGradientColors] = useState<string[]>([]);

  const fetchImages = async () => {
    const res = await getImageList();
    setImages(res.images);
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main className='md:w-full lg:w-[500px] h-screen lg:h-[calc(100vh-1rem)] lg:my-2 max-h-[890px] m-auto rounded-lg bg-main-bg overflow-auto flex flex-col'>
      {status === 'home' ? (
        <div className='flex flex-col h-full'>
          <div className='my-2 justify-center items-center w-full text-center'>
            <h2>blah blah</h2>
          </div>
          <div className='flex gap-2 justify-between h-32 p-2'>
            <div className=' w-1/2 bg-common rounded-lg flex justify-center items-center'>
              <BsCardImage />
            </div>
            <div className=' w-1/2 bg-common rounded-lg flex justify-center items-center'>
              <BsFillFolderFill />
            </div>
          </div>

          <div className='mt-5 flex-grow overflow-auto grid grid-cols-3 gap-1'>
            {images.map((image, index) => (
              <Thumbnail
                key={index}
                imageSrc={image}
                clickHandler={(imageSrc, colors) => {
                  setSelectedImageUrl(imageSrc);
                  if (colors) {
                    setGradientColors(colors);
                  }
                  setStatus('canvas');
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => setStatus('home')}>뒤로가기</button>
          <Pototo
            backgroundImage={selectedImageUrl}
            gradientColors={gradientColors}
          />
        </>
      )}
    </main>
  );
};

export default App;
