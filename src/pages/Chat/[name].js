import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  styled,
  List,
  ListItemButton,
  Avatar,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { memo, useState } from "react";
import CommonTabs from "../../components/CommonTabs";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddChatDialog from "../../components/Chat/AddChatDialog";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useWalletInfo } from "../../providers/wallet";
import { splitAddress } from "../../utils";
import Conversation from "../../components/Conversation";
import { useSelector } from "react-redux";
import CommonAvatar from "../../components/Common/CommonAvatar";
import { queryFriends } from "../../api";
import { getResolverOwner } from "../../contracts/SNS";
import ToastMention from "../../components/ToastMessage";

const ChatHeader = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const GridWrapper = styled(Grid)(() => ({
  height: "81vh",
  borderRadius: "12px",
  // boxShadow:
  //   "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
}));

const LeftBox = styled(Box)(() => ({
  height: "100%",
  background: "white",
  borderRadius: "12px 0 0 12px",
  // padding: "16px 20px",
  borderRight: "1px solid #ddd",
}));

const RightBox = styled(Box)(() => ({
  height: "100%",
  background: "white",
  borderRadius: "0 12px 12px 0",
  padding: "16px 20px",
  borderLeft: "1px solid #ddd",
}));

// const AccordionWrapper = styled(Accordion)(() => ({
//   padding: "0",

//   ":before": {
//     height: 0,
//   },

//   "& .MuiAccordionSummary-root": {
//     padding: "0 12px",
//     minHeight: "unset",

//     borderBottom: "1px solid #ddd",
//   },

//   "& .MuiAccordionSummary-root .Mui-expanded": {
//     margin: "12px 0px",
//   },

//   "& .MuiAccordionDetails-root": {
//     padding: "0",
//   },

//   "& .MuiListItemButton-root": {
//     gap: "10px",
//   },
// }));

const RelationListWrapper = styled(Box)(() => ({
  height: "100%",
  overflowY: "auto",
  ".MuiTypography-subtitle1": {
    padding: "16px 20px",
    fontSize: "15px",
    fontWeight: 500,
  },
}));

const RelationList = styled(List)(() => ({
  padding: "0",
  ".MuiListItemButton-root": {
    padding: "8px 16px",
    gap: "10px",
  },
}));

const SelectWrapper = styled(Select)(() => ({
  border: "1px solid #9a9a9a",
  borderRadius: "12px",
  margin: "10px",
  textAlign: "right",
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  ".MuiSelect-select": {
    padding: "0px",
    borderRadius: "12px",
  },
}));

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          name: "Friend",
        },
      },
      {
        params: {
          name: "Group",
        },
      },
    ],
  };
}

export async function getStaticProps({ params }) {
  const { name } = params;
  return {
    props: {
      ...params,
      type: name === "Friend" || "friend" ? 0 : 1,
    },
  };
}

