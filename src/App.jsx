import React, { useState, useEffect } from 'react';
import DashboardTable from './Components/LeadsDataTable/LeadsDataTable';
import DataCard from './Components/DataCard/DataCard';
import LeadsOvertime from './Components/LeadsOvertime/LeadsOvertime';
import RevenuChartCard from './Components/Revenue/Revenue';
import ProgressData from './Components/ProgressData/ProgressData';
import { AppBar, Toolbar, Typography, Grid, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4040/dashboard');
        const revenueChartData = response.data; // Assuming the response contains the revenue chart data
        console.log('Revenue Chart Data:', revenueChartData); // Log the data to verify its structure
        setDashboardData(revenueChartData); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PEEJIYEM
          </Typography>
                  </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
<div className="row m-1 p-1">
  <div className="col">
  <DataCard />

    
  </div>
 
</div>

<Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <LeadsOvertime />
      </Grid>
      <Grid item xs={12} sm={4}>
        <RevenuChartCard chartData={dashboardData} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProgressData />
      </Grid>
    </Grid>


      <Grid item xs={12} sm={6}>
      </Grid>


      {/* Footer component */}
      <DashboardTable />
    </div>
  );
};

export default App;
