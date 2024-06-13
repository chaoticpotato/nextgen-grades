import React, { useState, useEffect } from "react";
import axios from "axios";
import PracticeChart from "./PracticeChart";
import ProjectChartNew from "./ProjectChartNew";
import { javaCohorts } from "./persons";

export default function Grades({ person, cohortId, currentSprint }) {
  const [practiceData, setPracticeData] = useState(null);

  useEffect(() => {
    setPracticeData(null);
    axios
      .get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/userQuestion/getUserQuestionAnswerAvg/${person.id}/${cohortId}`
      )
      .then((s) => {
        setPracticeData(s.data.questionAnswerAvg);
      })
      .catch((err) => console.log(err));
  }, [person.id]);

  return (
    <div className="py-6 px-5 flex flex-col gap-4 overflow-auto h-full">
      <h1 className="text-xl font-bold sticky left-0">{person.name}</h1>
      {practiceData && <PracticeChart data={practiceData} />}
      <ProjectChartNew
        userId={person.id}
        currentSprint={currentSprint}
        isJava={javaCohorts.includes(cohortId)}
      />
    </div>
  );
}
