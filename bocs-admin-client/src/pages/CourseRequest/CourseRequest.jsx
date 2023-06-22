import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getAllCourseRequestsApi } from "../../api/courseRequest";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: .2,


  },

  {
    field: 'name',
    headerName: 'User',
    minWidth: 180,
    flex: .3,
    valueGetter: (params) => {

      return `${params.row.user?.name || ''}`;
    },
  },
  {
    field: 'course',
    headerName: 'Course',
    minWidth: 200,
    flex: 2,
    valueGetter: (params) => {

      return `${params.row.course?.title || ''}`;
    },
  },


  {
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row: { status } }) => (
      <span className={`px-3 py-1 rounded-full text-sm capitalize ${status === 'pending' && 'bg-pending'} ${status === 'confirmed' && 'bg-confirmed'} ${status === 'cancelled' && 'bg-cancelled'} text-white`}>
        {status}
      </span>),
    flex: 1,
    minWidth: 150
  },
  {
    field: 'date',
    headerName: 'Date',

    flex: 1,
    minWidth: 120,
    valueGetter: ({ row: { created_at } }) => new Date(created_at).toLocaleString(),


  },

  {

    field: 'Action',
    renderCell: ({ id }) => (
      <div className="flex items-center space-x-3.5">
        <Link to={`/course-request/edit/${id}`} className="hover:text-[green]">
          <FaEdit />
        </Link>
        <button className="hover:text-danger">
          <FaTrash />
        </button>
      </div>
    )
  },
];

const CourseRequest = () => {


  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const [courseRequests, setCourseRequests] = useState([]);

  const { data, isLoading, isError, isFetching } = useQuery(
    {
      queryKey: ["courseRequests", page],
      queryFn: getAllCourseRequestsApi,
      onSuccess: (data) => {
        // console.log(data.data);
        setTotalRows(data.data.count)
        setCourseRequests(data.data.courseRequests);
      },
      onError: (error) => {
        // console.log(error);
        toast.error("Failed to load course requests");
      },

    }
  );

  const handlePageChange = (params) => {
    setPage(params.page);
  }


 
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Course Request" />
      <div style={{ height: "auto", width: '100%' }}>
        <DataGrid
          style={{ background: 'white', padding: '1rem' }}
          getRowId={(row) => row.id}
          rows={courseRequests}
          columns={columns}
          rowCount={totalRows}
          initialState={{
            pagination: {
              paginationModel: { page: page, pageSize: 10 },

            },
          }}

          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          pagination
          loading={isLoading || isFetching}
          pageSizeOptions={[10]}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
        />
      </div>
    </DefaultLayout>
  );
};

export default CourseRequest;
