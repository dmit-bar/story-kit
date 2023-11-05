import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { Flow } from "@components/Flow";
import "reactflow/dist/style.css";
import "./index.css";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const { isDark } = useThemeStore();

  return (
    <Theme
      appearance={isDark ? "dark" : "light"}
      className={isDark ? "dark" : "light"}
      accentColor="green"
      grayColor="mauve"
      panelBackground="solid"
      scaling="100%"
      radius="small"
    >
      <Flow />
    </Theme>
  );
}
