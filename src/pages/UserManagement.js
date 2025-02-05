import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, TextField, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "Нэр", width: 200, editable: true },
  { field: "lastName", headerName: "Овог", width: 200, editable: true },
  { field: "email", headerName: "Email", width: 250, editable: true },
  { field: "phoneNumber", headerName: "Утасны дугаар", width: 200 },
];

const initialRows = [
  { id: 1, lastName: "Snow", firstName: "Jon", email: "jon@gmail.com", phoneNumber: "89080910" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", email: "cersei@gmail.com", phoneNumber: "89080911" },
  { id: 3, lastName: "Stark", firstName: "Arya", email: "arya@gmail.com", phoneNumber: "89080912" },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "" });

  // Handle input changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.phoneNumber) {
      alert("Бүх талбарыг бөглөнө үү!");
      return;
    }
    const newUserData = { id: rows.length + 1, ...newUser };
    setRows([...rows, newUserData]);
    setNewUser({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    setOpen(false);
  };

  return (
    <div className="px-[15%]">

    
    <Box sx={{ height: 500, width: "100%", paddingTop: 10 }}>
      {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ marginBottom: 2 }}>
        Хэрэглэгч нэмэх
      </Button> */}
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} checkboxSelection disableRowSelectionOnClick />

      {/* Modal for Adding User */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, bgcolor: "white", p: 4, borderRadius: 2, mx: "auto", mt: 10 }}>
          <Typography variant="h6" mb={2}>Шинэ хэрэглэгч нэмэх</Typography>
          <TextField label="Нэр" name="firstName" fullWidth margin="normal" value={newUser.firstName} onChange={handleChange} />
          <TextField label="Овог" name="lastName" fullWidth margin="normal" value={newUser.lastName} onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="normal" value={newUser.email} onChange={handleChange} />
          <TextField label="Утасны дугаар" name="phoneNumber" fullWidth margin="normal" value={newUser.phoneNumber} onChange={handleChange} />
          <Button onClick={handleAddUser} variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>Нэмэх</Button>
        </Box>
      </Modal>
    </Box>
    </div>
  );
}
