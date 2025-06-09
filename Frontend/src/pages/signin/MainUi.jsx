import { Box, Slide, styled, Typography } from "@mui/material";
import OneViewBox, { CenteredBox } from "../../components/layouts/OneViewBox";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import mainBg from "../../assets/images/main-bg.jpeg";

const OnewViewContainer = styled(OneViewBox)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `url(${mainBg}) center center/cover no-repeat`,
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(6px)",
    background: "rgba(255,255,255,0.12)",
    zIndex: 0,
    pointerEvents: "none",
  },
  zIndex: 1,
}));

const GlassPanel = styled(Box)(({ theme }) => ({
  minWidth: 480,
  maxWidth: 560,
  width: "100%",
  padding: theme.spacing(8, 6, 6, 6),
  borderRadius: theme.shape.borderRadius * 5,
  background: `linear-gradient(135deg, rgba(18,20,28,0.68) 100%, rgba(44,54,80,0.48) 100%)`, // uniform black glass effect, no top band
  boxShadow: "0 20px 64px 0 rgba(20, 24, 60, 0.38)",
  backdropFilter: "blur(36px) saturate(180%)",
  border: "2px solid rgba(255,255,255,0.13)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%)", // less white, no band
    opacity: 0.38,
    pointerEvents: "none",
    zIndex: 3,
  },
  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "0%",
    background: "none",
    opacity: 0,
    pointerEvents: "none",
    zIndex: 4,
  },
}));

const MainUi = ({ onSubmit, ...props }) => {
  const ref = useRef();
  const location = useLocation();

  return (
    <>
      <OnewViewContainer>
        <GlassPanel component={"form"} onSubmit={onSubmit}>
          <Typography
            sx={{
              fontSize: "3.0rem",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 1,
              mb: 5,
              textAlign: "center",
              textShadow: "0 2px 16px rgba(80,80,180,0.18)",
            }}
          >
            Expense Tracker
          </Typography>
          <Box sx={{ width: "100%" }}>{props.children}</Box>
        </GlassPanel>
      </OnewViewContainer>
    </>
  );
};
export default MainUi;
