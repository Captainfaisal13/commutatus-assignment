import React, { useEffect, useState } from "react";
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

const TeamMemberModal = ({ employee, teams, setEmployees }) => {
  const [updateInfo, setUpdateInfo] = useState(false);
  const [employeeID, setEmployeeID] = useState(employee.employeeID);
  const [employeeName, setEmployeeName] = useState(employee.name);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [emailID, setEmailID] = useState(employee.emailID);

  const [changeTeam, setChangeTeam] = useState(false);
  const [currDeptID, setCurrDeptID] = useState(-1);
  const [changeTeamID, setChangeTeamID] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUpdateInfo(false);
    setChangeTeam(false);
    setCurrDeptID(-1);
    setChangeTeamID(-1);

    setOpen(false);
  };

  useEffect(() => {
    setCurrDeptID(
      teams.find((team) => team.teamID === employee.teamID).departmentID
    );
  }, [changeTeam]);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="hover:underline hover:underline-offset-2 cursor-pointer text-white text-sm sm:text-base"
      >
        {employee.name}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <h2>Add Team Modal</h2> */}
          <div className="flex flex-col gap-2">
            {updateInfo && (
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
                    disabled
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

                <button
                  className="text-sm bg-black text-white rounded-lg p-2"
                  onClick={() => {
                    setEmployees((emps) => {
                      return emps.map((emp) => {
                        if (emp.employeeID === employee.employeeID) {
                          return {
                            ...emp,
                            phoneNumber,
                            emailID,
                            name: employeeName,
                          };
                        }
                        return emp;
                      });
                    });
                    setUpdateInfo(false);
                  }}
                >
                  Update Information
                </button>
              </div>
            )}

            <div className="flex gap-2 text-white">
              <h4>Employee ID:</h4>
              <h4>{employee.employeeID}</h4>
            </div>
            <div className="flex gap-2 text-white">
              <h4>Name:</h4>
              <h4>{employee.name}</h4>
            </div>
            <div className="flex gap-2 text-white">
              <h4>Email:</h4>
              <h4>{employee.emailID}</h4>
            </div>
            <div className="flex gap-2 text-white">
              <h4>Phone Number:</h4>
              <h4>{employee.phoneNumber}</h4>
            </div>
            <div className="flex gap-2 text-white">
              <h4>Team ID:</h4>
              <h4>{employee.teamID}</h4>
            </div>
            {changeTeam && (
              <div className="flex gap-3">
                <label for="team name" className="text-white">
                  Select Team
                </label>
                <select
                  value={changeTeamID}
                  onChange={(e) => {
                    setChangeTeamID(e.target.value);
                  }}
                >
                  <option value={-1}>Select</option>
                  {teams
                    .filter((team) => {
                      return (
                        employee.teamID !== team.teamID &&
                        team.departmentID === currDeptID
                      );
                    })
                    .map((team, idx) => {
                      return (
                        <option value={team.teamID} key={idx}>
                          {team.teamName}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}
            {!changeTeam ? (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setChangeTeam(!changeTeam)}
              >
                Change Team ?
              </button>
            ) : (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => {
                  if (changeTeamID === -1) {
                    return;
                  }
                  setEmployees((emps) => {
                    return emps.map((emp) => {
                      if (emp.employeeID === employee.employeeID) {
                        return { ...emp, teamID: Number(changeTeamID) };
                      }
                      return emp;
                    });
                  });
                  handleClose();
                }}
              >
                Change Team
              </button>
            )}
            {changeTeam && (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setChangeTeam(!changeTeam)}
              >
                Cancel Change Team
              </button>
            )}
            {!updateInfo ? (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setUpdateInfo(!updateInfo)}
              >
                Update Information ?
              </button>
            ) : (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setUpdateInfo(!updateInfo)}
              >
                Cancel Update Information
              </button>
            )}
            <button
              className="text-sm bg-black text-white rounded-lg p-2"
              onClick={() => {
                setEmployees((emps) => {
                  return emps.filter((emp) => {
                    return emp.employeeID !== employee.employeeID;
                  });
                });
                handleClose();
              }}
            >
              Delete Employee
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TeamMemberModal;
