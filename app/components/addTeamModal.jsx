import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Toast from "./toast";
const AddTeamModal = ({ modalHeading, teams, setTeams, departments }) => {
  const [currDept, setCurrDept] = useState(-1);
  const [teamID, setTeamID] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: ,
    bgcolor: "#475569",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrDept(-1);
    setTeamID("");
    setTeamName("");
    setTeamLeader("");
    setOpen(false);
  };

  const handleAddTeam = () => {
    if (currDept === -1 || teamID === "" || teamName === "") {
      return;
    }
    setTeams((curr) => {
      return [
        ...curr,
        {
          teamID: Number(teamID),
          teamName,
          departmentID: Number(currDept),
          teamLeaderID: teamLeader,
        },
      ];
    });

    handleClose();
  };

  const notUnique = () => {
    return (
      teams.filter(
        (team) =>
          team.teamID === Number(teamID) ||
          team.teamName.toUpperCase() === teamName.toUpperCase()
      )?.length > 0
    );
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
            Create Team
          </h2>
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
              />
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Team Name
              </label>
              <input
                type="text"
                className="rounded-md px-2"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-3">
              <label for="team name" className="text-white">
                Department
              </label>
              <select
                value={currDept}
                onChange={(e) => {
                  setCurrDept(e.target.value);
                }}
                className="w-full px-2 rounded-md"
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
            {currDept === -1 || teamID === "" || teamName === "" ? (
              <Toast
                message="please enter all the values"
                buttonText="Add Team"
              />
            ) : notUnique() ? (
              <Toast
                message="no two teams can have same id numbers or names"
                buttonText="Add Team"
              />
            ) : (
              <button
                className="text-sm bg-black text-white rounded-lg p-2"
                onClick={() => {
                  handleAddTeam();
                }}
              >
                Add Team
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTeamModal;
