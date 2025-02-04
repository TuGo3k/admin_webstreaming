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

const LessonModal = ({ open, onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    price: "",
    file: null,
  });
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading ,setLoading ] = useState(false)

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

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const saveNames = () => {
    const existingNames = JSON.parse(localStorage.getItem("teacherNames")) || [];
    
    if (name && !existingNames.includes(name)) {
      existingNames.push(name);
      localStorage.setItem("teacherNames", JSON.stringify(existingNames));
      alert("Багшийн нэр хадгалагдлаа!");
    }
  };

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
    setLoading(true)
    if (category && title && price && file) {
      const submitData = new FormData();
      submitData.append("category", category);
      submitData.append("title", title);
      submitData.append("price", price);
      submitData.append("file", file);

      axios
        .post(
          "https://erhem.templateapi.xyz/online/api/v1/lesson",
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(() => {
          refreshData();
          onClose();
          setLoading(false)
        })
        .catch((err) => console.error("Алдаа:", err));
        setLoading(false)
    } else {
      alert("Бүх талбарыг бөглөнө үү!");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <h2>Шинэ хичээл нэмэх</h2>
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

          <TextField
            label="Багш"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
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

          <input
            type="file"
            name="file"
            accept="image/*"
            src={`https://erhem.templateapi.xyz/online/uploads`}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            onClick={saveNames} 
            loading={loading}
            disabled={loading}
            loadingPosition="end"
          >
            Хадгалах
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LessonModal;
