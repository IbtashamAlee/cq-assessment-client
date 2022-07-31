import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Api from "../services/api.js";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel, Select} from "@mui/material";
import {useEffect} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BorrowDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [studentId, setStudentId] = React.useState(null);
  const [bookId, setBookId] = React.useState(null);
  const [returnDate, setReturnDate] = React.useState(new Date('2024-08-18T21:11:54'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = () => {
    Api.execute('/api/borrow', 'post', {
      student_id: studentId,
      book_id: bookId,
      return_date: returnDate
    }).then(res => {
      props.getBooks();
      handleClose();
    }).catch(e => {
      alert(e.response.data.msg)
    })
  }

  const getStudents = () => {
    Api.execute('/api/students').then(res => {
      setStudents(res.data.data);
    }).catch(e => {
      alert(e.message)
    })
  }

  const getBooks = () => {
    Api.execute('/api/books').then(res => {
      setBooks(res.data.data);
    }).catch(e => {
      alert(e.message)
    })
  }

  useEffect(() => {
    getStudents();
    getBooks();
  }, [])

  return (
      <div>
        <Button variant={"contained"} onClick={handleClickOpen}>Add Record</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Borrow book</DialogTitle>
          <DialogContent>
            <DialogContentText className={"!mb-6"}>
              Please add details below
            </DialogContentText>
            <Box sx={{ minWidth: 320 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Student</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={studentId}
                    label="Student"
                    onChange={e => {setStudentId(e.target.value)}}
                >
                  {students.map(row => (
                      <MenuItem value={row.id}>{row.first_name + " " + row.last_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 320 }} className={"!mt-6"}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Book</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bookId}
                    label="Student"
                    onChange={e => {setBookId(e.target.value)}}
                >
                  {books.map(row => (
                      <MenuItem value={row.id}>{row.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div className={"mt-6"}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    label="Pick return date"
                    value={returnDate}
                    onChange={setReturnDate}
                    renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddStudent}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
