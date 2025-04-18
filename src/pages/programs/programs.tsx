import {Box, Button, Card, CardContent, CircularProgress, Typography} from "@mui/joy";
import {EventDto} from "../../dto/event.tsx";
import {useEffect, useState} from "react";
import {apiService} from "../../api/api.tsx";
import {useAuth} from "../../context/auth-context.tsx";
import {useNavigate} from "react-router-dom";
export default function Programs(){
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const navigate = useNavigate();

    const fetchPublicEvents = async () => {
        setLoading(true);
        try{
            const response = await apiService.get('api/event/public-events');
            const publicEvents = response.filter((event: EventDto) => event.isPublic);
            setEvents(publicEvents);
        }catch (error){
            console.log("Error in Fetching Public Events", error);
        }finally {
            setLoading(false);
        }
    }

    const handleParticipate = async (id: string | undefined) => {
        setLoading(true);
        try{
            const response = await apiService.create(`api/event/participate/${id}`);
            if(response.status === 200){
                alert('User participated successfully');
                const updatedEvents = events.map((event) =>
                    event._id === id
                        ? {
                            ...event,
                            participants: [...(event.participants || []), user?._id].filter(
                                (id): id is string => !!id
                            ),
                        }
                        : event
                );
                setEvents(updatedEvents);
            }
        }catch (error){
            console.log("Error in Participating Event", error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPublicEvents();
    }, []);
    return (
        <Box>
            <Typography level="h2" sx={{ marginBottom: 2 }}>
                Events
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : events.length === 0 ? (
                <Typography>No public events found.</Typography>
            ) : (
                events.map((event) => {
                    // const hasParticipated = event.participants?.includes(user?._id ?? "");

                    return (
                        <Card key={event._id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography level="h4">{event.name}</Typography>
                                <Typography>{event.description}</Typography>
                                <Typography level="body-sm">Date: {new Date(event.date).toLocaleDateString()}</Typography>

                                {!user ? (
                                    <Button onClick={() => navigate('/login')}>Login To Participate</Button>
                                ) : user.role !== 'admin' ? (
                                    event.participants?.includes(user._id) ? (
                                        <Typography level="body-sm" sx={{ mt: 1, fontStyle: 'italic', color: 'green' }}>
                                            You are already participating in this event.
                                        </Typography>
                                    ) : (
                                        <Button onClick={() => handleParticipate(event._id)}>Participate</Button>
                                    )
                                ) : null}
                            </CardContent>
                        </Card>
                    );
                })
            )}
        </Box>
    )
}