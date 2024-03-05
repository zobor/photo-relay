import classNames from 'classnames';
import './index.scss';

interface IconProps {
  className?: string[] | Record<string, boolean>;
  type: string;
  fill?: string;
  size?: number;
  onClick?: () => void;
}

export default function Icon({ className, type, fill, size, onClick }: IconProps) {
  return (
    <svg
      className={classNames('icon', className)}
      style={size ? { fill, width: size, height: size } : { fill }}
      onClick={onClick}
    >
      <use xlinkHref={`#svg__icon__${type}`}></use>
    </svg>
  );
}
