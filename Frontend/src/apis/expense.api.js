import axios from "axios";
import { getHeaders } from "../utils/main";
import endpoints from "./endpoints";

export const getExpenseApi = async params => {
  const callResponse = await axios({
    url: endpoints.FetchExpenseApi,
    method: "get",
    headers: getHeaders(),
    params,
  })
    .then(response => response.data)
    .catch(err => err.response.data);

  return callResponse;
};

export const addExpenseApi = async data => {
  const callResponse = await axios({
    url: endpoints.AddExpenseApi,
    method: "post",
    headers: getHeaders(),
    data,
  })
    .then(response => response.data)
    .catch(err => err.response.data);

  return callResponse;
};

export const fetchExpenseByIdApi = async params => {
  const callResponse = await axios({
    url: endpoints.FetchExpenseByIdApi,
    method: "get",
    headers: getHeaders(),
    params,
  })
    .then(response => response.data)
    .catch(err => err.response.data);

  return callResponse;
};

export const expenseUpdateApi = async data => {
  const callResponse = await axios({
    url: endpoints.UpdateExpenseApi,
    method: "patch",
    headers: getHeaders(),
    data,
  })
    .then(response => response.data)
    .catch(err => err.response.data);

  return callResponse;
};

export const deleteExpenseApi = async data => {
  const callResponse = await axios({
    url: endpoints.DeleteExpenseApi,
    method: "DELETE",
    headers: getHeaders(),
    data,
  })
    .then(response => response.data)
    .catch(err => err.response.data);

  return callResponse;
};
export const getUserStatisticsApi = async params => {
  const callResponse = await axios({
    url: endpoints.getUserStatisticsApi,
    method: "get",
    headers: getHeaders(),
    params,
  })
    .then(response => response.data)
    .catch(err => err.response.data);

  return callResponse;
}


