import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Chip,
} from "@mui/joy";
import { apiService } from "../../api/api";
import { ResearchDto } from "../../dto/research";

export default function Research() {
    const [papers, setPapers] = useState<ResearchDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPublicPapers = async () => {
        setLoading(true);
        try {
            const data = await apiService.get("api/research/public");
            const publicPapers = data.filter((paper: ResearchDto) => paper.isPublic);
            setPapers(publicPapers);
        } catch (error) {
            console.error("Error fetching public research papers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicPapers();
    }, []);

    return (
        <Box>
            {/* 🔬 Hero Section */}
            <Box
                sx={{
                    height: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 4,
                    background: "linear-gradient(135deg, #1a1a1a, #161616)",
                    color: "#e8d55b",
                }}
            >
                <Box maxWidth="800px">
                    <Typography level="h1" sx={{ fontSize: "2.5rem", fontWeight: 700 }}>
                        Explore Research Contributions
                    </Typography>
                    <Typography level="body-md" sx={{ mt: 2, color: "#ccc" }}>
                        Dive into innovative research from our contributors. Discover work across domains like Artificial Intelligence, Blockchain, and more.
                    </Typography>
                </Box>
            </Box>

            {/* 📄 Research Papers */}
            <Box
                sx={{
                    px: { xs: 2, sm: 4, md: 8 },
                    py: 6,
                    backgroundColor: "#161616",
                }}
            >
                <Typography level="h2" sx={{ color: "#e8d55b", mb: 4 }}>
                    Public Research Papers
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : papers.length === 0 ? (
                    <Typography sx={{ color: "#ccc" }}>No public research papers found.</Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {papers.map((paper) => (
                            <Box
                                key={paper._id}
                                sx={{
                                    p: 3,
                                    borderRadius: "md",
                                    backgroundColor: "#1e1e1e",
                                    border: "1px solid #333",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.01)",
                                        borderColor: "#e8d55b",
                                    },
                                }}
                            >
                                <Typography level="h4" sx={{ color: "#e8d55b", mb: 1 }}>
                                    {paper.title}
                                </Typography>

                                <Typography sx={{ color: "#ccc", mb: 1 }}>
                                    {paper.abstract}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                    <Chip variant="outlined" color="primary" size="sm">
                                        Field: {paper.group}
                                    </Chip>
                                    <Chip variant="soft" size="sm" color="neutral">
                                        Author: {paper.author?.username}
                                    </Chip>
                                    <Chip variant="soft" size="sm" color="neutral">
                                        Status: {paper.status}
                                    </Chip>
                                </Box>

                                <Typography sx={{ fontSize: 14, color: "#777" }}>
                                    🗓️ Submitted: {new Date(paper.createdAt).toLocaleDateString()}
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>
                                    🔄 Last Updated: {new Date(paper.updatedAt).toLocaleDateString()}
                                </Typography>

                                {paper.fileUrl && (
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 1 }}
                                        onClick={() => window.open(paper.fileUrl, "_blank")}
                                    >
                                        View Full Paper
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
