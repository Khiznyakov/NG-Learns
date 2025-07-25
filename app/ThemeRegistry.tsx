"use client";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#7bb6e9' }, // пастельный голубой
    secondary: { main: '#b39ddb' }, // пастельный фиолетовый
    background: { default: 'transparent' },
    success: { main: '#81c784' },
    info: { main: '#64b5f6' },
    warning: { main: '#ffd54f' },
    error: { main: '#e57373' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px 0 rgba(100,150,255,0.08)',
          transition: 'background 0.2s, box-shadow 0.3s, color 0.2s',
          '&:hover': {
            boxShadow: '0 4px 16px 0 rgba(100,150,255,0.15)',
            filter: 'brightness(0.97)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(100, 150, 255, 0.10)',
          transition: 'box-shadow 0.3s, background 0.3s, transform 0.2s',
          '&:hover': {
            boxShadow: '0 12px 36px 0 rgba(100, 150, 255, 0.18)',
            transform: 'translateY(-2px) scale(1.02)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(100, 150, 255, 0.10)',
          transition: 'box-shadow 0.3s, background 0.3s',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 18px 18px 0',
          boxShadow: '0 8px 32px 0 rgba(100, 150, 255, 0.10)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 