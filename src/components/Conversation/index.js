import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { memo, useRef, useState } from "react";
import EllipsisAddress from "../EllipsisAddress";
import SendIcon from "@mui/icons-material/Send";
import MessageList from "./MessageList";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useWalletInfo } from "../../providers/wallet";
import CommonAvatar from "../Common/CommonAvatar";

const ConversationHeader = styled(Stack)(() => ({
  borderBottom: "1px solid #ddd",
  borderRadius: "0px",

  ".MuiTypography-title": {
    fontSize: "15px",
    fontWeight: 600,
  },
}));

const Conversation = ({ name, recipientAdd }) => {
  const [sendInp, setSendInp] = useState("");
  const [chatList, setChatList] = useState([]);
  const [conversations, setConversations] = useState(null);
  const messagesEndRef = useRef(null);

  // const { account } = useSelector((state) => ({
  //   account: state.walletInfo.account,
  // }));

  const scrollToMessagesEndRef = useCallback(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleChangeSendInp = useCallback((e) => {
    setSendInp(e.target.value);
  }, []);

  const { client } = useWalletInfo();

  const startClient = useCallback(async () => {
    console.log("client:", client);
    if (client && recipientAdd) {
      try {
        const newConversation = await client.conversations.newConversation(
          recipientAdd
        );
        setConversations(newConversation);
        const m = await newConversation.messages();
        setChatList([...m]);
      } catch (error) {
        console.log("startClientErr:", error);
      }
    }
  }, [recipientAdd, client]);

  const listenChatList = useCallback(async () => {
    console.log("here listen", conversations);
    if (!conversations) return;
    const stream = await conversations.streamMessages();
    console.log("stream:", stream);
    for await (const message of stream) {
      setChatList((v) => [...v, { ...message }]);
    }
  }, [conversations]);

  const sendMessages = useCallback(
    async (msg) => {
      if (!conversations) return;
      console.log(msg, "send msg", conversations, conversations.send);
      const resp = await conversations.send(msg);
      if (resp && resp.id) {
        setSendInp("");
      }
    },
    [conversations]
  );

  useEffect(() => {
    listenChatList();
    scrollToMessagesEndRef();
  }, [conversations, listenChatList, scrollToMessagesEndRef]);

  useEffect(() => {
    startClient();
  }, [startClient]);

  useEffect(() => {
    const hasMessage = chatList.length > 0;
    if (!hasMessage) return;

    scrollToMessagesEndRef();
  }, [chatList, scrollToMessagesEndRef]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        // 👇️ your logic here
        sendMessages(sendInp);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [sendInp]);

  return (
    <Stack
      direction="column"
      p={0}
      height="100%"
      justifyContent="space-between"
    >
      {recipientAdd ? (
        <ConversationHeader direction="row" spacing={2} pt={0} pl={0}>
          <CommonAvatar
            account={recipientAdd.toLowerCase()}
            sx={{ borderRadius: "50%" }}
          />
          <Box>
            <Typography variant="title">{name}</Typography>
            <EllipsisAddress account={recipientAdd} />
          </Box>
        </ConversationHeader>
      ) : (
        <ConversationHeader>
          <Typography variant="title" sx={{ color: "#ea6060" }}>
            Click your friend start chat !
          </Typography>
        </ConversationHeader>
      )}

      <MessageList
        messages={chatList}
        recipientName={name}
        messagesEndRef={messagesEndRef}
      />

      <Box
        sx={{
          width: "100%",
        }}
      >
        <InputBase
          value={sendInp}
          sx={{
            width: "100%",
            pr: 0,
          }}
          endAdornment={
            <IconButton
              sx={{ borderRadius: "12px" }}
              disabled={sendInp.length === 0}
              onClick={sendMessages.bind(this, sendInp)}
            >
              <SendIcon />
            </IconButton>
          }
          onChange={handleChangeSendInp}
        />
      </Box>
    </Stack>
  );
};

export default memo(Conversation);
