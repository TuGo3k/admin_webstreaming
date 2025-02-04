import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CategoriesModal from "./CategoriesModal";
import CategoriesEdit from "./CategoriesEdit";

export default function CategoriesTable() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const fetchData = () => {
    axios
      .get("https://erhem.templateapi.xyz/online/api/v1/categories")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`https://erhem.templateapi.xyz/online/api/v1/categories/${id}`)
      .then(() => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log("Устгахад алдаа гарлаа :", err));
  };

  const handleEdit = (id) => {
    setEdit(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>
        Категори нэмэх
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Категорийн нэр</TableCell>
              <TableCell>Он сар</TableCell>
              <TableCell>Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{dayjs(item.date).format("YYYY-MM-DD")}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ ml: 2 }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CategoriesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        refreshData={() => setRefresh((prev) => prev + 1)}
      />
      <CategoriesEdit
        open={openModal}
        handleClose={handleClose}
        edit={edit}
        setRefresh={setRefresh}
      />
    </div>
  );
}
