import {
  Stack,
  Paper,
  Button,
  Select,
  MenuItem,
  styled,
  Box,
  LinearProgress,
  Pagination,
} from "@mui/material";
import { memo, useState, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TypographyWrapper } from "../../../components/Styled";
import SaleDialog from "../../../components/Profile/OperationCard/SaleDialog";
import { getResolverOwner } from "../../../contracts/SNS";
import { queryFriends } from "../../../api";
import TableNoData from "../../../assets/icons/common/tableNoRows.svg";
import CommonAvatar from "../../../components/Common/CommonAvatar";
import { getStakedInfo } from "../../../contracts/Stake";
import CommonLoadingBtn from "../../../components/Button/LoadingButton";
import { getNFTInfo } from "../../../contracts/NFT";
import { useSelector } from "react-redux";

const TitleWrapper = styled(Paper)(() => ({
  // display: "flex",
  // justifyContent: "space-between",
  padding: "20px 0",
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
    fallback: "blocking",
    paths: [
      {
        params: {
          slug: ["0", "1"],
        },
      },
    ],
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  return {
    props: {
      type: slug[0] ?? 1,
      name: slug[1] ?? "",
    },
  };
}

const ProfileList = ({ type, name }) => {
  const [saleOpen, setSaleOpen] = useState(false);
  const [listType, setListType] = useState("empty");
  const [profileAdd, setProfileAdd] = useState("");
  const [saleInfo, setSaleInfo] = useState({
    address: "",
    contractAdd: "",
    tokenId: "",
    tax: "",
  });

  const [pageState, setPageState] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [friendRows, setFriendRows] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [saleLoading, setSaleLoading] = useState(true);
  const pageSize = 30;

  const { account } = useSelector((state) => ({
    account: state.walletInfo.account,
  }));

  const TableNoRowComp = () => {
    return (
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <TableNoData />
      </Stack>
    );
  };

  const handleChangeListType = useCallback(
    (e) => {
      if (listType !== e.target.value) {
        setPageState(1);
        setListType(e.target.value);
      }
    },
    [listType]
  );

  const handleOpenSaleDialog = useCallback(
    async (address) => {
      const stakeInfo = await getStakedInfo(address);
      console.log("stakeInfo:", stakeInfo);

      if (stakeInfo && stakeInfo.friendNFTAddress) {
        const obj = await getNFTInfo(stakeInfo.friendNFTAddress, account);

        console.log("handleOpenSaleDialog:", obj);

        setSaleInfo({
          tokenId: obj.tokenId,
          tax: obj.tax,
          contractAdd: stakeInfo.friendNFTAddress,
        });
      }

      setSaleOpen(true);
    },
    [account]
  );

  const commonColumnsProps = {
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    flex: 1,
    align: "center",
  };

  const friendColumns = [
    {
      field: "name",
      headerName: "SNS",
      width: 90,
      ...commonColumnsProps,
      align: "left",
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            {row && row.ipfsUrl ? (
              <Stack
                direction="row"
                p={0}
                pl={2}
                spacing={1}
                alignItems="center"
              >
                <CommonAvatar name={row.name} />
                <span>{row.name ? row.name : "-"}</span>
              </Stack>
            ) : (
              <Stack
                direction="row"
                p={0}
                pl={2}
                spacing={1}
                alignItems="center"
              >
                <CommonAvatar account={row.address} />
                <span>{row.name ? row.name : "-"}</span>
              </Stack>
            )}
          </>
        );
      },
    },
    {
      field: "type",
      headerName: "Relation",
      width: 150,
      ...commonColumnsProps,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      width: 110,
      ...commonColumnsProps,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box key={row.address}>
            {row.type === "following" ? (
              <CommonLoadingBtn
                variant="outlined"
                onClick={async () => {
                  await handleOpenSaleDialog(row.address);
                }}
              >
                Sale
              </CommonLoadingBtn>
            ) : (
              "-"
            )}
          </Box>
        );
      },
    },
  ];
  const groupColumns = [
    {
      field: "id",
      headerName: "Group ID",
      width: 90,
      ...commonColumnsProps,
    },
    {
      field: "groupName",
      headerName: "Group Name",
      width: 150,
      ...commonColumnsProps,
    },
    {
      field: "relation",
      headerName: "Relation",
      width: 150,
      ...commonColumnsProps,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      width: 110,
      ...commonColumnsProps,
      renderCell: (params) => {
        const { row } = params;

        return (
          <>
            {row.relation === "owner" ? (
              <Button
                variant="outlined"
                onClick={() => {
                  setSaleOpen(true);
                }}
              >
                Sale
              </Button>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
  ];

  const queryFriendsFn = useCallback(
    async ({ page }) => {
      setListLoading(true);
      const reqParams = {
        type: listType,
        address: profileAdd,
        pageNum: page,
        pageSize,
      };
      const resp = await queryFriends(reqParams);
      if (resp && resp.code === 200 && resp.data && resp.data.list) {
        setPageTotal(resp.data.pages);
        setFriendRows(resp.data.list);
      }

      setListLoading(false);
    },
    [listType, profileAdd]
  );

  useEffect(() => {
    getResolverOwner(name).then((address) => {
      setProfileAdd(address);
    });
  }, [name, listType]);

  useEffect(() => {
    setListLoading(true);
    if (profileAdd) {
      queryFriendsFn({ page: 1 });
    }
    setListLoading(false);
  }, [profileAdd, queryFriendsFn]);

  return (
    <Stack spacing={3}>
      <TitleWrapper>
        <TypographyWrapper>
          {type === "0" ? "Friend Lists" : "Group Lists"}
        </TypographyWrapper>
      </TitleWrapper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <SelectWrapper value={listType} onChange={handleChangeListType}>
          <MenuItem value="empty">All</MenuItem>
          <MenuItem value="follower">Followers</MenuItem>
          <MenuItem value="following">Following</MenuItem>
        </SelectWrapper>
        <Box sx={{ height: "72vh", width: "100%" }}>
          <DataGrid
            rows={friendRows}
            getRowId={(row) => row.address}
            columns={type === "0" ? friendColumns : groupColumns}
            loading={listLoading}
            components={{
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: TableNoRowComp,
            }}
            hideFooter={true}
            disableSelectionOnClick={true}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        <Pagination
          count={pageTotal}
          defaultPage={1}
          page={pageState}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{ margin: "20px auto 0" }}
          onChange={(e, page) => {
            setPageState(page);
            queryFriendsFn({ page });
          }}
        />
      </Paper>

      <SaleDialog
        open={saleOpen}
        title="Sale"
        contractAdd={saleInfo.contractAdd}
        tokenId={saleInfo.tokenId}
        tax={saleInfo.tax}
        onClose={() => {
          setSaleOpen(false);
          setSaleInfo({ address: "", contractAdd: "", tokenId: "", tax: "" });
        }}
      />
    </Stack>
  );
};

export default memo(ProfileList);
