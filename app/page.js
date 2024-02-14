"use client";

import { useEffect, useState } from "react";
import AddTeamModal from "./components/addTeamModal";
import AddEmployeeModal from "./components/addEmployeeModal";
import TeamModal from "./components/teamModal";
import TeamMemberModal from "./components/teamMemberModal";

const departments = [
  {
    departmentID: 1,
    departmentName: "HR",
  },
  {
    departmentID: 2,
    departmentName: "Engineering",
  },
  {
    departmentID: 3,
    departmentName: "Design",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitialEmployees = () => {
    if (global?.window !== undefined) {
      const temp = localStorage.getItem("employees");
      const savedEmployees = JSON.parse(temp);
      return savedEmployees || [];
    }
  };
  const getInitialTeams = () => {
    if (global?.window !== undefined) {
      const temp = localStorage.getItem("teams");
      const savedTeams = JSON.parse(temp);
      return savedTeams || [];
    }
  };

  const [employees, setEmployees] = useState(getInitialEmployees());

  const [teams, setTeams] = useState(getInitialTeams());

  useEffect(() => {
    // console.log("emp", employees);
    if (global?.window !== undefined) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);
  useEffect(() => {
    // console.log(teams);
    if (global?.window !== undefined) {
      localStorage.setItem("teams", JSON.stringify(teams));
    }
  }, [teams]);

  if (!mounted) return <></>;
  return (
    <main className="p-4">
      <ul className="p-4 bg-slate-300 text-white">
        <li>
          <h2>CEO</h2>
          <ul className="p-4  bg-slate-400 text-white">
            {departments.map((department, idx1) => {
              return (
                <li key={idx1}>
                  <h3>{department.departmentName}</h3>
                  <ul className="p-4 bg-slate-600 text-white">
                    {teams
                      ?.filter(
                        (team) => team.departmentID === department.departmentID
                      )
                      .map((team, idx2) => {
                        return (
                          <li key={idx2}>
                            {" "}
                            <h4 className="hover:underline hover:underline-offset-2 cursor-pointer">
                              <TeamModal
                                teamName={team.teamName}
                                team={team}
                                teams={teams}
                                setTeams={setTeams}
                                employees={employees}
                                setEmployees={setEmployees}
                              />
                            </h4>
                            <ul className="p-4 bg-slate-700  text-white">
                              {employees
                                .filter(
                                  (employee) => employee.teamID === team.teamID
                                )
                                .map((employee, idx3) => {
                                  return (
                                    <li key={idx3} className="flex gap-2">
                                      {/* <h5 className="hover:underline hover:underline-offset-2 cursor-pointer">
                                        {employee.name}
                                      </h5> */}
                                      <TeamMemberModal
                                        employee={employee}
                                        teams={teams}
                                        setEmployees={setEmployees}
                                      />
                                      {employee.employeeID ===
                                        team.teamLeaderID && (
                                        <h6 className="text-xxs py-1 px-2 bg-black rounded-md">
                                          Leader
                                        </h6>
                                      )}
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      <AddTeamModal
        modalHeading="Add Team"
        teams={teams}
        setTeams={setTeams}
        departments={departments}
      />
      <AddEmployeeModal
        employeeHeading="Add Employee"
        departments={departments}
        teams={teams}
        setEmployees={setEmployees}
      />
    </main>
  );
}
