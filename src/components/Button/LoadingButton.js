import { LoadingButton } from "@mui/lab";
import { Box, styled } from "@mui/material";

const LoadingBtn = styled(LoadingButton)((props) => ({
  display: props.hidden ? "none" : "flex",
}));

const CommonLoadingBtn = (props) => {
  const { children, loading, hidden } = props;
  return (
    <LoadingBtn
      loadingPosition="start"
      hidden={hidden}
      startIcon={<Box sx={{ width: `${loading ? "20px" : "0px"}` }} />}
      {...props}
    >
      {children}
    </LoadingBtn>
  );
};

export default CommonLoadingBtn;
