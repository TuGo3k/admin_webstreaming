import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CategoriesEdit({ open, handleClose, edit, setRefresh }) {
  const [formData, setFormData] = useState({ title: ""});

  const fetchCategoryData = async () => {
    if (edit) {
      try {
        const response = await axios.get(
          `https://erhem.templateapi.xyz/online/api/v1/categories/${edit}`
        );
        setFormData({
          title: response.data.data.title,
        });
      } catch (error) {
        console.log("Категори засахад алдаа гарлаа", error);
      }
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategoryData();
    }
  }, [open, edit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title } = formData;

    const submitData = new FormData();
    submitData.append("title", title);


    axios
      .put(
        `https://erhem.templateapi.xyz/online/api/v1/categories/${edit}`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(() => {
        handleClose();
        setRefresh((prev) => prev + 1); 
      })
      .catch((err) => console.log("Засахад алдаа гарлаа", err));
  };

  return (
    <div>
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
          <h2>Категори засах</h2>
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
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Хадгалах
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
