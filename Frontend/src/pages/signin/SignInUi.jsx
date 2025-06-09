import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { CenteredBox } from "../../components/layouts/OneViewBox";
import SubmitButton from "../../components/button/SubmitButton";
import MainUi from "./MainUi";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignInUI = ({ state, setState, onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
  };

  return (
    <MainUi
      state={state}
      setState={setState}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        maxWidth={400}
        mx="auto"
      >
        <Typography align="center" variant="h2" color="#fff" mb={2}>
          Log In
        </Typography>

        {state.err && (
          <Typography align="center" variant="body1" color="error" mb={2}>
            {state.err}
          </Typography>
        )}

        <TextField
          disabled={loading}
          value={state.email}
          onChange={(e) =>
            setState({ ...state, err: "", email: e.target.value })
          }
          type="email"
          placeholder="Email"
          fullWidth
          variant="outlined"
          label="Email"
          margin="normal"
          sx={inputStyles}
        />

        <TextField
          disabled={loading}
          value={state.password}
          onChange={(e) =>
            setState({ ...state, err: "", password: e.target.value })
          }
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          fullWidth
          variant="outlined"
          label="Password"
          margin="normal"
          sx={inputStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  sx={{ color: "#fff" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box mt={3}>
          <SubmitButton
            variant="contained"
            loading={loading}
            disabled={loading}
            type="submit"
            title="Login"
            sx={{
              background: (theme) => theme.palette.gradient.main,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              borderRadius: 8,
              boxShadow: "0 2px 12px 0 rgba(60,80,139,0.12)",
              textTransform: "none",
              "&:hover": {
                background: (theme) => theme.palette.gradient.main,
                opacity: 0.92,
              },
            }}
          />
        </Box>
      </Box>
    </MainUi>
  );
};

export default SignInUI;
