import { FC, PropsWithChildren } from 'react';
import { Drawer as MaterialDrawer, IconButton, Button } from '@mui/material';

import styles from './index.module.css';

type DrawerProps = PropsWithChildren & {
  title: string;
  open: boolean;
  primaryActionText: string;
  onClose: () => void;
  onPrimaryAction: () => void;
};

export const Drawer: FC<DrawerProps> = ({
  children,
  title,
  open,
  primaryActionText,
  onClose,
  onPrimaryAction,
}) => {
  return (
    <MaterialDrawer anchor="right" open={open} onClose={onClose}>
      <header className={styles.header}>
        <div>{title}</div>
        <IconButton aria-label="delete" size="large" onClick={onClose}>
          <div className="material-icons">last_page</div>
        </IconButton>
      </header>
      <div className={styles.body}>{children}</div>
      <footer>
        <div className={styles.footerButtons}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onPrimaryAction}>{primaryActionText}</Button>
        </div>
        <div className={styles.bottomBar} />
      </footer>
    </MaterialDrawer>
  );
};
