// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icons Imports
import Poll from "mdi-material-ui/Poll";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import BriefcaseVariantOutline from "mdi-material-ui/BriefcaseVariantOutline";

// ** Custom Components Imports
import CardStatisticsVerticalComponent from "src/@core/components/card-statistics/card-stats-vertical";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import Table from "src/views/dashboard/Table";
import Trophy from "src/views/dashboard/Trophy";
import TotalEarning from "src/views/dashboard/TotalEarning";
import StatisticsCard from "src/views/dashboard/StatisticsCard";
import WeeklyOverview from "src/views/dashboard/WeeklyOverview";
import DepositWithdraw from "src/views/dashboard/DepositWithdraw";
import AnalyticReportOne from "src/views/dashboard/AnalyticReportOne";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
// import CurrentEvents from 'src/views/dashboard/CurrentEvents'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CurrentEvents from "src/views/tables/CurrentEvents";
import UpcommingEvents from "src/views/tables/UpcomingEvents";
import RecentActivities from "src/views/tables/RecentActivities";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { event } from "src/store/slice/eventSlice";

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const state_token = useSelector((state) => state.auth.user?.userData.token);

  const dispatch = useDispatch();

  const router = useRouter();



  useEffect(() => {
    const token = sessionStorage.getItem("userData");
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      axios
        .get("http://172.171.210.167/event/events_list/", {
          headers: {
            Authorization: `Bearer ${state_token}`,
          },
        })
        .then((response) => {
          console.log("evnet list ", response.data);
          const eventData = response.data;
          dispatch(event(eventData));
        })
        .catch((e) => {
          console.error("api error", e);
        });
    }
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" className="primary-dash-title">
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <CurrentEvents /> */}
          <Card>
            <CardHeader
              title="Current Events"
              titleTypographyProps={{ variant: "h6" }}
              className="dashboard-title"
              sx={{ color: "primary.main" }}
            />
            <CurrentEvents />
          </Card>
          <div style={{ margin: "10px" }}></div>
          <Card>
            <CardHeader
              title="Upcomming Events"
              titleTypographyProps={{ variant: "h6" }}
              className="dashboard-title"
              sx={{ color: "primary.main" }}
            />
            <UpcommingEvents />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <CurrentEvents /> */}
          <Card>
            <CardHeader
              title="Recents Activities"
              titleTypographyProps={{ variant: "h6" }}
              className="dashboard-title"
              sx={{ color: "primary.main" }}
            />
            <RecentActivities />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <CurrentEvents /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="$25.6k"
                icon={<Poll />}
                color="success"
                trendNumber="+42%"
                title="Total Profit"
                subtitle="Weekly Profit"
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="$78"
                title="Refunds"
                trend="negative"
                color="secondary"
                trendNumber="-15%"
                subtitle="Past Month"
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="862"
                trend="negative"
                trendNumber="-18%"
                title="New Project"
                subtitle="Yearly Project"
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="15"
                color="warning"
                trend="negative"
                trendNumber="-18%"
                subtitle="Last Week"
                title="Sales Queries"
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticReportOne />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
