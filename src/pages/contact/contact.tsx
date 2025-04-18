import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Box, Typography, Input, Textarea, Button } from "@mui/joy";

export default function ContactUs() {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emailjs.sendForm(
            'service_l8l1hja',
            'template_nk6fsyh',
            form.current!,
            'dWBhFF8FvnEDAsA1g',
        ).then(() => {
            alert("Message sent successfully!");
            form.current!.reset();
        }, (error) => {
            alert("Failed to send message: " + error.text);
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "60px 20px",
                gap: 6,
            }}
        >
            {/* Image Section */}
            <Box
                sx={{
                    flex: 1,
                    minWidth: "300px",
                    maxWidth: "480px",
                    animation: "fadeIn 1s ease-in-out",
                }}
            >
                <img
                    src="/assets/contact-illustration.png"
                    alt="Contact Illustration"
                    style={{
                        width: "100%",
                        borderRadius: "12px",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                    }}
                />
            </Box>

            {/* Form Section */}
            <Box
                component="form"
                ref={form}
                onSubmit={sendEmail}
                sx={{
                    flex: 1,
                    minWidth: "320px",
                    maxWidth: "500px",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                    border: "1px solid #333",
                    animation: "fadeIn 1.2s ease-in-out",
                }}
            >
                <Typography
                    level="h3"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        textAlign: "center",
                        fontSize: "30px",
                    }}
                >
                    Get in Touch
                </Typography>

                <Input
                    placeholder="Your Name"
                    name="user_name"
                    required
                    sx={{
                        mb: 2,
                        // backgroundColor: "transparent",
                        // color: "#fff",
                        // borderColor: "#444",
                        // "&:hover": { borderColor: "#e8d55b" },
                        // "&:focus-within": {
                        //     borderColor: "#e8d55b",
                        // },
                    }}
                />
                <Input
                    type="email"
                    placeholder="Your Email"
                    name="user_email"
                    required
                    sx={{
                        mb: 2,
                        // backgroundColor: "transparent",
                        // color: "#fff",
                        // borderColor: "#444",
                        // "&:hover": { borderColor: "#e8d55b" },
                        // "&:focus-within": {
                        //     borderColor: "#e8d55b",
                        // },
                    }}
                />
                <Textarea
                    placeholder="Your Message"
                    name="message"
                    required
                    minRows={4}
                    sx={{
                        mb: 3,
                        // backgroundColor: "transparent",
                        // color: "#fff",
                        // borderColor: "#444",
                        // "&:hover": { borderColor: "#e8d55b" },
                        // "&:focus-within": {
                        //     borderColor: "#e8d55b",
                        // },
                    }}
                />

                <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    fullWidth
                    sx={{
                        // backgroundColor: "#e8d55b",
                        // color: "#000",
                        // fontWeight: 600,
                        // "&:hover": {
                        //     backgroundColor: "#f1df6a",
                        // },
                    }}
                >
                    Send Message
                </Button>
            </Box>

            {/* Keyframe for fade-in */}
            <style>
                {`
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}
            </style>
        </Box>
    );
}
