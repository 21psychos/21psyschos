type Theme = 'light' | 'dark' | 'neon';

class ThemeStore {
	theme = $state<Theme>('light');

	constructor() {
		// Initialize theme from localStorage or system preference
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('theme') as Theme | null;
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.theme = stored || (prefersDark ? 'dark' : 'light');
			this.applyTheme();
		}
	}

	toggle() {
		// Cycle through themes: light -> dark -> neon -> light
		if (this.theme === 'light') {
			this.theme = 'dark';
		} else if (this.theme === 'dark') {
			this.theme = 'neon';
		} else {
			this.theme = 'light';
		}
		this.applyTheme();
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', this.theme);
		}
	}

	setTheme(theme: Theme) {
		this.theme = theme;
		this.applyTheme();
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', this.theme);
		}
	}

	private applyTheme() {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.remove('light', 'dark', 'neon');
			document.documentElement.classList.add(this.theme);
		}
	}
}

export const themeStore = new ThemeStore();
