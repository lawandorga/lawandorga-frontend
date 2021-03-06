import { DjangoModel } from "@/types/shared";
import { Ref, watch, unref, computed, isRef } from "vue";

type Nullable<T> = T extends (infer U)[] ? Array<U | Ref<U | null>> : null;

function useGet<
  Fn extends (...args: any[]) => Promise<DjangoModel | DjangoModel[]>, // eslint-disable-line
>(
  getFunc: Fn,
  obj: Ref<DjangoModel | DjangoModel[] | null>,
  ...params: Nullable<Parameters<Fn>>
) {
  const getRequest = () => {
    getFunc(...params.map(unref)).then((newItem) => (obj.value = newItem));
  };

  const refParams = computed(() => {
    return params.filter((p) => isRef(p));
  });

  watch(refParams.value, getRequest);

  if (refParams.value.length === 0) getRequest();
}

export default useGet;
