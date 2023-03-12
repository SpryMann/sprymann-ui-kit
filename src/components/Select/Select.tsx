import classNames from 'classnames';

import Icon from '../Icon/Icon';

import { SelectOption } from './select.types';
import useDropdown from './useSelect';

import styles from './Select.module.scss';

interface Props {
  placeholder: string;
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
}

function Dropdown(props: Props) {
  const { placeholder, options, value, onChange } = props;
  const [
    containerRef,
    selectOption,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHightlightedIndex,
  ] = useDropdown(options, onChange);

  const isOptionSelected = (option: SelectOption) =>
    option.value === value?.value;

  return (
    <div
      className={styles.container}
      ref={containerRef}
      tabIndex={0}
      role="button"
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={() => {}}
      onBlur={() => setIsOpen(false)}
    >
      <span
        className={classNames(
          { [styles.value]: value?.value },
          { [styles.placeholder]: !value?.value }
        )}
      >
        {value?.label ?? placeholder}
      </span>
      <Icon className={styles.caret} type="caretDown" />
      <ul
        className={classNames(styles.options, { [styles.optionsShow]: isOpen })}
      >
        {options.map((option, index) => (
          <li
            className={classNames(
              styles.option,
              {
                [styles.optionSelected]: isOptionSelected(option),
              },
              { [styles.optionHighlighted]: index === highlightedIndex }
            )}
            key={option.value}
            onClick={(event) => {
              event.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHightlightedIndex(index)}
          >
            <span className={styles.optionValue}>{option.label}</span>
            <Icon className={styles.optionCheck} type="check" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
