import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// ==========================
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// ==========================
import './App.css';
import Albums from './components/albums/Albums';
import Users from './components/users/Users';
import { setActive } from './services/styleService';
import './App.css';

function App() {
  return (
    <Router>
      <Stack
        sx={{
          flexGrow: 1,
          width: '900px',
        }}
      >
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='div'
              fontSize={20}
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Album manager
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </Stack>
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
