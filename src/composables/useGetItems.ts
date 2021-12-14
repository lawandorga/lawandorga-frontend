import { DjangoModel, Reffed } from "@/types/shared";
import { Ref, onMounted, watch, unref } from "vue";

export default function useGetItems<
  Fn extends (...args: any[]) => Promise<DjangoModel[]>, // eslint-disable-line
>(
  getItemsFunction: Fn,
  items: Ref<DjangoModel[] | null>,
  ...params: Reffed<Parameters<Fn>>
) {
  const getItems = () => {
    getItemsFunction(...params.map(unref)).then(
      (newItems) => (items.value = newItems),
    );
  };

  watch(params, getItems);
  if (params.length === 0) onMounted(getItems);
}
