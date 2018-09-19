import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#ff8b00',
        },
    },
    typography: {
        htmlFontSize: 16,
    },
    props:{
        MuiButtonBase:{
            disableRipple:true,
            color:'#fff'
        }
    }    
});

