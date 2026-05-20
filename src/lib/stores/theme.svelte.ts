type Theme = 'light' | 'red' | 'neon';

class ThemeStore {
	theme = $state<Theme>('light');

	constructor() {
		// Initialize theme from localStorage or system preference
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('theme') as Theme | null;
			this.theme = stored || 'light';
			this.applyTheme();
		}
	}

	toggle() {
		// Cycle through themes: light -> red -> neon -> light
		if (this.theme === 'light') {
			this.theme = 'red';
		} else if (this.theme === 'red') {
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
			document.documentElement.classList.remove('light', 'red', 'neon');
			document.documentElement.classList.add(this.theme);
			this.updateThemeColor();
		}
	}

	private updateThemeColor() {
		if (typeof document === 'undefined') return;

		const colors: Record<Theme, string> = {
			light: '#44ACFF',
			red: '#D92243',
			neon: '#1a0533',
		};

		let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
		if (!meta) {
			meta = document.createElement('meta');
			meta.name = 'theme-color';
			document.head.appendChild(meta);
		}
		meta.content = colors[this.theme];
	}
}

export const themeStore = new ThemeStore();
