// theme.ts
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    solidColor: '#000',
                    solidBg: '#e8d55b',
                    solidHoverBg: '#d4c04f',
                    solidActiveBg: '#c4b543',

                    plainColor: '#e8d55b',
                    plainHoverBg: 'transparent',
                    plainActiveBg: '#e8d55b',

                    outlinedBorder: '#e8d55b',
                    outlinedColor: '#e8d55b',
                    outlinedHoverBg: '#f8f4d0',
                },
                neutral: {
                    plainColor: '#ccc',
                    plainHoverBg: '#222',
                    plainActiveBg: '#333',
                },
            },
        },
    },
    components: {
        JoyInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a2a2a',
                    color: '#ccc',
                    borderColor: '#444',
                    '--Input-focusedHighlight': '#e8d55b',
                    '&:hover': { borderColor: '#e8d55b' },
                    '&:focus-within': { borderColor: '#e8d55b' },
                },
            },
        },
        JoyTextarea: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a2a2a',
                    color: '#fff',
                    borderColor: '#444',
                    '--Textarea-focusedHighlight': '#e8d55b',
                    '&:hover': { borderColor: '#e8d55b' },
                    '&:focus-within': { borderColor: '#e8d55b' },
                },
            },
        },
        JoyTypography: {
            styleOverrides: {
                root: {
                    color: '#e8d55b',
                },
            },
        },
        JoySelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a2a2a',
                    color: '#ccc',
                    borderColor: '#444',
                    '--Select-focusedHighlight': '#e8d55b',
                    '&:hover': { borderColor: '#e8d55b' },
                },
                listbox: {
                    backgroundColor: '#1e1e1e',
                    color: '#ccc',
                    '&:hover': {
                        // backgroundColor: '#2a2a2a',
                        borderColor: '#e8d55b',
                    },
                },
            },
        },
        JoyCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a2a2a',
                    color: '#ccc',
                    width: '400px',
                    height: '100%',
                },
            },
        },
        JoyModalDialog: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2a2a2a',
                },
            },
        },
        JoyFormLabel: {
            styleOverrides: {
                root: {
                    color: '#ccc',
                },
            },
        },
        JoySheet: {
            styleOverrides: {
                root: {
                    color: '#ccc',
                    backgroundColor: '#161616',
                },
            },
        },
        JoyTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                    color: '#ccc',
                    borderColor: '#444',
                    '& th': {
                        backgroundColor: '#222',
                        color: '#e8d55b',
                    },
                    '& td': {
                        borderColor: '#333',
                    },
                    '& tr:hover': {
                        backgroundColor: '#2a2a2a',
                    },
                },
            },
        },
        JoyIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        color: '#ccc'
                    }
                }
            }
        },
        JoyListItemButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        color: '#ccc',
                    }
                }
            }
        }
    },
});

export default theme;
