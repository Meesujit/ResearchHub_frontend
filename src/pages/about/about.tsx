import { Box, Typography, Grid, Divider } from "@mui/joy";

export default function About() {
    return (
        <Box sx={{
            padding: "50px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            animation: "fadeIn 1.2s ease-in-out",
            "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(40px)" },
                to: { opacity: 1, transform: "translateY(0px)" }
            }
        }}>
            {/* Banner Image */}
            <Box
                component='img'
                src='/assets/main-page.jpg'
                alt='Research Hub Banner'
                sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: "12px",
                    boxShadow: "lg",
                    animation: "fadeInImg 1s ease-in-out",
                    "@keyframes fadeInImg": {
                        from: { opacity: 0, transform: "scale(0.95)" },
                        to: { opacity: 1, transform: "scale(1)" }
                    }
                }}
            />

            {/* Grid Content */}
            <Grid container spacing={6}>
                {/* Left Side - Main Text */}
                <Grid xs={12} md={6}>
                    <Typography level="h2" sx={{
                        color: '#e8d55b',
                        mb: 2,
                        fontSize: 42,
                        fontWeight: 'bold',
                        lineHeight: 1.4
                    }}>
                        About <span style={{ color: "#fff" }}>Research Hub</span>
                    </Typography>

                    <Typography sx={{
                        fontSize: "18px",
                        color: "#ccc",
                        lineHeight: 1.9,
                        textAlign: "justify"
                    }}>
                        <strong style={{ color: '#e8d55b' }}>Research Hub</strong> is an initiative built by students, for students — to
                        cultivate innovation, promote peer-reviewed research, and enable interdisciplinary collaboration.
                        We help students turn their ideas into reality through community-driven learning and real-time mentoring.
                    </Typography>
                </Grid>

                {/* Right Side - Mission/Vision */}
                <Grid xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box>
                        <Typography level="h3" sx={{ color: '#e8d55b', mb: 1, fontSize: 24 }}>
                            Our Mission
                        </Typography>
                        <Typography sx={{
                            fontSize: 16,
                            color: "#bbb",
                            lineHeight: 1.8,
                        }}>
                            Empower students with access to research tools, collaborative platforms, and a network of mentors to
                            foster groundbreaking ideas across disciplines.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography level="h3" sx={{ color: '#e8d55b', mb: 1, fontSize: 24 }}>
                            Our Vision
                        </Typography>
                        <Typography sx={{
                            fontSize: 16,
                            color: "#bbb",
                            lineHeight: 1.8
                        }}>
                            To be the leading platform where student researchers drive real-world impact through accessible
                            innovation and academic excellence.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 5, backgroundColor: "#444" }} />

            {/* Offer Section */}
            <Box>
                <Typography level="h3" sx={{
                    color: '#e8d55b',
                    mb: 3,
                    fontSize: 28,
                }}>
                    What We Offer
                </Typography>
                <Grid container spacing={3}>
                    {[
                        "📚 Digital library of student research",
                        "🧑‍🏫 Mentorship from faculty & professionals",
                        "🤝 Collaborative projects across fields",
                        "📅 Workshops, seminars & hackathons",
                        "📝 Peer-reviewed publishing",
                        "🚀 Startup launch support",
                    ].map((item, idx) => (
                        <Grid xs={12} sm={6} key={idx}>
                            <Typography sx={{ color: "#ccc", fontSize: "16px", lineHeight: 1.7 }}>
                                {item}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
