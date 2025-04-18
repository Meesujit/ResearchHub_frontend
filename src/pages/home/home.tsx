import {Box, Button, DialogActions, Grid, Typography} from "@mui/joy";
import {GROUP_ITEM} from "./contants/constants";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth-context.tsx";

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Typography sx={{
                        fontSize: 50,
                        color: '#fff'
                    }}>
                        Welcome To <span style={{
                        color: '#e8d55b',
                        fontWeight: 600,
                    }}>Research Hub.</span>
                    </Typography>
                    <Typography sx={{
                        fontSize: 30,
                        fontWeight: 400,
                        color: '#ccc',
                        transition: 'color 0.3s ease',
                        "&:hover": {
                            color: "#e8d55b",
                            cursor: "pointer",
                        }
                    }}>
                        Innovation Take place.
                    </Typography>
                </Box>
                <DialogActions sx={{
                    gap: 2,
                    mt: 3
                }}>
                    <Button variant='solid' size='lg' onClick={() => navigate('/about')}>Know More</Button>
                    {!user && (
                        <Button
                            variant='outlined'
                            size='lg'
                            onClick={() => navigate('/login')}
                            sx={{
                                backgroundColor: 'transparent',
                                "&:hover": {
                                    color: "#161616",
                                }
                            }}
                        >
                            Login
                        </Button>
                    )}
                </DialogActions>

            </Box>

            {/* Research Groups Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    padding: "40px 20px",
                    textAlign: "center",
                    mt: 9,
                }}
            >
                <Typography sx={{fontSize: 40, color: '#fff', fontWeight: 600}}>
                    <span style={{ fontSize: 50, color: '#e8d55b'}}>Research Hub</span> is a center
                    <br/> for collaborative research.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 5,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <Grid container spacing={3} sx={{ mt: 5 }}>
                        {GROUP_ITEM.map((item, index) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        width: '220px',
                                        alignItems: "center",
                                        padding: "25px",
                                        minHeight: "160px",
                                        color: "#fff",
                                        textAlign: "center",
                                        transition: "all 0.3s ease-in-out",
                                        borderRadius: "0px",
                                        boxShadow: "none",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            borderRadius: "12px",
                                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                                            backgroundColor: "#2a2a2a",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <Box sx={{ fontSize: "30px", mb: 1 }}>
                                        <img src={item.icon} alt={item.title} height={90} />
                                    </Box>
                                    <Typography level="title-md" sx={{ fontWeight: 600, color: '#ccc' }}>
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Box
                sx={{
                    maxWidth: "100%",
                    height: "350px",
                    display: "flex",
                    flexDirection: "row", // Image on one side, text on the other
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    padding: "50px 20px",
                }}
            >
                {/* Left Side - Image */}
                <img
                    src="/assets/about.jpg" // Replace with actual image path
                    alt="Research Hub"
                    style={{
                        width: "70%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                {/* Right Side - Text */}
                <Box
                    sx={{
                        maxWidth: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "15px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#ccc",
                        }}
                    >
                        About Research Hub
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "18px",
                            color: "#ccc",
                            lineHeight: "1.6",
                        }}
                    >
                        Research Hub is a collaborative platform where students and researchers connect to
                        share ideas, publish research papers, and participate in events. Our goal is to
                        encourage innovation and knowledge-sharing within a dynamic academic community.
                    </Typography>
                    <Button
                        variant="outlined"
                        size="lg" sx={{
                        // borderRadius: '1px',
                    }} onClick={() => navigate('/about')}>
                        View More
                    </Button>
                </Box>
            </Box>
        </>
    );
}
