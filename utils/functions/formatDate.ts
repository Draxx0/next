import moment from "moment";

export const formatDate = (date: string | null): string => {
  if (!date) return "";
  return moment(new Date(date)).format("DD/MM/YYYY");
};
