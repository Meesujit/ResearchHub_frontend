import { useEffect, useState } from "react";
import { Box, List, ListItem, Button, Menu, MenuItem, Typography, Avatar } from "@mui/joy";
import { Link } from "react-router-dom";
import { NavElements } from "./contant/nav-element";
import { useAuth } from "../../context/auth-context";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll to update background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10); // adjust scroll threshold if needed
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        await logout();
        handleMenuClose();
    };

    return (
        <Box
            sx={{
                padding: "10px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                height: "70px",
                backdropFilter: scrolled ? "blur(8px)" : "none",
                backgroundColor: scrolled ? "rgba(0, 0, 0, 0.6)" : "transparent",
                transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
            }}
        >
            <List
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "15px auto",
                    padding: "0 20px",
                }}
            >
                {/* Logo */}
                <ListItem sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "black", display: 'flex', alignItems: 'center' }}>
                        <img src='/assets/logo.png' alt='logo' height={50} />
                        <Typography sx={{ mt: 1, color: '#fff', fontSize: 20 }}>
                            Research<span style={{ color: '#e8d55b' }}>Hub</span>
                        </Typography>
                    </Link>
                </ListItem>

                {/* Navigation Links */}
                <Box sx={{ display: "flex", gap: "20px" }}>
                    {NavElements.map((item, index) => (
                        <ListItem key={index} sx={{ fontSize: "16px" }}>
                            <Link to={item.link} style={{ textDecoration: "none", fontWeight: "500" }}>
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        "&:hover": {
                                            color: "#e8d55b",
                                        },
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Link>
                        </ListItem>
                    ))}
                </Box>

                {/* User Profile / Login Button */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {user ? (
                        <>
                            <Button variant="plain" onClick={handleMenuOpen} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Avatar
                                    src={"/default-avatar.png"}
                                    alt={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                />
                                <Typography sx={{ fontSize: "16px", fontWeight: "500", }}>
                                    {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                </Typography>
                            </Button>

                            {/* Dropdown Menu */}
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ marginTop: "5px" }}>
                                {user.role === "admin" ? (
                                    <>
                                        <MenuItem onClick={handleMenuClose}>
                                            <Link to="/admin-dashboard" style={{ textDecoration: "none", color: "black" }}>
                                                Admin Dashboard
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem onClick={handleMenuClose}>
                                            <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </>
                                )}
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>
                                <Button
                                    variant='plain'
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="solid">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </Box>
            </List>
        </Box>
    );
}