const Chat = ({ type }) => {
  const [tabValue, setTabValue] = useState(type);
  const [selectItem, setSelectItem] = useState("empty");
  const [addOpen, setAddOpen] = useState(false);
  const [conversation, setConversation] = useState({});
  const [searchInp, setSearchInp] = useState("");

  const [friendList, setFriendList] = useState([]);

  const { account } = useSelector((state) => ({
    account: state.walletInfo.account,
  }));

  const isFriend = tabValue === 0 ? true : false;

  const { client, initialClient } = useWalletInfo();

  const router = useRouter();

  const handleChangeTabs = useCallback(
    (e, newValue) => {
      setTabValue(newValue);
      if (newValue === 0) {
        console.log("newValue:", newValue);
        router.push(`/Chat/Friend`);
      }
      if (newValue === 1) {
        router.push(`/Chat/Group`);
      }
    },
    [router]
  );

  const handleChangeInp = useCallback((e) => {
    setSearchInp(e.target.value);
  }, []);

  const handleSelectChange = useCallback(
    async (e) => {
      setSelectItem(e.target.value);
      await queryFriendsFn(e.target.value);
    },
    [queryFriendsFn]
  );

  const handleSelectChat = useCallback(async (item) => {
    console.log("item:", item);
    try {
      const resp = await getResolverOwner(item.name);
      if (resp) {
        setConversation({ ...item, address: resp });
      }
    } catch (error) {
      ToastMention({ message: "Get friend message error", type: "error" });
      console.log("handleSelectChatErr:", error);
    }
  }, []);

  const tabList = ["Friend", <span key="group">Group</span>];

  const queryFriendsFn = useCallback(
    async (selectType) => {
      console.log("selectType:", selectType);
      const reqParams = {
        type: selectType ? selectType : selectItem,
        address: account,
        searchName: searchInp,
        pageNum: 1,
        pageSize: 1000,
      };
      const resp = await queryFriends(reqParams);
      if (resp && resp.code === 200 && resp.data && resp.data.list) {
        setFriendList(resp.data.list);
      }
    },
    [account, searchInp, selectItem]
  );

  useEffect(() => {
    if (!client) {
      initialClient();
    }
  }, [client, initialClient]);

  useEffect(() => {
    queryFriendsFn();
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <ChatHeader>
        <CommonTabs
          tabValue={tabValue}
          tabList={tabList}
          handleChange={handleChangeTabs}
        />
        <Stack direction="row" spacing={1} p={0} alignItems="center">
          <InputBase
            value={searchInp}
            placeholder={
              tabValue === 0 ? "Search friend Name" : "Search group name"
            }
            onChange={handleChangeInp}
            sx={{ height: "40px", paddingRight: "0px" }}
            endAdornment={
              <IconButton
                sx={{ borderRadius: "12px" }}
                onClick={() => {
                  queryFriendsFn();
                }}
              >
                <SearchIcon />
              </IconButton>
            }
          />
          <IconButton
            onClick={() => {
              setAddOpen(true);
            }}
          >
            <GroupAddIcon />
          </IconButton>
        </Stack>
      </ChatHeader>

      <Grid container>
        <GridWrapper item xs={4}>
          <LeftBox>
            {/* <AccordionWrapper defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Message</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: "auto" }}>
                <List component="nav">
                  {[0, 1, 2, 3].map((item) => (
                    <ListItemButton key={item}>
                      <Avatar />
                      <ListItemText
                        primary="liujuncheng.key"
                        secondary="Jan 9, 2014"
                      />
                    </ListItemButton>
                  ))}
                </List>
              </AccordionDetails>
            </AccordionWrapper> */}

            <RelationListWrapper>
              <Stack direction="row" p={0} justifyContent="space-between">
                <Typography variant="subtitle1">
                  {isFriend ? "Friend" : "Group"}
                </Typography>

                <SelectWrapper value={selectItem} onChange={handleSelectChange}>
                  <MenuItem value="empty">All</MenuItem>
                  <MenuItem value="following">Following</MenuItem>
                  <MenuItem value="followers">Followers</MenuItem>
                </SelectWrapper>
              </Stack>
              <RelationList component="nav">
                {friendList.map((item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      handleSelectChat(item);
                    }}
                  >
                    <CommonAvatar
                      account={item.address}
                      sx={{ borderRadius: "50%" }}
                    />
                    <ListItemText
                      primary={item.name}
                      secondary={splitAddress(item.address)}
                    />
                  </ListItemButton>
                ))}
              </RelationList>
            </RelationListWrapper>
          </LeftBox>
        </GridWrapper>
        <GridWrapper item xs={8}>
          <RightBox>
            <Conversation
              name={conversation.name}
              recipientAdd={conversation.address}
            />
          </RightBox>
        </GridWrapper>
      </Grid>

      <AddChatDialog
        open={addOpen}
        type={tabValue}
        onClose={() => {
          setAddOpen(false);
        }}
      />
    </Stack>
  );
};

export default memo(Chat);
