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
          <div className="flex flex-col w-full  md:gap-5 md:flex">
            <div className="block md:gap-5 md:flex">
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Date</label>
                <input type="text" className="w-full pl-4" value={new Date().toDateString()} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Course Name</label>
                <input type="text" className="w-full pl-4" value={"JavaScript"} disabled />
              </div>
            </div>
            <div className="block md:gap-5 md:flex">
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">User Name</label>
                <input type="text" className="w-full pl-4" value={"Abc Abc"} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">User Number</label>
                <input type="text" className="w-full pl-4" value={"01521347972"} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">User Email</label>
                <input type="email" className="w-full pl-4" value={"abc903@gmai.com"} disabled />
              </div>
            </div>
            <div className="block md:gap-5 md:flex">
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Payment Id</label>
                <input type="text" className="w-full pl-4" value={"01"} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Payment Method</label>
                <input type="text" className="w-full pl-4" value={"Bkash"} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Transacction Id</label>
                <input type="text" className="w-full pl-4" value={"xksltk10939xtn"} disabled />
              </div>
            </div>
            <div className="block md:gap-5 md:flex">
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Amount</label>
                <input type="text" className="w-full pl-4" value={"3500Tk"} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">Payment Status</label>
                <input type="text" className="w-full pl-4" value={"Pending"} disabled />
              </div>
              <div className="mb-2 w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Status
                  <span className="text-meta-1">*</span>
                </label>
                <select
                  required
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-6 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Status</option>
                  <option value="">Pending</option>
                  <option value="">Active</option>
                  <option value="">cancelled</option>
                </select>
              </div>
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
