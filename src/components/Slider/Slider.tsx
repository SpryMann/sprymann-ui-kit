import classNames from 'classnames';

import { SliderItemType } from './slider.types';
import SlideItem from './SliderItem';
import useSlider from './useSlider';

import styles from './Slider.module.scss';

interface Props {
  items: SliderItemType[];
}

function Slider(props: Props) {
  const { items } = props;
  const [offsetX, isSwiping, onTouchStart, containerRef] = useSlider();

  return (
    <div
      className={styles.container}
      tabIndex={0}
      role="slider"
      aria-valuenow={offsetX}
      onTouchStart={onTouchStart}
      onMouseDown={onTouchStart}
    >
      <div
        className={classNames(styles.slider, {
          [styles.sliderSwiping]: isSwiping,
        })}
        ref={containerRef}
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {items.map((item) => (
          <SlideItem
            key={item.id}
            id={item.id}
            imageSource={item.imageSource}
            imageAlt={item.imageAlt}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
