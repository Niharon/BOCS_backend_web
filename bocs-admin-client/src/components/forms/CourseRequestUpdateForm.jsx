import React from "react";
import { Box } from "@mui/material";

const CourseRequestUpdateForm = () => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          px: "1rem",
        }}
      >
        <form>
          <div className="block w-full  md:gap-5 md:flex">
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">User</label>
              <input type="text" value={"Abc"} disabled/>
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">Payment Status</label>
              <input type="text" value={"Pending"} disabled/>
            </div>
            <div className="mb-2 w-full">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Status
                <span className="text-meta-1">*</span>
              </label>
              <select
                required
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-6 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">Status</option>
                <option value="">Pending</option>
                <option value="">cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button type="submit" className="rounded bg-success p-2 px-5 font-medium text-gray">Update</button> :
          </div>
        </form>
      </Box>
    </>
  );
};

export default CourseRequestUpdateForm;
