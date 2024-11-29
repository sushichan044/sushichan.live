import { useCallback, useMemo, useSyncExternalStore } from "react";

type UseMediaQuery = (mediaQuery: string, initialState?: boolean) => boolean;

const useMediaQuery: UseMediaQuery = (mediaQuery, initialState) => {
  initialState ??= false;

  const mediaQueryList = useMemo(
    () =>
      typeof window === "undefined" ? undefined : window.matchMedia(mediaQuery),
    [mediaQuery],
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      mediaQueryList?.addEventListener("change", onStoreChange);
      return () => mediaQueryList?.removeEventListener("change", onStoreChange);
    },
    [mediaQueryList],
  );

  return useSyncExternalStore(
    subscribe,
    () => mediaQueryList?.matches ?? initialState,
    () => initialState,
  );
};

export { useMediaQuery };
