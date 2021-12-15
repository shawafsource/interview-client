import './App.css';
import { ListCompanies } from './components/ListCompanies';
import ServerTestComponent from './components/ServerTestComponent';

function App() {
  return (
    <div className='App'>
      <h1>Hello World</h1>
      <ServerTestComponent />
      <ListCompanies />
    </div>
  );
}

export default App;
