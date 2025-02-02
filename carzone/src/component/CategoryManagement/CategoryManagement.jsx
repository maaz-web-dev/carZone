import { useState, useEffect } from "react";
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
  Pagination,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getAllCategories, deleteCategory } from "../../api/categoryService";
import CategoryModal from "../../modals/CategoryModal";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, currentPage: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false); // Controls the global loader
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // Tracks the category to be deleted
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); // Manages delete confirmation dialog state
  const limit = 5;

  useEffect(() => {
    fetchCategories();
  }, [pagination.currentPage]);

  const fetchCategories = async () => {
    setIsLoading(true); 
    try {
      const data = await getAllCategories(pagination.currentPage, limit);
      setCategories(data?.categories);
      setPagination({
        total: data.pagination.total,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
      });
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCategory(deleteCategoryId);
      setConfirmationDialogOpen(false);
      await fetchCategories(); 
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    setEditCategory(category);
    setModalOpen(true);
  };

  const handleCloseModal = async (refresh = false) => {
    setModalOpen(false);
    setEditCategory(null);
    if (refresh) {
      setIsLoading(true); 
      await fetchCategories();
      setIsLoading(false); 
    }
  };

  const handleOpenDeleteDialog = (categoryId) => {
    setDeleteCategoryId(categoryId); 
    setConfirmationDialogOpen(true); 
  };

  const handleCloseDeleteDialog = () => {
    setDeleteCategoryId(null); 
    setConfirmationDialogOpen(false); 
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpenModal()}>
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
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleOpenModal(category)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenDeleteDialog(category._id)}
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

      {pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(_, value) => setPagination((prev) => ({ ...prev, currentPage: value }))}
          />
        </Box>
      )}

      <CategoryModal open={modalOpen} onClose={handleCloseModal} editCategory={editCategory} />


      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManagement;
