import { useState } from 'react';

import { Drawer } from '../components/Drawer';
import { ItemForm } from '../components/ItemForm';
import { ListEmptyState } from '../components/ListEmptyState';

import styles from './index.module.css';

export const App = () => {
  const items = [];
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className={styles.app}>
      <header className={styles.header}>SHOPPING LIST</header>
      <div className={styles.body}>
        {items.length === 0 ? (
          <ListEmptyState onAddItem={() => setFormOpen(true)} />
        ) : (
          <div>item list</div>
        )}
      </div>

      <Drawer
        title="SHOPPING LIST"
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onPrimaryAction={() => {}}
      >
        <ItemForm />
      </Drawer>
    </div>
  );
};
