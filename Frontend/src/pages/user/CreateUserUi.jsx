import { Autocomplete, Box, CircularProgress, ListItem } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
import CustomDialog from "../../components/layouts/common/CustomDialog";
import { CenteredBox } from "../../components/layouts/OneViewBox";
import CustomInput from "../../components/inputs/CustomInputs";

const CreateUserUi = ({
  title,
  isUpdate,
  fields,
  setFields,
  loading,
  onSubmit,
}) => {
  const { user } = useSelector((state) => state);

  return (
    <>
      <CustomDialog
        loading={loading}
        err={fields.err}
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
            <CustomInput
              autoFocus={true}
              disabled={loading}
              value={fields.name}
              onChange={(e) =>
                setFields({ ...fields, err: "", name: e.target.value })
              }
              type="text"
              label={"Name*"}
            />

            {
              <CustomInput
                disabled={loading}
                value={fields.email}
                onChange={(e) =>
                  setFields({ ...fields, err: "", email: e.target.value })
                }
                type="text"
                label={"Email*"}
              />
            }

            {!isUpdate && (
              <Box mt={2}>
                <CustomInput
                  disabled={loading}
                  value={fields.password}
                  onChange={(e) =>
                    setFields({ ...fields, err: "", password: e.target.value })
                  }
                  type="password"
                  label={"Password*"}
                />
              </Box>
            )}
          </>
        )}
      </CustomDialog>
    </>
  );
};
export default memo(CreateUserUi);
