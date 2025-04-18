import {ReactNode} from "react";
import {Box, Button, Input, Typography} from "@mui/joy";

interface TableHeaderProps {
    title: string;
    itemCount?: number;
    itemLabel?: string;
    showSearch?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    showButton?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    buttonIcon?: ReactNode;
}

export default function SubHeader({
                                      title,
                                      itemCount,
                                      itemLabel,
                                      showSearch = false,
                                      searchValue,
                                      onSearchChange,
                                      showButton = false,
                                      buttonText,
                                      onButtonClick,
                                      buttonIcon,}: TableHeaderProps) {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
            }}
        >
            {/* Left Side: Title + Item Count */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography level="h3">{title}</Typography>
                {itemCount !== undefined && itemLabel && (
                    <Typography level="body-lg">
                        Total {itemLabel}: {itemCount}
                    </Typography>
                )}
            </Box>

            {/* Right Side: Search + Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: { xs: 2, sm: 0 } }}>
                {showSearch && onSearchChange && (
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        sx={{ width: 300 }}
                    />
                )}

                {showButton && buttonText && onButtonClick && (
                    <Button startDecorator={buttonIcon} onClick={onButtonClick}>
                        {buttonText}
                    </Button>
                )}
            </Box>
        </Box>
    )
}