interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className }) => {
  const mergedClassName = `animate-pulse w-full h-full bg-gray-200 ${className}`;
  return (
      <div className={mergedClassName}>
      </div>
  );
};

export default Skeleton;
