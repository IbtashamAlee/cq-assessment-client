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
import EditIcon from '@mui/icons-material/Edit';
import StudentDialog from "../components/studentDialog";

export function StudentPage(props) {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    Api.execute('/api/students').then(res => {
      setStudents(res.data.data);
    }).catch(e => {
      alert(e.message)
    })
  }

  useEffect(() => {
    getStudents();
  }, [])

  return (
      <div>
        <Container>
          <div className={"flex justify-between items-center my-6"}>
            <h3 className={"text-2xl"}>Students Page</h3>
            <span>
              <StudentDialog getStudents={getStudents}/>
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length && students.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.first_name}
                      </TableCell>
                      <TableCell align="left">{row.last_name}</TableCell>
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
