import { forwardRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

const Menu = forwardRef(({ children, anchorEl, open, onClose }, ref) => {
  const handleClose = (event) => {
    if ((ref.current && ref.current.contains(event.target)) || anchorEl.contains(event.target)) {
      return;
    }

    onClose();
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition disablePortal>
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
});

Menu.displayName = 'Menu';

export default Menu;
