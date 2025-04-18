import {
    Button, DialogActions, DialogContent, DialogTitle,
    Divider,
    Modal,
    ModalClose,
    ModalDialog,
    Textarea,
    Typography
} from "@mui/joy";
import {useAuth} from "../../context/auth-context.tsx";
import {ResearchDto} from "../../dto/research.tsx";
import {useState} from "react";

interface CardProps {
    paper: ResearchDto | null;
    close: () => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    feedback: { [key: string]: string };
    setFeedback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export default function ResearchCard(
    {
        paper,
        close,
        onApprove,
        onReject,
        feedback,
        setFeedback
    }: CardProps) {
    const {user} = useAuth();
    const [loading, ] = useState(false);
    if (!paper) return null;

    const isAdmin = user?.role === "admin";
    return (
        <Modal open={!!paper} onClose={close}>
            <ModalDialog
                sx={{width: '30%', maxHeight: "80vh", overflowY: "auto", p: 2}}
            >
                <DialogContent>
                    <DialogTitle>
                        <Typography level="h4">{paper.title}</Typography>
                    </DialogTitle>
                    <ModalClose onClick={close}/>
                    <Divider sx={{my: 1}}/>
                    <Typography level="body-sm">
                        <strong>Author:</strong> {paper.author?.username}
                    </Typography>
                    <Typography level="body-sm">
                        <strong>Group:</strong> {paper.group}
                    </Typography>
                    <Typography level="body-sm">
                        <strong>Status:</strong> {paper.status}
                    </Typography>
                    <Typography level="body-sm" sx={{wordBreak: "break-word", mt: 1}}>
                        <strong>File URL:</strong> {paper.fileUrl}
                    </Typography>

                    {isAdmin && (
                        <>
                            <Textarea
                                placeholder="Add feedback before rejection..."
                                value={feedback[paper._id] || ""}
                                onChange={(e) =>
                                    setFeedback({...feedback, [paper._id]: e.target.value})
                                }
                                disabled={paper.status ===  'Approved'}
                                sx={{mt: 2}}
                            />
                            <DialogActions>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onApprove(paper._id);
                                        close();
                                    }}
                                    color="success"
                                    sx={{mt: 1}}
                                    loading={loading}
                                    disabled={paper.status ===  'Approved'}
                                    variant='soft'
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onReject(paper._id)
                                        close();
                                    }}
                                    color="danger"
                                    sx={{mt: 1}}
                                    loading={loading}
                                    disabled={paper.status ===  'Approved'}
                                >
                                    Reject
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </DialogContent>

            </ModalDialog>
        </Modal>
    );
}
