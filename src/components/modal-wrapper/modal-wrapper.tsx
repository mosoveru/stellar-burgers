import { Outlet, useParams } from 'react-router-dom';
import { Modal } from '../modal/modal';
import React from 'react';

type Params = {
  id: string;
  number: string;
};

type ModalWrapperProps = {
  onClose: () => void;
  children?: React.ReactNode;
};

export const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  const params = useParams<Params>();

  return !children ? (
    <Modal title={params.id || params.number || ''} onClose={onClose}>
      <Outlet />
    </Modal>
  ) : (
    <Modal title={params.id || params.number || ''} onClose={onClose}>
      {children}
    </Modal>
  );
};
