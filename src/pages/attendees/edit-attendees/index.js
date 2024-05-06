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
import EditSpeakerForm from "src/views/speaker/EditSpeakerForm";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import EditAttendees from "src/views/attendees/editAttendessForm";

const EditSpeaker = () => {
  const router = useRouter();
  const state_token = useSelector((state) => state.auth.user?.userData?.token);


  useEffect(()=>{
    if (!state_token) {
      router.push("/login");
    }
  },[])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" className="primary-dash-title">
            Edit Attendees
          </Typography>
        </Grid>

        <Grid item xs={12}>

            <EditAttendees/>

        {/* <EditSpeakerForm /> */}

        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default EditSpeaker;
