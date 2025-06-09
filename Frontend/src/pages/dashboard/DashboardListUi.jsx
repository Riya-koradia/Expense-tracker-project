import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  Title
);

const DashboardListUi = ({ loading, data }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      mt={0}
      px={0}
      sx={{ background: "#f6f8fb", minHeight: "130vh", pb: 6 }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)",
          py: 3,
          mb: 5,
          height: "7vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          align="center"
          sx={{
            color: "#fff",
            letterSpacing: 1,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Expense Tracker Dashboard
        </Typography>
      </Box>
      {data.map((user) => {
        const spendDays =
          user.top3SpendDays?.map((day) => ({
            date: moment(day.date).format("MMM DD"),
            total: parseFloat(day.total),
          })) || [];
        const predictionValue = parseFloat(user.prediction?.prediction ?? 0);

        const barData = {
          labels: spendDays.map((d) => d.date),
          datasets: [
            {
              label: "",
              data: spendDays.map((d) => d.total),
              backgroundColor: "#7F7FD5",
              maxBarThickness: 60,
            },
          ],
        };
        const barOptions = {
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#22304a", font: { size: 15, weight: 500 } },
            },
            y: {
              grid: { color: "#e3eaf1" },
              ticks: { color: "#22304a", font: { size: 15, weight: 500 } },
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        };

        const months = user.prediction?.months || [];
        const monthLabels = months.map((m) =>
          moment(m.month).format("MMM YYYY")
        );
        const monthTotals = months.map((m) => m.total ?? 0);

        const lineData = {
          labels: [...monthLabels, "Prediction"],
          datasets: [
            {
              label: "",
              data: [...monthTotals, predictionValue],
              fill: true,
              borderWidth: 2,
              borderColor: "#7F7FD5",
              backgroundColor: "rgba(127, 127, 213, 0.15)",
              pointBorderColor: "#a569bd",
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderWidth: 2,
              pointStyle: "circle",
              tension: 0.4,
            },
          ],
        };

        const lineOptions = {
          plugins: { legend: { display: false } },
          elements: {
            point: {
              radius: 2,
              borderWidth: 2,
              backgroundColor: "#fff",
              borderColor: "#a569bd",
              hoverRadius: 12,
            },
            line: {
              borderWidth: 3,
              borderColor: "#a569bd",
            },
          },
          scales: {
            x: {
              grid: { color: "#e3eaf1" },
              ticks: { color: "#22304a", font: { size: 15, weight: 500 } },
            },
            y: {
              grid: { color: "#e3eaf1" },
              ticks: { color: "#22304a", font: { size: 15, weight: 500 } },
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        };

        return (
          <Box
            key={user.userName}
            mb={6}
            sx={{
              maxWidth: "lg",
              mx: "auto",
              px: 2,
              py: 4,
              background: "linear-gradient(to bottom right, #fdfbfb, #ebedee)",
              borderRadius: 4,
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h3"
              fontWeight={600}
              sx={{
                color: "#22304a",

                mb: 4,
              }}
            >
              {user.userName}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    background: "#f8fafc",
                    borderRadius: 2,
                    p: 3,
                    height: "100%",
                    boxShadow: "0 1px 4px 0 rgba(44,62,80,0.04)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#4a4a4a",
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    Top 3 Spending Days
                  </Typography>
                  <Box sx={{ height: 220 }}>
                    <Bar data={barData} options={barOptions} />
                  </Box>
                  {spendDays.length > 0 && (
                    <Typography
                      align="center"
                      mt={2}
                      fontWeight={500}
                      sx={{ color: "#22304a", fontSize: 16 }}
                    >
                      Highest: ₹{spendDays[0].total} on {spendDays[0].date}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    background: "#f8fafc",
                    borderRadius: 2,
                    p: 3,
                    height: "100%",
                    boxShadow: "0 1px 4px 0 rgba(44,62,80,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#4a4a4a",
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    Monthly Expenditure Change
                  </Typography>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight={700}
                      align="center"
                      sx={{
                        color:
                          user.monthlyChange?.changePercent >= 0
                            ? "#27ae60"
                            : "#c0392b",
                        fontSize: 40,
                        mb: 1,
                      }}
                    >
                      {user.monthlyChange?.changePercent >= 0 ? "↑" : "↓"}{" "}
                      {user.monthlyChange?.changePercent}%
                    </Typography>

                    <Typography
                      variant="h6"
                      align="center"
                      sx={{
                        color:
                          user.monthlyChange?.amountChange >= 0
                            ? "#27ae60"
                            : "#c0392b",
                        fontWeight: 500,
                        fontSize: 22,
                        mt: 2,
                      }}
                    >
                      ₹ {user.monthlyChange?.amountChange >= 0 ? "+" : " "}
                      {user.monthlyChange?.amountChange}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    background: "#f8fafc",
                    borderRadius: 2,
                    p: 3,
                    height: "100%",
                    boxShadow: "0 1px 4px 0 rgba(44,62,80,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#4a4a4a",
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    Next Month Prediction
                  </Typography>
                  <Box sx={{ height: 220, width: "100%" }}>
                    <Line data={lineData} options={lineOptions} />
                  </Box>
                  <Typography
                    align="center"
                    mt={2}
                    variant="h4"
                    fontWeight={700}
                    sx={{ color: "#222", fontSize: 28 }}
                  >
                    ₹{predictionValue.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};
export default DashboardListUi;
