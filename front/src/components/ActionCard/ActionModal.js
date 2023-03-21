import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';

function ActionModal (props) {
  const {
    show,
    title,
    text,
    onPlay,
    onClose,
  } = props;

  return (
    <Modal
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {text}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Отменить
        </Button>
        <Button
          variant="primary"
          onClick={onPlay}
        >
          Играть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionModal;
