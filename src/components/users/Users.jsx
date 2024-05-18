import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import UserForm from './UserForm';
import AlbumPhotos from '../albums/AlbumPhotos';
import UserAlbums from './UserAlbums';
import UsersList from './UsersList';

function Users() {
  const { path, url } = useRouteMatch();

  return (
    <>
      <nav>
        <NavLink to={`${url}/add`}>Add</NavLink>
      </nav>
      <hr />
      <Switch>
        <Route path={`${path}/add:id`} component={UserForm} />
        <Route path={`${path}/add`}>
          <Redirect to={`${path}/add:id`}>
            <UserForm />
          </Redirect>
        </Route>
        <Route path={`${path}/album/:id`} component={AlbumPhotos} />
        <Route path={`${path}/:id`} component={UserAlbums} />
        <Route path={`${path}`} component={UsersList} />
      </Switch>
    </>
  );
}

export default Users;
