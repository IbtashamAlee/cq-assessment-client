import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Api from "../services/api.js";
import {useEffect} from "react";

export default function StudentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = () => {
    let method = 'post';
    if (props.student) {
      method = 'put';
    }
    Api.execute('/api/students', method, {
      first_name: firstName,
      last_name: lastName,
      student_id: props?.student?.id
    }).then(res => {
      props.getStudents();
      handleClose();
    }).catch(e => {
      alert(e.message)
    })
  }

  useEffect(() => {
    if (props.student) {
      setFirstName(props.student.first_name);
      setLastName(props.student.last_name);
    }
  }, [])

  return (
      <div>
        <div onClick={handleClickOpen}>
          {props.children}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add details below
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="first"
                label="First Name"
                fullWidth
                variant="standard"
                value={firstName}
                onChange={e => {setFirstName(e.target.value)}}
            />
            <TextField
                autoFocus
                margin="dense"
                id="last"
                value={lastName}
                onChange={e => {setLastName(e.target.value)}}
                label="Last Name"
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
