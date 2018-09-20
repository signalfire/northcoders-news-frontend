import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#ff8b00',
        },
    },
    typography: {
        htmlFontSize: 16,
        display1: {
            fontSize:"1.5rem",
            marginBottom:"2rem",
            textTransform:"capitalize"
        },
        display2: {
            fontSize:"1.2rem",
            marginBottom:"2rem",
            textTransform:"capitalize"
        }
    },
    props:{
        MuiButtonBase:{
            disableRipple:true,
        },
    },    
    overrides: {
        MuiCard: {
            root: {
                marginBottom:"2rem"
            }
        },
        MuiInput: {
            root: {
                border:"solid 1px #ccc",
                borderRadius:'4px',
                marginBottom:'1rem',
            }
        }
    }
});

