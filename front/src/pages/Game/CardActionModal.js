import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { playCard } from '../../reducers/gameSlice';

const cardActionPanels = {
  discardTarget: (payload) => {
    console.log('PASSIVE', payload);
    console.log('DISCARD TARGET', payload);
    return <div>СБРОСИТЬ ВЫБРАННОЕ</div>;
  },
  findAction: (payload) => {
    console.log('FIND ACTION', payload);
    return <div>ИСКАТЬ ДЕЙСТВИЕ</div>;
  },
  getCard: (payload) => {
    console.log('PASSIVE', payload);
    console.log('GET CARD', payload);
    return <div>ВЗЯТЬ КАРТУ</div>;
  },
  getMinion: (payload) => {
    console.log('PASSIVE', payload);
    console.log('GET MINION', payload);
    return <div>ВЗЯТЬ ПРИСПЕШНИКА</div>;
  },
  getSelected: (payload) => {
    console.log('PASSIVE', payload);
    console.log('GET SELECTED', payload);
    return <div>ВЗЯТЬ ИЗБРАННОЕ</div>;
  },
  playExtraAction: (payload) => {
    console.log('PASSIVE', payload);
    console.log('PLAY EXTRA ACTION', payload);
    return <div>ЭКСТРА-ДЕЙСТВИЕ</div>;
  },
  playExtraMinion: (payload) => {
    console.log('PASSIVE', payload);
    console.log('PLAY EXTRA MINION', payload);
    return <div>ЭКСТРА-ПРИСПЕШНИК</div>;
  },
  returnFullHand: (payload) => {
    console.log('PASSIVE', payload);
    console.log('RETURN FULL HAND', payload);
    return <div>СБРОСИТЬ РУКУ</div>;
  },
  showDeck: (payload) => {
    console.log('PASSIVE', payload);
    console.log('SHOW DECK', payload);
    return <div>ПОСМОТРЕТЬ КОЛОДУ</div>;
  },
  showFromEveryDeck: (payload) => {
    console.log('PASSIVE', payload);
    console.log('SHOW FROM EVERY DECK', payload);
    return <div>ПОКАЗАТЬ ВСЕ КОЛОДЫ</div>;
  },
  showToAll: (payload) => {
    console.log('PASSIVE', payload);
    console.log('SHOW TO ALL', payload);
    return <div>ПОКАЗАТЬ ВСЕМ</div>;
  },
  shuffle: (payload) => {
    console.log('PASSIVE', payload);
    console.log('SHUFFLE', payload);
    return <div>ПЕРЕМЕШАТЬ</div>;
  },
  sortVisible: (payload) => {
    console.log('PASSIVE', payload);
    console.log('SORT VISIBLE', payload);
    return <div>СОРТИРОВАТЬ</div>;
  }, 
}

function ActionPanel (props) {
  const {
    action,
  } = props;

  return cardActionPanels[action]
    ? cardActionPanels[action](props)
    : (
      <div>
        UNKNOWN ACTION:
        {action}
      </div>
    );
};

function CardActionModal (props) {
  const {
    show,
    title,
    card,
    actions,
    onPlay,
  } = props;

  const dispatch = useDispatch();

  const [actionId, setActionId] = useState(null);
  const currentAction = useMemo(
    () => (actionId !== null) ? actions[actionId] : null,
    [
      actionId,
      actions,
    ],
  );
  const isLastAction = useMemo(
    () => (actionId === null) || (!actions) || (actionId >= actions.length - 1),
    [
      actionId,
      actions,  
    ],
  );

  const handleNextAction = useCallback(
    () => {
      if (isLastAction) {
        return;
      }

      setActionId(actionId + 1);
    },
    [
      actionId,
      isLastAction,
      setActionId,
    ],
  );

  const handleSubmitAction = useCallback(
    () => {
      if (!card) {
        return;
      }

      dispatch(playCard({
        cardId: card.id,
      }));
      onPlay();
    },
    [
      dispatch,
      card,
      onPlay,
    ],
  );

  useEffect(
    () => {
      setActionId((actions && actions.length > 0) ? 0 : null);
    },
    [
      actions,
      setActionId,
    ],
  )

  return (
    <Modal
      show={show}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {currentAction && <ActionPanel
          {...currentAction}
        />}
      </Modal.Body>

      {isLastAction
        ? (
          <Modal.Footer>
            <Button
              variant="success"
              onClick={handleSubmitAction}
            >
              Готово
            </Button>
          </Modal.Footer>
        )
        : (
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleNextAction}
            >
              Далее
            </Button>            
          </Modal.Footer>
        )
      }
    </Modal>
  );
};

export default CardActionModal;
