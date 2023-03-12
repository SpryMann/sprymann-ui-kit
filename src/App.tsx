import { useState } from 'react';

import { MultiSelect, Select } from './components';

const options = [
  {
    label: 'Olivia Rhye',
    value: 'olivia',
  },
  {
    label: 'Phoenix Baker',
    value: 'phoenix',
  },
  {
    label: 'Lana Steiner',
    value: 'lana',
  },
  {
    label: 'Demi Wilkinson',
    value: 'demi',
  },
  {
    label: 'Candice Wu',
    value: 'candice',
  },
  {
    label: 'Natali Craig',
    value: 'natali',
  },
  {
    label: 'Drew Capo',
    value: 'drew',
  },
];

function App() {
  const [value, setValue] = useState<(typeof options)[0] | undefined>(
    options[0]
  );
  const [multipleValue, setMultipleValue] = useState([options[0]]);

  return (
    <div>
      <Select
        placeholder="Select team member"
        options={options}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <br />
      <MultiSelect
        placeholder="Select team members"
        options={options}
        value={multipleValue}
        onChange={(newValue) => setMultipleValue(newValue)}
      />
    </div>
  );
}

export default App;
