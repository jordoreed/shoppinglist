import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Drawer } from '../components/Drawer';
import { FormItem, ItemForm } from '../components/ItemForm';
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
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const isNewItem = currentItem?.id === defaultItem.id;

  const refreshList = () => dispatch(fetchItems());

  const onSubmit = async (item: FormItem) => {
    if (isNewItem) {
      await dispatch(createItem(item));
      await refreshList();
    } else {
      await dispatch(updateItem(item));
      await refreshList();
    }
    setCurrentItem(undefined);
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>SHOPPING LIST</header>
      <div className={styles.body}>
        {items.length === 0 ? (
          <ListEmptyState
            onAddItem={() => setCurrentItem({ ...defaultItem })}
          />
        ) : (
          <div>
            {items.map((item) => (
              <h1>{item.name}</h1>
            ))}
          </div>
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
