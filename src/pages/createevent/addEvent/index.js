import styles from "src/views/speaker/speaker.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const EventCreateForm = () => {
  const router = useRouter();

  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const eventId = useSelector((state) => state?.event?.eventID);
  const CookiesToken = Cookies.get("token");

  const token = CookiesToken || state_token;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [venueName, setVenueName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    // Fetch venue data from the map API
    const fetchVenues = async () => {
      try {
        const response = await axios.get("your_map_api_endpoint");
        setVenues(response.data); // Assuming the response contains an array of venue objects
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleVenueInputChange = (event) => {
    setVenueName(event.target.value);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleVenueChange = (event) => {
    setSelectedVenue(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmitCustomVenue = async () => {
    setShowModal(false);
    try {
      // Construct form data with venue name and PDF file
      const formData = new FormData();
      formData.append("venue", venueName);
      formData.append("pdfFile", pdfFile);

      // Send POST request to the API
      const response = await axios.post("your_post_api_endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success response
      console.log("Response:", response.data);

      // Close modal

      // Clear form fields
      setVenueName("");
      setPdfFile(null);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    LongDescription: "",
    sponsor_tagline: "",
    description: "",
    logo: null,
    thumbnail: null,
    email: "",
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setFormData({ ...formData, logo: file });
  // };

  // const handleImageChange2 = (event) => {
  //   const file = event.target.files[0];
  //   setFormData({ ...formData, thumbnail: file });
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, logo: file });

    // Generate preview URL for logo
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, thumbnail: file });

    // Generate preview URL for thumbnail
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formDataToSend = new FormData(); // Create a new FormData object

    // Append each field to FormData object
    formDataToSend.append("name", formData.name);
    formDataToSend.append("sponsor_type", formData.type);
    formDataToSend.append("sponsor_event", eventId);
    formDataToSend.append("sponsor_tagline", formData.sponsor_tagline);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("logo", formData.logo); // Append logo file
    formDataToSend.append("thumbnail", formData.thumbnail); // Append thumbnail file
    try {
      const response = await axios.post(
        `${BASE_URL}/event/sponsors/`,
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
        shortDescription: "",
        LongDescription: "",
        sponsor_tagline: "",
        description: "",
        logo: null,
        thumbnail: null,
        email: "",
      });
      toast.success("The Sponsor added successfully");
      // router.back();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
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
            <label className={styles.label}>Event Name</label>
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
            <label className={styles.label}>Short Description</label>
          </div>
          <div>
            <input
              id="type"
              onChange={handleInputChange("type")}
              value={formData.shortDescription}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.column}>
          <div>
            <label className={styles.label}>Venue</label>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <select
              value={selectedVenue}
              onChange={handleVenueChange}
              className={styles.input}
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
            <Button variant="outlined" onClick={handleModalToggle}>
              <Add />
            </Button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add Venue</h2>
            <label>Venue Name:</label>
            <input
              type="text"
              value={venueName}
              onChange={handleVenueInputChange}
            />
            <label>Upload PDF:</label>
            <input type="file" onChange={handlePdfFileChange} />
            <Button variant="contained" onClick={handleSubmitCustomVenue}>
              OK
            </Button>
            <Button variant="outlined" onClick={handleModalToggle}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Long description div */}
      <div
        className={styles.column}
        style={{ width: "100%", marginTop: "2rem" }}
      >
        <div>
          <label className={styles.label}>Long Description</label>
        </div>
        <div>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            theme="snow" // or 'bubble' for a simpler toolbar
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "2rem",
          justifyContent: "space-between",
          gap: "10em",
          marginBottom: 25,
        }}
      >
        {/* start data and time  */}
        <div
          style={{
            display: "flex",
            width: "50%",
            marginTop: "2rem",
            justifyContent: "flex-start",
            gap: "1em",
            marginBottom: 25,
          }}
        >
          <div className={styles.column}>
            <div>
              <label className={styles.label}>Start Date</label>
            </div>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div>
              <label className={styles.label}>Start Time</label>
            </div>
            <div>
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* end data and time  */}
        <div
          style={{
            display: "flex",
            width: "50%",
            marginTop: "2rem",
            justifyContent: "flex-start",
            gap: "1em",
            marginBottom: 25,
          }}
        >
          <div className={styles.column}>
            <div>
              <label className={styles.label}>End Date</label>
            </div>
            <div>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div>
              <label className={styles.label}>End Time</label>
            </div>
            <div>
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className={styles.input}
              />
            </div>
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
      ></div>

      {/* logo and thumbnail div */}
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
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className={styles.previewImage}
            />
          )}
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
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
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

export default EventCreateForm;