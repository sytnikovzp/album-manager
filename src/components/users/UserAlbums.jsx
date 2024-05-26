import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserAlbums } from '../../store/slices/albumSlice';

function UserAlbums() {
  const dispatch = useDispatch();

  const albums = useSelector((state) => state.albumsList.albums);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserAlbums(id));
  }, [dispatch, id]);

  return (
    <ul className='albums-container'>
      {albums.map(({ id, title }) => (
        <li key={id} className='album-item'>
          <Link to={`/albums/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default UserAlbums;
