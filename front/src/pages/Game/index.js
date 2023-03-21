import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import BaseCard from '../../components/BaseCard';
import PlayerCard from '../../components/PlayerCard';
import Authorized from '../../containers/Authorized';
import {
  endTurn,
  selectBases,
  selectHasStarted,
  selectIsPlayerActive,
  selectPlayers,
  startGame,
  startTurn,
  updateGame,
} from '../../reducers/gameSlice';
import {
  selectUser,
} from '../../reducers/userSlice';
import gameAPI from '../../services/gameAPI';
  
const playerId = 0;
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
  
function Game() {
  const dispatch = useDispatch();

  const [selectedMinion, setSelectedMinion] = useState(null);

  const user = useSelector(selectUser);
  const hasStarted = useSelector(selectHasStarted);
  const isPlayerActive = useSelector(selectIsPlayerActive);
  const bases = useSelector(selectBases);
  const players = useSelector(selectPlayers);
  
  const player = useMemo(
    () => (players.length > playerId)
      ? players[playerId]
      : null,
    [players],
  );
  const canPlayAction = useMemo(
    () => isPlayerActive && player && (player.canPlayActions > 0),
    [
      isPlayerActive,
      player,
    ],
  );
  const canPlayMinion = useMemo(
    () => isPlayerActive && player && (player.canPlayMinions > 0),
    [
      isPlayerActive,
      player,
    ],
  );
  
  const handleStartTurn = useCallback(
    () => {
      console.log('HANDLE START TURN');
      dispatch(startTurn({
        playerId,
      }));
    },
    [
      dispatch,
    ],
  );
  
  const handlePlayAction = useCallback(
    () => {
      console.log('HANDLE PLAY ACTION');
      if (!player) {
        return;
      }
  
      if (player.actions.length <= 0) {
        return;
      }
  
      const card = player.actions[0];
      console.log(card);
  
      const current = gameAPI.playCard(playerId, {
        card,
      });
      console.log(current);

      dispatch(updateGame({
        players: current.players,
        isPlayerActive,
      }));
    },
    [
      dispatch,
      isPlayerActive,
      player,
    ],
  );
  
  const handleSelectAction = useCallback(
    () => () => handlePlayAction(),
    [
      handlePlayAction,
    ],
  );
  
  const handleSelectMinion = useCallback(
    (data) => () => setSelectedMinion(data),
    [],
  );
  
  const handlePlayMinion = useCallback(
    (base) => () => {
      console.log('HANSLE PLAY MINION');
      if (!player) {
        return;
      }
  
      const current = gameAPI.playCard(playerId, {
        card: selectedMinion,
        target: base,
      });
      console.log(current);
  
      dispatch(updateGame({
        players: current.players,
        isPlayerActive,
      }));

      setSelectedMinion(null);
    },
    [
      dispatch,
      isPlayerActive,
      player,
      selectedMinion,
    ],
  );
  
  const handleEndTurn = useCallback(
    () => {
      console.log('HANDLE END TURN');
      dispatch(endTurn({
        playerId,
      }));
    },
    [
      dispatch,
    ],
  );

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
      <Container>
        <Row>
          <Col>
            { player && <PlayerCard
              name={`Игрок ${playerId}`}
              actions={player.actions}
              minions={player.minions}
              canPlayAction={canPlayAction}
              canPlayMinion={canPlayMinion}
              hasStarted={isPlayerActive}
              onStartTurn={handleStartTurn}
              onPlayAction={handleSelectAction}
              onPlayMinion={handleSelectMinion}
              onEndTurn={handleEndTurn}
            /> }
          </Col>
        </Row>
        <Row>
          {bases.map((base) => (
            <Col
              key={base.id}
              md={6}
              className="my-2"
            >
              <BaseCard
                title={base.title}
                power={base.power}
                scores={base.score}
                minions={[...base.minions]}
                hasCaptured={base.captured}
                selectedMinion={(!base.captured) && canPlayMinion && selectedMinion}
                onPlayMinion={handlePlayMinion(base)}
              />
            </Col>
          ))}
        </Row>
      </Container>
      </Authorized>
    );
  }
  
  export default Game;
  