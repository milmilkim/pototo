import { useCallback, useEffect, useState } from 'react';
import ImageWrapper from './ImageWrapper';
import { usePalette } from 'color-thief-react';

interface Props {
  imageSrc: string;
  // eslint-disable-next-line no-unused-vars
  clickHandler?: (imageSrc: string, data?: string[]) => void;
}

const Thumbnail: React.FC<Props> = ({ imageSrc, clickHandler }) => {
  const { data, loading } = usePalette(imageSrc, 10, 'rgbString', {
    crossOrigin: 'anonymous',
  });

  const [colors, setColors] = useState<string[]>([])


  useEffect(() => {
    if (data) {
      const color1 = data[0].replace(')', ', 0.7)').replace('rgb', 'rgba');
      const color2 = data[1].replace(')', ', 0.5)').replace('rgb', 'rgba');
      setColors([color1, color2]);
    }
  }, [data]); 

  const handleClickThumbnail = () => {
    if(loading) return;
    if (clickHandler) {
      clickHandler(imageSrc, colors);
    }
  }

  return (
    <div
      onClick={() => handleClickThumbnail()}
      className={`aspect-9/16 relative cursor-pointer`}
      style={{
        background: data
          ? `linear-gradient(135deg, ${colors[0]}, ${colors[1]}), #fff`
          : '#fff',
      }}>
      <ImageWrapper
        isShow={!loading}
        src={imageSrc}
        className='object-contain w-full h-full'
        alt='image'
      />
    </div>
  );
};

export default Thumbnail;
