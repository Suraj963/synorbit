import { createTheme } from "@mui/material/styles";

/** Mirrors the CSS custom properties in src/app/globals.css. */
export const tokens = {
  ink: "#0a0d14",
  surface: "#111622",
  raised: "#182031",
  line: "#252e40",
  lineStrong: "#34415c",
  text: "#eef1f7",
  muted: "#9aa4b8",
  accent: "#6f95ff",
  accentStrong: "#93b0ff",
  signal: "#45d3e6",
  success: "#4fd69c",
  danger: "#ff8a8a",
} as const;

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: { main: tokens.accent, contrastText: tokens.ink },
    secondary: { main: tokens.signal, contrastText: tokens.ink },
    error: { main: tokens.danger },
    success: { main: tokens.success },
    background: { default: tokens.ink, paper: tokens.surface },
    text: { primary: tokens.text, secondary: tokens.muted },
    divider: tokens.line,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "var(--font-body), system-ui, sans-serif",
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48,
          paddingInline: 22,
          borderRadius: 999,
          fontSize: "1rem",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.ink,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: tokens.lineStrong },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: tokens.muted },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.accent,
            borderWidth: 2,
          },
        },
        input: { fontSize: "1rem" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: tokens.muted },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginInline: 2, fontSize: "0.875rem" },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.raised,
          border: `1px solid ${tokens.line}`,
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: tokens.ink, backgroundImage: "none" },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, alignItems: "flex-start" },
      },
    },
  },
});
