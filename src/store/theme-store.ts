import { create } from "zustand";

type themeStore = {
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
};

const useThemeStore = create<themeStore>((set) => ({
  isDark: true,
  onThemeChange: (isDark: boolean) => set({ isDark }),
}));

const themeSelector = (state: themeStore) => ({
  isDark: state.isDark,
  onThemeChange: state.onThemeChange,
});

export { themeSelector, useThemeStore };
