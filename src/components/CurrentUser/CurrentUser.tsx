import React, { useEffect } from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSelectedUserId,
  setSelectedUserId,
  invertUserLoaderVisibility,
  getUser,
  setUser,
} from '../../store';
import { getUser as getUserFromServer } from '../../api/api';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(getSelectedUserId);
  const user = useSelector(getUser);

  const loadUser = async () => {
    const currentUser = await getUserFromServer(selectedUserId);

    dispatch(setUser(currentUser));
    dispatch(invertUserLoaderVisibility());
  };

  useEffect(() => {
    dispatch(setUser(null));
    loadUser();
  }, [selectedUserId]);

  const selectUser = (userId: number) => {
    dispatch(setSelectedUserId(userId));
    if (userId !== selectedUserId && userId !== 0) {
      dispatch(invertUserLoaderVisibility());
    }
  };

  return (
    <>
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedUserId}`}</span>
      </h2>
      {user && (
        <div className="CurrentUser">
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={() => selectUser(0)}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
