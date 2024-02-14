import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Toast from "./toast";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TeamMemberModal from "./teamMemberModal";

const SearchEmployeeModal = ({
  modalHeading,
  employees,
  teams,
  setEmployees,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterEmployees, setFilterEmployees] = useState([]);

  useEffect(() => {
    setFilterEmployees(employees);
  }, []);

  useEffect(() => {
    setFilterEmployees((currEmployees) => {
      return employees.filter((currEmp) => {
        return (
          currEmp.name.toLowerCase().includes(name.toLowerCase()) &&
          currEmp.phoneNumber.includes(phoneNumber) &&
          currEmp.emailID.toLowerCase().includes(email.toLowerCase())
        );
      });
    });
  }, [name, email, phoneNumber]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "#1E293B",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-[#475569] border text-white px-4 py-2 rounded-lg"
        onClick={handleOpen}
      >
        {modalHeading}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-white text-lg font-bold text-center mb-4">
            Search Employees
          </h2>
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex gap-2 bg-white border border-black p-2">
              <SearchOutlinedIcon />
              <input
                className="w-full outline-none"
                placeholder="search employee by name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </div>
            <div className="flex gap-2 bg-white border border-black p-2">
              <SearchOutlinedIcon />
              <input
                className="w-full outline-none"
                placeholder="search employee by email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
            </div>
            <div className="flex gap-2 bg-white border border-black p-2">
              <SearchOutlinedIcon />
              <input
                className="w-full outline-none"
                placeholder="search employee by phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                type="number"
              />
            </div>
          </div>
          <div>
            <div className="text-white text-xxs">Results</div>
            <div className="flex flex-col gap-2">
              {filterEmployees.map((employee, idx) => {
                return (
                  <TeamMemberModal
                    employee={employee}
                    teams={teams}
                    setEmployees={setEmployees}
                    key={idx}
                  />
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchEmployeeModal;
