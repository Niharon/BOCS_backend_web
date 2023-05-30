import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const TabLayout = ({tabItems}) => {
    const [value, setValue] = React.useState(0);
    

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {

              tabItems.map((item, index) => {
                return <Tab key={item.label} label={item.label} {...a11yProps(index)} />
              })
            }
        
          </Tabs>
        </Box>
        {
          tabItems.map((item, index) => {
            return <TabPanel key={item.label} value={value} index={index}>
              {item.component}
            </TabPanel>
          })
        }
    
      </Box>
    );
};

export default TabLayout;
