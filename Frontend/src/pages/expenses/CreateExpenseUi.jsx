import React from "react";
import CustomDialog from "../../components/layouts/common/CustomDialog";
import { CenteredBox } from "../../components/layouts/OneViewBox";
import { Box, CircularProgress, ListItem } from "@mui/material";
import CustomInput from "../../components/inputs/CustomInputs";
import AsyncDropDown from "../../components/inputs/AsyncDropDown";

import { StyledSearchBar } from "../../components/inputs/SearchBar";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { getUserApi } from "../../apis/user.api";
import PaddingBoxInDesktop from "../../components/layouts/PaddingBoxDesktop";
import moment from "moment";
import { fetchCategoryApi } from "../../apis/category.api";

const CreateExpenseUi = ({
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
          id={`${isUpdate ? "edit" : "expense"}`}
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
                <PaddingBoxInDesktop
                  mt={3}
                  sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
                >
                  <AsyncDropDown
                    defaultVal={
                      fields.user_id
                        ? {
                            id: fields.user_id.id,
                            name: fields.user_id.name,
                          }
                        : null
                    }
                    lazyFun={async (para) =>
                      await getUserApi({ ...para, allStatus: true })
                    }
                    OptionComponent={({ option, ...rest }) => {
                      return <ListItem {...rest}>{option.name}</ListItem>;
                    }}
                    value={fields?.user_id}
                    onChange={async (changedVal) => {
                      setFields({
                        ...fields,
                        user_id: changedVal ? changedVal.id : null,
                      });
                    }}
                    titleKey={"name"}
                    valueKey={"id"}
                    InputComponent={(params) => (
                      <StyledSearchBar
                        placeholder={"Select User Name*"}
                        {...params}
                        margin="none"
                      />
                    )}
                  />
                </PaddingBoxInDesktop>
              }

              {
                <PaddingBoxInDesktop
                  mt={3}
                  sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
                >
                  <AsyncDropDown
                    defaultVal={
                      fields.category
                        ? {
                            id: fields.category.id,
                            name: fields.category.name,
                          }
                        : null
                    }
                    lazyFun={async (para) =>
                      await fetchCategoryApi({ ...para })
                    }
                    OptionComponent={({ option, ...rest }) => {
                      return <ListItem {...rest}>{option.name}</ListItem>;
                    }}
                    value={fields?.category}
                    onChange={async (changedVal) => {
                      setFields({
                        ...fields,
                        category: changedVal ? changedVal.id : null,
                      });
                    }}
                    titleKey={"name"}
                    valueKey={"id"}
                    InputComponent={(params) => (
                      <StyledSearchBar
                        placeholder={"Select Category*"}
                        {...params}
                        margin="none"
                      />
                    )}
                  />
                </PaddingBoxInDesktop>
              }

              {
                <Box
                  width={"100%"}
                  gap={2}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      width: "50%",
                    }}
                  >
                    <DesktopDatePicker
                      disabled={loading}
                      inputFormat="DD-MM-yyyy"
                      value={moment(fields?.date ?? null)}
                      onChange={(changedVal) => {
                        setFields({ ...fields, err: "", date: changedVal });
                      }}
                      maxDate={moment()}
                      renderInput={(props) => (
                        <CustomInput {...props} sx={{ height: "56px" }} />
                      )}
                      type="date"
                      label={"Date*"}
                    />
                  </Box>
                  {
                    <CustomInput
                      disabled={loading}
                      value={fields.amount}
                      onChange={(e) =>
                        setFields({
                          ...fields,
                          err: "",
                          amount: e.target.value,
                        })
                      }
                      type="text"
                      label={"Amount*"}
                    />
                  }
                </Box>
              }

              {
                <CustomInput
                  disabled={loading}
                  value={fields.description}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      err: "",
                      description: e.target.value,
                    })
                  }
                  type="text"
                  label={"Description*"}
                />
              }
            </>
          )}
        </CustomDialog>
      )}
    </>
  );
};

export default CreateExpenseUi;
