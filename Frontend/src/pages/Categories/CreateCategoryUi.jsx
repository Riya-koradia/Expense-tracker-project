import React from "react";
import CustomDialog from "../../components/layouts/common/CustomDialog";
import { CenteredBox } from "../../components/layouts/OneViewBox";
import { CircularProgress } from "@mui/material";
import CustomInput from "../../components/inputs/CustomInputs";

const CreateCategoryUi = ({
  title,
  isUpdate,
  fields,
  setFields,
  loading,
  onSubmit,
  isModal,
  handleAreaModalClose,
}) => {
  return (
    <>
      {!isModal && (
        <CustomDialog
          id={`${isUpdate ? "edit" : "category"}`}
          loading={loading}
          err={fields?.err}
          onSubmit={onSubmit}
          title={`${isUpdate ? "Update" : "Create"} ${title}`}
          closeText="Close"
          confirmText={`${isUpdate ? "Update" : "Create"}`}
        >
          {loading ? (
            <CenteredBox>
              <CircularProgress />
            </CenteredBox>
          ) : (
            <>
              {
                <CustomInput
                  disabled={loading}
                  value={fields.name}
                  onChange={(e) =>
                    setFields({ ...fields, err: "", name: e.target.value })
                  }
                  type="text"
                  label={"Category Name*"}
                />
              }
            </>
          )}
        </CustomDialog>
      )}
    </>
  );
};

export default CreateCategoryUi;
