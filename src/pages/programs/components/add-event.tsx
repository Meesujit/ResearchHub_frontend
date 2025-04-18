import React, {useEffect, useState} from "react";
import {EventDto} from "../../../dto/event.tsx";
import {apiService} from "../../../api/api.tsx";
import {
    Box, Button,
    Checkbox,
    DialogActions,
    FormControl,
    FormLabel,
    Input, Modal,
    ModalClose,
    ModalDialog,
    Textarea,
    Typography
} from "@mui/joy";

interface EventProps {
    open: boolean;
    onClose: () => void;
    data?: EventDto | null;
}

export default function AddEventPage({open, onClose, data}: EventProps) {
    const [event, setEvent] = useState<EventDto>(new EventDto());
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        onClose();
    }

    useEffect(() => {
        if(open){
            setEvent(data ?? new EventDto());
        }
    },[open, data])

    const handleChange = <K extends keyof EventDto>(field: K, value: EventDto[K]) => {
        setEvent(prev => ({...prev, [field]: value}))
    }

    const addEvent = async () => {
        setLoading(true);
        try{
            const response = await apiService.create('api/event/create-event', event);
            if(response.status === 200){
                alert("Event created successfully.");
                setEvent(new EventDto());
            }
        }catch(error){
            console.log('Error in creating event', error);
        }finally {
            setLoading(false);
        }
    }

    const updateEvent = async () => {
        setLoading(true);
        try{
            const response = await apiService.update(`api/event/update-event/${event._id}`, event);
            if(response.status === 200){
                alert("Event updated successfully.");
                setEvent(new EventDto());
            }
        }catch(error){
            console.log('Error in updating event', error);
        }finally {
            setLoading(false);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(event._id){
            updateEvent();
        }else{
            addEvent();
        }
    }
    return(
        <Modal open={open} onClose={closeModal}>
            <ModalDialog sx={{
                width: '40%',
                overflowY: 'auto'
            }}>
                <ModalClose />
                <Typography level="h4">{event._id ? "Update Event" : "Create Event"}</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Enter Event Name</FormLabel>
                        <Input
                            name="name"
                            placeholder="Enter Event Name"
                            value={event.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="description"
                            placeholder="Enter Description"
                            minRows={4}
                            value={event.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>Event Date</FormLabel>
                        <Input
                            type='date'
                            name="date"
                            placeholder="Event Date"
                            value={event.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Event Location</FormLabel>
                        <Input
                            type='text'
                            name="location"
                            placeholder="Event Location"
                            value={event.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>Event Image URL</FormLabel>
                        <Input
                            name="fileUrl"
                            placeholder="Paste the paper link here"
                            value={event.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                        />
                    </FormControl>

                    {/* ✅ Public/Private Checkbox */}
                    <FormControl sx={{ mt: 2 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Checkbox
                                checked={event.isPublic}
                                onChange={(e) => handleChange("isPublic", e.target.checked)}
                                variant="solid"
                            />
                            <FormLabel>Make Event Public</FormLabel>
                        </Box>
                    </FormControl>

                    <DialogActions sx={{ mt: 3 }}>
                        <Button type="submit" disabled={loading}>
                            Submit
                        </Button>
                        <Button variant='outlined' onClick={onClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </ModalDialog>
        </Modal>
    )
}