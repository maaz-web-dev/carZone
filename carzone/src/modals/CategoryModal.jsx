import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { createCategory, updateCategory } from "../api/categoryService";
const CategoryModal = ({ open, onClose, editCategory }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Fill form if editing
  useEffect(() => {
    if (editCategory) {
      setFormData(editCategory);
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [editCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editCategory) {
        await updateCategory(editCategory._id, formData); 
      } else {
        await createCategory(formData); 
      }
      onClose(true); 
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {editCategory ? "Edit Category" : "Add New Category"}
        </Typography>
        <TextField
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={() => onClose(false)} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.description}
          >
            {editCategory ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// ✅ Prop Validation
CategoryModal.propTypes = {
  open: PropTypes.bool.isRequired, // Must be a boolean
  onClose: PropTypes.func.isRequired, // Must be a function
  editCategory: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }), // editCategory is optional but must match this shape if provided
};

export default CategoryModal;
