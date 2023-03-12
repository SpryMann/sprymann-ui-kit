import CaretDownIcon from './CaretDownIcon';
import CheckIcon from './CheckIcon';
import CloseIcon from './CloseIcon';
import { IconType } from './icon.types';

interface Props {
  type: IconType;
  className?: string;
}

function Icon(props: Props) {
  const { type, className = '' } = props;

  if (type === 'caretDown') {
    return <CaretDownIcon className={className} />;
  }

  if (type === 'check') {
    return <CheckIcon className={className} />;
  }

  if (type === 'close') {
    return <CloseIcon className={className} />;
  }

  return null;
}

export default Icon;
