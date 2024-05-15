import styles from "./speaker.module.css";
import axios from "axios";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "src/constants";

// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const AddSpeakerForm = () => {
  const router = useRouter();

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const eventId = useSelector((state) => state?.event?.eventID);
  const CookiesToken = Cookies.get("token");

  const token = CookiesToken || state_token;

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/event/event_sessions/`,
          { event_id: eventId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
            },
          }
        );
        setSessions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSession();
  }, []);

  const [formData, setFormData] = useState({
    // State to hold form data
    speakerName: "",
    emailAddress: "",
    contactNumber: "",
    location: "",
    designation: "",
    organization: "",
    description: "",
    photo: null,
    personalWebsite: "",
    twitterLink: "",
    linkedInLink: "",
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };


  const handleSession = (event) => {
    // If you want to handle multiple selections, you need to get all selected options
    const selectedSessionId = event.target.value;
    setSelectedSession(selectedSessionId);    
  };
  
  

  const [logoPreview, setLogoPreview] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, photo: file });
    // Generate preview URL for logo
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email address is in a valid format
    if (!emailPattern.test(formData.emailAddress)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // if (!selectedSession.length) {
    //   toast.error("Please select a session");
    //   return;
    // }

    const fieldsToCheck = [
      { field: formData.speakerName, message: "Please enter name" },
      { field: formData.emailAddress, message: "Please enter email" },
      { field: selectedSession, message: "Please select session" },
      { field: formData.photo, message: "Please upload image" },
      { field: formData.location, message: "Please enter location" },
      { field: formData.designation, message: "Please enter designation" },
      { field: formData.description, message: "Please enter description" },
      { field: formData.organization, message: "Please enter organization" },
    ];

    for (const fieldObj of fieldsToCheck) {
      if (!fieldObj.field) {
        toast.error(fieldObj.message);
        return; // Stop further execution if any field is empty
      }
    }
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.speakerName);
    formDataToSend.append("event_id", eventId);
    formDataToSend.append("email", formData.emailAddress);
    formDataToSend.append("session_id", selectedSession);
    formDataToSend.append("user_type", 'Speaker');
    // formDataToSend.append("speaker_user_profile_photo", formData.photo);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("twitter", formData.twitterLink);
    formDataToSend.append("website", formData.personalWebsite);
    formDataToSend.append("linkdin", formData.linkedInLink);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("organization_name", formData.organization);
    formDataToSend.append("bio", formData.description);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/create_speaker/`,
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
        speakerName: "",
        emailAddress: "",
        contactNumber: "",
        location: "",
        designation: "",
        organization: "",
        description: "",
        photo: null,
        personalWebsite: "",
        twitterLink: "",
        linkedInLink: "",
      });
      setLogoPreview(null);

      toast.success("The Speaker added successfully");
      router.push("/speaker");
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
            <label className={styles.label}>Speaker Name</label>
          </div>
          <div>
            <input
              type="text"
              id="speakerName"
              onChange={handleInputChange("speakerName")}
              value={formData.speakerName}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Email Address</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.emailAddress}
              id="emailAddress"
              onChange={handleInputChange("emailAddress")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Contact Number</label>
          </div>
          <div>
            <input
              type="number"
              min="0"
              value={formData.contactNumber}
              id="contactNumber"
              onChange={handleInputChange("contactNumber")}
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
            <label className={styles.label}>Location</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.location}
              id="location"
              onChange={handleInputChange("location")}
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
              value={formData.designation}
              id="designation"
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
              value={formData.organization}
              id="organization"
              onChange={handleInputChange("organization")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.fullWidth}>
        <div>
          <label className={styles.label}>Bio</label>
        </div>
        <div>
          <textarea
            type="text"
            value={formData.description}
            id="description"
            onChange={handleInputChange("description")}
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
        <div className={styles.column} style={{ width: "48%" }}>
          <div>
            <label className={styles.label}>Sessions</label>
          </div>
          <div>
            <select
              value={selectedSession}
              onChange={handleSession}
              className={styles.input}
            >
              <option value="">Choose session</option>
              {sessions.map((session) => (
                <option key={session.session_id} value={session.session_id}>
                  {session.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.column} style={{ width: "48%" }}>
          <div>
            <label className={styles.label}>Photo</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              accept="image/*"
              value={formData?.photo?.file?.name}
              id="photo"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            <label htmlFor="photo" className={styles.customButton}>
              Choose File
            </label>
          </div>
          {logoPreview && (
            <img
              src={logoPreview}
              style={{marginTop:"1rem",width:"50%"}}
              alt="Logo Preview"
              className={styles.previewImage}
            />
          )}
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
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
            <label className={styles.label}>Personal Website</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.personalWebsite}
              id="personalWebsite"
              onChange={handleInputChange("personalWebsite")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Twitter Link</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.twitterLink}
              id="twitterLink"
              onChange={handleInputChange("twitterLink")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>LinkedIn Link</label>
          </div>
          <div>
            <input
              type="text"
              value={formData.linkedInLink}
              id="linkedInLink"
              onChange={handleInputChange("linkedInLink")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>{/* ... other divs */}</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSpeakerForm;
