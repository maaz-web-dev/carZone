import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { updatePassword } from "../../api/authService";

const Settings = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email address";
    if (!formData.oldPassword.trim()) errors.oldPassword = "Old password is required";
    if (!formData.newPassword.trim()) errors.newPassword = "New password is required";
    else if (formData.newPassword.length < 6)
      errors.newPassword = "Password must be at least 6 characters long";
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await updatePassword(formData);
      setSuccessMessage(response.message);
      setServerError("");
      setFormData({ email: "", oldPassword: "", newPassword: "" });
    } catch (err) {
      setServerError(err.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" mb={3}>
            Update Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Old Password"
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              fullWidth
              margin="normal"
            />
            <Box sx={{ position: "relative", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary.main",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </form>
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
