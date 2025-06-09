import { useDispatch } from "react-redux";
import useValidate from "../../store/hooks/useValidator";
import { closeModal } from "../../store/actions/modalAction";
import { useEffect, useMemo, useState } from "react";
import { callApiAction } from "../../store/actions/commonAction";
import { callSnackBar } from "../../store/actions/snackbarAction";
import { SNACK_BAR_VARIANTS } from "../../utils/constants";
import { fetchCategoryList } from "../../store/actions/expenseCategoryAction";

import {
  createCategoryApi,
  fetchCategoryByIdApi,
  updateCategoryApi,
} from "../../apis/category.api";
import CreateCategoryUi from "./CreateCategoryUi";

const CreateCategoryController = ({
  callBack = () => {},
  id,
  isModal,
  handleAreaModalClose,
}) => {
  const validate = useValidate();
  const dispatch = useDispatch();
  const title = "category";

  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState({
    err: "",
    id,
    name: "",
  });

  const [originalDocument, setOriginalDocument] = useState({});

  const validationSchemaForCreate = useMemo(
    () => [
      {
        required: true,
        value: fields.name,
        field: "name",
      },
    ],
    [fields]
  );

  const validationSchemaForUpdate = useMemo(
    () => [
      {
        required: true,
        value: fields.name,
        field: "name",
      },
    ],
    [fields]
  );

  const createFunction = async () => {
    const validationResponse = validate(validationSchemaForCreate);
    if (validationResponse === true) {
      setLoading(true);
      dispatch(
        callApiAction(
          async () => await createCategoryApi(fields),
          async (response) => {
            setLoading(false);
            dispatch(
              callSnackBar(
                "Category Created Successfully",
                SNACK_BAR_VARIANTS.success
              )
            );
            dispatch(fetchCategoryList());
            dispatch(closeModal("category"));
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

  const updateFunction = async () => {
    const validationResponse = validate(validationSchemaForUpdate);
    const updatedData = { id };
    for (let field in originalDocument) {
      if (
        originalDocument[field] &&
        fields[field] &&
        fields[field] != originalDocument[field]
      ) {
        updatedData[field] = fields[field];
      }
    }
    if (validationResponse === true) {
      setLoading(true);
      dispatch(
        callApiAction(
          async () => await updateCategoryApi(updatedData),
          async (response) => {
            await callBack(updatedData);
            setLoading(false);
            dispatch(
              callSnackBar(
                "Category updated Successfully",
                SNACK_BAR_VARIANTS.success
              )
            );
            dispatch(fetchCategoryList());
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) updateFunction();
    else createFunction();
  };

  const fetchById = (id) => {
    setLoading(true);
    dispatch(
      callApiAction(
        async () => await fetchCategoryByIdApi({ id }),
        async (response) => {
          setFields({ ...fields, ...response });
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
    <CreateCategoryUi
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

export default CreateCategoryController;
