import { useRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

const Menu = ({ children, anchorEl, open, onClose }) => {
  const menuRef = useRef(null);

  const handleClose = (event) => {
    if ((menuRef.current && menuRef.current.contains(event.target)) || anchorEl.contains(event.target)) {
      return;
    }

    onClose();
  };

  return (
    <Popper open={open} anchorEl={anchorEl} popperRef={menuRef} placement="bottom-start" transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>{children}</MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default Menu;
