import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { callApiAction } from "../../store/actions/commonAction"
import { closeModal, openModal } from "../../store/actions/modalAction"
import { findNameByRole } from "../../utils/main"
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material"
import { useMemo } from "react"
import { Delete, Edit} from "@mui/icons-material"
import MessageDilog from "../../components/MessageDilog"
import { SNACK_BAR_VARIANTS,} from "../../utils/constants"
import CreateUserController from "./CreateUserController"
import { deleteUserApi, getUserApi, } from "../../apis/user.api"
import { callSnackBar } from "../../store/actions/snackbarAction"

import { useCallback } from "react"
import UserListUi from "./UserListUi"

const ActionComponent = ({ params, setParams, filters, setFilters }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state)

    const onEdit = () => {
        dispatch(openModal(<CreateUserController id={params.id} callBack={(response, updatedData) => {
            setParams({ ...params, ...updatedData })
        }} />, "sm"))
    }

    const deleteFun = async (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(callApiAction(
            async () => await deleteUserApi({ id: params.id }),
            (response) => {
                setParams({})
                setLoading(false)
                dispatch(callSnackBar(params.name + "Deleted Successfully", SNACK_BAR_VARIANTS.success))
                
            },
            (err) => {
                setLoading(false)
            }
        ))
        dispatch(closeModal())


    }

    const onDelete = (e) => {

        dispatch(openModal(<MessageDilog onSubmit={deleteFun} title="Alert!" message={`Are you sure to delete "${params.name || params.title}" ?`} />, "sm"))
    }
    
   
    return <Box sx={{ width: "100%", alignItems: "flex-start", display: "flex" }}>
        
        {<IconButton disabled={loading} size="inherit" onClick={onEdit}>
            <Edit color="info" fontSize="inherit" />
        </IconButton>}
       
       
            {loading && <CircularProgress color="primary" fontSize="inherit" />}
            {!loading && <IconButton disabled={loading} size="inherit" onClick={onDelete}>
                <Delete color="error" fontSize="inherit" />
            </IconButton>}
        
    </Box>
}

const UserListController = () => {
    const dispatch = useDispatch()



    const title = "Users"
    const fetchApi = getUserApi
    const deleteApi = deleteUserApi
    const [filters, setFilters] = useState({
        pageNo: 1,
        pageSize: 10,
        searchable: ['name', "email"],
        search: '',
        role: '',
        sort: '',
        sortDirection: -1,
        deleted: null

    })

    const columns = useMemo(() => {
        const arr = [
            { id: 1, fieldName: 'name', label: 'Name', align: "left", sort: true },
            { id: 2, fieldName: 'email', label: 'Email', align: "left", sort: true },
            { id: 3, fieldName: 'status', label: 'Status', align: "left", sort: true },
            {
                id: 5,
                fieldName: 'action',
                label: 'Action',
                align: "right",
                renderValue: (params, setParams) => <ActionComponent key={Math.random()}
                    deleteApi={deleteApi}
                    params={params} setParams={setParams} filters={filters} setFilters={setFilters} />,
            }
        ];
        return arr;
    }, [filters]);


    const [loading, setLoading] = useState(false)
    const [list, setList] = useState({})

    const fetchList = useCallback(() => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await fetchApi({ ...filters }),
            (response) => {
                setList(response)
                setLoading(false)
            },
            (err) => {
                setLoading(false)
            }
        ))
    }, [dispatch, filters, fetchApi])


    
    const onCreateBtnClick = () => {
        dispatch(openModal(<CreateUserController callBack={async () => { fetchList() }} />, "sm"))
    }



    useEffect(() => {
        fetchList()
    }, [filters, fetchList])


    return (
        <>
            <UserListUi
                title={title}
                onCreateBtnClick={onCreateBtnClick}
                filters={filters}
                setFilters={setFilters}
                loading={loading}
                list={list}
                columns={columns}


            />

        </>
    )
}
export default UserListController
