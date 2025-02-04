import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

import dayjs from "dayjs";
import CourseModal from "./CourseModal";
import CourseEditModal from "./CourseEditModal";

const CourseTable = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editID, setEditID] = useState(null);

  const fetchData = () => {
    axios
      .get("https://erhem.templateapi.xyz/online/api/v1/course")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log("Алдаа:", err));
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`https://erhem.templateapi.xyz/online/api/v1/course/${id}`)
      .then(() => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log("Алдаа:", err));
  };

  const handleEdit = (id) => {
    setEditID(id);
    setOpenModal(true); 
  };

  const handleClose = () => {
    setOpenModal(false); 
  };

  return (
    <div className="">
      <Button
        onClick={() => setModalOpen(true)}
      >
        Бүлэг нэмэх
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Хичээлийн нэр</TableCell>
              <TableCell>Категори</TableCell>
              <TableCell>Видео</TableCell>
              <TableCell>Он сар</TableCell>
              <TableCell>Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.lesson}</TableCell>
                <TableCell>
                <video width="150" controls>
                  <source src={`https://erhem.templateapi.xyz/online/uploads/${item.video}`} type="video/mp4" />
                  Таны төхөөрөмж видео дэмжихгүй байна.
                </video>
              </TableCell>
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

      <CourseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        refreshData={() => setRefresh((prev) => prev + 1)}
      />
      <CourseEditModal
        open={openModal}
        handleClose={handleClose}
        editID={editID}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default CourseTable;
