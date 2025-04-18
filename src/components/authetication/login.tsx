import { useState } from "react";
import {
    Box, Typography, FormControl, FormLabel, Input, 
    Button, Stack, DialogTitle, DialogActions 
} from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth-context";


export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, credentials);

            // Assuming the backend returns user data including the role
            const { role } = res.data;
            login(res.data); // Store user data in context/local storage

            // Redirect based on role
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Error in Login", error);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "400px",
                margin: "auto",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                border: "1px solid #333",
                mt: 10,
            }}
        >
            <DialogTitle>
                <Typography>Login</Typography>
            </DialogTitle>
            {error && <Typography color="danger">{error}</Typography>}
            <form onSubmit={handleLogin}>
                <Stack spacing={1}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </FormControl>
                    <DialogActions>
                        <Button sx={{ mt: 3}} type="submit" color="primary" variant="solid">
                            Login
                        </Button>
                        {/*<Button color="neutral" variant="plain">*/}
                        {/*    Cancel*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Stack>
            </form>
            <Typography
                endDecorator={<Link to="/register">Sign up</Link>}
                sx={{ fontSize: "sm", alignSelf: "center", marginTop: "10px" }}
            >
                Don't have an account?
            </Typography>
        </Box>
    );
}
