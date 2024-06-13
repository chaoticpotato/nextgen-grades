import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);

  const day = dateObj.getUTCDate();
  const monthIndex = dateObj.getUTCMonth();
  const year = dateObj.getUTCFullYear();

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  return `${day} ${months[monthIndex]} ${year}`;
};

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

  const pDate = isSuccess
    ? formatDate(lastFinishedSprint?.planning_date)
    : null;

  return (
    <div className="border-y border-black/10 py-2 px-3 text-sm">
      <h2 className="font-bold">Cohort Bilgisi</h2>
      <div>
        Güncel Cohort:{" "}
        <span className="font-bold">
          {lastFinishedSprint?.sprint_order} - {pDate}
        </span>
      </div>
      <div>
        Güncel Eğitmen:{" "}
        <span className="font-bold">{lastFinishedSprint?.instructor}</span>
      </div>
    </div>
  );
}
