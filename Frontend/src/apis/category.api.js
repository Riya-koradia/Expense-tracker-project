import axios from "axios";
import { getHeaders } from "../utils/main";
import endpoints from "./endpoints";


export const fetchCategoryApi = async (params) => {
    const callResponse = await axios({
      url: endpoints.FetchCategoryApi,
      method: "get",
      headers: getHeaders(),
      params,
    })
      .then((response) => response.data)
      .catch((err) => ({status:0,response:err.response,code:err.response.status}));
  
    return callResponse;
  };
  
  export const createCategoryApi = async (data) => {
    const callResponse = await axios({
      url: endpoints.CreateCategoryApi,
      method: "post",
      headers: getHeaders(),
      data,
    })
      .then((response) => response.data)
      .catch((err) => ({status:0,response:err.response,code:err.response.status}));
  
    return callResponse;
  };

  export const deleteCategoryApi = async (data) => {
    const callResponse = await axios({
      url: endpoints.DeleteCategoryApi,
      method: "delete",
      headers: getHeaders(),
      data,
    })
      .then((response) => response.data)
      .catch((err) => ({status:0,response:err.response,code:err.response.status}));
  
    return callResponse;
  };

  export const updateCategoryApi = async (data) => {
    const callResponse = await axios({
      url: endpoints.UpdateCategoryApi,
      method: "patch",
      headers: getHeaders(),
      data,
    })
      .then((response) => response.data)
      .catch((err) => ({status:0,response:err.response,code:err.response.status}));
  
    return callResponse;
  };


  export const fetchCategoryByIdApi = async params => {
    const callResponse = await axios({
      url: endpoints.FetchCategoryByIdApi,
      method: "get",
      headers: getHeaders(),
      params,
    })
      .then(response => response.data)
      .catch(err => err.response.data);
  
    return callResponse;
  };