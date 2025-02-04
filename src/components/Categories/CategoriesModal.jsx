import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Modal, TextField } from "@mui/material";

export default function CategoriesModal({ open, onClose, refreshData }) {
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title } = formData;

    const submitData = new FormData();
    submitData.append("title", title);

    axios
      .post(
        "https://erhem.templateapi.xyz/online/api/v1/categories",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(() => {
        refreshData();
        onClose();
      })
      .catch((err) => console.log("Алдаа :", err));
  };

  return (
    <div>
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
          <h2>Категори нэмэх</h2>

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
            <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Хадгалах
          </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
