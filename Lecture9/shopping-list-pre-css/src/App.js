import './App.css';
import { useState, React } from 'react';
import Product from './components/Product';

function App() {
  const [howManyAdded, setHowManyAdded] = useState(0);
  let doCount = ( isAdded ) => {
    isAdded ? setHowManyAdded(howManyAdded+1): setHowManyAdded(howManyAdded-1);
  }

  return (
    <div className='App'>
      <Product name="Bananas" countMethod={doCount} />
      <Product name="Apples" countMethod={doCount} />
      <Product name="Oranges" countMethod={doCount} />
      <p>{howManyAdded} added</p>
    </div>  
  );
}

export default App;