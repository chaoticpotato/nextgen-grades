import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { javaCohortNames, persons } from "./persons";

export default function CohortPersons({ cohortName, selectedPerson, selectPerson }) {

  const isJava = javaCohortNames.includes(cohortName);

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
        "division": "FSWEB" + cohortName.toUpperCase()
      }
      ),
    queryKey: [cohortName],
    enabled: !!cohortName && !isJava
  });

  let source = null;


  console.log(isJava, javaCohortNames, cohortName)
  if (isJava) {
    source = persons[cohortName]
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