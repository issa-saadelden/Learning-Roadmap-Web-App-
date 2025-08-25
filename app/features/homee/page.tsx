import styles from "../styles/page.module.css";
import "./home.modula.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import TopBar from "./topBar";

type Course = {
  courseName: string;
  courseLink: string;
  courseSummary: string;
  corseId: number;
};

export default function Homee() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Step 1: Get user ID from email
  const fetchUserId = async (email: string): Promise<number | null> => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${email}`
      );
      const userArray = response.data.result;

      if (userArray && userArray.length > 0 && userArray[0].id != null) {
        return userArray[0].id;
      } else {
        toast.error("User ID not found");
        return null;
      }
    } catch (error: any) {
      console.error("User fetch error:", error.message);
      toast.error("Failed to fetch user ID");
      return null;
    }
  };

  // Step 2: Fetch courses using user ID
  const fetchCourses = async (userId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${userId}`
      );
      const courses = response.data.result || [];
      setCourses(courses);
    } catch (error: any) {
      console.error("Course fetch error:", error.message);
      toast.error("Failed to load courses");
    }
  };

  // Step 3: Combine both steps on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const email = user.email;

        if (email) {
          fetchUserId(email).then((userId) => {
            if (userId !== null) {
              fetchCourses(userId);
            }
          });
        } else {
          toast.error("Email not found in session");
        }
      } catch (err) {
        toast.error("Failed to parse session user");
        console.error("Session parse error:", err);
      }
    } else {
      toast.warn("No user session found. Please log in.");
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    maxWidth: "800px",
    minWidth: "700px",
    maxHeight: "100vh",
    height: "100%",
    margin: "0 auto",
    padding: "10px",
  };

  function box(text: string, href: string, courseId: number, key: number) {
    return (
      <div style={containerStyle}>
        <div className={styles.rgbBorder}>
          <div style={{ margin: 0 }}>
            <Link
              className={styles.pagesbutton}
              href={`${href}?courseId=${courseId}`}
            >
              {text}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <TopBar />
      <div className={styles.topofpage}>
        <div
          style={{
            zIndex: "1100",

            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            textShadow: `
          -1px -1px 0 #000,
           1px -1px 0 #000,
          -1px  1px 0 #000,
           1px  1px 0 #000
        `,
            fontWeight: 500,
            lineHeight: 2.4,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontWeight: 700,
              fontSize: "2.5rem",
              textShadow: `
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000
    `,
            }}
          >
            Learning Process
          </h1>
          {courses.map((course, index) => (
            <div key={index} style={{ fontSize: 20 }}>
              <li>
                <strong style={{ paddingRight: "20px" }}>
                  {course.courseName}
                </strong>
                {"{ "}
                {course.courseSummary}
                {" }"}
              </li>
            </div>
          ))}
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="container">
          <div className="divider">
            <div className="line" />
            <span className="divider-text">Create Course</span>
            <div className="line" />
          </div>

          <div className="course-box">
            <Link href="/features/learn/learnform" style={{ fontSize: "50px" }}>
              start here
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          <div style={{ marginTop: "50px" }}>
            {courses.map((course, index) => (
              <React.Fragment key={index}>
                {box(
                  course.courseName,
                  "/features/pages",
                  course.corseId,
                  index
                )}
              </React.Fragment>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignContent: "center",
              gap: "15px",
              padding: "20px",
              minHeight: "100px",
              marginTop: "50px",
              color: "grey",
              fontSize: "20px",

              textAlign: "center",
            }}
          >
            <Link href="/features/learn/learnform">Add courses</Link>
          </div>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "40px" }}>
        Copyright &copy; 2025 Issa
      </footer>
    </main>
  );
}
