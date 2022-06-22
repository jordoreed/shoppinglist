import { FC, useState } from 'react';
import {
  Button,
  IconButton,
  Checkbox,
  Dialog,
  Typography,
} from '@mui/material';

import { Item } from '@server/types/item';

import styles from './index.module.css';

type ItemTableProps = {
  items: Item[];
  onAdd: () => void;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
};

export const ItemTable: FC<ItemTableProps> = ({
  items,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [itemIdToDelete, setItemIdToDelete] = useState<string>();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>Your Items</div>
        <Button onClick={onAdd} variant="contained">
          Add Item
        </Button>
      </header>
      <div>
        {items.map((item) => (
          <ItemRow
            key={`item-row-${item.id}`}
            item={item}
            onEdit={() => onEdit(item)}
            onDelete={() => setItemIdToDelete(item.id)}
          />
        ))}
      </div>

      <Dialog
        open={Boolean(itemIdToDelete)}
        onClose={() => setItemIdToDelete(undefined)}
        aria-label="Delete item confirmation dialog"
      >
        <div className={styles.deleteItemDialog}>
          <h3>Delete item?</h3>
          <p>
            Are you sure you want to delete this item? This can not be undone.
          </p>
          <div className={styles.buttons}>
            <Button onClick={() => setItemIdToDelete(undefined)}>Cancel</Button>
            <Button
              onClick={() => itemIdToDelete && onDelete(itemIdToDelete)}
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

type ItemRowProps = {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
};

const ItemRow: FC<ItemRowProps> = ({ item, onEdit, onDelete }) => {
  const [checked, setChecked] = useState(false);

  const classes = [styles.row];
  if (checked) {
    classes.push(styles.checked);
  }

  return (
    <div className={classes.join(' ')}>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />

      <div className={styles.nameDescription}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.description}>{item.description}</div>
      </div>

      <IconButton aria-label="delete" size="large" onClick={onEdit}>
        <div className="material-icons">edit</div>
      </IconButton>
      <IconButton aria-label="delete" size="large" onClick={onDelete}>
        <div className="material-icons">delete_outline</div>
      </IconButton>
    </div>
  );
};
