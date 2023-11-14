import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        background: {
            // default: "#2a2a2a",
            // paper: "#101010",
        },
        primary: {
            main: "#eb03fc",
            // contrastText: "#fff",
        },
        text: {
            // primary: "#fff",
        }
    },
});
