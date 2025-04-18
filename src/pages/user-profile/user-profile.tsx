import {useEffect, useState} from "react";
import {Box} from "@mui/joy";
import {useAuth} from "../../context/auth-context";
import {useNavigate} from "react-router-dom";
import {MdAdd} from "react-icons/md";
import SubHeader from "../../components/sub-header/sub-header.tsx";
import SideMenu from "../../components/side-menu/side-menu.tsx";
import {SideMenuTabs} from "../../components/side-menu/constant.tsx";
import ResearchTable from "../research/component/research-table.tsx";
import EventTable from "../programs/components/event-table.tsx";


export default function UserProfile() {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState("research");
    const [search, setSearch] = useState("");
    const [modalAddResearchPaper, setModalAddResearchPaper] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    if (!user) return null;

    return (
        <Box sx={{display: 'flex', height: '85vh', width: '100%'}}>
            {/* Sidebar */}
            <SideMenu
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                tabs={SideMenuTabs}
            />

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 4,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <SubHeader
                    title={`Welcome, ${user.username.charAt(0).toUpperCase() + user.username.slice(1)}`}
                    itemCount={itemCount} // You can optionally pass item count from child components via callback
                    itemLabel={selectedTab === 'research' ? "Papers" : "Events"}
                    showSearch={true}
                    searchValue={search}
                    onSearchChange={(value) => setSearch(value)}
                    showButton={selectedTab === "research"}
                    buttonText="Add Research Paper"
                    buttonIcon={<MdAdd />}
                    onButtonClick={() => setModalAddResearchPaper(true)}
                />

                {selectedTab === "research" ? (
                    <ResearchTable
                        search={search}
                        setItemCount={setItemCount}
                        openAddModal={modalAddResearchPaper}
                        setOpenAddModal={setModalAddResearchPaper}
                    />
                ) : (
                    <EventTable search={search} setItemCount={setItemCount} />
                )}
            </Box>
        </Box>
    );
}
