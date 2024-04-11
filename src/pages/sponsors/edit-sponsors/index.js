// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icons Imports
import Poll from "mdi-material-ui/Poll";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import BriefcaseVariantOutline from "mdi-material-ui/BriefcaseVariantOutline";

// ** Custom Components Imports
import CardStatisticsVerticalComponent from "src/@core/components/card-statistics/card-stats-vertical";
import Table from "src/views/speaker/Table";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports

import { useRouter } from "next/router";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
// import CurrentEvents from 'src/views/dashboard/CurrentEvents'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CurrentEvents from "src/views/tables/CurrentEvents";
import UpcommingEvents from "src/views/tables/UpcomingEvents";
import RecentActivities from "src/views/tables/RecentActivities";
import EditSponsorsForm from "src/views/Sponsors/EditSponsporsForm";

const EditSponsors = () => {
  const router = useRouter();

  // if (typeof window !== 'undefined') {
  //   const userToken = sessionStorage.getItem('userToken')
  //   if (!userToken) {
  //     router.push('/pages/login')
  //   }
  // }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = sessionStorage.getItem("userToken");
      if (!userToken) {
        // router.push('/pages/login')
      }
    }
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" className="primary-dash-title">
            Edit Sponsors
          </Typography>
        </Grid>

        <Grid item xs={12}>
        <EditSponsorsForm />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default EditSponsors;
