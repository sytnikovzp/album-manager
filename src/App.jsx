import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Albums from './components/albums/Albums';
import Users from './components/users/Users';
import { setActive } from './services/styleService';
import './App.css';

function App() {

  return (
    <Router>
      <div className='header'>
        <ul>
          <li>
            <NavLink to='/albums' className={setActive}>
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/users'
              style={(isActive) => ({
                color: isActive ? 'red' : 'blue',
              })}
            >
              Users
            </NavLink>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path='/'>Home</Route>
        <Route path='/albums/*' element={<Albums />} />
        <Route path='/users/*' element={<Users />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;
