import React, { useEffect } from "react";
import BlankLayout2 from "src/@core/layouts/AnotherBlankLayout";
import Image from "next/image";
import group from "src/images/Group 2597.png";
import group1 from "src/images/Group 2598.png";
import group2 from "src/images/Group 2599.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { eventIDByQuery, eventPublicData } from "src/store/slice/eventSlice";
import axios from "axios";
import { BASE_URL } from "src/constants";

const EventPage = () => {
  const router = useRouter();

  
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch an action to save the ID in Redux when the page loads
    if(router.query && router.query.id){
      const { id } = router.query;
      console.log('event id from url',id)
        dispatch(eventIDByQuery(id));
      }
      const fetchEventData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/event/eventpage/${id}/`, {
          });
          dispatch(eventPublicData(response.data))
          console.log('event data to float',response.data)
        } catch (error) {
          console.error("api error", error);
        }
      };
      fetchEventData();

    }, [router.query,dispatch]);


    const rowsDetails = useSelector(
      (state) => state.event?.eventPublicData?.data
    );
  
    console.log('row details ; ',rowsDetails)


    const startDate = rowsDetails?.start_date; // Assuming rowsDetails is your data object
if (startDate) {
  const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
}
    const endDate = rowsDetails?.end_date; // Assuming rowsDetails is your data object
if (endDate) {
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
}


  const handleRoute = () => {
    router.push('/Attendee-registration')
  };

  return (
    <>
      <div className="main_div">
        <div className="image_div">
          <img src={rowsDetails?.event_banner} alt="logo"  width="100%" />
        </div>
        <div className="event_date">
          <div className="calender">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="50.774"
              viewBox="0 0 56 50.774"
            >
              <g
                id="_2290847_calendar_date_meeting_reminder_time_icon"
                data-name="2290847_calendar_date_meeting_reminder_time_icon"
                transform="translate(-24 -45.777)"
              >
                <line
                  id="Line_13"
                  data-name="Line 13"
                  x2="49.408"
                  transform="translate(27.296 52.08)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1256"
                  data-name="Path 1256"
                  d="M455.868,90.968a2.3,2.3,0,0,1,2.3,2.3"
                  transform="translate(-379.164 -38.888)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_14"
                  data-name="Line 14"
                  y2="38.872"
                  transform="translate(79 54.377)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1257"
                  data-name="Path 1257"
                  d="M458.164,434.041a2.305,2.305,0,0,1-2.3,2.3"
                  transform="translate(-379.164 -340.792)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_15"
                  data-name="Line 15"
                  x1="49.408"
                  transform="translate(27.296 95.551)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1258"
                  data-name="Path 1258"
                  d="M27.3,436.343a2.3,2.3,0,0,1-2.3-2.3"
                  transform="translate(0 -340.792)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_16"
                  data-name="Line 16"
                  y1="38.872"
                  transform="translate(25 54.377)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1259"
                  data-name="Path 1259"
                  d="M25,93.265a2.3,2.3,0,0,1,2.3-2.3"
                  transform="translate(0 -38.888)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <g
                  id="Group_2519"
                  data-name="Group 2519"
                  transform="translate(33.471 46.777)"
                >
                  <g
                    id="Group_2517"
                    data-name="Group 2517"
                    transform="translate(0 0)"
                  >
                    <line
                      id="Line_17"
                      data-name="Line 17"
                      y2="9.38"
                      transform="translate(2.295)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="Path_1260"
                      data-name="Path 1260"
                      d="M97.89,132.06a2.3,2.3,0,1,0-2.295-2.3,2.3,2.3,0,0,0,2.295,2.3"
                      transform="translate(-95.595 -117.783)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                  <g
                    id="Group_2518"
                    data-name="Group 2518"
                    transform="translate(32.468 0)"
                  >
                    <line
                      id="Line_18"
                      data-name="Line 18"
                      y2="9.683"
                      transform="translate(2.296)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="Path_1261"
                      data-name="Path 1261"
                      d="M368.455,132.06a2.3,2.3,0,1,0-2.3-2.3,2.3,2.3,0,0,0,2.3,2.3"
                      transform="translate(-366.159 -117.783)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </g>
                <line
                  id="Line_19"
                  data-name="Line 19"
                  x2="41.946"
                  transform="translate(31.028 66.694)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_20"
                  data-name="Line 20"
                  x2="2.037"
                  transform="translate(32.302 72.541)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1262"
                  data-name="Path 1262"
                  d="M102.826,261.477a1.279,1.279,0,0,1,1.278,1.274"
                  transform="translate(-68.487 -188.936)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_21"
                  data-name="Line 21"
                  y2="2.04"
                  transform="translate(35.617 73.815)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1263"
                  data-name="Path 1263"
                  d="M104.1,289.089a1.282,1.282,0,0,1-1.278,1.276"
                  transform="translate(-68.487 -213.235)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_22"
                  data-name="Line 22"
                  x1="2.037"
                  transform="translate(32.302 77.13)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1264"
                  data-name="Path 1264"
                  d="M76.5,290.365a1.28,1.28,0,0,1-1.275-1.276"
                  transform="translate(-44.202 -213.235)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_23"
                  data-name="Line 23"
                  y1="2.04"
                  transform="translate(31.028 73.815)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1265"
                  data-name="Path 1265"
                  d="M75.23,262.751a1.277,1.277,0,0,1,1.275-1.274"
                  transform="translate(-44.202 -188.936)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_24"
                  data-name="Line 24"
                  x2="2.038"
                  transform="translate(56.472 72.541)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1266"
                  data-name="Path 1266"
                  d="M304.248,261.477a1.278,1.278,0,0,1,1.276,1.274"
                  transform="translate(-245.738 -188.936)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_25"
                  data-name="Line 25"
                  y2="2.04"
                  transform="translate(59.786 73.815)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1267"
                  data-name="Path 1267"
                  d="M305.524,289.089a1.281,1.281,0,0,1-1.276,1.276"
                  transform="translate(-245.738 -213.235)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_26"
                  data-name="Line 26"
                  x1="2.038"
                  transform="translate(56.472 77.13)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1268"
                  data-name="Path 1268"
                  d="M277.911,290.365a1.281,1.281,0,0,1-1.276-1.276"
                  transform="translate(-221.439 -213.235)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_27"
                  data-name="Line 27"
                  y1="2.04"
                  transform="translate(55.196 73.815)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1269"
                  data-name="Path 1269"
                  d="M276.635,262.751a1.278,1.278,0,0,1,1.276-1.274"
                  transform="translate(-221.439 -188.936)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_28"
                  data-name="Line 28"
                  x2="2.04"
                  transform="translate(68.557 72.541)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1270"
                  data-name="Path 1270"
                  d="M404.977,261.477a1.277,1.277,0,0,1,1.274,1.274"
                  transform="translate(-334.38 -188.936)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_29"
                  data-name="Line 29"
                  y2="2.04"
                  transform="translate(71.871 73.815)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1271"
                  data-name="Path 1271"
                  d="M406.251,289.089a1.28,1.28,0,0,1-1.274,1.276"
                  transform="translate(-334.38 -213.235)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_30"
                  data-name="Line 30"
                  x1="2.04"
                  transform="translate(68.557 77.13)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M378.639,290.365a1.279,1.279,0,0,1-1.274-1.276"
                  transform="translate(-310.081 -213.235)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_31"
                  data-name="Line 31"
                  y1="2.04"
                  transform="translate(67.284 73.815)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1273"
                  data-name="Path 1273"
                  d="M377.363,262.751a1.276,1.276,0,0,1,1.274-1.274"
                  transform="translate(-310.079 -188.936)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_32"
                  data-name="Line 32"
                  x2="2.037"
                  transform="translate(32.302 84.34)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1274"
                  data-name="Path 1274"
                  d="M102.826,359.8a1.28,1.28,0,0,1,1.278,1.274"
                  transform="translate(-68.487 -275.462)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_33"
                  data-name="Line 33"
                  y2="2.042"
                  transform="translate(35.617 85.614)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1275"
                  data-name="Path 1275"
                  d="M104.1,387.432a1.28,1.28,0,0,1-1.278,1.274"
                  transform="translate(-68.487 -299.776)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_34"
                  data-name="Line 34"
                  x1="2.037"
                  transform="translate(32.302 88.929)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1276"
                  data-name="Path 1276"
                  d="M76.5,388.706a1.279,1.279,0,0,1-1.275-1.274"
                  transform="translate(-44.202 -299.776)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_35"
                  data-name="Line 35"
                  y1="2.042"
                  transform="translate(31.028 85.614)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1277"
                  data-name="Path 1277"
                  d="M75.23,361.076A1.279,1.279,0,0,1,76.5,359.8"
                  transform="translate(-44.202 -275.462)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_36"
                  data-name="Line 36"
                  x2="2.039"
                  transform="translate(44.387 84.34)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1278"
                  data-name="Path 1278"
                  d="M203.545,359.8a1.279,1.279,0,0,1,1.276,1.274"
                  transform="translate(-157.12 -275.462)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_37"
                  data-name="Line 37"
                  y2="2.042"
                  transform="translate(47.701 85.614)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1279"
                  data-name="Path 1279"
                  d="M204.822,387.432a1.279,1.279,0,0,1-1.276,1.274"
                  transform="translate(-157.12 -299.776)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_38"
                  data-name="Line 38"
                  x1="2.039"
                  transform="translate(44.387 88.929)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1280"
                  data-name="Path 1280"
                  d="M177.2,388.706a1.28,1.28,0,0,1-1.276-1.274"
                  transform="translate(-132.813 -299.776)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_39"
                  data-name="Line 39"
                  y1="2.042"
                  transform="translate(43.111 85.614)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1281"
                  data-name="Path 1281"
                  d="M175.924,361.076A1.28,1.28,0,0,1,177.2,359.8"
                  transform="translate(-132.813 -275.462)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_40"
                  data-name="Line 40"
                  x2="2.038"
                  transform="translate(56.472 84.34)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1282"
                  data-name="Path 1282"
                  d="M304.248,359.8a1.28,1.28,0,0,1,1.276,1.274"
                  transform="translate(-245.738 -275.462)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_41"
                  data-name="Line 41"
                  y2="2.042"
                  transform="translate(59.786 85.614)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1283"
                  data-name="Path 1283"
                  d="M305.524,387.432a1.28,1.28,0,0,1-1.276,1.274"
                  transform="translate(-245.738 -299.776)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_42"
                  data-name="Line 42"
                  x1="2.038"
                  transform="translate(56.472 88.929)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1284"
                  data-name="Path 1284"
                  d="M277.911,388.706a1.28,1.28,0,0,1-1.276-1.274"
                  transform="translate(-221.439 -299.776)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  id="Line_43"
                  data-name="Line 43"
                  y1="2.042"
                  transform="translate(55.196 85.614)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_1285"
                  data-name="Path 1285"
                  d="M276.635,361.076a1.28,1.28,0,0,1,1.276-1.274"
                  transform="translate(-221.439 -275.462)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <g
                  id="Group_2520"
                  data-name="Group 2520"
                  transform="translate(43.595 72.658)"
                >
                  <line
                    id="Line_44"
                    data-name="Line 44"
                    x2="1.699"
                    y2="1.56"
                    transform="translate(0 1.842)"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <line
                    id="Line_45"
                    data-name="Line 45"
                    x1="3.116"
                    y2="3.402"
                    transform="translate(1.699)"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
                <g
                  id="Group_2521"
                  data-name="Group 2521"
                  transform="translate(68.108 84.457)"
                >
                  <line
                    id="Line_46"
                    data-name="Line 46"
                    x2="1.699"
                    y2="1.558"
                    transform="translate(0 1.844)"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <line
                    id="Line_47"
                    data-name="Line 47"
                    x1="3.116"
                    y2="3.402"
                    transform="translate(1.699)"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="event_text">
            <p className="first">{rowsDetails?.name}</p>
            <p className="second" style={{fontSize:'1rem'}}>{formattedStartDate} to {formattedEndDate}</p>
            {/* <p className="third">{rowsDetails?.time}-{rowsDetails?.end_time} </p> */}
            {/* <p className="third">10:00Am - 4:00Pm</p> */}
            {/* <p className="four">2024</p> */}
          </div>
        </div>

        {/* <div className="right_div">
          <h3>{rowsDetails?.event_short_description}</h3>
          <p>
          {rowsDetails?.event_long_description}
          </p>
        </div> */}

<div className="right_div">
        <h3>{rowsDetails?.event_short_description}</h3>
        <div dangerouslySetInnerHTML={{ __html: rowsDetails?.event_long_description }} />
      </div>
      </div>
      <div className="bottondiv">
        <button className="Reg_botton" onClick={handleRoute}>
          Register
        </button>
      </div>

      <div className="threediv">
        <div className="firstimage">
          <Image className="firstimg" src={group} alt="logo" height={300} width={400} />
          <div className="secondimg">
            <Image
              className="inside_image"
              src="/staff.svg"
              alt="logo"
              height={100}
              width={100}
            />
          </div>
        </div>
        <div className="secondimage">
          <Image src={group1} alt="logo" height={300} width={400} />
          <div className="secondimg">
            <Image
              className="inside_image"
              src="/sponsar.svg"
              alt="logo"
              height={100}
              width={100}
            />
          </div>
        </div>
        <div className="thirdimage">
          <Image src={group2} alt="logo" height={300} width={400} />
          <div className="secondimg">
            <Image
              className="inside_image"
              src="/human.svg"
              alt="logo"
              height={100}
              width={100}
            />
          </div>
        </div>
      </div>
    </>
  );
};
EventPage.getLayout = (page) => <BlankLayout2>{page}</BlankLayout2>;

export default EventPage;
