import { Box } from "@mui/system"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { center } from "../../assets/css/theme/common";


const FloatingLabel = styled(Box)(({ theme }) => ({


    ...center,
    position: "absolute",
    top: "0px",
    left: '-2%',
    transform: "rotate(-45deg) translate(-25%,100%)",
    background:theme.palette.error.main,
    padding: "0px 100px",
    color: "white",
    zIndex: '11111111111111111',
    'textTransform': 'uppercase',

}));


const AppModeLabel = () => {
    return <FloatingLabel>

        <Typography variant="body2" color="white" >{process.env.REACT_APP_APP_MODE}</Typography>
    </FloatingLabel>
}
export default AppModeLabel