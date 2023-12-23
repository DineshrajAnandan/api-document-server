import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { CustomTabPanel } from '../CustomTabPanel';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs({ data, cornerElement }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {cornerElement}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          {data.map((dataItem, idx) => (
            <Tab key={idx} label={dataItem.label} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </Box>
      {data.map((dataItem, idx) => {
        return (
          <CustomTabPanel key={idx} value={value} index={idx}>
            {dataItem.element}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}

CustomTabs.propTypes = {
  data: PropTypes.array,
  cornerElement: PropTypes.node,
};
