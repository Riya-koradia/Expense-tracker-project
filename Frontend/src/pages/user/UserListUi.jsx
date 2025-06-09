
import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import DataTable from "../../components/tables/DataTable";
import PaddingBoxInDesktop from "../../components/layouts/PaddingBoxDesktop";
import AsyncSearchBar from "../../components/inputs/AsyncSearchBar";
import AddIcon from "@mui/icons-material/Add";

const FilterTitleBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));
const FiltersBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",

  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const UserListUi = ({
  title,
  filters,
  setFilters,
  list,
  loading,
  onCreateBtnClick,
  columns,
}) => {
  return (
    <>
      <Box mb={3}>
        <Paper elevation={2} sx={{ width: "100%", padding: 4 }}>
          <Box mb={4} mt={3} >
            <FilterTitleBox>
              <Typography variant="h3" color={"#000"}>
                {title}
              </Typography>

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
                    color: '#fff',
                    boxShadow: 'none',
                    '&:hover': { background: theme.palette.gradient.main, opacity: 0.9 }
                  })}
                  variant="contained"
                >
                  <AddIcon sx={{ color: '#fff' }} /> &nbsp;
                  <Typography variant="h4" sx={{ display: "flex", color: '#fff' }}>
                    Add User
                  </Typography>
                </Button>
              </Box>
            </FilterTitleBox>

            <FiltersBox mt={5}>
              <PaddingBoxInDesktop
                mb={4}
                sx={{ display: "flex", width: "20vw" }}
              >
                <AsyncSearchBar
                  fullWidth
                  title="Search Name | Email"
                  size="small"
                  placeholder={"Search Name | Email"}
                  defaultValue={filters.search}
                  onChange={(changedVal) => {
                    setFilters({ ...filters, pageNo: 1,
                      pageSize: 10, search: changedVal });
                  }}
                />
              </PaddingBoxInDesktop>

              
            </FiltersBox>
          </Box>

          <Box sx={{ minHeight: "40vh" }}>
            <DataTable
              columns={columns}
              rows={list.result ? list.result : []}
              count={list.total ?? 0}
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
export default UserListUi;
