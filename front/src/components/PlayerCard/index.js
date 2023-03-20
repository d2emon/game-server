import React from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

function ActionCard (props) {
  const {
    disabled,
    title,
    onPlay,
  } = props;

  return (
    <Card className="my-2">
      <Card.Header>
        <Card.Title>
          Магия
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <div className="d-grid gap-2">
          <Button
            disabled={disabled}
            size="lg"
            onClick={onPlay}
          >
            {title}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

function MinionCard (props) {
  const {
    disabled,
    title,
    power,
    onPlay,
  } = props;
  
  return (
    <Card className="my-2">
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

      <Row>
        { actions.map((card) => (
          <Col
            key={card.id}
            md={3}
          >
            <ActionCard
              disabled={!canPlayAction}
              title={card.title}
              onPlay={onPlayAction(card)}
            />  
          </Col>
        )) }

        { minions.map((card) => (
          <Col
            key={card.id}
            md={3}
          >
            <MinionCard
              disabled={!canPlayMinion}
              title={card.title}
              power={card.power}
              onPlay={onPlayMinion(card)}
            />
          </Col>
        )) }
      </Row>
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
