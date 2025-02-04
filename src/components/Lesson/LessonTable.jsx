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
import LessonModal from "./LessonModal";
import LessonEditModal from "./LessonEditModal"
import dayjs from "dayjs";

const LessonTable = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editID, setEditID] = useState(null);
  const [teacherNames, setTeacherNames] = useState([]);

  const fetchData = () => {
    axios
      .get("https://erhem.templateapi.xyz/online/api/v1/lesson")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log("Алдаа:", err));
  };

  useEffect(() => {
    fetchData();
    const savedNames = JSON.parse(localStorage.getItem("teacherNames")) || []; 
    setTeacherNames(savedNames); 
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`https://erhem.templateapi.xyz/online/api/v1/lesson/${id}`)
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
    <div>
      <Button
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Шинэ хичээл нэмэх
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Зураг</TableCell>
              <TableCell>Хичээлийн нэр</TableCell>
              <TableCell>Багш</TableCell>
              <TableCell>Категори</TableCell>
              <TableCell>Үнэ</TableCell>
              <TableCell>Он сар</TableCell>
              <TableCell>Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item.cover ? (
                    <img
                      src={`https://erhem.templateapi.xyz/online/uploads/${item.cover}`}
                      alt={item.title}
                      style={{ width: "60px", height: "60px", borderRadius: "8px" }}
                    />
                  ) : (
                    "Зураг байхгүй"
                  )}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{teacherNames.join(", ") || item.teacher}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
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

      <LessonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        refreshData={() => setRefresh((prev) => prev + 1)}
      />
      <LessonEditModal
        open={openModal}
        handleClose={handleClose}
        editID={editID}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default LessonTable;
