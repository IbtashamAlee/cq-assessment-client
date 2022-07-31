import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Api from "../services/api.js";

export default function BooksDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = () => {
    Api.execute('/api/books', 'post', {
      name: name,
      author: author,
      copies_in_shelf: quantity
    }).then(res => {
      props.getBooks();
      handleClose();
    }).catch(e => {
      alert(e.message)
    })
  }

  return (
      <div>
        <Button variant={"contained"} onClick={handleClickOpen}>Add Book</Button>
        <Dialog open={open} onClose={handleClose}>

          <DialogContent>
            <DialogContentText>
              Please add details below
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="first"
                label="Name"
                fullWidth
                variant="standard"
                value={name}
                onChange={e => {setName(e.target.value)}}
            />
            <TextField
                autoFocus
                margin="dense"
                id="author"
                value={author}
                onChange={e => {setAuthor(e.target.value)}}
                label="Author"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="quantity"
                value={quantity}
                onChange={e => {setQuantity(parseInt(e.target.value))}}
                label="Quantity"
                fullWidth
                variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddStudent}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
