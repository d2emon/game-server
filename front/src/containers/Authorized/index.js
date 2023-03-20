import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  fetchUser,
  selectUserStatus,
  STATUS_USER_READY,
} from '../../reducers/userSlice';
  
const USER_ID = 'USER-ID';
  
function Authorized(props) {
  const {
    children,
  } = props;

  const dispatch = useDispatch();

  const userStatus = useSelector(selectUserStatus);
  
  useEffect(
    () => {
      if (userStatus === STATUS_USER_READY) {
        dispatch(fetchUser(USER_ID));
      }
    },
    [
      dispatch,
      userStatus,
    ],
  );
  
  return (
    <>
      {children}
    </>
  );
}
  
export default Authorized;
  