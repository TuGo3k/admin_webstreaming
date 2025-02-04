import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editID, setEditID] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const { category, title } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    setFormData({ ...formData, category: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category && title) {
      const submitData = new FormData();
      submitData.append("category", category);
      submitData.append("title", title);
      if (coverFile) {
        submitData.append("cover", coverFile);
      }

      axios
        .post("https://erhem.templateapi.xyz/online/api/v1/lesson", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setData((prevData) => [...prevData, res.data.data]);
          setFormData({ category: "", title: "" });
          setCoverFile(null);
        })
        .catch((err) => console.log("Алдаа:", err));
    } else {
      console.log("Категори болон гарчиг шаардлагатай!");
    }
  };

  const handleUpdate = () => {
    if (category && title && editID) {
      axios
        .put(`https://erhem.templateapi.xyz/online/api/v1/lesson/${editID}`, {
          category,
          title,
        })
        .then(() => {
          setFormData({ category: "", title: "" });
          setEditID(null);
          setRefresh((prev) => prev + 1);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Категори, гарчиг, болон засах ID шаардлагатай!");
    }
  };

  const handleDelete = (deleteID) => {
    axios
      .delete(`https://erhem.templateapi.xyz/online/api/v1/lesson/${deleteID}`)
      .then(() => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (editIDNotState) => {
    axios
      .get(`https://erhem.templateapi.xyz/online/api/v1/lesson/${editIDNotState}`)
      .then((res) => {
        setFormData({
          category: res.data.data.category,
          title: res.data.data.title,
        });
        setEditID(editIDNotState);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://erhem.templateapi.xyz/online/api/v1/lesson")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://erhem.templateapi.xyz/online/api/v1/categories"
        );
        const categoryTitles = response.data.data.map((item) => ({
          id: item._id,
          title: item.title,
        }));
        setCategories(categoryTitles);
      } catch (error) {
        console.error("Категори татахад алдаа гарлаа:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 mt-2">
          <h4>Lesson API Integration</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="category-select">Категори сонгох:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border rounded-lg"
              >
                <option value="">Сонгоно уу</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {editID && (
              <button
                type="button"
                className="btn btn-warning ml-2"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </form>

          <hr />

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Test;
