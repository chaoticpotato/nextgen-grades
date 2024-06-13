import React, { useState } from "react";
import { persons, cohortIds } from "./persons";
import Grades from "./Grades";
import CohortInfo from "./CohortInfo";

function App() {
  const [cohortName, setCohortName] = useState("1123");
  const [person, setPerson] = useState(null);

  const [curSprint, setCurSprint] = useState(20);

  const cohortId = cohortIds[cohortName];
  const cohortPeople = persons[cohortName];

  return (
    <div className="h-screen w-full flex">
      <aside className="w-72 flex flex-col overflow-hidden shrink-0">
        <nav className="flex-[0]">
          <div className="flex flex-wrap gap-2 p-3 pb-5 items-start ">
            {Object.keys(cohortIds).map((c) => (
              <div
                className={`p-1.5 px-2.5 text-sm rounded-lg bg-purple-400 text-center cursor-pointer ring-[3px] font-medium text-purple-800 ${
                  c === cohortName ? "ring-purple-700" : "ring-transparent"
                }`}
                onClick={() => setCohortName(c)}
                key={c}
              >
                {c}
              </div>
            ))}
          </div>
        </nav>

        <CohortInfo cohortId={cohortId} setCurrentSprint={setCurSprint} />

        <div className="flex-1 overflow-auto text-sm p-3">
          {cohortPeople.map((p) => (
            <div
              key={p.id}
              className={`${
                p.id === person?.id ? "text-blue-500 font-bold" : ""
              } hover:text-purple-800 cursor-pointer`}
              onClick={() => setPerson(p)}
            >
              {p.id} - {p.name}
            </div>
          ))}
        </div>
      </aside>
      <div className="flex-[3] border-l border-black/10 overflow-hidden">
        {person && (
          <Grades person={person} cohortId={cohortId} currentSprint={5} />
        )}
      </div>
    </div>
  );
}

export default App;
