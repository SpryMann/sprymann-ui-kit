import classNames from 'classnames';

import { Tab } from './tabs.types';

import styles from './Tabs.module.scss';

interface Props {
  tabs: Tab[];
  selectedTabId: number;
  onChange: (id: number) => void;
}

function Tabs(props: Props) {
  const { selectedTabId, tabs, onChange } = props;

  const changeSelectedTab = (id: number) => {
    onChange(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            className={classNames(styles.tab, {
              [styles.tabActive]: tab.id === selectedTabId,
            })}
            type="button"
            key={tab.id}
            onClick={() => changeSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
