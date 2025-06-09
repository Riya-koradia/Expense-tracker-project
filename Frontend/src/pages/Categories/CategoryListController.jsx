import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/actions/modalAction";
import { callApiAction } from "../../store/actions/commonAction";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import MessageDilog from "../../components/texts/MessageDilog";
import { callSnackBar } from "../../store/actions/snackbarAction";
import { SNACK_BAR_VARIANTS } from "../../utils/constants";
import CreateCategoryController from "./CreateCategoryController";
import { deleteCategoryApi, fetchCategoryApi } from "../../apis/category.api";
import CategoryListUi from "./CategoryListUi";
import { fetchCategoryList } from "../../store/actions/expenseCategoryAction";

const ActionComponent = memo(({ params, setParams, deleteApi }) => {
  const dispatch = useDispatch();
  const modalkey = "edit";
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    dispatch(
      openModal(
        <CreateCategoryController
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
            callSnackBar(
              params.name + " Deleted Successfully",
              SNACK_BAR_VARIANTS.success
            )
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
          message={`Are you sure you want to delete "${
            params?.name || params.title
          }" ?`}
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

const CategoryListController = () => {
  const dispatch = useDispatch();
  const title = "category";
  const deleteApi = deleteCategoryApi;
  const list = useSelector(
    (state) => state.expenseCategory.categoryList?.data || []
  );
  const loading = useSelector((state) => state.expenseCategory.categoryLoading);
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
        fieldName: "name",
        label: "Category Name",
        align: "left",
        sort: true,
        renderValue: (params, setParams) => (
          <Typography textTransform="capitalize">{params?.name}</Typography>
        ),
      },
      {
        id: 2,
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
    dispatch(fetchCategoryList(filters));
  }, [dispatch, filters]);

  return (
    <CategoryListUi
      title={title}
      filters={filters}
      setFilters={setFilters}
      loading={loading}
      list={list}
      columns={columns}
    />
  );
};

export default CategoryListController;
