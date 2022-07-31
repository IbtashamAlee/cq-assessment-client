import React, {useEffect, useState} from "react";
import Api from "../services/api.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container} from "@mui/material";

export function BooksPage(props) {
  const [books, setBooks] = useState([]);

  const getbooks = () => {
    Api.execute('/api/books').then(res => {
      setBooks(res.data.data);
    }).catch(e => {
      alert(e.message)
    })
  }

  useEffect(() => {
    getbooks();
  }, [])

  return (
      <div>
        <Container>
          <div className={"flex justify-between items-center my-6"}>
            <h3 className={"text-2xl"}>Books Page</h3>
            <span>
              <Button variant={"contained"}>Add Book</Button>
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.length && books.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.author}</TableCell>
                      <TableCell align="left">{row.copies_in_shelf}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
  )
}
