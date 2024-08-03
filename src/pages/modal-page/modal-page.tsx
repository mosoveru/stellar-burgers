import { ReactNode } from 'react';
import styles from './modal-page.module.css';
import { useParams } from 'react-router-dom';

type ModalPageProps = {
  children: ReactNode;
};

type Params = {
  number: string;
};

export const ModalPage = ({ children }: ModalPageProps) => {
  const params = useParams<Params>() as Params;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h3 className={`text text_type_main-large`}>
          {params.number ?? 'Детали ингридиента'}
        </h3>
      </div>
      {children}
    </div>
  );
};
