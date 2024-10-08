import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { javaCohortNames, persons } from "./persons";

export default function CohortPersons({ cohortName, selectedPerson, selectPerson }) {

  let cohortNameFixed = cohortName;
  if (cohortName === "0324-0424") {
    cohortNameFixed = "0424";
  }

  const isFromFile = javaCohortNames.includes(cohortName);

  const {
    data,
    isSuccess,
    error,
  } = useQuery({
    queryFn: async () => await
      axios.post(
        "https://coursey-gpt-backend.herokuapp.com/nextgen/cohorts/journeyUsers", {
        "email": "admin@workintech.com.tr",
        "password": process.env.REACT_APP_JP,
        "division": "FSWEB" + cohortNameFixed.toUpperCase()
      }
      ),
    queryKey: ["fsweb" + cohortNameFixed],
    enabled: !!cohortNameFixed && !isFromFile
  });

  let source = null;

  if (isFromFile) {
    source = persons[cohortNameFixed]
    console.log(source)
  } else {
    source = data?.data?.users
  }




  return source ?
    source.map((p) => (
      <div
        key={p.id}
        className={`${p.id === selectedPerson?.id ? "text-blue-500 font-bold" : ""
          } hover:text-purple-800 cursor-pointer`}
        onClick={() => selectPerson(p)}
      >
        {p.id} - {p.name}
      </div>
    ))
    : "yükleniyor"

}