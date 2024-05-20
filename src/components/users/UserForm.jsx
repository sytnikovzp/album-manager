import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { emptyUser } from '../../constants';
import { createUser, updateUser } from '../../store/slices/usersSlice';
import './UserForm.css';

function UserForm() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.usersList.users);

  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser = users.find((user) => user.id === Number(id));

  const [editUser, setEditUser] = useState(
    currentUser ? currentUser : emptyUser
  );

  const onInputChange = (event) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    });
  };

  const goHome = () => {
    navigate('/');
  };

  const onReset = (event) => {
    event.preventDefault();
    setEditUser(emptyUser);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    !editUser.id
      ? dispatch(createUser(editUser))
      : dispatch(updateUser(editUser));
  };

  return (
    <form id='users-form' onSubmit={onFormSubmit}>
      <div className='field-container'>
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={editUser.name}
          onChange={onInputChange}
        />
      </div>
      <fieldset id='contact' form='users-form' className='group-container'>
        <legend>Contact</legend>
        <div className='field-container'>
          <label>E-mail</label>
          <input
            type='email'
            name='email'
            value={editUser.email}
            onChange={onInputChange}
            placeholder='email'
          />
        </div>
        <div className='field-container'>
          <label>Phone</label>
          <input
            type='text'
            name='phone'
            value={editUser.phone}
            onChange={onInputChange}
            placeholder='phone'
          />
        </div>
      </fieldset>

      <fieldset id='contact' form='users-form' className='group-container'>
        <legend>Address</legend>
        <div className='field-container'>
          <label>City</label>
          <input
            type='text'
            name='city'
            value={editUser.address.city}
            onChange={onInputChange}
            placeholder='city'
          />
        </div>
        <div className='field-container'>
          <label>Street</label>
          <input
            type='text'
            name='street'
            value={editUser.address.street}
            onChange={onInputChange}
            placeholder='street'
          />
        </div>
        <div className='field-container'>
          <label>Zipcode</label>
          <input
            type='text'
            name='zipcode'
            value={editUser.address.zipcode}
            onChange={onInputChange}
            placeholder='zip code'
          />
        </div>
      </fieldset>
      <div className='btn-group'>
        <button type='submit'>Save</button>
        <button type='button' onClick={onReset}>
          Reset
        </button>
        <button type='button' onClick={goHome}>
          Return
        </button>
      </div>
    </form>
  );
}

export default UserForm;
