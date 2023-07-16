import {
  Paper,
  Stack,
  styled,
  Box,
  Avatar,
  Typography,
  Link,
  Button,
  InputBase,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import CopyText from "../../components/CopyText";
import EllipsisAddress from "../../components/EllipsisAddress";
import PageTitleWrapper from "../../components/PageTitleWrapper/PageTitleWrapper";
import TwitterIcon from "../../assets/icons/common/twitterIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import CommonDialog from "../../components/CommonDialog";

const ItemWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: 0,
  ".MuiTypography-root": {
    fontSize: "15px",
    lineHeight: "15px",
  },
  ".MuiTypography-title": {
    fontSize: "16px",
    fontWeight: 600,
  },
}));

const BasicGroupInfo = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  borderTop: "1px solid #ddd",
  padding: "20px 0px",
}));

const ButtonIcon = styled(Button)(() => ({
  marginLeft: "3px",
  svg: {
    width: "16px",
    color: "#ea6060",
  },
}));

const GroupWrapper = styled(Paper)(() => ({
  // display: "flex",
  // alignItems: "center",
}));

const GroupHeader = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "10px",
  borderRadius: "12px 12px 0 0",
  borderBottom: "1px solid #ddd",
}));

const MembersText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: 500,
}));

const ListItemWrapper = styled(ListItem)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  margin: "5px 0",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: "#ddd",
  },
}));

const DesInput = styled(TextField)(() => ({
  width: "100%",
  borderRadius: "8px",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "20px",
  ".MuiInputBase-root": {
    padding: "10px 10px",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderWidth: "0px",
    border: "none",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: "1px",
    // borderColor: "rgba(251, 109, 5, 0.8)",
  },
  "& .MuiTextField-root": {
    ".Mui-focused": {
      borderWidth: "1px",
    },
  },
}));

const keyList = [0, 1, 2, 3];

const GroupInfo = () => {
  const { account, snsName } = useSelector((state) => {
    return {
      account: state.walletInfo.account,
      snsName: state.walletInfo.snsName,
    };
  });

  const [joinGroupOpen, setJoinGroupOpen] = useState(false);
  const [editDes, setEditDes] = useState(false);
  const [desInp, setDesInp] = useState(
    "Dedicated to building a worthwhile and fun web3 world"
  );

  const handleChangeDesInp = useCallback((e) => {
    setDesInp(e.target.value);
  }, []);

  const closeJoinGroupOpen = useCallback(() => {
    setJoinGroupOpen(false);
  }, []);

  return (
    <Stack spacing={3}>
      <PageTitleWrapper title="Group Info" />

      <Paper>
        <Stack direction="row" spacing={4}>
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "12px",
            }}
          />
          <Stack spacing={2} p={0}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: "32px",
                color: "#ea6060",
              }}
            >
              {snsName}
            </Typography>
            <Box
              justifyContent="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "2px 0",
              }}
            >
              <EllipsisAddress account={account} />
            </Box>
            <Typography>description</Typography>
          </Stack>
        </Stack>

        <BasicGroupInfo>
          <ItemWrapper>
            <Typography variant="title">Link:</Typography>
            <CopyText text="http://localhost:3000/Group">
              <Link>http://localhost:3000/Group</Link>
            </CopyText>

            <ButtonIcon variant="outlined" startIcon={<TwitterIcon />}>
              Share My DID card
            </ButtonIcon>
          </ItemWrapper>

          <ItemWrapper>
            <Typography variant="title">Description:</Typography>
            {editDes ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  width: "100%",
                }}
              >
                <DesInput
                  value={desInp}
                  multiline
                  maxRows={2}
                  onChange={handleChangeDesInp}
                />
                <IconButton
                  onClick={() => {
                    setEditDes(false);
                  }}
                >
                  <CheckIcon />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" p={0} spacing={1}>
                <Typography>{desInp}</Typography>
                <IconButton
                  onClick={() => {
                    setEditDes(true);
                  }}
                >
                  <BorderColorIcon />
                </IconButton>
              </Stack>
            )}
          </ItemWrapper>
        </BasicGroupInfo>
      </Paper>

      <GroupWrapper>
        <GroupHeader>
          <Stack direction="row" p={0} alignItems="center" spacing={1}>
            <GroupIcon />
            <MembersText>1304 Members</MembersText>
          </Stack>
          <Stack direction="row" p={0} alignItems="center" spacing={2}>
            <InputBase
              placeholder="Please input name"
              sx={{ height: "40px", paddingRight: "0px" }}
              endAdornment={
                <IconButton sx={{ borderRadius: "12px" }}>
                  <SearchIcon />
                </IconButton>
              }
            />
            <IconButton
              onClick={() => {
                setJoinGroupOpen(true);
              }}
            >
              <GroupAddIcon />
            </IconButton>
          </Stack>
        </GroupHeader>

        <List>
          {keyList.map((item) => (
            <ListItemWrapper key={item}>
              <Avatar />
              <Typography>name</Typography>
            </ListItemWrapper>
          ))}
        </List>
      </GroupWrapper>

      <CommonDialog
        open={joinGroupOpen}
        title="Join Group"
        onClose={closeJoinGroupOpen}
      >
        <Stack direction="column" spacing={3}>
          <Button variant="outlined">Mint at owner</Button>
          <Button variant="outlined">Buy at market</Button>
          <Typography
            sx={{
              color: "#9a9a9a",
              fontWeight: 500,
            }}
          >
            Note: buy a Group-NFT, you will automatically join the Group chat.
            You can buy it in the above two ways
          </Typography>
        </Stack>
      </CommonDialog>
    </Stack>
  );
};

export default memo(GroupInfo);
