import React, { useCallback, useState } from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import ActionModal from './ActionModal';

function ActionCard (props) {
  const {
    disabled,
    title,
    text,
    onPlay,
  } = props;

  const [showDialog, setShowDialog] = useState(false);

  const handlePlay = useCallback(
    () => {
      onPlay();
      setShowDialog(false);
    },
    [
      setShowDialog,
      onPlay,
    ],
  );

  const handleShowModal = useCallback(
    () => {
      setShowDialog(true);
    },
    [
      setShowDialog,
    ],
  );

  const handleCloseModal = useCallback(
    () => {
      setShowDialog(false);
    },
    [
      setShowDialog,
    ],
  );

  return (
    <Card className="my-2 player-card">
      <ActionModal
        show={showDialog}
        title={title}
        text={text}
        onPlay={handlePlay}
        onClose={handleCloseModal}
      />

      <Card.Header>
        <Card.Title>
          {title}
        </Card.Title>
      </Card.Header>

      <Card.Body>
        {text}
      </Card.Body>

      <Card.Footer>
        <div className="d-grid gap-2">
          <Button
            disabled={disabled}
            size="lg"
            onClick={handleShowModal}
          >
            Играть
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ActionCard;
