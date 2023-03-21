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
import { useSelector } from 'react-redux';
import BaseCard from '../../components/BaseCard';
import PlayerCard from '../../components/PlayerCard';
import Authorized from '../../containers/Authorized';
import { selectUser } from '../../reducers/userSlice';
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
  const [bases, setBases] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedMinion, setSelectedMinion] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const user = useSelector(selectUser);
    
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
  
      setPlayers(current.players);
      setHasStarted(true);
    },
    [],
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
      setPlayers(current.players);
    },
    [player],
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
  
      setPlayers(current.players);
      setSelectedMinion(null);
    },
    [
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
  
      setPlayers(current.players);
      setHasStarted(false);
    },
    [player],
  );

  useEffect(
    () => {
      console.log('USER:', user);
      if (!user) {
        return;
      }

      const game = gameAPI.getGame();  
      console.log('GAME:', game);

      const gameState = gameAPI.startGame({
        players: playersData,
      });
      console.log('STATE:', gameState);

      setBases(gameState.bases);
      setPlayers(gameState.players);
    },
    [
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
  