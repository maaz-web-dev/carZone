import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import { createCar, updateCar } from "../api/carService";
import { getAllCategories } from "../api/categoryService";

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

const CarModal = ({ open, onClose, editCar }) => {
  const [formData, setFormData] = useState({
    category: "",
    color: "",
    model: "",
    make: "",
    registrationNo: "",
    price: "",
    fuelType: "",
    mileage: "",
  });
  const [categories, setCategories] = useState([]); // Store categories from API
  const [errorMessages, setErrorMessages] = useState([]);

  // Fetch categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data); // Store fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fill form if editing
  useEffect(() => {
    if (editCar) {
      setFormData(editCar);
    } else {
      setFormData({
        category: "",
        color: "",
        model: "",
        make: "",
        registrationNo: "",
        price: "",
        fuelType: "",
        mileage: "",
      });
    }
  }, [editCar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setErrorMessages([]); // Clear previous errors

      // Ensure price and mileage are numbers
      if (isNaN(formData.price) || isNaN(formData.mileage)) {
        setErrorMessages([{ path: "price", msg: "Price and Mileage must be numbers" }]);
        return;
      }

      if (editCar) {
        await updateCar(editCar._id, formData);
      } else {
        await createCar(formData);
      }
      onClose(true);
    } catch (error) {
      console.error("Error saving car:", error);
      if (error.response?.data?.errors) {
        setErrorMessages(error.response.data.errors);
      } else {
        setErrorMessages([{ msg: "An unexpected error occurred" }]);
      }
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
          width: 500, // Adjust width to reduce space
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {editCar ? "Edit Car" : "Add New Car"}
        </Typography>

        {/* Show validation errors */}
        {errorMessages.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessages.map((error, index) => (
              <div key={index}>{error.msg}</div>
            ))}
          </Alert>
        )}

        {/* Grid Layout for Better Form Spacing */}
        <Grid container spacing={2}>
          {/* Category Dropdown */}
          <Grid item xs={6}>
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Color */}
          <Grid item xs={6}>
            <TextField
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Model */}
          <Grid item xs={6}>
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Make */}
          <Grid item xs={6}>
            <TextField
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Registration Number */}
          <Grid item xs={6}>
            <TextField
              label="Registration Number"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Price */}
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Fuel Type Dropdown */}
          <Grid item xs={6}>
            <TextField
              select
              label="Fuel Type"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              fullWidth
              required
            >
              {fuelTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Mileage */}
          <Grid item xs={6}>
            <TextField
              label="Mileage"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={() => onClose(false)} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={
              !formData.category ||
              !formData.color ||
              !formData.model ||
              !formData.make ||
              !formData.registrationNo ||
              !formData.price ||
              !formData.fuelType ||
              !formData.mileage
            }
          >
            {editCar ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// ✅ Prop Validation
CarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editCar: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    color: PropTypes.string,
    model: PropTypes.string,
    make: PropTypes.string,
    registrationNo: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fuelType: PropTypes.string,
    mileage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default CarModal;