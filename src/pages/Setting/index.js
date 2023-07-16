import { Stack, Paper } from "@mui/material";
import { memo, useCallback, useState } from "react";
import {
  AreaInput,
  AvatarInput,
  LinkInput,
} from "../../components/Input/StyledInput";
import TwitterIcon from "../../assets/icons/common/twitter.svg";
import PageTitleWrapper from "../../components/PageTitleWrapper/PageTitleWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getResolverInfo, setResolverInfo } from "../../contracts/Resolver";
import { useEffect } from "react";
import CommonLoadingBtn from "../../components/Button/LoadingButton";
import { bindTwitter } from "../../api";
import ToastMention from "../../components/ToastMessage";

const Setting = () => {
  const { snsName, description, avatar, account, twitterName } = useSelector(
    (state) => ({
      snsName: state.walletInfo.snsName,
      account: state.walletInfo.account,
      description: state.userInfo.description,
      avatar: state.userInfo.avatar,
      twitterName: state.userInfo.twitterName,
    })
  );

  const dispatch = useDispatch();

  const code = new URLSearchParams(window.location.search).get("code");

  const [btnLoading, setBtnLoading] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);

  // user bio
  const [bio, setBio] = useState(description);
  // user twitter
  const [link, setLink] = useState("");

  const handleBioChange = useCallback((value) => {
    if (value) {
      setBio(value);
    }
  }, []);

  const handleLinkChange = useCallback((value) => {
    setLink(value);
  }, []);

  // avatar image upload
  // const [avatar, setAvatar] = useState("");
  const [preViewAvatar, setPreViewAvatar] = useState(avatar);
  const handleUploadAvatarSuccess = (cid, inputRef) => {
    if (cid) {
      const avatarIPFS = `https://${cid}.ipfs.nftstorage.link/`;
      console.log("avatarIPFS:", avatarIPFS);
      setPreViewAvatar(avatarIPFS);
    }
    inputRef.current.value = "";
  };

  const handleUploadAvatarError = useCallback((inputRef) => {
    console.log("upload avatar failed");
    inputRef.current.value = "";
  }, []);

  const handleSetting = useCallback(async () => {
    setBtnLoading(true);
    try {
      await setResolverInfo(snsName, preViewAvatar, bio);
      dispatch({ type: "SET_DES", value: bio });
      dispatch({ type: "SET_AVATAR", value: preViewAvatar });
      ToastMention({ message: "Setting success", type: "success" });
    } catch (error) {
      console.log("handleSettingErr:", error);
    }
    setBtnLoading(false);
  }, [snsName, preViewAvatar, bio, dispatch]);

  const getSettingInfo = useCallback(async (name) => {
    try {
      const resp = await getResolverInfo(name);
      if (resp && resp.ipfsUrl && resp.description) {
        setPreViewAvatar(resp.ipfsUrl);
        setBio(resp.description);
      }
    } catch (error) {
      console.log("getSettingInfoErr:", error);
    }
  }, []);

  const initialSettingValue = useCallback(
    async (name) => {
      await getSettingInfo(name);
    },
    [getSettingInfo]
  );

  const handleLinkTwitter = useCallback(async () => {
    if (!code) {
      return;
    }
    setTwitterLoading(true);
    const reqParams = {
      verifyCode: code,
      address: account,
    };
    try {
      const resp = await bindTwitter(reqParams);
      console.log("bindTwitter:", resp);
      if (resp && resp.code === 200) {
        dispatch({ type: "USER_INFO", value: resp.data });
        ToastMention({ message: "bind twitter success!", type: "success" });
      } else {
        ToastMention({ message: resp.msg, type: "error" });
      }
    } catch (error) {
      console.log("handleLinkTwitterErr:", error);
    }
    setTwitterLoading(false);
  }, [code, account, dispatch]);

  useEffect(() => {
    if (snsName) {
      initialSettingValue(snsName);
    }
    initialSettingValue();
    handleLinkTwitter();
  }, [initialSettingValue, handleLinkTwitter, snsName]);

  return (
    <Stack spacing={3}>
      <PageTitleWrapper title="Setting" />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // height: "95vh",
        }}
      >
        <Stack direction="column" justifyContent="center" spacing={4}>
          <AvatarInput
            showRequired={false}
            label="Profile image"
            description="Max size: 2MB"
            onError={handleUploadAvatarError}
            onSuccess={handleUploadAvatarSuccess}
            avatar={preViewAvatar}
          />

          <AreaInput
            showRequired={false}
            label="Bio"
            placeholder="Please input your bio"
            maxWords={300}
            value={bio}
            setValue={setBio}
            onChange={handleBioChange}
          />

          <div style={{color: "#9a9a9a", fontStyle: "italic"}}>Note: The above data will be uploaded to IPFS</div>

          <CommonLoadingBtn
            loading={btnLoading}
            variant="contained"
            sx={{ margin: "20px 0", maxWidth: "200px", alignSelf: "center" }}
            onClick={handleSetting}
          >
            Setting Profile
          </CommonLoadingBtn>

          <LinkInput
            showRequired={false}
            loading={twitterLoading}
            label="Link"
            description="Your twitter"
            placeholder="Your twitter"
            disabled={true}
            iconUrl={<TwitterIcon width="20" height="20" color="#ea6060" />}
            value={twitterName}
            setValue={setLink}
            onChange={handleLinkChange}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default memo(Setting);
