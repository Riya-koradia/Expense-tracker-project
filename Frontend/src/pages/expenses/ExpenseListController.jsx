import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/actions/modalAction";
import { callApiAction } from "../../store/actions/commonAction";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import MessageDilog from "../../components/texts/MessageDilog";
import { callSnackBar } from "../../store/actions/snackbarAction";
import { SNACK_BAR_VARIANTS } from "../../utils/constants";
import ExpenseListUi from "./ExpenseListUi";
import CreateExpenseController from "./CreateExpenseController";
import { deleteExpenseApi, getExpenseApi } from "../../apis/expense.api";
import moment from "moment";
import { fetchExpenseList } from "../../store/actions/expenseCategoryAction";

const ActionComponent = memo(({ params, setParams, deleteApi }) => {
  const dispatch = useDispatch();
  const modalkey = "edit";
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    dispatch(
      openModal(
        <CreateExpenseController
          id={params.id}
          callBack={(response, updatedData) => {
            setParams({ ...params, ...updatedData });
            dispatch(closeModal(modalkey));
          }}
        />,
        "sm",
        false,
        modalkey
      )
    );
  };

  const deleteFun = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      callApiAction(
        async () => await deleteApi({ id: params.id }),
        (response) => {
          setParams({});
          setLoading(false);
          dispatch(closeModal("delete"));
          dispatch(
            callSnackBar(" Deleted Successfully", SNACK_BAR_VARIANTS.success)
          );
        },
        (err) => {
          setLoading(false);
        }
      )
    );
  };

  const onDelete = () => {
    dispatch(
      openModal(
        <MessageDilog
          onSubmit={(e) => deleteFun(e)}
          title="Alert!"
          modalId="delete"
          message={`Are you sure you want to delete this expense ?`}
        />,
        "sm",
        false,
        "delete"
      )
    );
  };

  return (
    <Box sx={{ width: "100%", alignItems: "flex-start", display: "flex" }}>
      <IconButton size="inherit" onClick={onEdit}>
        <Edit color="info" fontSize="inherit" />
      </IconButton>
      <IconButton disabled={loading} size="inherit" onClick={onDelete}>
        <Delete color="error" fontSize="inherit" />
      </IconButton>
    </Box>
  );
});

const ExpenseListController = () => {
  const dispatch = useDispatch();
  const title = "expense";
  const deleteApi = deleteExpenseApi;

  const list = useSelector(
    (state) => state.expenseCategory.expenseList?.data || []
  );
  const loading = useSelector((state) => state.expenseCategory.expenseLoading);
  const [filters, setFilters] = useState({
    pageNo: 1,
    pageSize: 10,
    search: "",
    searchable: ["name"],
    sort: "",
    sortDirection: -1,
  });

  const columns = useMemo(
    () => [
      {
        id: 1,
        fieldName: "user_name",
        label: "Name",
        align: "left",
        sort: true,
        renderValue: (params, setParams) => (
          <Typography textTransform="capitalize">
            {params?.user_name}
          </Typography>
        ),
      },
      {
        id: 2,
        fieldName: "amount",
        label: "Amount(₹)",
        align: "left",
        sort: true,
        renderValue: (params, setParams) => (
          <Typography>{params?.amount}</Typography>
        ),
      },
      {
        id: 3,
        fieldName: "date",
        label: "Date",
        align: "left",
        sort: true,
        renderValue: (params, setParams) => (
          <Typography>{moment(params?.date).format("DD-MM-YYYY")}</Typography>
        ),
      },
      {
        id: 4,
        fieldName: "description",
        label: "Description",
        align: "left",
        sort: true,
        renderValue: (params, setParams) => (
          <Typography>{params?.description}</Typography>
        ),
      },
      {
        id: 5,
        fieldName: "category_name",
        label: "Category",
        align: "left",
        sort: true,
        renderValue: (params, setParams) => (
          <Typography>{params?.category_name}</Typography>
        ),
      },
      {
        id: 6,
        fieldName: "",
        label: "Action",
        align: "right",
        renderValue: (params, setParams) => (
          <ActionComponent
            deleteApi={deleteApi}
            params={params}
            setParams={setParams}
          />
        ),
      },
    ],
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchExpenseList(filters));
  }, [dispatch, filters]);

  return (
    <ExpenseListUi
      title={title}
      filters={filters}
      setFilters={setFilters}
      loading={loading}
      list={list}
      columns={columns}
    />
  );
};

export default ExpenseListController;
