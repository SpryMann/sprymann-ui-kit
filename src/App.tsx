import { Slider } from './components';

const items = [
  {
    id: 1,
    imageSource:
      'https://images.unsplash.com/photo-1678595439308-b383185f35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    imageAlt: 'Sunset',
  },
  {
    id: 2,
    imageSource:
      'https://images.unsplash.com/photo-1678582911712-43934e3fe86d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    imageAlt: 'Cyan beach',
  },
];

function App() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Slider items={items} />
    </div>
  );
}

export default App;
