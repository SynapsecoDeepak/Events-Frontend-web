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
import styles from "./speaker.module.css";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";

// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const EditSponsorsForm = () => {
  const router = useRouter();

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const UserEditAbleData = useSelector((state) => state?.event?.sponsorsEditData );
  const eventId = useSelector((state) => state?.event?.eventID);
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;

  const [formData, setFormData] = useState({
    name: UserEditAbleData.contact_primary_name,
    sponsor_tagline: "",
    description: "",
    logo: UserEditAbleData.logo,
    thumbnail: null,
    email: UserEditAbleData.email,
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, logo: file });
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, thumbnail: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formDataToSend = new FormData(); // Create a new FormData object

    // Append each field to FormData object
    formDataToSend.append("name", formData.name);
    // formDataToSend.append("sponsor_user",UserEditAbleData?.sponsor_user?.id );
    // formDataToSend.append("sponsor_event", [eventId]);
    formDataToSend.append("sponsor_tagline", formData.sponsor_tagline);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("logo", formData.logo); // Append logo file
    formDataToSend.append("thumbnail", formData.thumbnail); // Append thumbnail file
    try {
      const response = await axios.patch(
        `${BASE_URL}/event/sponsors/${UserEditAbleData.sponsor_id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      setFormData({
        name: "",
        sponsor_tagline: "",
        description: "",
        logo: null,
        thumbnail: null,
        email: "",
      });
      toast.success("The Sponsor added successfully");
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
            <label className={styles.label}>Sponsors Name</label>
          </div>
          <div>
            <input
              id="name"
              onChange={handleInputChange("name")}
              value={formData.name}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Sponsors Tagline</label>
          </div>
          <div>
            <input
              id="sponsor_tagline"
              onChange={handleInputChange("sponsor_tagline")}
              value={formData.sponsor_tagline}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Contact Email</label>
          </div>
          <div>
            <input
              id="email"
              onChange={handleInputChange("email")}
              value={formData.email}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          gap: "10em",
          marginBottom: 25,
        }}
      >
        <div className={styles.column} style={{ width: "35%" }}>
          <div>
            <label className={styles.label}>Logo</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              id="logo"
              onChange={handleImageChange}
              value={formData?.logo?.file?.name}
              className={styles.fileInput}
            />
            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
          </div>
        </div>
        <div className={styles.column} style={{ width: "35%" }}>
          <div>
            <label className={styles.label}>Thumbnail</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              id="thumbnail"
              onChange={handleImageChange2}
              value={formData?.thumbnail?.file?.name}
              className={styles.fileInput}
            />
            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
          </div>
        </div>
      </div>
      <div className={styles.fullWidth}>
        <div>
          <label className={styles.label}>Description</label>
        </div>
        <div>
          <textarea
            id="description"
            onChange={handleInputChange("description")}
            value={formData.description}
            rows="6"
            className={styles.textarea}
          />
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
        {/* <div className={styles.column} style={{width:'48%'}}>
          <div>
            <label className={styles.label}>Sessions</label>
          </div>
          <div>
            <input
              placeholder="choose your sessions"
              className={styles.input}
            />
          </div>
        </div> */}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditSponsorsForm;
