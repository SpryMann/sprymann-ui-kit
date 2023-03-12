import { useState } from 'react';

import { Tabs } from './components';

const tabs = [
  {
    id: 1,
    label: 'My details',
  },
  {
    id: 2,
    label: 'Profile',
  },
  {
    id: 3,
    label: 'Password',
  },
  {
    id: 4,
    label: 'Team',
  },
  {
    id: 5,
    label: 'Plan',
  },
];

function App() {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div>
      <Tabs
        selectedTabId={selectedTabId}
        tabs={tabs}
        onChange={(newId) => setSelectedTabId(newId)}
      />
      <div>
        {selectedTabId === tabs[0].id ? <p>First Tab</p> : null}
        {selectedTabId === tabs[1].id ? <p>Second Tab</p> : null}
        {selectedTabId === tabs[2].id ? <p>Third Tab</p> : null}
        {selectedTabId === tabs[3].id ? <p>Fourth Tab</p> : null}
        {selectedTabId === tabs[4].id ? <p>Fifth Tab</p> : null}
      </div>
    </div>
  );
}

export default App;
