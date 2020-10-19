import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './style.scss';

const ConfirmModal = ({forwardedRef}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [cancelBtnText, setCancelBtnText] = useState(undefined);
  const [confirmBtnText, setConfirmBtnText] = useState(undefined);

  const confirmBtnClick = null;

  const close = () => {
    setIsOpen(false);
    setTitle(undefined);
    setMessage(undefined);
    setCancelBtnText(undefined);
  };

  const open = ({title, message, cancelBtnText, confirmBtnText, confirmBtnClick}) => {
    const confirmButtonText = confirmBtnClick ? (confirmBtnText || "Submit") : undefined;
    const cancelButtonText = cancelBtnText !== undefined ? cancelBtnText : "Ok";
    confirmBtnClick = confirmBtnClick;

    setIsOpen(false);
    setTitle(title);
    setMessage(message);
    setCancelBtnText(confirmButtonText);
    setConfirmBtnText(cancelButtonText);

  };

  return (
    <Modal wrapClassName="confirm-modal" centered isOpen={isOpen} toggle={close} ref={forwardedRef}>
      <ModalHeader toggle={close}>{title}</ModalHeader>
      <ModalBody>
        <p>{message}</p>
      </ModalBody>
      <ModalFooter>
        {cancelBtnText !== null && <Button color="primary" outline onClick={close}>{cancelBtnText}</Button>}
        {confirmBtnClick && <Button color="primary" onClick={confirmBtnClick}>{confirmBtnText}</Button>}
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmModal;