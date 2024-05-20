import { Routes, Route } from 'react-router-dom';
import AlbumPhotos from './AlbumPhotos';
import AlbumsList from './AlbumsList';

function Albums() {
  return (
    <>
      <Routes>
        <Route path=':id' element={<AlbumPhotos />} />
        <Route path='/' element={<AlbumsList />} />
      </Routes>
    </>
  );
}

export default Albums;
