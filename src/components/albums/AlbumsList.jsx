import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAlbums } from '../../store/slices/albumSlice';
import './AlbumsList.css';

function AlbumsList() {
  const dispatch = useDispatch();

  const albums = useSelector((state) => state.albumsList.albums);

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  return (
    <ul className='albums-container'>
      {albums.map(({ id, title }) => {
        return (
          <li key={id} className='album-item'>
            <Link to={`${id}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default AlbumsList;
