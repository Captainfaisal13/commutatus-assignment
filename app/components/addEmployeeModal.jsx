import React, { use, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailID, setEmailID] = useState("");
  const [teamID, setTeamID] = useState("");
  const [departmentID, setDepartmentID] = useState(1);

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

    console.log(
      employeeID,
      employeeName,
      phoneNumber,
      emailID,
      teamID,
      departmentID,
      teams
    );
  };
  return (
    <div>
      <Button onClick={handleOpen}>{employeeHeading}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              >
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

            <button
              className="text-sm bg-black text-white rounded-lg p-2"
              onClick={() => {
                handleAddTeam();
              }}
            >
              Add team member
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEmployeeModal;
