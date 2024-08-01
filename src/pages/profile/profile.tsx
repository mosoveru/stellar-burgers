import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store/store';
import { getUserEmail, getUserName } from '../../services/slices/UserSlice';
import {
  refreshLoginData,
  getUserThunk
} from '../../services/slices/UserSlice';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserEmail);
  const dispatch = useDispatch();

  const user = {
    name: userName ?? '',
    email: userEmail ?? ''
  };

  const [formValue, setFormValue] = useState({
    name: userName ?? '',
    email: userEmail ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [userName, userEmail]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(refreshLoginData(formValue));
    dispatch(getUserThunk());
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
