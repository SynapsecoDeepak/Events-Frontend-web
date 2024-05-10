import styles from "./speaker.module.css";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";

const EditSpeakerForm = () => {
  const router = useRouter();
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  // const UserEditAbleData = useSelector(    (state) => state?.event?.speakerEditData);

  const [UserEditAbleData, SetUserEditAbleData] = useState("");


  const eventId = useSelector((state) => state?.event?.eventID);
  const speakerIdForUpdate = useSelector((state) => state?.event?.eventEditDataID);

  console.log("UserEditAbledata", UserEditAbleData);
  const CookiesToken = Cookies.get("token");

  const token = CookiesToken || state_token;





  const [formData, setFormData] = useState({
    // State to hold form data
    speakerName: UserEditAbleData?.name,
    emailAddress: "",
    contactNumber: "",
    location: UserEditAbleData?.location,
    designation: "",
    organization: UserEditAbleData?.organization_name,
    description: UserEditAbleData?.bio,
    sessions: "",
    photo: null,
    personalWebsite: "",
    twitterLink: "",
    linkedInLink: "",
  });

  useEffect(() => {
    getSpeakerData();
  }, []);

  const getSpeakerData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/user_details/${speakerIdForUpdate}/`, {
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


  useEffect(() => {
    // Update form data once UserEditAbleData is available
    if (UserEditAbleData) {
      console.log("use data to fil ", UserEditAbleData);
      setFormData({
        speakerName: UserEditAbleData?.name,
        emailAddress: UserEditAbleData?.email,
        contactNumber: UserEditAbleData?.contactNumber || 'not available',
        location: UserEditAbleData?.location || 'not available',
        designation:  UserEditAbleData?.location || 'not available',
        organization: UserEditAbleData?.organization_name  ||'not available',
        description: UserEditAbleData?.description || 'not available',
        sessions: UserEditAbleData?.session || 'not available',
        photo: UserEditAbleData?.profile_photo || 'not available',
        personalWebsite: UserEditAbleData?.website  ||'not available',
        twitterLink: UserEditAbleData?.twitter  ||'not available',
        linkedInLink:UserEditAbleData?.linkdin  ||'not available', 
      });
      setLogoPreview(UserEditAbleData?.profile_photo);

    }
  }, [UserEditAbleData]);

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const [logoPreview, setLogoPreview] = useState(UserEditAbleData?.profile_photo);

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
    
    const fieldsToCheck = [
      { field: formData.speakerName, message: 'Please enter name' },
      { field: formData.emailAddress, message: 'Please enter email' },
      { field: formData.sessions, message: 'Please select session' },
      { field: formData.photo, message: 'Please upload image' },
      { field: formData.location, message: 'Please enter location' },
      { field: formData.designation, message: 'Please enter designation' },
      { field: formData.description, message: 'Please enter description' },
      { field: formData.organization, message: 'Please enter organization' },
    ];
    
    for (const fieldObj of fieldsToCheck) {
      if (!fieldObj.field) {
        toast.error(fieldObj.message);
        return; // Stop further execution if any field is empty
      }
    }

    const formDataToSend = new FormData();

    formDataToSend.append("speaker_user_name", formData.speakerName);
    formDataToSend.append("speaker_user_id",UserEditAbleData?.speaker_user?.id );
    formDataToSend.append("speaker_event", [eventId]);
    formDataToSend.append("speaker_user_email", formData.emailAddress);
    formDataToSend.append("session_speaker", formData.sessions);
    formDataToSend.append("speaker_user_profile_photo", formData.photo);
    formDataToSend.append("speaker_user_location", formData.location);
    formDataToSend.append("speaker_user_website", formData.personalWebsite);
    formDataToSend.append("speaker_user_twitter", formData.twitterLink);
    formDataToSend.append("speaker_user_linkdin", formData.linkedInLink);


    if (typeof formData.photo === 'string') {
      try {
        const response = await axios.get(formData.photo, { responseType: 'blob' });
        const file = new File([response.data], 'logo.png', { type: response.data.type });
        formDataToSend.append("speaker_user_profile_photo", file);
      } catch (error) {
        console.error('Error fetching logo:', error);
        toast.error('Error fetching logo. Please upload a new logo.');
        return;
      }
    } else {
      formDataToSend.append("speaker_user_profile_photo", formData.photo);
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/user/newspeakers/${UserEditAbleData?.id}/`,  
              formDataToSend,
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
      toast.success("The speaker updated successfully");
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
              disabled
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
              type="text"
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
          <label className={styles.label}>Description</label>
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
            <input
              placeholder="choose your sessions"
              className={styles.input}
              type="text"
              value={formData.sessions}
              id="sessions"
              onChange={handleInputChange("sessions")}
            />
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
            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
          </div>
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className={styles.previewImage}
            />
          )}
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

export default EditSpeakerForm;
