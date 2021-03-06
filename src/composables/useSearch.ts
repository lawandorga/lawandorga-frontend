import { Record } from "@/types/records";
import { ref } from "vue";

export default function useSearch() {
  const search = ref("");

  const filterRecord =
    (search2: string) =>
    (record: Record): boolean => {
      const filter = search2.toLowerCase();
      let ret = false;
      for (const key in record.entries) {
        const entry = record.entries[key];
        if (Array.isArray(entry.value))
          ret =
            ret ||
            entry.value
              .map((i) => (i + "").toLowerCase())
              .some((name: string) => name.includes(filter));
        else ret = ret || (entry.value + "").toLowerCase().includes(filter);
      }
      return ret;
    };
  return {
    search,
    filterRecord,
  };
}
