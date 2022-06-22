import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Item } from '@server/types/item';

import styles from './index.module.css';

const MAX_QUANTITY = 3;

export type FormItem = Omit<Item, 'createdAt' | 'updatedAt'>;

type ItemFormProps = {
  item: FormItem;
  isNewItem: boolean;
  onSubmit: (item: FormItem) => void;
};

export const ItemForm = React.forwardRef<HTMLFormElement, ItemFormProps>(
  ({ item: initialItem, isNewItem, onSubmit }, ref) => {
    const [item, setItem] = useState<FormItem>({ ...initialItem });

    useEffect(() => {
      setItem({ ...initialItem });
    }, [initialItem]);

    return (
      <form
        className={styles.form}
        ref={ref}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onSubmit(item);
          return false;
        }}
      >
        <h2>{isNewItem ? 'Add an item' : 'Edit an item'}</h2>
        <p>{isNewItem ? 'Add your new item below' : 'Edit your item below'}</p>

        <TextField
          label="Item Name"
          variant="outlined"
          className={styles.input}
          value={item.name}
          required
          onChange={(event) => {
            setItem({
              ...item,
              name: event.target.value,
            });
          }}
        />

        <TextField
          label="Description"
          variant="outlined"
          className={styles.input}
          value={item.description}
          multiline
          rows={5}
          onChange={(event) => {
            setItem({
              ...item,
              description: event.target.value,
            });
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="item-quantity-select-label">Quantity</InputLabel>
          <Select
            labelId="item-quantity-select-label"
            id="item-quantity-select"
            label="Quantity"
            value={item.quantity}
            required
            onChange={(event) => {
              setItem({
                ...item,
                quantity: event.target.value as number,
              });
            }}
          >
            {Array.from(Array(MAX_QUANTITY).keys()).map((_, index) => {
              const value = index + 1;
              return (
                <MenuItem key={`quantity-option-${value}`} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
);
