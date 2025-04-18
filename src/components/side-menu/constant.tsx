import { MdDescription, MdEvent } from "react-icons/md";
import { ReactNode } from "react";

export interface SideMenuTab {
    label: string;
    icon: ReactNode;
    value: string;
}

export const SideMenuTabs: SideMenuTab[] = [
    {
        label: "Research Papers",
        icon: <MdDescription />,
        value: "research",
    },
    {
        label: "Events",
        icon: <MdEvent />,
        value: "event",
    },
];
