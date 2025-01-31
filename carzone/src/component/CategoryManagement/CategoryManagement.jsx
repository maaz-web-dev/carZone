import  { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import { getAllCategories, deleteCategory } from "../../api/categoryService";
import CategoryModal from "../../modals/CategoryModal";
const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // Store category data when editing

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      console.log("date ", data);
      setCategories(data);
      setError("");
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message || "Failed to load categories.");
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      setError(error.message || "Failed to delete category.");
    }
  };

  // Open modal for adding or editing a category
  const handleOpenModal = (category = null) => {
    setEditCategory(category); 
    setModalOpen(true);
  };

  // Close modal and refresh list
  const handleCloseModal = (refresh = false) => {
    setModalOpen(false);
    setEditCategory(null);
    if (refresh) fetchCategories(); 
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

   
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpenModal()}
      >
        Add New Category
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => handleOpenModal(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Category Modal */}
      <CategoryModal open={modalOpen} onClose={handleCloseModal} editCategory={editCategory} />
    </Box>
  );
};

export default CategoryManagement;
