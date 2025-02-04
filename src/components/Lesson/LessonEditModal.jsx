import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const LessonEditModal = ({ open, handleClose, editID, setRefresh }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    price: "",
    file: null,
  });
  const [categories, setCategories] = useState([]);
  const [currentCover, setCurrentCover] = useState(""); 

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://erhem.templateapi.xyz/online/api/v1/categories"
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
          `https://erhem.templateapi.xyz/online/api/v1/lesson/${editID}`
        );
        setFormData({
          category: response.data.data.category,
          title: response.data.data.title,
          price: response.data.data.price,
          file: null,
        });
        setCurrentCover(response.data.data.cover);
      } catch (error) {
        console.error("Хичээлийг татахад алдаа гарлаа:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLessonData();
  }, [editID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, title, price, file } = formData;
    if (category && title && price) {
      const submitData = new FormData();
      submitData.append("category", category);
      submitData.append("title", title);
      submitData.append("price", price);
      if (file) {
        submitData.append("file", file); 
      }

      axios
        .put(
          `https://erhem.templateapi.xyz/online/api/v1/lesson/${editID}`,
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(() => {
          setRefresh((prev) => prev + 1);
          handleClose();
        })
        .catch((err) => console.error("Алдаа:", err));
    } else {
      alert("Бүх талбарыг бөглөнө үү!");
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
        <h2>Хичээл засах</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Гарчиг"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

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
            label="Үнэ"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          {currentCover && (
            <img
              src={`https://erhem.templateapi.xyz/online/uploads/${currentCover}`}
              alt="Current Cover"
              style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
            />
          )}

          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              marginTop: "16px",
              marginBottom: "16px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
            }}
          />

          <Button variant="contained" color="primary" type="submit">
            Хадгалах
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LessonEditModal;
