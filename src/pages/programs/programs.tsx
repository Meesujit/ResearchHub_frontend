import {
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { EventDto } from "../../dto/event.tsx";
import { apiService } from "../../api/api.tsx";
import { useAuth } from "../../context/auth-context.tsx";
import { useNavigate } from "react-router-dom";

export default function Programs() {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchPublicEvents = async () => {
        setLoading(true);
        try {
            const response = await apiService.get("api/event/public-events");
            const publicEvents = response.filter((event: EventDto) => event.isPublic);
            setEvents(publicEvents);
        } catch (error) {
            console.log("Error in Fetching Public Events", error);
        } finally {
            setLoading(false);
        }
    };

    const handleParticipate = async (id: string | undefined) => {
        setLoading(true);
        try {
            await apiService.create(`api/event/participate/${id}`);
            const updatedEvents = events.map((event) =>
                event._id === id
                    ? {
                        ...event,
                        participants: [
                            ...(event.participants || []),
                            user?._id,
                        ].filter((id): id is string => !!id),
                    }
                    : event
            );
            setEvents(updatedEvents);
        } catch (error) {
            console.log("Error in Participating Event", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicEvents();
    }, []);

    return (
        <Box>

            {/* 🔥 Hero Section */}
            <Box
                sx={{
                    height: "80vh",
                    background: "linear-gradient(135deg, #1c1c1c, #222, #161616)",
                    color: "#e8d55b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 4,
                    textAlign: "center",
                }}
            >
                <Box maxWidth="700px">
                    <Typography level="h1" sx={{ fontSize: "3rem", fontWeight: 700 }}>
                        Discover. Innovate. Lead.
                    </Typography>
                    <Typography level="body-md" sx={{ mt: 2, color: '#ccc' }}>
                        Join the Research Society’s events where knowledge meets innovation.
                        Explore AI, Blockchain, IoT, and more with fellow visionaries.
                    </Typography>
                    <Button
                        variant="solid"
                        color="primary"
                        sx={{ mt: 4 }}
                        onClick={() =>
                            !user ? navigate("/login") : window.scrollTo({ top: 1000, behavior: "smooth" })
                        }
                    >
                        {user ? "Explore Events" : "Login to Participate"}
                    </Button>
                </Box>
            </Box>

            {/* 🔧 Info Section */}
            <Box
                sx={{
                    px: { xs: 2, sm: 4, md: 8 },
                    py: 8,
                    backgroundColor: "#1e1e1e",
                }}
            >
                <Typography
                    level="h3"
                    sx={{ textAlign: "center", mb: 6, fontWeight: "bold", color: "#e8d55b" }}
                >
                    Empowering Innovation Through Research
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        color: "#ccc",
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography level="h4" sx={{ color: "#e8d55b", mb: 1 }}>
                            🔍 What We Do
                        </Typography>
                        <Typography>
                            We foster a collaborative environment for students and researchers
                            to explore cutting-edge technologies. Our events include workshops,
                            paper presentations, guest lectures, and innovation challenges.
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography level="h4" sx={{ color: "#e8d55b", mb: 1 }}>
                            ⚙️ Technologies We Use
                        </Typography>
                        <Typography>
                            From Artificial Intelligence and IoT to Blockchain and Quantum Computing —
                            our community dives into future-forward technologies that shape the world.
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography level="h4" sx={{ color: "#e8d55b", mb: 1 }}>
                            🌍 Our Impact
                        </Typography>
                        <Typography>
                            With over 500 active members, 30+ published projects, and dozens of global collaborations,
                            we aim to create a lasting impact in the field of research and tech development.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* 📅 Event Section */}
            <Box
                px={{ xs: 2, sm: 4, md: 8 }}
                py={6}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#161616",
                }}
            >
                <Typography level="h2" sx={{ mb: 4, color: "#e8d55b" }}>
                    Upcoming Public Events
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : events.length === 0 ? (
                    <Typography sx={{ color: "#ccc" }}>No public events found.</Typography>
                ) : (
                    events.map((event) => (
                        <Box
                            key={event._id}
                            sx={{
                                width: "100%",
                                maxWidth: "800px",
                                mb: 4,
                                p: 3,
                                borderRadius: "md",
                                backgroundColor: "#1e1e1e",
                                border: "1px solid #333",
                                boxShadow: "0 0 15px rgba(0,0,0,0.4)",
                            }}
                        >
                            <Typography level="h4" sx={{ color: "#e8d55b", mb: 1 }}>
                                {event.name}
                            </Typography>
                            <Typography sx={{ color: "#ccc" }}>{event.description}</Typography>
                            <Typography level="body-sm" sx={{ mt: 1, color: "#aaa" }}>
                                📅 {new Date(event.date).toLocaleDateString()}
                            </Typography>

                            {!user ? (
                                <Button onClick={() => navigate("/login")} sx={{ mt: 2 }}>
                                    Login To Participate
                                </Button>
                            ) : user.role !== "admin" ? (
                                event.participants?.includes(user._id) ? (
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            mt: 2,
                                            fontStyle: "italic",
                                            color: "green",
                                        }}
                                    >
                                        You are already participating in this event.
                                    </Typography>
                                ) : (
                                    <Button
                                        onClick={() => handleParticipate(event._id)}
                                        sx={{ mt: 2 }}
                                    >
                                        Participate
                                    </Button>
                                )
                            ) : null}
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
}
