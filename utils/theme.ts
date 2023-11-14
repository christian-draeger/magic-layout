import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#ea0a8e',
        },
        secondary: {
            main: '#ea0a8e',
        },
    },
    props: {
        MuiTooltip: {
            arrow: true,
        },
    },
});
