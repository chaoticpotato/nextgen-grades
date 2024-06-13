import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PracticeChart from './PracticeChart';
import ProjectChart from './ProjectChart';
import ProjectChartNew from './ProjectChartNew';

export default function Grades({ person, cohortId }) {
  const [practiceData, setPracticeData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [projectDataNew, setProjectDataNew] = useState(null);

  useEffect(() => {
    setPracticeData(null);
    setProjectData(null);
    setProjectDataNew(null);
    axios
      .get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/userQuestion/getUserQuestionAnswerAvg/${person.id}/${cohortId}`
      )
      .then((s) => {
        setPracticeData(s.data.questionAnswerAvg);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/taskLog/getUserTaskAvg/${person.id}/${cohortId}`
      )
      .then((s) => {
        setProjectData(s.data.taskLogs);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/taskLog/getUserTaskAvgNew/${person.id}/`
      )
      .then((s) => {
        setProjectDataNew(s.data.taskLogs);
      })
      .catch((err) => console.log(err));
  }, [person.id]);

  return (
    <div className="py-6 px-5 flex flex-col gap-4 overflow-auto">
      <h1 className="text-xl font-bold sticky left-0">{person.name}</h1>
      {practiceData && <PracticeChart data={practiceData} />}
      {projectData && <ProjectChart data={projectData} />}
      {projectDataNew && <ProjectChartNew data={projectDataNew} />}
    </div>
  );
}
