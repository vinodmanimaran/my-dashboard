import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardHeader, Divider, CardContent, Typography, LinearProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const ProgressData = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const gridSpacing = 2; // Define grid spacing as per your requirement

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

  return (
    <div>
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader
            title={
              <Typography component="div" className="card-header">
                Leads
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={gridSpacing}>
              {dashboardData &&
                Object.entries(dashboardData.leadsPercentage).map(([service, percentage]) => (
                  <Grid item xs={12} key={service}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">{service}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          {percentage}%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress
                          variant="determinate"
                          aria-label={service}
                          value={parseFloat(percentage)}
                          color="primary"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default ProgressData;
