import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import { emptyUser } from '../../constants';
import { createUser, updateUser } from '../../store/slices/usersSlice';
import './UserForm.css';

function UserForm() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.usersList.users);

  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser = users.find((user) => user.id === Number(id));

  const goHome = () => {
    navigate('/');
  };

  const schema = Yup.object().shape({
    address: Yup.object().shape({
      city: Yup.string().required('City is required field'),
      street: Yup.string().required('Street is required field'),
    }),
    name: Yup.string()
      .min(3, 'Too less symbols')
      .max(20, 'Too many symbols')
      .required('Name is required field'),
    email: Yup.string().email().required('Email is required field'),
  });

  const onFormSubmit = (values) => {
    !values.id ? dispatch(createUser(values)) : dispatch(updateUser(values));
  };

  const renderForm = ({ isValid }) => {
    return (
      <Form id='users-form'>
        <div className='field-container'>
          <label htmlFor='name'>Name</label>
          <Field as={TextField} type='text' name='name' id='name' />
        </div>
        <ErrorMessage name='name'>
          {(msg) => <div className='error'>{msg}</div>}
        </ErrorMessage>
        <fieldset id='contact' form='users-form' className='group-container'>
          <legend>Contact</legend>
          <div className='field-container'>
            <label htmlFor='email'>E-mail</label>
            <Field type='email' name='email' id='email' placeholder='email' />
          </div>
          <ErrorMessage name='email'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>
          <div className='field-container'>
            <label htmlFor='phone'>Phone</label>
            <Field type='text' name='phone' id='phone' placeholder='phone' />
          </div>
        </fieldset>

        <fieldset id='contact' form='users-form' className='group-container'>
          <legend>Address</legend>
          <div className='field-container'>
            <label htmlFor='city'>City</label>
            <Field
              type='text'
              name='address.city'
              id='city'
              placeholder='city'
            />
          </div>
          <ErrorMessage name='address.city'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>
          <div className='field-container'>
            <label htmlFor='street'>Street</label>
            <Field
              type='text'
              name='address.street'
              id='street'
              placeholder='street'
            />
          </div>
          <ErrorMessage name='address.street'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>
          <div className='field-container'>
            <label htmlFor='zipcode'>Zipcode</label>
            <Field
              type='text'
              name='address.zipcode'
              id='zipcode'
              placeholder='zipcode'
            />
          </div>
        </fieldset>
        <Stack direction='row' justifyContent='center' spacing={5}>
          <Button
            type='submit'
            disabled={!isValid}
            variant='contained'
            size='large'
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button type='reset'>Reset</Button>
          <Button type='button' onClick={goHome}>
            Return
          </Button>
        </Stack>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={currentUser ? currentUser : emptyUser}
      onSubmit={onFormSubmit}
      validationSchema={schema}
    >
      {renderForm}
    </Formik>
  );
}

export default UserForm;
