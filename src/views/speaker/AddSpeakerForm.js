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
// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const AddSpeakerForm = () => {
  const router = useRouter();

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
            <input className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Email Address</label>
          </div>
          <div>
            <input className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Contact Number</label>
          </div>
          <div>
            <input className={styles.input} />
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
            <input className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Designation</label>
          </div>
          <div>
            <input className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Organization</label>
          </div>
          <div>
            <input className={styles.input} />
          </div>
        </div>
      </div>
      <div className={styles.fullWidth}>
        <div>
          <label className={styles.label}>Description</label>
        </div>
        <div>
          <textarea rows="6" className={styles.textarea} />
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
        <div className={styles.column} style={{width:'48%'}}>
          <div>
            <label className={styles.label}>Sessions</label>
          </div>
          <div>
            <input
              placeholder="choose your sessions"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.column} style={{width:'48%'}}>
          <div>
            <label className={styles.label}>Photo</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              id="fileInput"
              className={styles.fileInput}
            />
            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
        <span style={{fontSize:11,color:'#707070'}}>Example: Accepts PNG, GIF, JPG, JPEG</span>
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
            <input className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Twitter Link</label>
          </div>
          <div>
            <input className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>LinkedIn Link</label>
          </div>
          <div>
            <input className={styles.input} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>{/* ... other divs */}</div>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className={styles.submitButton}>Submit</button>
      </div>
    </div>
  );
};

export default AddSpeakerForm;
