import { AttachMoneyOutlined, Paid, PaidOutlined } from "@mui/icons-material";
import { CenteredBox } from "./boxes"
import { Typography, Box } from '@mui/material';



const Logo = ({...rest}) => {
    return (
        <CenteredBox {...rest}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                px: 4,
                py: 3,
               
                mb: 2
            }}>
                {/* <AttachMoneyOutlined sx={{ color: 'white', fontSize: 32 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, letterSpacing: 1 }}>
                    Expense tracker
                </Typography> */}
            </Box>
        </CenteredBox>
    );
}
export default Logo