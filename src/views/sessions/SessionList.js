// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/router";
// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const SessionList = () => {
  const router = useRouter();

  const data = [
    {
      name: "Session 1 - Title come here",
      date: "January 10, 11:00 am - 12:00 PM",
      tags: ["Tags 1", "Tags 2", "Tags 3"],
    },
    {
      name: "Session 2 - Title come here",
      date: "January 10, 11:00 am - 12:00 PM",
      tags: ["Tags 1", "Tags 2", "Tags 3"],
    },
    {
      name: "Session 3 - Title come here",
      date: "January 10, 11:00 am - 12:00 PM",
      tags: ["Tags 1", "Tags 2", "Tags 3"],
    },
  ];
  return (
    <>
      {data?.map((itm) => (
        <Card
          sx={{
            width: "100%",
            // height: '175px',
            /* UI Properties */
            padding: "15px",
            marginBottom: 5,
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: "0px 0px 6px #00000029",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h7" className="primary-dash-title">
              {itm.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
                height: "30px",
                background: "#2BACE2 0% 0% no-repeat padding-box",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <img src={"/message.png"} style={{ width: 15, height: 15 }} />
              <Typography sx={{ color: "#fff", fontSize: 11,marginLeft:2 }}>
                Edit Session
              </Typography>
            </Box>
          </Box>
          <Box sx={{marginTop:'5px'}}>
            <Typography
            variant="p"
              style={{ fontSize: 12, display: "flex", alignItems: "center",color:'#333333',fontWeight:500 }}
            >
              <img src="/calendar.png" style={{ width: 15, height: 15 }} />
              &nbsp;{itm.date}
            </Typography>
          </Box>
          <Box sx={{marginTop:'15px',paddingBottom:5, display: "flex", alignItems: "center" }}>
            {itm?.tags?.map((tag) => (
              <Box
                sx={{
                  width: "60px",
                  marginRight: 4,
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  /* UI Properties */
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid #D1D1D1",
                  borderRadius: "5px",
                  fontSize: 11,
                }}
              >
                <span>{tag}</span>
              </Box>
            ))}
          </Box>
        </Card>
      ))}
    </>
  );
};

export default SessionList;
