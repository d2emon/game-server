import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from 'react';
  import {
    Button,
    Card,
    Col,
    Container,
    Row,
  } from 'react-bootstrap';
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
        if (!player) {
          return;
        }
  
        const current = gameAPI.startTurn(playerId);
        console.log(current);
  
        setPlayers(current.players);
        setHasStarted(true);
      },
      [player],
    );
  
    const handlePlayAction = useCallback(
      () => {
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
  
    const handleSelectMinion = useCallback(
      (data) => () => setSelectedMinion(data),
      [],
    )
  
    const handlePlayMinion = useCallback(
      (base) => () => {
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
  
    useEffect(() => {
      const game = gameAPI.getGame();
      console.log(game);
  
      const current = gameAPI.startGame({
        players: playersData,
      });
      console.log(current);
  
      setBases(current.bases);
      setPlayers(current.players);
    }, []);
  
    return (
      <Container>
        <Row>
          <Col md="3">
            { player && <Card>
              <Card.Header>
                <Card.Title>
                  Игрок
                  {' '}
                  {playerId}
                </Card.Title>
              </Card.Header>
  
              {
                hasStarted
                ? (
                  <Container>
                    <Card>
                      <Card.Header>
                        <Card.Title>
                          Магия
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-grid gap-2">
                          { player.actions.map((card) => (
                            <Button
                              key={card.id}
                              disabled={!canPlayAction}
                              size="lg"
                              onClick={handlePlayAction}
                            >
                              { card.title }
                            </Button>
                          )) }
                        </div>
                      </Card.Body>
                    </Card>
  
                    <Card>
                      <Card.Header>
                        <Card.Title>
                          Приспешники
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-grid gap-2">
                          { player.minions.map((card) => (
                            <Card
                              key={card.id}
                            >
                              <Card.Header>
                                <Card.Title>
                                  { card.title }
                                </Card.Title>
                                <Card.Subtitle>
                                  { card.power }
                                </Card.Subtitle>
                              </Card.Header>
                              <Card.Footer>
                                <div className="d-grid gap-2">
                                  <Button
                                    variant="primary"
                                    disabled={!canPlayMinion}
                                    size="lg"
                                    onClick={handleSelectMinion(card)}
                                  >
                                    Разместить
                                  </Button>
                                </div>
                              </Card.Footer>
                            </Card>
                          )) }
                        </div>
                      </Card.Body>
                    </Card>
  
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleEndTurn}
                      >
                        Закончить
                      </Button>
                    </div>
                  </Container>
                )
                : (
                  <Container>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleStartTurn}
                        >
                        Начать
                      </Button>
                    </div>
                  </Container>
                )
              }
            </Card> }
          </Col>
          <Col>
            <Container>
              <Row>
                {bases.map((base) => (
                  <Col
                    key={base.id}
                    md={4}
                  >
                    <Card>
                      <Card.Header>
                        { base.captured && (
                          <Card.Title>
                            Захвачено!
                          </Card.Title>
                        ) }
                        <Card.Title>
                          { base.title }
                        </Card.Title>
                        <Card.Subtitle>
                          { base.power }
                        </Card.Subtitle>
                        <Row>
                          { base.score.map((score, id) => (
                            <Col key={id}>
                              { score }
                            </Col>
                          )) }
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        { base.minions.map((card) => (
                          <Card
                            key={card.id}
                          >
                            <Card.Header>
                              <Card.Title>
                                { card.title }
                              </Card.Title>
                              <Card.Subtitle>
                                { card.power }
                              </Card.Subtitle>
                            </Card.Header>
                          </Card>
                        )) }
                      </Card.Body>
                      { !base.captured && selectedMinion && (
                        <Card.Footer>
                          <Button
                            variant="primary"
                            disabled={!canPlayMinion}
                            size="lg"
                            onClick={handlePlayMinion(base)}
                          >
                            { selectedMinion.title }
                          </Button>
                        </Card.Footer>
                      ) }
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Game;
  