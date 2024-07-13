import { useMediaQuery } from "@/hooks/useMediaQuery";

type ClientTheme = "dark" | "light";
type UseClientTheme = () => { theme: ClientTheme };

const useClientTheme: UseClientTheme = () => {
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  return { theme: isDark ? "dark" : "light" };
};

export default useClientTheme;
