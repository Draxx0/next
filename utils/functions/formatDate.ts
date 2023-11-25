import moment from "moment";
import "moment/locale/fr";

export const formatDate = (
  date: string | null,
  format: "long" | "short" = "long"
): string => {
  if (!date) return "";
  moment.locale("fr");

  if (format === "short") {
    return moment(new Date(date)).format("DD/MM/YYYY");
  }

  const formattedDate = moment(new Date(date)).format(
    "dddd D MMMM YYYY [à] HH[h]mm"
  );
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
