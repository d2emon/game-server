import React, {
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectHasStarted,
  startGame,
} from '../../reducers/gameSlice';
import {
  selectUser,
} from '../../reducers/userSlice';
import Authorized from '../Authorized';
    
const playersData = [
  {
    fractions: ['dinos', 'wizards'],
  },
  {
    fractions: ['dinos', 'wizards'],
  },
  {
    fractions: ['dinos', 'wizards'],
  },
];
    
function InGame(props) {
  const {
    children,
  } = props;

  const dispatch = useDispatch();
  
  const user = useSelector(selectUser);
  const hasStarted = useSelector(selectHasStarted);
    
  useEffect(
    () => {
      if (!user) {
        return;
      }
  
      console.log('USER:', user);
    
      if (hasStarted) {
        console.log('STARTED');
        return;
      }
  
      dispatch(startGame({
        players: playersData,
      }));
    },
    [
      dispatch,
      hasStarted,
      user,
    ],
  );
  
  return (
    <Authorized>
      {children}
    </Authorized>
  );
}
    
export default InGame;
    