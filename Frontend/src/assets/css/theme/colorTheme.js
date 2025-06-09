import { createTheme } from "@mui/material"

const colorTheme = {
    palette: {
        primary: {
            main: "#7F7FD5",
            secondary: "#86A8E7" 

        },
        secondary: {
            main: "#91EAE4",
            light:"#EDF0F7"
        },
        gradient: {
            main: "linear-gradient(90deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)"
        },
        dark: {
            main: "#000",
            200: 'rgba(158, 158, 158, 0.12)'
        },
        light: {
            main: "#fff",
            200: "#E5E5E5"
        },
        grey: {
            main: "#F5F5F5",
            secondary:"#E5E5E6",
            dark: "#999",
        },
        text: {
            primary: '#3C508B',
            secondary: "#2D3C67"
        },
        orange: {
            main: "rgba(255, 62, 29, 1)"
        },
        tab: {
            main: '#9fb1e8'
        },
        success:{
           main:"#0B8E5F",
           light:"#ECFDF7"
        },
        gradiant:{
            main:"#FFFFFF",
            secondary:"#FFFFFF"
        }
    }

}


export default colorTheme