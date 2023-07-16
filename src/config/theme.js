import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const lightTheme = responsiveFontSizes(
  createTheme({
    typography: {
      allVariants: {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 400,
      },
    },
    palette: {
      mode: "light",
      primary: {
        main: "#ea6060",
        contrastText: "#fff",
      },
      secondary: {
        main: "#fff",
        contrastText: "#000",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",
          },
          containedPrimary: {},
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              color: "#ea6060",
            },
          },
        },
      },
      MuiLoadingButton: {
        styleOverrides: {
          root: {
            fontWeight: "500",
            fontSize: "14px",
            textTransform: "none",
            "&.Mui-disabled": {
              // background: "#ea6060",
              opacity: 0.5,
              // color: "white",
              cursor: "not-allowed",
            },
          },
          containedPrimary: {
            backgroundColor: "#FB6D05",
            color: "white",
            transition: "backgroundColor 1s",
            "&:hover": {
              background: "linear-gradient(270deg, #F89E1F 0%, #FB6D05 100%)",
            },
          },
          containedSecondary: {
            "&.Mui-disabled": {
              background: "transparent",
              color: "#000",
              opacity: 0.5,
              cursor: "not-allowed",
            },
          },
          outlinedPrimary: {
            "&.Mui-disabled": {
              background: "transparent",
              color: "rgba(255, 255, 255)",
              borderColor: "rgba(255, 255, 255)",
              opacity: 0.5,
              cursor: "not-allowed",
            },
            "&:hover": {
              border: "1px solid #FB6D05",
              color: "#FB6D05",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            padding: "16px 20px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            padding: "16px 20px",
            boxShadow: "none",
            border: "1px solid #ddd",
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            padding: "16px 20px",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            top: "-10vh",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: "1px solid #ddd",
            padding: "2px 15px",
            borderRadius: "12px",
            caretColor: "#ea6060",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            margin: "5px 0",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
          },
          cell: {
            "&:focus": {
              outline: "none",
            },
            "&:focus-within": {
              outline: "none",
            },
          },
          columnHeader: {
            "&:focus": {
              outline: "none",
            },
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
          },
        },
      },
    },
  })
);

export { lightTheme };
