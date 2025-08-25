"use client";

import styles from "../styles/page.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function ThePage() {
  return (
    <div lang="en">
      {/* Back Button */}
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

      {/* Main Content */}
      <div style={{ margin: "50px", minWidth: "700px" }}>
        <Learning />
      </div>
    </div>
  );
}

function Learning() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [courseDetails, setCourseDetails] = useState<any | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch course details & content
  useEffect(() => {
    if (!courseId) return;

    const loadCourseData = async () => {
      setLoading(true);
      try {
        const numericCourseId = parseInt(courseId, 10);

        // Fetch course details
        const detailsResponse = await axios.get(
          `http://localhost:5000/api/course/${numericCourseId}`
        );
        const details = detailsResponse.data.result;
        setCourseDetails(details && details.length > 0 ? details[0] : null);

        // Fetch course content
        const contentResponse = await axios.get(
          `http://localhost:5000/api/coursecontent/${numericCourseId}`
        );
        setCourses(contentResponse.data.result || []);
      } catch (error: any) {
        console.error("Course fetch error:", error.message);
        toast.error("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId]);

  // Course Content Component
  const CourseContent = ({ isForPDF = false }: { isForPDF?: boolean }) => {
    if (loading) {
      return <p style={{ textAlign: "center" }}>Loading course...</p>;
    }

    if (!courseDetails) {
      return <p style={{ textAlign: "center" }}>No course found.</p>;
    }

    return (
      <>
        <div
          style={{
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            {courseDetails.courseName}
          </h1>

          {/* Show Video Link */}
          {courseDetails.courseLink && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0",
                fontSize: 16,
                border: "2px solid #ccc",
                borderRadius: 12,
                padding: "15px",
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
            >
              <a href={courseDetails.courseLink} target="_blank">
                🎥 Video Link:{" "}
              </a>
            </div>
          )}

          {/* Show Course Summary */}
          {courseDetails.courseSummary && (
            <p style={{ fontSize: "16px", margin: "20px 0" }}>
              {courseDetails.courseSummary}
            </p>
          )}
        </div>

        {/* Show Course Content */}
        {courses.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            No course content available.
          </p>
        ) : (
          <div>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontSize: "20px",
              }}
            >
              Course Content & My Learnings
            </h2>
            {courses.map((course, index) => (
              <div key={index} style={{ marginBottom: "25px" }}>
                <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>
                  • {course.coursecont || `Lesson ${index + 1}`}
                </h4>

                {course.description && (
                  <p style={{ marginBottom: "15px", fontSize: "14px" }}>
                    {course.description}
                  </p>
                )}

                {course.topics && course.topics.length > 0 && (
                  <ul style={{ fontSize: "14px", paddingLeft: "30px" }}>
                    {course.topics.map((topic: string, i: number) => (
                      <li key={i} style={{ marginBottom: "5px" }}>
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      {/* Main Content */}
      <div className={styles.rgbBorder}>
        <div className={styles.textBlock}>
          <div style={{ margin: 50 }}>
            <div style={{ minWidth: "600px" }}>
              <div style={{ marginBottom: "40px" }}>
                <CourseContent />
              </div>

              {/* Button to toggle Learnings Form */}
              <div
                style={{
                  minWidth: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                  maxWidth: "307px",
                  marginBottom: "50px",
                }}
              >
                <div className={styles.rgbBorder}>
                  <button
                    className={styles.buttonSubmit}
                    style={{ minWidth: "300px" }}
                    onClick={() => setShowForm(!showForm)}
                  >
                    <strong>
                      {showForm ? "Close Form" : "Add Your Learnings"}
                    </strong>
                  </button>
                </div>
              </div>

              {/* Show Learnings Form */}
              {showForm && <LearningsForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearningsForm() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [contant, setContant] = useState("");

  const postCont = async () => {
    if (!contant) {
      toast.error("Please enter your learning content");
      return;
    }

    try {
      const numericCourseId = parseInt(courseId as string, 10);

      await axios.post("http://localhost:5000/api/newcont", {
        contant,
        id: numericCourseId,
      });

      toast.success("Learning content added successfully!");
      setContant("");

      // Refresh page to show new content
      window.location.reload();
    } catch {
      toast.error("Failed to connect to server");
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            margin: "30px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <strong>
            <h1>Add Your Learning Notes</h1>
          </strong>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <textarea
            style={{
              minHeight: "100px",
              minWidth: "500px",
              margin: "30px",
              textAlign: "left",
              fontSize: "16px",
              padding: "20px",
              resize: "vertical",
            }}
            placeholder="What did you learn from this course? Add your notes, key takeaways, code examples, etc."
            value={contant}
            onChange={(e) => setContant(e.target.value)}
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
          maxWidth: "207px",
        }}
      >
        <div className={styles.rgbBorder}>
          <button
            className={styles.buttonSubmit}
            style={{ minWidth: "200px" }}
            onClick={postCont}
          >
            Submit Learning
          </button>
        </div>
      </div>
    </>
  );
}
