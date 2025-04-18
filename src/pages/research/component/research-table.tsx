import {useEffect, useState} from "react";
import {apiService} from "../../../api/api.tsx";
import {ResearchDto} from "../../../dto/research.tsx";
import {useAuth} from "../../../context/auth-context.tsx";
import {useNavigate} from "react-router-dom";
import TableSkeleton from "../../../components/table-skeleton/table-skeleton.tsx";
import {IconButton, Table, Tooltip} from "@mui/joy";
import {MdDelete, MdEdit} from "react-icons/md";
import {RiCloseCircleLine} from "react-icons/ri";
import {GoIssueClosed} from "react-icons/go";
import AddResearch from "./add-research.tsx";
import DeleteAlert from "../../../components/delete-alert/delete-alert.tsx";
import ResearchCard from "../../../components/card/research-card.tsx";

interface ResearchTableProps {
    search: string;
    setItemCount: (count: number) => void;
    openAddModal?: boolean;
    setOpenAddModal?: (value: boolean) => void;
}

export default function ResearchTable({search, openAddModal, setOpenAddModal, setItemCount}: ResearchTableProps) {
    const {user} = useAuth();
    const [papers, setPapers] = useState<ResearchDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
    const [paperToDelete, setPaperToDelete] = useState<ResearchDto | null>(null);
    const [editResearchPaper, setEditResearchPaper] = useState<ResearchDto | null>(null);
    const [selectedPaper, setSelectedPaper] = useState<ResearchDto | null>(null);
    const [researchCard, setResearchCard] = useState(false);
    const navigate = useNavigate();


    const fetchUserResearchPaper = async () => {
        setLoading(true);
        try {
            const data = await apiService.get("api/research/user");
            const userPapers = data.filter((paper: ResearchDto) => paper.author?._id === user?._id);
            setPapers(userPapers);
        } catch (error) {
            console.error("Error fetching user research papers:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchAdminResearchPaper = async () => {
        setLoading(true);
        try {
            const data = await apiService.get('api/research/admin/all');
            setPapers(data);
        } catch (error) {
            console.error("Error fetching research papers:", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteResearch = async (id: string | undefined) => {
        setLoading(true);
        try {
            await apiService.delete(`api/research/delete/${id}`);
            fetchUserResearchPaper();
        } catch (error) {
            console.error("Error deleting user research paper:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string | undefined) => {
        setLoading(true);
        try {
            await apiService.update(`api/research/approve/${id}`, {feedback: 'Approved by Admin'});
            fetchAdminResearchPaper();
        } catch (error) {
            console.error("Error approving paper:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id: string | undefined) => {
        if(!id) return;
        setLoading(true);

        if (!feedback[id]) {
            alert("Feedback is required for rejection.");
            setLoading(false);
            return;
        }
        try {
            await apiService.update(`api/research/reject/${id}`, {feedback: feedback[id]});
            fetchAdminResearchPaper();
        } catch (error) {
            console.error("Error rejecting paper:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPapers = papers.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        if(user.role === 'user'){
            fetchUserResearchPaper();
        }else{
            fetchAdminResearchPaper();
        }
    }, [user]);

    useEffect(() => {
        setItemCount(filteredPapers.length);
    }, [filteredPapers]);

    if (!user) return null;

    return (
        <>
            <Table variant="outlined">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Group</th>
                    <th>Research Paper</th>
                    <th>Status</th>
                    <th style={{
                        width: '10%'
                    }}>Actions</th>
                </tr>
                </thead>
                <tbody style={{
                    overflowY: 'auto',
                }}>
                {loading ? (
                    <TableSkeleton rows={5} cols={6}/>
                ) : (filteredPapers.map(paper => (
                    <tr key={paper._id}
                        onClick={(e) => {
                            e.preventDefault();
                        setSelectedPaper(paper);
                        setResearchCard(true);
                        }}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <td>{paper.title}</td>
                        <td>{paper.author?.username}</td>
                        <td>{paper.group}</td>
                        <td>{paper.fileUrl}</td>
                        <td>{paper.status}</td>
                        <td>
                            {user.role === 'user' ? (
                                <>
                                    <Tooltip title="Edit Paper">
                                        <IconButton
                                            size="sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setEditResearchPaper(paper);
                                                if (setOpenAddModal) {
                                                    setOpenAddModal(true);
                                                }
                                            }}
                                            disabled={paper.status !== "Approved"}
                                        >
                                            <MdEdit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Paper">
                                        <IconButton
                                            size="sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setPaperToDelete(paper);
                                                setOpenDeleteModal(true)
                                            }}
                                            disabled={paper.status !== "Approved"}
                                            sx={{ml: 1}}
                                        >
                                            <MdDelete/>
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Tooltip title="Approve Paper">
                                        <IconButton
                                            size="sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedPaper(paper);
                                                setResearchCard(true);
                                            }}
                                            disabled={paper.status === "Approved"}
                                        >
                                            <GoIssueClosed />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Reject Paper">
                                        <IconButton
                                            size="sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedPaper(paper);
                                                setResearchCard(true)
                                            }}
                                            disabled={paper.status === "Approved"}
                                            sx={{ml: 1}}
                                        >
                                            <RiCloseCircleLine  />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </td>
                    </tr>
                )))}
                </tbody>
            </Table>

            <AddResearch
                open={openAddModal ?? false}
                close={() => setOpenAddModal ? setOpenAddModal(false) : null}
                data={editResearchPaper}
            />
            <DeleteAlert
                open={openDeleteModal}
                onClose={() => {
                    setPaperToDelete(null);
                    setOpenDeleteModal(false);
                }}
                onDelete={() => {
                    deleteResearch(paperToDelete?._id);
                    setPaperToDelete(null);
                    setOpenDeleteModal(false);
                }}
                itemName={paperToDelete?.title}
            />

            {researchCard && selectedPaper && (
                <ResearchCard
                    paper={selectedPaper}
                    close={() => {
                        setSelectedPaper(null);
                        setResearchCard(false);
                    }}
                    onApprove={() => handleApprove(selectedPaper._id)}
                    onReject={() => handleReject(selectedPaper._id)}
                    feedback={feedback}
                    setFeedback={setFeedback}
                />
            )}
        </>

    )
}