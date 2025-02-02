import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
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
    year: "", 
  });

  const [categories, setCategories] = useState([]); 
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data?.categories); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
        year: "",
      });
    }
  }, [editCar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setErrorMessages([]);

      
      if (isNaN(formData.price) || isNaN(formData.mileage) || isNaN(formData.year)) {
        setErrorMessages([{ path: "price", msg: "Price, Mileage, and Year must be numbers" }]);
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
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {editCar ? "Edit Car" : "Add New Car"}
        </Typography>

        {errorMessages.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessages.map((error, index) => (
              <div key={index}>{error.msg}</div>
            ))}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category?._id || ""}
              onChange={(e) => {
                const selectedCategory = categories.find(cat => cat._id === e.target.value);
                setFormData({ ...formData, category: selectedCategory || {} });
              }}
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
          <Grid item xs={6}>
            <TextField
              label="Year"
              name="year"
              type="number"
              value={formData.year}
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
              !formData.mileage ||
              !formData.year
            }
          >
            {editCar ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

CarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editCar: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    model: PropTypes.string,
    make: PropTypes.string,
    registrationNo: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fuelType: PropTypes.string,
    mileage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default CarModal;
