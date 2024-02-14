import React, { use, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Toast from "./toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "#1E293B",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddEmployeeModal = ({
  employeeHeading,
  departments,
  teams,
  setEmployees,
  employees,
}) => {
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailID, setEmailID] = useState("");
  const [teamID, setTeamID] = useState("");
  const [departmentID, setDepartmentID] = useState(1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEmployeeID("");
    setEmployeeName("");
    setPhoneNumber("");
    setEmailID("");
    setTeamID("");
    setDepartmentID(-1);
    setOpen(false);
  };
  const handleAddTeam = () => {
    setEmployees((emp) => {
      return [
        ...emp,
        {
          employeeID: Number(employeeID),
          name: employeeName,
          phoneNumber,
          emailID,
          teamID: Number(teamID),
        },
      ];
    });
    handleClose();
  };

  const notUnique = () => {
    return (
      employees.filter((emp) => emp.employeeID === Number(employeeID))?.length >
      0
    );
  };

  return (
    <div>
      <button
        className="bg-[#1E293B] border text-white px-4 py-2 rounded-lg"
        onClick={handleOpen}
      >
        {employeeHeading}
      </button>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-white text-lg font-bold text-center mb-4">
            Create Employee
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Employee Id
              </label>
              <input
                type="number"
                className="rounded-md"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Employee Name
              </label>
              <input
                type="text"
                className="rounded-md"
                value={employeeName}
                onChange={(e) => {
                  setEmployeeName(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Phone No
              </label>
              <input
                type="number"
                className="rounded-md"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Email
              </label>
              <input
                type="email"
                className="rounded-md"
                value={emailID}
                onChange={(e) => {
                  setEmailID(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Department
              </label>
              <select
                value={departmentID}
                onChange={(e) => {
                  setDepartmentID(e.target.value);
                }}
                className="w-full rounded-md"
              >
                <option value={-1} key={-1}>
                  Select Department
                </option>
                {departments.map((department, idx) => {
                  return (
                    <option value={Number(idx + 1)} key={idx}>
                      {department.departmentName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Team
              </label>
              <select
                value={teamID}
                onChange={(e) => {
                  setTeamID(e.target.value);
                }}
                className="w-full rounded-md"
              >
                <option value={-1} key={-1}>
                  Select Team
                </option>
                {teams
                  ?.filter((team) => team.departmentID === Number(departmentID))
                  .map((team, idx) => {
                    return (
                      <option value={team.teamID} key={idx}>
                        {team.teamName}
                      </option>
                    );
                  })}
              </select>
            </div>

            {employeeID === "" ||
            employeeName === "" ||
            phoneNumber === "" ||
            emailID === "" ||
            departmentID === "" ||
            teamID === "" ? (
              <Toast
                message="please enter all the values"
                buttonText="Add Employee"
              />
            ) : notUnique() ? (
              <Toast
                message="no two employees can have same id numbers"
                buttonText="Add Team"
              />
            ) : (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => {
                  handleAddTeam();
                }}
              >
                Add Employee
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEmployeeModal;
