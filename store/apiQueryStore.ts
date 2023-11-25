import { create } from "zustand";

type Query = {
  orderBy: "asc" | "desc";
  setOrderBy: (value: "asc" | "desc") => void;
};

const useApiQueryStore = create<Query>()((set) => ({
  orderBy: "desc",
  setOrderBy: (value) => set(() => ({ orderBy: value })),
}));

export default useApiQueryStore;
