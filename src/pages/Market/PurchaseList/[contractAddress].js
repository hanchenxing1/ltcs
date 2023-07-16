import { memo, useCallback, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import PageTitleWrapper from "../../../components/PageTitleWrapper/PageTitleWrapper";
import BuyDialog from "../../../components/Market/BuyDialog";
import { queryOrderList } from "../../../api/market";
import TableNoData from "../../../assets/icons/common/tableNoRows.svg";
import { useRouter } from "next/router";

const list = [
  {
    txHash: "1111",
    tokenOwnerName: "",
    orderPrice: 1,
    tokenOwner: "0x68aF7EF8182F4Bf50e32814AeCaaeB747bfc905F",
    tokenId: 14,
    contractAddress: "0x5FFC9D5F88ae0F79cF41f35c04cF85994f4C017E",
  },
];

const PurchaseList = () => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [pageState, setPageState] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [buyList, setBuyList] = useState([]);
  const [buyInfo, setBuyInfo] = useState({});
  const [listLoading, setListLoading] = useState(true);
  const pageSize = 30;

  const router = useRouter();

  const friendAddress = router.query.contractAddress;

  const commonColumnsProps = {
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    flex: 1,
    align: "center",
  };

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

  const columns = [
    {
      field: "tokenOwnerName",
      headerName: "Owner",
      width: 90,
      ...commonColumnsProps,
    },
    {
      field: "tokenId",
      headerName: "TokenID",
      width: 150,
      ...commonColumnsProps,
    },
    {
      field: "orderPrice",
      headerName: "Price",
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
          <Button
            variant="outlined"
            onClick={() => {
              console.log("buyRow:", row);
              setBuyInfo(row);
              setBuyOpen(true);
            }}
          >
            Buy
          </Button>
        );
      },
    },
  ];

  const queryOrderListFn = useCallback(
    async ({ page }) => {
      setListLoading(true);
      const reqParams = {
        contractAddress: friendAddress,
        pageNum: page,
        pageSize: pageSize,
      };
      const resp = await queryOrderList(reqParams);
      if (resp && resp.code === 200 && resp.data && resp.data.list) {
        setPageTotal(resp.data.pages);
        setBuyList(resp.data.list);
      }
      setListLoading(false);
    },
    [pageSize, friendAddress]
  );

  useEffect(() => {
    if (router && router.query && router.query.contractAddress) {
      setListLoading(true);
      queryOrderListFn({ page: 1 });
      setListLoading(false);
    }

    // setListLoading(false);
  }, [router]);

  return (
    <Stack spacing={3}>
      <PageTitleWrapper title="Buy Follow-NFT" />

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ height: "72vh", width: "100%" }}>
          <DataGrid
            rows={buyList}
            // rows={list}
            columns={columns}
            pageSize={20}
            loading={listLoading}
            getRowId={(row) => row.txHash}
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
          sx={{
            margin: "20px auto 0",
            ".MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
          onChange={(e, page) => {
            setPageState(page);
            queryOrderListFn({ page });
          }}
        />
      </Paper>

      <BuyDialog
        open={buyOpen}
        title="Buy Info"
        info={buyInfo}
        // contractAdd="0x5435e8bb74d7ba8f4a76287dc0e75e203d87647e"
        onClose={() => {
          setBuyOpen(false);
        }}
      />
    </Stack>
  );
};

export default memo(PurchaseList);
