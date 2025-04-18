import {EventDto} from "../../dto/event.tsx";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    Modal, ModalClose,
    ModalDialog,
    Typography
} from "@mui/joy";

interface EventCardProps {
    event: EventDto | null;
    close: () => void;
}

export default function EventCard({event, close}: EventCardProps) {
    if (!event) return null;

    return (
        <Modal open={!!event} onClose={close}>
            <ModalDialog sx={{width: '30%', maxHeight: "80vh", overflowY: "auto", p: 2}}>
                <DialogContent>
                    <DialogTitle>
                        <Typography>{event.name}</Typography>
                    </DialogTitle>
                    <ModalClose onClick={close}/>
                    <Divider/>
                    <Typography level="body-sm" sx={{mt: 1}}>
                        <strong>Description:</strong> {event.description}
                    </Typography>
                    <Typography sx={{mb: 0.5}}>
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography sx={{mb: 2}}>
                        <strong>Location:</strong> {event.location}
                    </Typography>
                    <DialogActions>
                        <Button
                            sx={{
                                mt: 2
                            }}
                            variant="outlined"
                            color="neutral"
                            onClick={close}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}
