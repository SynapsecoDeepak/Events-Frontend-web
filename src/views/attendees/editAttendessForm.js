import styles from "./speaker.module.css";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";

const EditAttendees = () => {
  const router = useRouter();

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const [UserEditAbleData, SetUserEditAbleData] = useState("");
  const attendeeIDforUpdate = useSelector((state) => state?.event?.eventEditDataID);

  const eventId = useSelector((state) => state?.event?.eventID);

  console.log("UserEditAbledata", UserEditAbleData);
  const CookiesToken = Cookies.get("token");

  const token = CookiesToken || state_token;

  const [formData, setFormData] = useState({
    // State to hold form data
    firstName: UserEditAbleData?.attendee_user?.name,
    lastName: "",
    email: UserEditAbleData?.attendee_user?.email,
    contact: "",
    organization: UserEditAbleData?.attendee_user?.organization_name,
    designation: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    getAttendeeData();
  }, []);

  const getAttendeeData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/user_details/${attendeeIDforUpdate}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
        },
      });
      SetUserEditAbleData(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("attendee_user_name", formData.firstName );
    // formDataToSend.append("attendee_user_name", formData.lastName);
    // formDataToSend.append("attendee_user_email", formData.email);
    formDataToSend.append("attendee_user_id", attendeeIDforUpdate);
    formDataToSend.append("location", formData.address);
    formDataToSend.append("organization_name", formData.organization);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("county_of_residence", formData.country);

    try {
      const response = await axios.patch(`${BASE_URL}/user/newattendees/${attendeeIDforUpdate}/`,formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      // setFormData({
      //   speakerName: "",
      //   emailAddress: "",
      //   contactNumber: "",
      //   location: "",
      //   designation: "",
      //   organization: "",
      //   description: "",
      //   sessions: "",
      //   photo: {},
      //   personalWebsite: "",
      //   twitterLink: "",
      //   linkedInLink: "",
      // });
      toast.success("The attendee updated successfully");
      router.back();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>First Name</label>
          </div>
          <div>
            <input
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Last Name</label>
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Email</label>
          </div>
          <div>
            <input
            disabled
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Contact</label>
          </div>
          <div>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange("contact")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Designation</label>
          </div>
          <div>
            <input
              type="text"
              id="designation"
              value={formData.designation}
              onChange={handleInputChange("designation")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Organization</label>
          </div>
          <div>
            <input
              type="text"
              id="organization"
              value={formData.organization}
              onChange={handleInputChange("organization")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Address</label>
          </div>
          <div>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange("address")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>State</label>
          </div>
          <div>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleInputChange("state")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>City</label>
          </div>
          <div>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleInputChange("city")}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditAttendees;
