import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
const CourseModal = ({ open, onClose, refreshData }) => {
  const [formData, setFormData] = useState({ category: "", title: "", file: "" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = React.useState(false);


  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://erhem.templateapi.xyz/online/api/v1/lesson");
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, title, file } = formData;
    setLoading(true)

    const submitData = new FormData();
    submitData.append("lesson", category);
    submitData.append("title", title);
    submitData.append("file", file);

    axios
      .post("https://erhem.templateapi.xyz/online/api/v1/course", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        refreshData();
        onClose();
        setLoading(false)
      })
      .catch((err) => { console.error("Алдаа:", err);
        setLoading(false)
      }) ;
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
        <h2>Бүлэг нэмэх</h2>
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

          <input
            type="file"
            name="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
          <Button
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          type="submit"
          sx={{mt: 2}}
          disabled={loading}
        >
          Хадгалах
        </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CourseModal;
