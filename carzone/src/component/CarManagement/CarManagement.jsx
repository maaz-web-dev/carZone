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
  Alert,
  Pagination,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getAllCars, deleteCar } from "../../api/carService";
import CarModal from "../../modals/CarModal";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 
  const [deleteCarId, setDeleteCarId] = useState(null); 
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); 
  const [addConfirmationDialogOpen, setAddConfirmationDialogOpen] = useState(false); 
  const limit = 5;

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const fetchCars = async (page) => {
    setIsLoading(true); 
    try {
      const data = await getAllCars(page, limit);
      setCars(data.cars || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setError("");
    } catch (error) {
      setError(error.message || "Failed to load cars.");
    } finally {
      setIsLoading(false); 
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCar(deleteCarId); 
      await fetchCars(page);
      setConfirmationDialogOpen(false); 
      setDeleteCarId(null); 
    } catch (error) {
      setError(error.message || "Failed to delete car.");
      setConfirmationDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (car = null) => {
    setEditCar(car);
    setModalOpen(true);
  };

  const handleCloseModal = async (refresh = false) => {
    setModalOpen(false);
    setEditCar(null);
    if (refresh) {
      setIsLoading(true); 
      await fetchCars(page);
      setIsLoading(false); 
    }
  };

  const handleOpenDeleteDialog = (carId) => {
    setDeleteCarId(carId); 
    setConfirmationDialogOpen(true); 
  };

  const handleCloseDeleteDialog = () => {
    setDeleteCarId(null); 
    setConfirmationDialogOpen(false); 
  };

  const handleOpenAddDialog = () => {
    setAddConfirmationDialogOpen(true); 
  };

  const handleCloseAddDialog = (confirm = false) => {
    if (confirm) {
      setModalOpen(true);
    }
    setAddConfirmationDialogOpen(false); 
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

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpenAddDialog} 
      >
        Add New Car
      </Button>

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
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleOpenModal(car)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenDeleteDialog(car._id)}
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

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          disabled={totalPages <= 1}
        />
      </Box>

      <CarModal open={modalOpen} onClose={handleCloseModal} editCar={editCar} />

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
            Are you sure you want to delete this car?
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

      <Dialog
        open={addConfirmationDialogOpen}
        onClose={() => handleCloseAddDialog(false)}
        aria-labelledby="add-car-dialog-title"
        aria-describedby="add-car-dialog-description"
      >
        <DialogTitle id="add-car-dialog-title">Confirm Add Car</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to add a new car?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseAddDialog(true)} color="secondary">
            Confirm Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarManagement;
