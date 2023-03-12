import { useEffect, useRef, useState } from 'react';

import { SelectOption } from './select.types';

const useSelect = (
  options: SelectOption[],
  onChange: (value: SelectOption | undefined) => void
): [
  React.RefObject<HTMLDivElement>,
  (option: SelectOption) => void,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHightlightedIndex] = useState(0);

  const selectOption = (option: SelectOption) => {
    onChange(option);
  };

  useEffect(() => {
    if (isOpen) setHightlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target !== containerRef.current) return;

      switch (event.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);

          if (isOpen) selectOption(options[highlightedIndex]);

          break;
        case 'ArrowDown':
        case 'ArrowUp': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue =
            highlightedIndex + (event.code === 'ArrowDown' ? 1 : -1);

          if (newValue >= 0 && newValue < options.length)
            setHightlightedIndex(newValue);

          break;
        }
        case 'Escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return [
    containerRef,
    selectOption,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHightlightedIndex,
  ];
};

export default useSelect;
