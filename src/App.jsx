import { BrowserRouter as Router } from 'react-router-dom';
import Albums from './components/albums/Albums';
import Users from './components/users/Users';
import './App.css';

function App() {
  return (
    <Router>
      <Albums />
      <Users />
    </Router>
  );
}

export default App;
