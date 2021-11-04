import { useState, ChangeEvent } from 'react';
import type { FC } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography,
} from '@mui/material';
// import DialogContentText from '@mui/material/DialogContentText';

interface Props {
    title: string;
    open: boolean;
    itemId: string;
    handleClose: () => void;
    handleAction: () => void;
}

const AlertBox: FC<Props> = ({
  title, open, itemId, handleClose, handleAction,
}: Props) => {
  const [confirmationText, setConfirmationText] = useState<string>('');

  const changeConfirmationText = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmationText(e.target.value);
  };

  const confirmAction = (): void => {
    if (confirmationText === 'تایید') {
      handleAction();
    }
  };

  const clearConfirmationText = (): void => {
    setConfirmationText('');
  };

  const onCloseClick = (): void => {
    clearConfirmationText();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onCloseClick}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {`لطفا تایید را بنویسید ${itemId} برای حذف مسیر ارتباطی`}
        </Typography>
        <TextField label="تایید" fullWidth value={confirmationText} onChange={changeConfirmationText} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseClick} variant="text">انصراف</Button>
        <Button color="error" disabled={confirmationText !== 'تایید'} onClick={confirmAction} variant="text">حذف</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertBox;
