import { CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Drawer } from '../components/Drawer';
import { FormItem, ItemForm } from '../components/ItemForm';
import { ItemTable } from '../components/ItemTable';
import { ListEmptyState } from '../components/ListEmptyState';
import { RootState, useAppDispatch } from '../store';
import { fetchItems, createItem, updateItem, deleteItem } from '../store/items';

import styles from './index.module.css';

const defaultItem: FormItem = {
  id: '0',
  name: '',
  description: '',
  quantity: 1,
};

export const App = () => {
  const [currentItem, setCurrentItem] = useState<FormItem>();
  const [loading, setLoading] = useState(false);
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const isNewItem = currentItem?.id === defaultItem.id;

  const refreshList = () => dispatch(fetchItems());

  const onSubmit = async (item: FormItem) => {
    setLoading(true);
    if (isNewItem) {
      await dispatch(createItem(item));
      await refreshList();
    } else {
      await dispatch(updateItem(item));
      await refreshList();
    }
    setLoading(false);
    setCurrentItem(undefined);
  };

  const onDelete = async (itemId: string) => {
    setLoading(true);
    await dispatch(deleteItem(itemId));
    await refreshList();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    refreshList().then(() => setLoading(false));
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>SHOPPING LIST</header>
      <div className={styles.body}>
        {loading && <CircularProgress />}
        {!loading && (
          <>
            {items.length === 0 ? (
              <ListEmptyState
                onAddItem={() => setCurrentItem({ ...defaultItem })}
              />
            ) : (
              <ItemTable
                items={items}
                onAdd={() => setCurrentItem({ ...defaultItem })}
                onEdit={setCurrentItem}
                onDelete={onDelete}
              />
            )}
          </>
        )}
      </div>

      <Drawer
        title="SHOPPING LIST"
        open={Boolean(currentItem)}
        primaryActionText={isNewItem ? 'Add Item' : 'Save Item'}
        onClose={() => setCurrentItem(undefined)}
        onPrimaryAction={() => formRef.current?.requestSubmit()}
      >
        <ItemForm
          ref={formRef}
          item={currentItem || defaultItem}
          isNewItem={isNewItem}
          onSubmit={onSubmit}
        />
      </Drawer>
    </div>
  );
};
