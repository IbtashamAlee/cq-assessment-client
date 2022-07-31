import React, {useEffect, useState} from "react";
import Api from "../services/api.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";

export function BorrowedBooksPage(props) {
  const [books, setBooks] = useState([]);

  const getbooks = () => {
    Api.execute('/api/borrow').then(res => {
      setBooks(res.data.data);
    }).catch(e => {
      alert(e.message)
    })
  }

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
  }

  useEffect(() => {
    getbooks();
  }, [])

  return (
      <div>
        <Container>
          <div className={"flex justify-between items-center my-6"}>
            <h3 className={"text-2xl"}>Borrowed Page</h3>
            <span>
              <Button variant={"contained"}>Add Record</Button>
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Borrowed By</TableCell>
                  <TableCell align="left">Copies left in shelf</TableCell>
                  <TableCell align="left">Borrowed at</TableCell>
                  <TableCell align="left">Returning at</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.length && books.map((row) => (
                    <TableRow
                        key={row.id + row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.author}</TableCell>
                      <TableCell align="left">{row.first_name + ' ' + row.last_name}</TableCell>
                      <TableCell align="left">{row.copies_in_shelf}</TableCell>
                      <TableCell align="left">{getDateTime(row.borrowed_at)}</TableCell>
                      <TableCell align="left">{getDateTime(row.expected_return_date)}</TableCell>
                      <TableCell align="right">
                        <IconButton color={"error"}>
                          <EditIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
  )
}