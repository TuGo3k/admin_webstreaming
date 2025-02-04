import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import axios from "axios";

const CourseEditModal = ({ open, handleClose, editID, setRefresh }) => {
  const [formData, setFormData] = useState({ lesson: "", title: "" , file : null });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://erhem.templateapi.xyz/online/api/v1/lesson"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Категори татахад алдаа гарлаа:", error);
    }
  };

  const fetchLessonData = async () => {
    if (editID) {
      try {
        const response = await axios.get(
          `https://erhem.templateapi.xyz/online/api/v1/course/${editID}`
        );
        setFormData({
          category: response.data.data.lesson,
          title: response.data.data.title,
        });
      } catch (error) {
        console.error("Хичээл засахад алдаа гарлаа:", error);
      }
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchLessonData();
    }
  }, [open, editID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, title } = formData;
    if (category && title) {
      const submitData = new FormData();
      submitData.append("lesson", category);
      submitData.append("title", title);
      axios
        .put(`https://erhem.templateapi.xyz/online/api/v1/course/${editID}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setRefresh((prev) => prev + 1); 
          handleClose();
        })
        .catch((err) => console.error("Засахад алдаа:", err));
    } else {
      alert("Категори болон гарчиг шаардлагатай!");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Бүлэг засах</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Категори</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Категори"
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.title}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Категори сонгоно уу</FormHelperText>
          </FormControl>

          <TextField
            label="Гарчиг"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Засах
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CourseEditModal;
