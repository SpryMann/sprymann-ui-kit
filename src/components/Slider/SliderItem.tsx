import { SliderItemType } from './slider.types';

import styles from './Slider.module.scss';

function SlideItem(props: SliderItemType) {
  const { imageSource, imageAlt } = props;

  return (
    <div className={styles.sliderItem}>
      <img
        className={styles.sliderImage}
        src={imageSource}
        alt={imageAlt}
        draggable={false}
      />
    </div>
  );
}

export default SlideItem;
