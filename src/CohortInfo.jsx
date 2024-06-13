import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CohortInfo({ cohortId, setCurrentSprint }) {
  const {
    data: cohortInfo,
    isSuccess,
    error,
  } = useQuery({
    queryKey: [cohortId],
    queryFn: () =>
      axios.get(
        `https://coursey-gpt-backend.herokuapp.com/nextgen/cohorts/getCohortInfo/${cohortId}/`
      ),
  });

  const lastFinishedSprint = isSuccess
    ? cohortInfo?.data?.cohortInfo.filter((s) => s.is_done)[0]
    : null;

  isSuccess && setCurrentSprint(lastFinishedSprint?.sprint_order);

  return (
    <div className="border-y border-black/10 p-2 text-sm">
      <h2 className="font-bold">Cohort Bilgisi</h2>
      <div>Güncel Cohort: {lastFinishedSprint?.sprint_order}</div>
      <div>Güncel Eğitmen: {lastFinishedSprint?.instructor}</div>
    </div>
  );
}
