import { useQuery } from "@tanstack/react-query";

export default function CohortInfo({ cohortId, setCurrentSprint }) {
  const { data: cohortInfo } = useQuery({
    queryKey: [cohortId],
    queryFn: () =>
      axios.get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/cohorts/getCohortInfo/${cohortId}/`
      ),
  });

  const lastFinishedSprint = cohortInfo?.data?.cohortInfo.filter(
    (s) => s.is_done
  )[0];

  console.log(lastFinishedSprint, "ömer", cohortInfo);
  return (
    <div className="border-y border-black/10 p-2 text-sm">
      <h2 className="font-bold">Cohort Bilgisi</h2>
      <div>Güncel Cohort: {lastFinishedSprint?.sprint}</div>
      <div>Güncel Eğitmen: {lastFinishedSprint?.instructor}</div>
    </div>
  );
}
