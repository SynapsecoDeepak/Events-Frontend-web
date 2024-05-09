import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import EditSpeakerForm from "src/views/speaker/EditSpeakerForm";
import { useSelector } from "react-redux";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

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
            Edit Speaker
          </Typography>
        </Grid>

        <Grid item xs={12}>
        <EditSpeakerForm />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default EditSpeaker;
