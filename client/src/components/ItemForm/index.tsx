import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import styles from './index.module.css';

const MAX_QUANTITY = 3;

export const ItemForm = () => {
  return (
    <form className={styles.form}>
      <h2>Add an item</h2>
      <p>Add your new item below</p>

      <TextField
        label="Item Name"
        variant="outlined"
        className={styles.input}
      />

      <TextField
        label="Description"
        variant="outlined"
        className={styles.input}
        multiline
        rows={5}
      />

      <FormControl fullWidth>
        <InputLabel id="item-quantity-select-label">Quantity</InputLabel>
        <Select
          labelId="item-quantity-select-label"
          id="item-quantity-select"
          // value={age}
          label="Quantity"
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
};
