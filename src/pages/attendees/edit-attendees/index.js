// ** MUI Imports
import Grid from "@mui/material/Grid";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
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
