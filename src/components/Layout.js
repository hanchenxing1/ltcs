import { Box, CssBaseline, Grid, Stack, styled } from "@mui/material";
import CommonApproveDialog from "./CommonApproveDialog";
import SideBar from "./SideBar";

const Main = styled("main")`
  width: 100%;
  min-height: calc(100vh - 20px);
  padding: 20px;
  background: #ff928d;
  border-radius: 12px 12px 0 0;
`;

const Layout = ({ children }) => {
  return (
    <Box>
      <CssBaseline />
      <Stack p={0} minWidth="1200px" direction="row" justifyContent="center">
        <Grid item>
          <SideBar />
        </Grid>
        <Grid
          item
          xs
          sx={{
            height: "100vh",
            overflow: "auto",
            padding: "16px 20px 0",
            maxWidth: "calc(1200px - 280px)",
            margin: "0 auto",
          }}
        >
          <Main>
            <Box
              sx={{
                maxWidth: "calc(1200px - 280px)",
                margin: "0 auto",
              }}
            >
              {children}
            </Box>
          </Main>
        </Grid>
      </Stack>

      <CommonApproveDialog />
    </Box>
  );
};

export default Layout;
