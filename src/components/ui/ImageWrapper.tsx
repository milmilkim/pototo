import { useState } from 'react';
import Skeleton from './Skeleton';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  isShow?: boolean;
}

const ImageWrapper: React.FC<Props> = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const mergedClassName = () => {
    return `${className ?? ''} ${!isShowSkeleton ? '' : 'hidden'} pointer-events-none`.trim();
  };

  const isShowSkeleton = !isLoaded || !props.isShow;

  return (
    <>
      {isShowSkeleton && <Skeleton />}
      <img
        className={mergedClassName()}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </>
  );
};

export default ImageWrapper;
