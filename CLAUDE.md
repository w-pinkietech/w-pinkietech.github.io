# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for PinkieTech株式会社, a Japanese company focused on bringing OSS and AI innovation to manufacturing industries. The website features a cyberpunk-themed terminal/CLI interface built with React and TypeScript.

## Key Commands

### Development
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (runs TypeScript build then Vite build)  
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Deployment
- `npm run predeploy` - Runs build automatically before deploy
- `npm run deploy` - Deploy to GitHub Pages using gh-pages

## Architecture

### Core Structure
- **Single Page Application**: Uses React Router with HashRouter for GitHub Pages compatibility
- **Terminal Interface**: Main UI is a CLI emulator (`CLIEmulator.tsx`) that handles all user interactions
- **Internationalization**: Supports 5 languages (Japanese, English, Chinese, Korean, Arabic) via react-i18next
- **Component Library**: Uses shadcn/ui components with Radix UI primitives and Tailwind CSS

### Key Components
- `CLIEmulator.tsx`: Core terminal interface with extensive command system (25K+ lines)
- `pages/`: React Router pages (Home, About, Services, etc.)
- `components/ui/`: shadcn/ui component library
- `i18n/`: Translation files and i18n configuration

### Styling & Design
- **Theme**: Cyberpunk terminal aesthetic with green/cyan colors on black background
- **Responsive**: Mobile-first design with different boot sequences for mobile/desktop
- **Typography**: Monospace fonts throughout for terminal feel

### Key Features
- Terminal commands: `help`, `about`, `services`, `contact`, `neofetch`, `clear`, `lang`, etc.
- Achievement system and mini-games within CLI
- ASCII art and animated boot sequences
- Multi-language support with language detection

## Development Guidelines

### File Paths
- Use `@/` alias for src imports (configured in vite.config.ts)
- Components follow feature-based organization in `components/` directory

### Internationalization
- Default language is Japanese (`'ja'`)
- Translation files in `src/i18n/translations/`
- Language switching via `lang` command in CLI
- Browser language detection enabled

### CLI Commands
The CLI system in `CLIEmulator.tsx` handles extensive command parsing and execution. When adding new commands, follow the existing pattern of command handlers within the component.

### Deployment
- Builds to `dist/` directory
- Deployed to GitHub Pages automatically via `gh-pages` package
- Uses `HashRouter` for proper GitHub Pages routing

## Testing & Quality

Run these commands before committing:
- `npm run lint` - ESLint with TypeScript rules
- `npm run build` - Ensure production build succeeds

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router (HashRouter for GitHub Pages)
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Internationalization**: react-i18next with browser language detection
- **Build**: Vite with React plugin
- **Deployment**: GitHub Pages via gh-pages package