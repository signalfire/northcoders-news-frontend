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
                marginBottom:'2rem',
                paddingTop:'8px'
            }
        },
        MuiInput: {
            root: {
                border:"solid 1px rgba(0, 0, 0, 0.23)",
                borderRadius:'4px',
                marginBottom:'1rem'
            },
            input: {
                paddingLeft:'0.5rem'
            }
        },
        MuiAvatar: {
            root:{
                borderRadius:'4px',
                width:'38px',
                height:'38px',
                border:'solid 1px rgba(0, 0, 0, 0.23)'
            }
        }
    }
});

