import { List, ListItem, ListItemButton, ListItemDecorator, Sheet, Typography } from "@mui/joy";
import { SideMenuTab } from "./constant.tsx";

interface SidebarProps {
    title?: string;
    tabs?: SideMenuTab[];
    selectedTab: string;
    onTabChange: (tab: string) => void;
}

export default function SideMenu({ title = "Dashboard", tabs = [], selectedTab, onTabChange }: SidebarProps) {
    return (
        <Sheet
            variant="outlined"
            sx={{
                width: 240,
                p: 3,
                borderRight: '1px solid',
                borderColor: 'divider',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography level="h4">{title}</Typography>
            <List size="sm" sx={{ flexGrow: 1 }}>
                {tabs?.map((tab) => (
                    <ListItem key={tab.value}>
                        <ListItemButton
                            selected={selectedTab === tab.value}
                            onClick={() => onTabChange(tab.value)}
                        >
                            <ListItemDecorator>{tab.icon}</ListItemDecorator>
                            {tab.label}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Sheet>
    );
}
