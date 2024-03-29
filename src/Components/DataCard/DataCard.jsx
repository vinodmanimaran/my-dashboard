import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import ReportCard from '../Report/Report';

// Assuming `ReportCard` is a custom component, make sure it's imported or defined.
export const gridSpacing = 3;

const getIcon = (service) => {
  switch (service) {
    case 'jobs':
      return MonetizationOnTwoToneIcon;
    case 'loans':
      return AccountBalanceTwoToneIcon;
    case 'creditCards':
      return CreditCardTwoToneIcon;
    case 'realEstate':
      return HomeTwoToneIcon;
    case 'savingsInvestments':
      return ThumbUpAltTwoToneIcon;
    case 'otherInsurances':
      return AssignmentTurnedInTwoToneIcon;
    case 'vehicleInsurances':
      return DirectionsCarTwoToneIcon;
    default:
      return null;
  }
};

const DataCard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const theme = useTheme();

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
      {dashboardData && (
        <Grid item xs={12} sx={{margin:"10px"}}>
          <Grid container spacing={gridSpacing}>
            {Object.entries(dashboardData?.leadsCount).map(([service, count]) => (
              <Grid item lg={3} sm={6} xs={12} key={service}>
                {/* Assuming ReportCard is a custom component */}
                <ReportCard
                  primary={String(count)}
                  secondary={service}
                  color={theme.palette.warning.main}
                  iconPrimary={getIcon(service)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DataCard;
