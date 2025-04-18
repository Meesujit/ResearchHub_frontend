import {
    Button,
    Divider,
    DialogTitle,
    DialogContent,
    DialogActions,
    Modal,
    ModalDialog, Typography,
} from '@mui/joy';
import {MdOutlineWarning} from "react-icons/md";

interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    itemName?: string; // Optional - can be used to display what you're deleting
}

export default function DeleteAlert({
                                               open,
                                               onClose,
                                               onDelete,
                                               itemName = "this item",
                                           }: DeleteConfirmModalProps) {
    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <MdOutlineWarning style={{color: 'red', marginTop:1}}/>
                    <Typography>Confirm Deletion</Typography>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography>Are you sure you want to delete <strong>{itemName}</strong> ?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={onDelete}>
                        Yes, Delete
                    </Button>
                    <Button variant="plain" sx={{
                        '&:hover': {
                            color: '#ccc'
                        }
                    }} color="neutral" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}
