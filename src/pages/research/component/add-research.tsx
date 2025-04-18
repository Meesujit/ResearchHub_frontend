import {useEffect, useState} from "react";
import {
    Button,
    DialogActions,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalDialog,
    Typography,
    Textarea,
    Checkbox,
    Box, ModalClose,
} from "@mui/joy";
import { apiService } from "../../../api/api";
import { ResearchDto } from "../../../dto/research";

interface AddResearchProps {
    open: boolean;
    close: (val: boolean) => void;
    data: ResearchDto | null;
}

export default function AddResearch({ open, close, data }: AddResearchProps) {
    const [research, setResearch] = useState<ResearchDto>(new ResearchDto());
    const [loading, setLoading] = useState(false);
    const closeModal = () => {
        setResearch(new ResearchDto());
        close(false);
    }

    useEffect(() => {
        if(open){
        setResearch(data ?? new ResearchDto());
        }
    }, [open, data])

    const handleChange = <K extends keyof ResearchDto>(field: K, value: ResearchDto[K]) => {
        setResearch(prev => ({ ...prev, [field]: value }));
    };

    const addResearch = async () => {
        setLoading(true);
        try {
            await apiService.create("api/research/submit", research);
            closeModal();
        } catch (error) {
            console.error("Error in research paper:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateResearchPaper = async () => {
        setLoading(true);
        try{
            const res = await apiService.update(`api/research/update/${research._id}`, research);
            setResearch(res);
            closeModal();
        }catch (error) {
            console.error("Error submitting research paper:", error);
        }finally {
            setLoading(false);
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(research._id){
            updateResearchPaper();
        }else{
            addResearch();
        }

    };


    return (
        <Modal open={open} onClose={closeModal}>
            <ModalDialog sx={{
                width: '40%'
            }}>
                <ModalClose />
                <Typography level="h4">{research._id ? "Update Research Paper" : "Add Research Paper"}</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="title"
                            placeholder="Enter research title"
                            value={research.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>Abstract</FormLabel>
                        <Textarea
                            name="abstract"
                            placeholder="Enter abstract"
                            minRows={4}
                            value={research.abstract}
                            onChange={(e) => handleChange("abstract", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>Group</FormLabel>
                        <Input
                            name="group"
                            placeholder="AI / ML / Blockchain etc."
                            value={research.group}
                            onChange={(e) => handleChange("group", e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>File URL</FormLabel>
                        <Input
                            name="fileUrl"
                            placeholder="Paste the paper link here"
                            value={research.fileUrl}
                            onChange={(e) => handleChange("fileUrl", e.target.value)}
                        />
                    </FormControl>

                    {/* ✅ Public/Private Checkbox */}
                    <FormControl sx={{ mt: 2 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Checkbox
                                checked={research.isPublic}
                                onChange={(e) => handleChange("isPublic", e.target.checked)}
                                variant="solid"
                            />
                            <FormLabel>Make this paper public</FormLabel>
                        </Box>
                    </FormControl>

                    <DialogActions sx={{ mt: 3 }}>
                        <Button type="submit" disabled={loading} loading={loading}>
                            Submit
                        </Button>
                        <Button variant='outlined' onClick={closeModal}>Cancel</Button>
                    </DialogActions>
                </form>
            </ModalDialog>
        </Modal>
    );
}
