import {Box, Typography} from "@mui/joy";
import {FOOTER_LINKS} from "./contants/contants";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                padding: "20px",
                textAlign: "center",
                mt: "auto",
                maxWidth: "100%",
                height: '150px'
            }}
        >
            <Box sx={{
                mt: 10
            }}>
                <Typography level="body-md" sx={{fontWeight: "bold"}}>
                    © {new Date().getFullYear()} Student Research Society
                </Typography>

                <Box sx={{display: "flex", justifyContent: "center", gap: "20px", mt: 1}}>
                    {FOOTER_LINKS.map((link, index) => (
                        <Link
                            key={index}
                            to={link.url}
                            style={{textDecoration: "none", color: "black", fontSize: "14px"}}
                        >
                            <Typography sx={{
                                color: '#ccc'
                            }}>
                                {link.title}
                            </Typography>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
