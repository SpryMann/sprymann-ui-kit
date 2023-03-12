import classNames from 'classnames';

import Icon from '../Icon/Icon';
import { SelectOption } from '../Select/select.types';

import useMultiSelect from './useMultiSelect';

import styles from './MultiSelect.module.scss';

interface Props {
  placeholder: string;
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

function MultiSelect(props: Props) {
  const { placeholder, options, value, onChange } = props;
  const [
    containerRef,
    selectOption,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
  ] = useMultiSelect(options, value, onChange);

  const isSelectedOption = (option: SelectOption) => value.includes(option);

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
          { [styles.value]: value.length },
          { [styles.placeholder]: !value.length }
        )}
      >
        {value.length
          ? value.map((item) => (
              <button
                className={styles.optionBadge}
                key={item.value}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  selectOption(item);
                }}
              >
                {item.label}
                <Icon className={styles.optionBadgeRemove} type="close" />
              </button>
            ))
          : placeholder}
      </span>
      <Icon className={styles.caret} type="caretDown" />
      <ul
        className={classNames(styles.options, { [styles.optionsShow]: isOpen })}
      >
        {options.map((option, index) => (
          <li
            aria-hidden
            className={classNames(
              styles.option,
              {
                [styles.optionSelected]: isSelectedOption(option),
              },
              { [styles.optionHighlighted]: index === highlightedIndex }
            )}
            key={option.value}
            onClick={(event) => {
              event.stopPropagation();
              selectOption(option);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            <span className={styles.optionValue}>{option.label}</span>
            <Icon className={styles.optionCheck} type="check" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultiSelect;
