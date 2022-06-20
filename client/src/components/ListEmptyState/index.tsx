import { FC } from 'react';
import { Button } from '@mui/material';

import styles from './index.module.css';

type ListEmptyStateProps = {
  onAddItem: () => void;
};

export const ListEmptyState: FC<ListEmptyStateProps> = ({ onAddItem }) => {
  return (
    <div className={styles.container}>
      <p>Your shopping list is empty :(</p>
      <Button onClick={onAddItem}>Add your first item</Button>
    </div>
  );
};
