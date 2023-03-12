import { useEffect, useRef, useState } from 'react';

import { SelectOption } from '../Select/select.types';

const useMultiSelect = (
  options: SelectOption[],
  value: SelectOption[],
  onChange: (value: SelectOption[]) => void
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectOption = (option: SelectOption) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item.value !== option.value));
      return;
    }

    onChange([...value, option]);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
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
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue =
            highlightedIndex + (event.code === 'ArrowDown' ? 1 : -1);

          if (newValue >= 0 && newValue < options.length)
            setHighlightedIndex(newValue);
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
    setHighlightedIndex,
  ];
};

export default useMultiSelect;
