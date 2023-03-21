import React, { useCallback, useMemo } from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import ActionCard from '../ActionCard';

import './playerCard.css';

function MinionCard (props) {
  const {
    disabled,
    title,
    power,
    onPlay,
  } = props;
  
  return (
    <Card className="my-2 player-card">
      <Card.Header>
        <Card.Title>
          { title }
        </Card.Title>
        <Card.Subtitle>
          { power }
        </Card.Subtitle>
      </Card.Header>
      <Card.Footer>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            disabled={disabled}
            size="lg"
            onClick={onPlay}
          >
            Разместить
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
  
function PlayerControls (props) {
  const {
    actions,
    minions,
    canPlayAction,
    canPlayMinion,
    onPlayAction,
    onPlayMinion,
    onEndTurn,
  } = props;

  const handlePlayAction = useCallback(
    (card) => () => onPlayAction(card),
    [onPlayAction],
  )

  const handlePlayMinion = useCallback(
    (card) => () => onPlayMinion(card),
    [onPlayMinion],
  )

  const cardGroups = useMemo(
    () => {
      const actionCards = actions.map((card) => (
        <ActionCard
          key={card.id}
          disabled={!canPlayAction}
          title={card.title}
          text={card.text}
          onPlay={handlePlayAction(card)}
        />
      ));
      const minionCards = minions.map((card) => (
        <MinionCard
          key={card.id}
          disabled={!canPlayMinion}
          title={card.title}
          power={card.power}
          onPlay={handlePlayMinion(card)}
        />
      ));
      const cards = [
        ...actionCards,
        ...minionCards,
      ];
      const maxCards = 4;
      const result = [];
      for (let i = 0; i < cards.length; i += maxCards) {
        result.push(cards.slice(i, i + maxCards));
      }
      return result;
    },
    [
      actions,
      minions,
      canPlayAction,
      canPlayMinion,
      handlePlayAction,
      handlePlayMinion,
    ]
  );

  return (
    <Container>
      <div className="d-grid gap-2 my-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onEndTurn}
        >
          Закончить
        </Button>
      </div>

      <Carousel
        interval={null}
        variant="dark"
      >
          { cardGroups.map((cards, groupId) => (
            <Carousel.Item key={groupId}>
              <Container>
                <Row className="player-cards-group">
                  { cards.map((card, cardId) => (
                    <Col key={cardId} md={3}>
                      { card }
                    </Col>
                  )) }
                </Row>
              </Container>
            </Carousel.Item>    
          )) }
      </Carousel>
    </Container>
  );
};

function BeforeStart (props) {
  const {
    onStart,
  } = props;
  return (
    <Container>
      <div className="d-grid gap-2 my-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onStart}
        >
          Начать
        </Button>
      </div>  
    </Container>
  );
};

function PlayerCard (props) {
  const {
    name,
    actions,
    minions,
    canPlayAction,
    canPlayMinion,
    hasStarted,
    onStartTurn,
    onPlayAction,
    onPlayMinion,
    onEndTurn,
  } = props;

  return (
    <Card
      className="mb-2"
    >
      <Card.Header>
        <Card.Title>
          {name}
        </Card.Title>
      </Card.Header>

      { hasStarted
        ? <PlayerControls
          actions={actions}
          minions={minions}
          canPlayAction={canPlayAction}
          canPlayMinion={canPlayMinion}
          onPlayAction={onPlayAction}
          onPlayMinion={onPlayMinion}
          onEndTurn={onEndTurn}
        />
        : <BeforeStart
          onStart={onStartTurn}
        /> }
    </Card>
  );
};

export default PlayerCard;
