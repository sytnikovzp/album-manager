import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Albums from './components/albums/Albums';
import Users from './components/users/Users';
import './App.css';

function App() {
  return (
    <Router>
      <div className='header'>
        <ul>
          {/* <li>
            <a href='/albums'>Test</a>
          </li> */}
          <li>
            <NavLink to='/albums' activeClassName='selected'>
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink to='/Users'>Users</NavLink>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path='/' exact>
          Home
        </Route>
        <Route path='/albums'>
          <Albums movies='movie' />
        </Route>
        <Route
          path='/users'
          render={(props) => <Users {...props} title='User'></Users>}
        />
        {/* <Route path='/users' component={Users} /> */}
        {/* <Route path='*'>
          <Redirect to='albums' />
        </Route> */}
        {/* <Redirect from='*' to='albums' /> */}
        <Redirect path='*' to='albums' />
      </Switch>
    </Router>
  );
}

export default App;
