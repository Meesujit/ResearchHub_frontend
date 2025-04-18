import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/joy";
import { apiService } from "../../api/api";
import { ResearchDto } from "../../dto/research";

export default function Research() {
    const [papers, setPapers] = useState<ResearchDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const { user } = useAuth();

        const fetchPublicPapers = async () => {
            setLoading(true);
            try {
                const data = await apiService.get('api/research/public');
                const publicPapers = data.filter((paper: ResearchDto) => paper.isPublic)
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

        console.log("Papers:", papers);

    // if (user) {
    //     return (
    //         <Box sx={{ textAlign: "center", marginTop: 5 }}>
    //             <Typography level="h3">You are logged in!</Typography>
    //             <Typography>Public research papers are only for guest users.</Typography>
    //         </Box>
    //     );
    // }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography level="h2" sx={{ marginBottom: 2 }}>
                Public Research Papers
            </Typography>
         {loading ? (
                <CircularProgress />
            ) : papers.length === 0 ? (
                <Typography>No public research papers found.</Typography>
            ) : (
                papers.map((paper) => (
                    <Card key={paper._id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography level="h4">{paper.title}</Typography>
                            <Typography>{paper.abstract}</Typography>
                            <Typography level="body-sm">Author: {paper.author?.username}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};


