import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbumPhotos } from '../../store/slices/photosSlice';

function AlbumPhotos() {
  const dispatch = useDispatch();

  const photos = useSelector((state) => state.photosList.photos);

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    dispatch(getAlbumPhotos(id));
  }, [dispatch, id]);

  return (
    <div>
      {photos.map(({ title, id, thumbnailUrl }) => {
        return (
          <p key={id}>
            {title}
            <img src={thumbnailUrl} alt={title} width='200px' />
          </p>
        );
      })}
    </div>
  );
}

export default AlbumPhotos;
