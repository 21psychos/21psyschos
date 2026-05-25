type Theme = "light" | "red" | "prowel" | "green" | "beige";

class ThemeStore {
  theme = $state<Theme>("light");

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      this.theme = stored || "light";
      this.applyTheme();
    }
  }

  toggle() {
    if (this.theme === "light") {
      this.theme = "red";
    } else if (this.theme === "red") {
      this.theme = "prowel";
    } else if (this.theme === "prowel") {
      this.theme = "green";
    } else if (this.theme === "green") {
      this.theme = "beige";
    } else {
      this.theme = "light";
    }
    this.applyTheme();
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", this.theme);
    }
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    this.applyTheme();
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", this.theme);
    }
  }

  private applyTheme() {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "red", "prowel", "green", "beige");
      document.documentElement.classList.add(this.theme);
    }
  }


}

export const themeStore = new ThemeStore();
