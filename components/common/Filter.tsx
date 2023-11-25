"use client";
import useApiQueryStore from "@/store/apiQueryStore";
import { Button } from "../ui/button";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";

const Filter = () => {
  const { setOrderBy, orderBy } = useApiQueryStore();

  return (
    <div className="flex items-center gap-4 justify-end">
      <p className="text-muted-foreground">Trier par date :</p>
      <div className="flex items-center gap-3">
        <Button
          className="flex items-center gap-2"
          variant={orderBy === "asc" ? "default" : "outline"}
          onClick={() => setOrderBy("asc")}
        >
          <ArrowUpDown size={15} /> Les plus anciens
        </Button>
        <Button
          className="flex items-center gap-2"
          variant={orderBy === "desc" ? "default" : "outline"}
          onClick={() => setOrderBy("desc")}
        >
          <ArrowDownUp size={15} />
          Les plus récents
        </Button>
      </div>
    </div>
  );
};

export default Filter;
