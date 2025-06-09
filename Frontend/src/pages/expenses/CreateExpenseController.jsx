import { useDispatch } from "react-redux";
import useValidate from "../../store/hooks/useValidator";
import { closeModal } from "../../store/actions/modalAction";
import { useEffect, useMemo, useState } from "react";
import { callApiAction } from "../../store/actions/commonAction";
import { callSnackBar } from "../../store/actions/snackbarAction";
import { SNACK_BAR_VARIANTS } from "../../utils/constants";
import {
  addExpenseApi,
  expenseUpdateApi,
  fetchExpenseByIdApi,
} from "../../apis/expense.api";
import CreateExpenseUi from "./CreateExpenseUi";
import moment from "moment";
import { fetchExpenseList } from "../../store/actions/expenseCategoryAction";

const CreateExpenseController = ({
  callBack = () => {},
  id,
  isModal,
  handleAreaModalClose,
}) => {
  const validate = useValidate();
  const dispatch = useDispatch();
  const title = "expense";

  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState({
    err: "",
    id: "",
    user_id: null,
    category: null,

    amount: "",
    date: moment().toISOString(),
    description: "",
  });

  const [originalDocument, setOriginalDocument] = useState({});

  const validationSchemaForCreate = useMemo(
    () => [
      {
        required: true,
        value: fields.user_id,
        field: "User name",
      },
      {
        required: true,
        value: fields.category,
        field: "Category",
      },
      {
        required: true,
        value: fields.amount,
        field: "Amount",
      },
      {
        required: true,
        value: fields.date,
        field: "Date",
      },
      {
        required: true,
        value: fields.description,
        field: "Description",
      },
    ],
    [fields]
  );

  const validationSchemaForUpdate = useMemo(
    () => [
      {
        required: true,
        value: fields.user_id,
        field: "User name",
      },
      {
        required: true,
        value: fields.category,
        field: "Category",
      },
      {
        required: true,
        value: fields.amount,
        field: "Amount",
      },
      {
        required: true,
        value: fields.date,
        field: "Date",
      },
    ],
    [fields]
  );

  console.log("fields", fields);
  const updateFunction = async () => {
    const validationResponse = validate(validationSchemaForUpdate);

    const updatedData = {
      id,
      user_id: fields.user_id?.id || fields.user_id,
      category: fields.category?.id || fields.category,
      amount: fields.amount,
      date: moment(fields.date).format("YYYY-MM-DD"),
      description: fields.description,
    };

    if (validationResponse === true) {
      setLoading(true);
      dispatch(
        callApiAction(
          async () => await expenseUpdateApi(updatedData),
          async (response) => {
            await callBack(updatedData);
            setLoading(false);
            dispatch(
              callSnackBar(
                "Expense updated Successfully",
                SNACK_BAR_VARIANTS.success
              )
            );
            dispatch(fetchExpenseList());
            !isModal && dispatch(closeModal("edit"));
            isModal && handleAreaModalClose();
          },
          (err) => {
            setLoading(false);
            setFields({ ...fields, err });
          }
        )
      );
    } else {
      setFields({ ...fields, err: validationResponse });
    }
  };

  const createFunction = async () => {
    const validationResponse = validate(validationSchemaForCreate);
    const createData = {
      user_id: fields.user_id?.id || fields.user_id,
      category: fields.category?.id || fields.category,
      amount: fields.amount,
      date: moment(fields.date).format("YYYY-MM-DD"),
      description: fields.description,
    };
    if (validationResponse === true) {
      setLoading(true);
      dispatch(
        callApiAction(
          async () => await addExpenseApi(createData),
          async (response) => {
            setLoading(false);
            dispatch(
              callSnackBar(
                "Expense Added Successfully",
                SNACK_BAR_VARIANTS.success
              )
            );
            dispatch(fetchExpenseList());
            dispatch(closeModal("expense"));
          },
          (err) => {
            setLoading(false);
            setFields({ ...fields, err });
            dispatch(callSnackBar(err, SNACK_BAR_VARIANTS.error));
          }
        )
      );
    } else {
      setFields({ ...fields, err: validationResponse });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) updateFunction();
    else createFunction();
  };

  const fetchById = (id) => {
    setLoading(true);
    dispatch(
      callApiAction(
        async () => await fetchExpenseByIdApi({ id }),
        async (response) => {
          setFields({
            ...fields,
            ...response,
            user_id:
              response.user_id && response.user_name
                ? { id: response.user_id, name: response.user_name }
                : null,
            category:
              response.category && response.category_name
                ? { id: response.category, name: response.category_name }
                : null,
          });
          setOriginalDocument(response);
          setLoading(false);
        },
        (err) => {
          setFields({ ...fields, err });
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    if (id) fetchById(id);
  }, [id]);

  return (
    <CreateExpenseUi
      title={title}
      isUpdate={id}
      loading={loading}
      fields={fields}
      onSubmit={onSubmit}
      setFields={setFields}
      isModal={isModal}
      handleAreaModalClose={handleAreaModalClose}
    />
  );
};

export default CreateExpenseController;
