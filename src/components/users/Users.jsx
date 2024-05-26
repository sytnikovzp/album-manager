import {
	Routes,
	Route,
	NavLink,
	Navigate,
} from 'react-router-dom';
import UserForm from './UserForm';
import AlbumPhotos from '../albums/AlbumPhotos';
import UserAlbums from './UserAlbums';
import UsersList from './UsersList';

function Users() {

	return (
		<>
			<nav>
				<NavLink to='add'>Add</NavLink>
			</nav>
			<hr />
			<Routes>
				<Route path='add/:id' element={<UserForm />} />
				<Route path='add' element={<Navigate to=':id'/>} />
				<Route path='/albums/:id' element={<AlbumPhotos />}/>
				<Route path=':id' element={<UserAlbums />}/>
				<Route path='/' element={<UsersList />}/>
			</Routes>
		</>
	);
}

export default Users;