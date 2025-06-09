import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalAction";
import { Box, Paper, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AsyncSearchBar from "../../components/inputs/AsyncSearchBar";
import PaddingBoxInDesktop from "../../components/layouts/PaddingBoxDesktop";
import DataTable from "../../components/tables/DataTable";
import {
  FilterTitleBox,
  FiltersBox,
} from "../../components/layouts/OneViewBox";
import CreateExpenseController from "./CreateExpenseController";
import TimeRangeSelector from "../../components/layouts/common/TimeRangeSelector";

const ExpenseListUi = ({ columns, list, filters, setFilters, loading }) => {
  const dispatch = useDispatch();
  const id = "expense";
  const onCreateBtnClick = () => {
    dispatch(openModal(<CreateExpenseController />, "sm", false, id));
  };
  return (
    <>
      <Box mb={3}>
        <Paper elevation={2} sx={{ width: "100%", padding: 6 }}>
          <Box
            mb={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"flex-end"}
          >
            <FilterTitleBox>
              <Box mt={2}>
                <Typography variant="h3" color={"#000"}>
                  Expenses
                </Typography>
              </Box>

              <Box mb={2} sx={{ display: "flex" }}>
                <Box mr={2} />
              </Box>
              <Box>
                <Button
                  onClick={onCreateBtnClick}
                  sx={(theme) => ({
                    width: "100%",
                    height: "6vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: theme.palette.gradient.main,
                    color: "#fff",
                    boxShadow: "none",
                    "&:hover": {
                      background: theme.palette.gradient.main,
                      opacity: 0.9,
                    },
                  })}
                  variant="contained"
                >
                  <AddIcon sx={{ color: "#fff" }} /> &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", color: "#fff" }}
                  >
                    Add Expense
                  </Typography>
                </Button>
              </Box>
            </FilterTitleBox>

            <FiltersBox
              mt={4}
              sx={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
              }}
            >
              <PaddingBoxInDesktop
                mb={2}
                sx={{
                  display: "flex",
                  width: "12vw",
                  minWidth: 160,
                  maxWidth: 400,
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  height: 48,
                }}
                flex={1}
              >
                <TimeRangeSelector
                  onChange={(changedVal) => {
                    setFilters({ ...filters, ...changedVal });
                  }}
                />
              </PaddingBoxInDesktop>
              <Box sx={{ flex: 1 }} />
              <PaddingBoxInDesktop
                mb={4}
                sx={{
                  display: "flex",
                  width: "20vw",
                  minWidth: 200,
                  maxWidth: 700,
                  justifyContent: "flex-end",
                  alignItems: "stretch",
                  height: 48,
                }}
                pl={3}
              >
                <AsyncSearchBar
                  fullWidth
                  title="Search Name | Category"
                  size="small"
                  placeholder={"Search Name | Category"}
                  defaultValue={filters.search}
                  onChange={(changedVal) => {
                    setFilters({
                      ...filters,
                      pageNo: 1,
                      pageSize: 10,
                      search: changedVal,
                    });
                  }}
                />
              </PaddingBoxInDesktop>
            </FiltersBox>
          </Box>

          <Box sx={{ minHeight: "40vh" }}>
            <DataTable
              columns={columns}
              rows={list?.result ? list?.result : []}
              count={list?.total ?? 0}
              filters={filters}
              setFilters={setFilters}
              loading={loading}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ExpenseListUi;
