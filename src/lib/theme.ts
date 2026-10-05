import type { ColorShades, ThemeConfig, ThemePreset } from '$lib/types';

export const THEME_PRESETS: ThemePreset[] = [
	{
		id: 'emerald',
		name: 'Hijau Pesantren (Emerald)',
		description: 'Nuansa hijau islami khas pesantren yang teduh, sejuk, dan berkah.',
		primaryHex: '#059669',
		shades: {
			50: '#ecfdf5',
			100: '#d1fae5',
			200: '#a7f3d0',
			300: '#6ee7b7',
			400: '#34d399',
			500: '#10b981',
			600: '#059669',
			700: '#047857',
			800: '#065f46',
			900: '#064e3b',
			950: '#022c22'
		}
	},
	{
		id: 'sapphire',
		name: 'Biru Edukasi (Royal Blue)',
		description: 'Karakter akademik modern, kredibel, dinamis, dan berwawasan luas.',
		primaryHex: '#2563eb',
		shades: {
			50: '#eff6ff',
			100: '#dbeafe',
			200: '#bfdbfe',
			300: '#93c5fd',
			400: '#60a5fa',
			500: '#3b82f6',
			600: '#2563eb',
			700: '#1d4ed8',
			800: '#1e40af',
			900: '#1e3a8a',
			950: '#172554'
		}
	},
	{
		id: 'teal',
		name: 'Teal Modern (Segar & Berenergi)',
		description: 'Perpaduan hijau dan biru yang seimbang, segar, dan berwibawa.',
		primaryHex: '#0d9488',
		shades: {
			50: '#f0fdfa',
			100: '#ccfbf1',
			200: '#99f6e4',
			300: '#5eead4',
			400: '#2dd4bf',
			500: '#14b8a6',
			600: '#0d9488',
			700: '#0f766e',
			800: '#115e59',
			900: '#134e4a',
			950: '#042f2e'
		}
	},
	{
		id: 'amber',
		name: 'Emas Keemasan (Amber Gold)',
		description: 'Aura prestasi unggul, mulia, prestisius, dan penuh kehangatan.',
		primaryHex: '#d97706',
		shades: {
			50: '#fffbeb',
			100: '#fef3c7',
			200: '#fde68a',
			300: '#fcd34d',
			400: '#fbbf24',
			500: '#f59e0b',
			600: '#d97706',
			700: '#b45309',
			800: '#92400e',
			900: '#78350f',
			950: '#451a03'
		}
	},
	{
		id: 'rose',
		name: 'Merah Marun (Rose Elegance)',
		description: 'Kesan berani, elegan, berdedikasi tinggi, dan sarat kehormatan.',
		primaryHex: '#e11d48',
		shades: {
			50: '#fff1f2',
			100: '#ffe4e6',
			200: '#fecdd3',
			300: '#fda4af',
			400: '#fb7185',
			500: '#f43f5e',
			600: '#e11d48',
			700: '#be123c',
			800: '#9f1239',
			900: '#881337',
			950: '#4c0519'
		}
	},
	{
		id: 'violet',
		name: 'Ungu Inovatif (Royal Violet)',
		description: 'Sentuhan teknologi, keilmuan tinggi, spiritual, dan inovasi masa depan.',
		primaryHex: '#7c3aed',
		shades: {
			50: '#f5f3ff',
			100: '#ede9fe',
			200: '#ddd6fe',
			300: '#c4b5fd',
			400: '#a78bfa',
			500: '#8b5cf6',
			600: '#7c3aed',
			700: '#6d28d9',
			800: '#5b21b6',
			900: '#4c1d95',
			950: '#2e1065'
		}
	}
];

export const defaultTheme: ThemeConfig = {
	preset: 'emerald',
	primaryName: THEME_PRESETS[0].name,
	primaryHex: THEME_PRESETS[0].primaryHex,
	primaryShades: THEME_PRESETS[0].shades,
	mode: 'light',
	radius: 'md'
};

/**
 * Mix two hex colors with a weight ratio
 */
function mixColors(color1: string, color2: string, weight: number): string {
	const c1 = parseHex(color1);
	const c2 = parseHex(color2);

	const w = Math.max(0, Math.min(1, weight));
	const r = Math.round(c1.r * w + c2.r * (1 - w));
	const g = Math.round(c1.g * w + c2.g * (1 - w));
	const b = Math.round(c1.b * w + c2.b * (1 - w));

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function parseHex(hex: string): { r: number; g: number; b: number } {
	let cleanHex = hex.replace('#', '').trim();
	if (cleanHex.length === 3) {
		cleanHex = cleanHex
			.split('')
			.map((c) => c + c)
			.join('');
	}
	if (cleanHex.length !== 6) {
		return { r: 5, g: 150, b: 105 }; // fallback emerald
	}
	const num = parseInt(cleanHex, 16);
	return {
		r: (num >> 16) & 255,
		g: (num >> 8) & 255,
		b: num & 255
	};
}

/**
 * Generate 50-950 Tailwind shades from a base hex color (treated as 600)
 */
export function generateShades(baseHex: string): ColorShades {
	const white = '#ffffff';
	const black = '#000000';

	return {
		50: mixColors(baseHex, white, 0.08),
		100: mixColors(baseHex, white, 0.18),
		200: mixColors(baseHex, white, 0.35),
		300: mixColors(baseHex, white, 0.55),
		400: mixColors(baseHex, white, 0.75),
		500: mixColors(baseHex, white, 0.90),
		600: baseHex,
		700: mixColors(baseHex, black, 0.82),
		800: mixColors(baseHex, black, 0.65),
		900: mixColors(baseHex, black, 0.48),
		950: mixColors(baseHex, black, 0.28)
	};
}

/**
 * Generate CSS variable injection string for :root
 */
export function generateCssVariables(theme?: ThemeConfig | null): string {
	const currentTheme = theme || defaultTheme;
	const shades = currentTheme.primaryShades || (
		THEME_PRESETS.find((p) => p.id === currentTheme.preset)?.shades || generateShades(currentTheme.primaryHex || '#059669')
	);

	return `
:root {
	--color-emerald-50: ${shades[50]};
	--color-emerald-100: ${shades[100]};
	--color-emerald-200: ${shades[200]};
	--color-emerald-300: ${shades[300]};
	--color-emerald-400: ${shades[400]};
	--color-emerald-500: ${shades[500]};
	--color-emerald-600: ${shades[600]};
	--color-emerald-700: ${shades[700]};
	--color-emerald-800: ${shades[800]};
	--color-emerald-900: ${shades[900]};
	--color-emerald-950: ${shades[950]};

	--theme-primary: ${shades[600]};
	--theme-primary-hover: ${shades[700]};
	--theme-primary-light: ${shades[50]};
}
`.trim();
}
