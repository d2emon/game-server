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
  fetchGame,
  selectBases,
  selectGameStatus,
  selectPlayers,
  startGame,
  STATUS_GAME_READY,
  STATUS_GAME_SUCCESS,
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

  const [bases, setBases] = useState([]);
  const [selectedMinion, setSelectedMinion] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const user = useSelector(selectUser);
  const gameStatus = useSelector(selectGameStatus);
  const startingBases = useSelector(selectBases);
  const players = useSelector(selectPlayers);
  
  const player = useMemo(
    () => (players.length > playerId)
      ? players[playerId]
      : null,
    [players],
  );
  const canPlayAction = useMemo(
    () => hasStarted && player && (player.canPlayActions > 0),
    [
      hasStarted,
      player,
    ],
  );
  const canPlayMinion = useMemo(
    () => hasStarted && player && (player.canPlayMinions > 0),
    [
      hasStarted,
      player,
    ],
  );
  
  const handleStartTurn = useCallback(
    () => {
      console.log('HANDLE START TURN');
      const current = gameAPI.startTurn(playerId);
      console.log(current);
  
      dispatch(updateGame({
        players: current.players,
      }));

      setHasStarted(true);
    },
    [
      dispatch,
    ],
  );
  
  const handlePlayAction = useCallback(
    () => {
      console.log('HANSLE PLAY ACTION');
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
      }));
    },
    [
      dispatch,
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
      }));

      setSelectedMinion(null);
    },
    [
      dispatch,
      player,
      selectedMinion,
    ],
  );
  
  const handleEndTurn = useCallback(
    () => {
      console.log('HANDLE END TURN');
      if (!player) {
        return;
      }
  
      const current = gameAPI.endTurn(playerId);
      console.log(current);
  
      dispatch(updateGame({
        players: current.players,
      }));

      setHasStarted(false);
    },
    [
      dispatch,
      player,
    ],
  );

  useEffect(
    () => {
      if (!user) {
        return;
      }

      if (gameStatus === STATUS_GAME_READY) {
        dispatch(fetchGame());
        return;
      }

      if (gameStatus === STATUS_GAME_SUCCESS) {
        console.log('USER:', user);
  
        dispatch(startGame({
          players: playersData,
        }));
      }
    },
    [
      dispatch,
      gameStatus,
      user,
    ],
  );

  useEffect(
    () => {
      console.log('BASES:', startingBases);
      setBases(startingBases);
    },
    [startingBases],
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
              hasStarted={hasStarted}
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
  