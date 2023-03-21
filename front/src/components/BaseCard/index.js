import React, { useMemo } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  ProgressBar,
  Row,
} from 'react-bootstrap';

function ScoreCard (props) {
  const {
    title,
    value,
  } = props;

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>
          {value}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

function MinionCard (props) {
  const {
    title,
    power,
    withAction,
    onPlay,
  } = props;
  
  return (
    <Card style={{ minHeight: 175 }}>
      <Card.Header>
        <Card.Title>
          {title}
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <Card.Subtitle>
          {power}
        </Card.Subtitle>
      </Card.Body>

      {withAction && (
        <Card.Footer>
          <Button
            variant="primary"
            size="lg"
            onClick={onPlay}
          >
            Применить
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
  
function BaseCard (props) {
  const {
    title,
    power,
    scores,
    minions,
    hasCaptured,
    selectedMinion,
    onPlayMinion,
  } = props;

  const powerLeft = useMemo(
    () => {
      const totalMinions = minions.reduce((total, minion) => (total + minion.power), 0);
      return (power >  totalMinions) ? (power - totalMinions) : 0;
    },
    [
      power,
      minions,
    ],
  );

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              {hasCaptured && <Badge>Захвачено!</Badge>}
              <Card.Title>
                {title}
              </Card.Title>
            </Col>
            <Col md={2}>
              {powerLeft}
              /
              {power}
            </Col>
          </Row>

          <Row>
            <Col>
              <ProgressBar
                max={power}
                now={powerLeft}
              />
            </Col>
          </Row>

          <Row className="my-2">
            <Col>
              <ScoreCard
                title="I место"
                value={scores[0]}
              />
            </Col>

            <Col>
              <ScoreCard
                title="II место"
                value={scores[1]}
              />
            </Col>

            <Col>
              <ScoreCard
                title="III место"
                value={scores[2]}
              />
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Row>
            {minions.map((minion) => (
              <Col
                key={minion.id}
                md={4}
                className="my-2"
              >
                <MinionCard
                  title={minion.title}
                  power={minion.power}
                />
              </Col>
            ))}
            {selectedMinion && (
              <Col
                md={4}
                className="my-2"
              >
                <MinionCard
                  title={selectedMinion.title}
                  power={selectedMinion.power}
                  withAction
                  onPlay={onPlayMinion}
                />
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default BaseCard;
