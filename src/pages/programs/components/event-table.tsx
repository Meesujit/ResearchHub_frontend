import {IconButton, Table, Tooltip} from "@mui/joy";
import {apiService} from "../../../api/api.tsx";
import {useEffect, useState} from "react";
import {EventDto} from "../../../dto/event.tsx";
import {useAuth} from "../../../context/auth-context.tsx";
import {useNavigate} from "react-router-dom";
import TableSkeleton from "../../../components/table-skeleton/table-skeleton.tsx";
import AddEventPage from "./add-event.tsx";
import {MdDelete, MdEdit} from "react-icons/md";
import DeleteAlert from "../../../components/delete-alert/delete-alert.tsx";
import EventCard from "../../../components/card/event-card.tsx";

interface EventTableProps {
    search: string;
    setItemCount: (count: number) => void;
    openAddModal?: boolean | undefined;
    setOpenAddModal?: (value: boolean) => void;
}

export default function EventTable({search,setItemCount, openAddModal, setOpenAddModal}: EventTableProps) {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<EventDto[]>([]);
    const [editEvent, setEditEvent] = useState<EventDto | null>(null);
    const [deleteEvent, setDeleteEvent] = useState<EventDto | null>(null);
    const [openEventDeleteModal, setOpenEventDeleteModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);
    const [openCard, setOpenCard] = useState(false);
    const fetchUserEvents = async () => {
        setLoading(true);
        try {
            const response = await apiService.get("api/event/user-event");
            setEvents(response);
        } catch (error) {
            console.error("Error fetching user events:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdminEvents = async () => {
        setLoading(true);
        try {
            const response = await apiService.get('api/event/admin/all-events');
            setEvents(response);
        } catch (error) {
            console.error("Error deleting user research paper:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteEvent = async (id: string | undefined) => {
        setLoading(true);
        try {
            await apiService.delete(`api/event/delete-event/${id}`)
            fetchAdminEvents();
        } catch (error) {
            console.log('Error Deleting Event error', error);
        } finally {
            setLoading(false);
        }
    }

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role === 'admin') {
            fetchAdminEvents();
        } else {
            fetchUserEvents();
        }

    },[user]);

    useEffect(() => {
        setItemCount(filteredEvents.length);
    }, [filteredEvents]);


    return (
        <>
            <Table variant="outlined">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Location</th>
                    {user?.role === 'admin' && (
                        <th style={{
                            width: '10%'
                        }}>Actions</th>
                    )}
                </tr>
                </thead>
                <tbody style={{
                    overflowY: 'auto',
                }}>
                {loading ? (
                    <TableSkeleton rows={5} cols={6}/>
                ) : (filteredEvents.map(event => (
                        <tr key={event._id}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedEvent(event);
                                setOpenCard(true);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{new Date(event.date).toLocaleDateString()}</td>
                            <td>{event.location}</td>
                            {user?.role === 'admin' && (
                                <td>
                                    <Tooltip title="Edit Event">
                                        <IconButton
                                            size="sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setEditEvent(event);
                                                if(setOpenAddModal) {
                                                    setOpenAddModal(true);
                                                }
                                            }}
                                        >
                                            <MdEdit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Event">
                                        <IconButton
                                            size="sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDeleteEvent(event);
                                                setOpenEventDeleteModal(true)
                                            }}
                                            sx={{ml: 1}}
                                        >
                                            <MdDelete/>
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            )}
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
            <AddEventPage
                open={openAddModal ?? false}
                onClose={() => setOpenAddModal ? setOpenAddModal(false) : null}
                data={editEvent}
            />
            <DeleteAlert
                open={openEventDeleteModal}
                onClose={() => {
                setDeleteEvent(null);
                setOpenEventDeleteModal(false);
                }}
                onDelete={() => {
                    handleDeleteEvent(deleteEvent?._id);
                    setDeleteEvent(null);
                    setOpenEventDeleteModal(false);
                }}
                itemName={deleteEvent?.name}
            />

            {openCard && selectedEvent && (
                <EventCard
                    event={selectedEvent}
                    close={() => {
                    setSelectedEvent(null);
                    setOpenCard(false);
                    }}
                />
            )}


        </>
    )
}