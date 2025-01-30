import React, { useState, useEffect } from "react";
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
import { getAllCars, deleteCar } from "../../api/carService";
import CarModal from "../../modals/CarModal";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCar, setEditCar] = useState(null); // Store car data when editing

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
      setError("");
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError(error.message || "Failed to load cars.");
    }
  };

  // Delete a car
  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
      setError(error.message || "Failed to delete car.");
    }
  };

  // Open modal for adding or editing a car
  const handleOpenModal = (car = null) => {
    setEditCar(car); // If editing, pass car details
    setModalOpen(true);
  };

  // Close modal and refresh list
  const handleCloseModal = (refresh = false) => {
    setModalOpen(false);
    setEditCar(null);
    if (refresh) fetchCars(); // Refresh cars if a car was added/updated
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Car Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Add New Car Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpenModal()}
      >
        Add New Car
      </Button>

      {/* Car List Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <TableRow key={car._id}>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => handleOpenModal(car)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No cars found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Car Modal */}
      <CarModal open={modalOpen} onClose={handleCloseModal} editCar={editCar} />
    </Box>
  );
};

export default CarManagement;
