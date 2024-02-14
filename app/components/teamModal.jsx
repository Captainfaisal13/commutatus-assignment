import React, { useEffect, useState } from "react";
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
  minWidth: 400,
  bgcolor: "#475569",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TeamModal = ({
  teamName,
  team,
  teams,
  setTeams,
  employees,
  setEmployees,
}) => {
  const [updateInfo, setUpdateInfo] = useState(false);
  const [teamID, setTeamID] = useState(team.teamID);
  const [currTeamName, setCurrTeamName] = useState(team.teamName);
  const [changeLeader, setChangeLeader] = useState(false);
  const [leader, setLeader] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUpdateInfo(false);
    setChangeLeader(false);
    setLeader(-1);
    setOpen(false);
  };

  const notUnique = () => {
    return (
      teams.filter(
        (team) => team.teamName.toUpperCase() === currTeamName.toUpperCase()
      )?.length > 0
    );
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="hover:underline hover:underline-offset-2 cursor-pointer text-white text-sm sm:text-base"
      >
        {teamName}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {updateInfo && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <label for="team name" className="text-white">
                  Team Id
                </label>
                <input
                  type="number"
                  className="rounded-md px-2"
                  value={teamID}
                  onChange={(e) => {
                    setTeamID(e.target.value);
                  }}
                  disabled
                />
              </div>
              <div className="flex gap-3">
                <label for="team name" className="text-white">
                  Team Name
                </label>
                <input
                  type="text"
                  className="rounded-md px-2"
                  value={currTeamName}
                  onChange={(e) => {
                    setCurrTeamName(e.target.value);
                  }}
                />
              </div>
              {currTeamName === "" ? (
                <Toast
                  message="please enter all the values"
                  buttonText="Update Team Information"
                />
              ) : notUnique() ? (
                <Toast
                  message="no two teams can have same id numbers or names"
                  buttonText="Update Team Information"
                />
              ) : (
                <button
                  className="text-sm bg-black text-white rounded-lg p-2"
                  onClick={() => {
                    //   handleAddTeam();
                    setTeams((tms) => {
                      return tms.map((tm) => {
                        if (tm.teamID === team.teamID) {
                          return { ...tm, teamName: currTeamName };
                        }
                        return tm;
                      });
                    });
                    handleClose();
                  }}
                >
                  Update Team Information
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-white">
              <h4>Team ID:</h4>
              <h4>{team.teamID}</h4>
            </div>
            <div className="flex gap-2 text-white">
              <h4>Team Name:</h4>
              <h4>{team.teamName}</h4>
            </div>
            <div className="flex gap-2 text-white">
              <h4>Department:</h4>
              <h4>{team.departmentID}</h4>
            </div>
            {team.teamLeaderID && (
              <div className="flex gap-2 text-white">
                <h4>Team Leader:</h4>
                <h4>{team.teamLeaderID}</h4>
              </div>
            )}
            {(!team.teamLeaderID || changeLeader) && (
              <div>
                {!team.teamLeaderID && (
                  <h2 className="text-white">No team leader selected</h2>
                )}
                <div className="flex gap-3">
                  <label for="team name" className="text-white">
                    Select Team Leader
                  </label>
                  <select
                    value={leader}
                    onChange={(e) => {
                      setLeader(e.target.value);
                    }}
                  >
                    <option value={-1}>Select</option>
                    {employees
                      .filter((employee) => {
                        return employee.teamID === team.teamID;
                      })
                      .map((employee, idx) => {
                        return (
                          <option value={employee.employeeID} key={idx}>
                            {employee.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            )}
            {(!team.teamLeaderID || changeLeader) && (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => {
                  setTeams((teams) => {
                    return teams.map((tm) => {
                      if (tm.teamID === team.teamID) {
                        return { ...tm, teamLeaderID: Number(leader) };
                      }
                      return tm;
                    });
                  });
                  handleClose();
                }}
              >
                Make Leader
              </button>
            )}
            {team.teamLeaderID && !changeLeader ? (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setChangeLeader(!changeLeader)}
              >
                Change Leader ?
              </button>
            ) : (
              team.teamLeaderID && (
                <button
                  className="text-sm bg-black text-white rounded-lg p-2"
                  onClick={() => setChangeLeader(!changeLeader)}
                >
                  Cancel Change Leader ?
                </button>
              )
            )}
            {!updateInfo ? (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setUpdateInfo(!updateInfo)}
              >
                Update Team Information ?
              </button>
            ) : (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => setUpdateInfo(!updateInfo)}
              >
                Cancel Team Information
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TeamModal;
