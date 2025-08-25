"use client";
import Link from "next/link";
import style from "../../styles/page.module.css";
import styles from "./form.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { strict } from "assert";

function FormAction() {
  const [courseName, setCourseName] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [courseSummary, setCourseSummary] = useState("");
  const [Id, setUserId] = useState(0);
  useEffect(() => {
    const rawUser = sessionStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  const postCourse = async (): Promise<number | null> => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/newCourse`, {
        courseName,
        courseLink,
        courseSummary,
        Id,
      });
      localStorage.setItem("selectedCourse", JSON.stringify(data));
      setCourseName("");
      setCourseLink("");
      setCourseSummary("");
      return data;
    } catch {
      toast.error("Unable to create course");
      return null;
    }
  };

  return (
    <div style={{ height: "100vh", alignContent: "center" }}>
      <Link
        href="/"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          display: "flex",
          borderRadius: "40px",
          zIndex: "9999",
          color: "#f2f2f2",
          cursor: "pointer",
          flexDirection: "column",
          backgroundColor: "black",
          padding: "9px",
        }}
      >
        Back
      </Link>
      <div
        className={styles.container}
        style={{
          borderRadius: "9%",
          border: "2px solid #ccc",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          margin: "auto",
        }}
      >
        <div>
          <div>
            <strong className={styles.labels}>add course</strong>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              className={styles.boxes}
              type="text"
              placeholder="course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <input
              className={styles.boxes}
              type="text"
              placeholder="course Link"
              value={courseLink}
              onChange={(e) => setCourseLink(e.target.value)}
            />
            <input
              className={styles.boxes}
              type="text"
              placeholder="course summary"
              value={courseSummary}
              onChange={(e) => setCourseSummary(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            minWidth: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <div className={style.rgbBorder}>
            <button
              className={style.buttonSubmit}
              style={{ minWidth: "200px" }}
              onClick={postCourse}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAction;
