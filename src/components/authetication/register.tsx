import { 
    DialogTitle, FormControl, Stack, FormLabel, Input, 
    DialogActions, Button, Typography, Box
} from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

class RegisterDto {
    username?: string;
    password?: string;
    email?: string;
    // role?: string;
    constructor(username?: string, password?: string, email?: string) {
        this.username = username || "";
        this.password = password || "";
        this.email = email || "";
        // this.role = role || "user"; // Default role is "user"
    }
}

export default function Register() {
    const [credentials, setCredentials] = useState<RegisterDto>(new RegisterDto());
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const {user} = useAuth();
    const navigate = useNavigate();

    // Handle form submission
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        setError(null);
        setSuccess(null);

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, credentials);
            setSuccess("Registration successful! Please log in.");
            setCredentials(new RegisterDto()); // Reset form after successful registration
        } catch (error) {
            console.error("Error in Register:", error);
            setError("Failed to register. Please try again.");
        }
    };

    useEffect(() => {
        if(user){
            navigate('/')
        }
    })

    return (
        <Box
            sx={{
                maxWidth: "400px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #333",
                borderRadius: "8px",
                mt: 10,
            }}
        >
            <DialogTitle>
                <Typography>Sign Up</Typography>
            </DialogTitle>
            {error && <Typography color="danger">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
            <form onSubmit={handleRegister}>
                <Stack spacing={1}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                        />
                    </FormControl>
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
                    {/*<FormControl>*/}
                    {/*    <FormLabel>Role</FormLabel>*/}
                    {/*    <Select*/}
                    {/*        value={credentials.role}*/}
                    {/*        onChange={(_e, newValue) => setCredentials({ ...credentials, role: newValue || "user" })}*/}
                    {/*    >*/}
                    {/*        <Option value="user">User</Option>*/}
                    {/*        <Option value="admin">Admin</Option>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    <DialogActions>
                        <Button sx={{ mt: 3}} type="submit" color="primary" variant="solid">
                            Signup
                        </Button>
                        {/*<Button type="reset" color="neutral" variant="soft" onClick={() => setCredentials(new RegisterDto())}>*/}
                        {/*    Reset*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Stack>
            </form>
        </Box>
    );
}
