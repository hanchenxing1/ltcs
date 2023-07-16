import { Tabs, Tab, styled, Box } from "@mui/material";

export const TabsBlackAndBorderWrapper = styled(Box)({
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  boxShadow:
    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-around",
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#FB6D05",
  },
});

const CommonTabs = ({ tabValue, handleChange, tabList }) => {
  const handleTabList = () => {
    return tabList.map((item, index) => (
      <Tab
        sx={{ fontWeight: 500, borderRadius: "12px 12px 0 0" }}
        key={index}
        label={item}
        disabled={typeof item !== "string"}
      />
    ));
  };

  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      aria-label="commonTabs"
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    >
      {handleTabList()}
    </Tabs>
  );
};

export default CommonTabs;
