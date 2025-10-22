
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'title': ['Montserrat', 'Bebas Neue', 'sans-serif'],
				'heading': ['Montserrat', 'Bebas Neue', 'sans-serif'],
				'body': ['Inter', 'Poppins', 'sans-serif'],
				'input': ['Inter', 'Poppins', 'sans-serif'],
			},
			fontSize: {
				'title': ['24px', '1.2'],
				'heading': ['18px', '1.3'],
				'body': ['14px', '1.5'],
				'input': ['18px', '1.4'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				poker: {
					table: 'hsl(var(--poker-table))',
					felt: 'hsl(var(--poker-felt))',
					premium: 'hsl(var(--poker-premium))',
					strong: 'hsl(var(--poker-strong))',
					situational: 'hsl(var(--poker-situational))',
					weak: 'hsl(var(--poker-weak))',
					fold: 'hsl(var(--poker-fold))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%)',
				'gradient-secondary': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
				'gradient-accent': 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
				'gradient-card': 'linear-gradient(135deg, #162e20 0%, #1a3a2a 100%)',
				'gradient-gold-border': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
				'gradient-orange-gold': 'linear-gradient(135deg, #ff6b35 0%, #d4af37 100%)',
			},
			boxShadow: {
				'neumorphism': '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05)',
				'neumorphism-inset': 'inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.05)',
				'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
				'glow-accent': '0 0 20px rgba(255, 107, 53, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
