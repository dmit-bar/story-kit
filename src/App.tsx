import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "reactflow/dist/style.css";
import { Flow } from "./flow/Flow";
import "./index.css";
import { useThemeStore } from "./store/theme-store";

export default function App() {
  const { isDark } = useThemeStore();

  return (
    <Theme
      appearance={isDark ? "dark" : "light"}
      className={isDark ? "dark" : "light"}
    >
      <Flow />
    </Theme>
  );
}
