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
import InGame from '../../containers/InGame';
import {
  endTurn,
  playCard,
  selectBases,
  selectIsPlayerActive,
  selectPlayer,
  selectPlayerId,
  startTurn,
} from '../../reducers/gameSlice';
import CardActionModal from './CardActionModal';
  
function Game() {
  const dispatch = useDispatch();

  const [selectedMinion, setSelectedMinion] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardTarget, setCardTarget] = useState(null);
  const [showCardActionModal, setShowCardActionModal] = useState(false);

  const playerId = useSelector(selectPlayerId);
  const player = useSelector(selectPlayer);
  const isPlayerActive = useSelector(selectIsPlayerActive);
  const bases = useSelector(selectBases);
  
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

  const needTarget = useMemo(
    () => (selectedCard && selectedCard.onPlay && selectedCard.onPlay.target),
    [
      selectedCard,
    ],
  );

  const cardActions = useMemo(
    () => {
      if (!selectedCard) {
        return null;
      }

      if (!selectedCard.onPlay) {
        return [];
      }

      if (selectedCard.onPlay.target && !cardTarget) {
        return null;
      }

      return selectedCard.onPlay.actions || [];
    },
    [
      selectedCard,
      cardTarget,
    ],
  );
  
  const handleStartTurn = useCallback(
    () => dispatch(startTurn()),
    [dispatch],
  );
  
  const handleEndTurn = useCallback(
    () => dispatch(endTurn()),
    [dispatch],
  );
  
  const handlePlayAction = useCallback(
    (card) => {
      if (!card) {
        return;
      }

      console.log('Action:', card);
      setSelectedCard(card);
    },
    [
      setSelectedCard,
    ],
  );
  
  const handleSelectMinion = useCallback(
    (data) => () => setSelectedMinion(data),
    [],
  );
  
  const handlePlayMinion = useCallback(
    (base) => () => {
      console.log('HANDLE PLAY MINION');
      if (!player) {
        return;
      }

      const card = selectedMinion;
      dispatch(playCard({
        cardId: card.id,
        target: base,
      }));
      setSelectedMinion(null);
    },
    [
      dispatch,
      player,
      selectedMinion,
    ],
  );

  const handleNextAction = useCallback(
    () => {
      console.log('NEXT ACTION');
      /*
      dispatch(playCard({
        cardId: selectedCard.id,
      }));
      */
      setShowCardActionModal(false);
    },
    [
      // dispatch,
      // selectedCard,
      setShowCardActionModal,
    ],
  );

  useEffect(
    () => {
      if (selectedCard && needTarget && !cardTarget) {
        console.log('TARGET???');
        setCardTarget({});
      }
    },
    [
      dispatch,
      selectedCard,
      needTarget,
      cardTarget,
      setCardTarget,
    ]
  );

  useEffect(
    () => {
      if (!cardActions) {
        return;
      }

      console.log('Card:', selectedCard);
      console.log('Target:', cardTarget);

      setShowCardActionModal(true);
    },
    [
      selectedCard,
      cardTarget,
      cardActions,
      setShowCardActionModal,
    ],
  )

  return (
    <InGame>
      <CardActionModal
        show={showCardActionModal}
        title={selectedCard ? selectedCard.title : ''}
        card={selectedCard}
        actions={cardActions}
        onPlay={handleNextAction}
      />
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
              onPlayAction={handlePlayAction}
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
    </InGame>
  );
}
  
export default Game;
  