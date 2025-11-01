import { Image, type ImageProps } from 'react-native';

export type TweetAvatarProps = Omit<ImageProps, 'className'> & {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const Avatar = ({ 
  size = 'md', 
  className,
  ...props 
}: TweetAvatarProps) => {
  return (
    <Image
      className={`${sizeClasses[size]} rounded-full ${className || ''}`}
      {...props}
    />
  );
};

