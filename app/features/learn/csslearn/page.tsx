"use client";
import styles from "../../styles/page.module.css";
import React from "react";
import Link from "next/link";

export default function thepage() {
  return (
    <div lang="en">
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

      <div style={{ margin: "50px" }}>
        <div className={styles.rgbBorder}>
          <div className={styles.textBlock}>
            <div style={{ margin: 50 }}>
              <CssLearning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CssLearning() {
  return (
    <div
      style={{
        lineHeight: "33px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Learning CSS</h2>
      <a
        href="https://www.youtube.com/watch?v=wRNinF7YQqQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div style={{ textAlign: "center", margin: 14, fontSize: 14 }}>
          <em>Video Link: CSS Crash Course</em>
        </div>
      </a>
      <p>
        <strong>
          What I learned here is how to style HTML using CSS, selectors, and box
          model.
        </strong>
        <br />
      </p>
      <ul style={{ fontSize: "1rem" }}>
        <li>style=&quot;&quot; — Inline CSS for quick styling</li>
        <li>
          &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot; /&gt; —
          Linking external CSS file
        </li>
      </ul>

      <h3>🎨 Typography (Text & Font)</h3>
      <hr />
      <ul>
        <li>color — Sets the text color</li>
        <li>font-size — Controls the size of text</li>
        <li>font-family — Specifies the font type (e.g., Arial, Verdana)</li>
        <li>font-weight — Defines the thickness of the text (e.g., bold)</li>
        <li>font-style — Applies styles like italic or normal</li>
        <li>text-align — Aligns text (e.g., left, center, right)</li>
        <li>line-height — Sets the height between lines of text</li>
        <li>letter-spacing — Adjusts the space between characters</li>
      </ul>

      <h3>📦 Box Model</h3>
      <hr />
      <ul>
        <li>padding — Adds space inside the element</li>
        <li>margin — Adds space outside the element</li>
      </ul>

      <h3>🟦 Borders & Shadows</h3>
      <hr />
      <ul>
        <li>border — Adds a border around an element</li>
        <li>border-style — Defines the border type (e.g., solid, dashed)</li>
        <li>border-width — Sets the thickness of the border</li>
        <li>border-color — Sets the color of the border</li>
        <li>border-radius — Rounds the corners of an element</li>
        <li>box-shadow — Adds shadow effects to elements</li>
      </ul>

      <h3>📐 Layout & Display</h3>
      <hr />
      <ul>
        <li>display — Controls layout (e.g., block, inline, flex)</li>
        <li>flexbox — Used for flexible box layouts</li>
        <li>
          center div — We need{" "}
          <strong>display: flex, justify-content, align-items</strong>
        </li>
        <li>grid — Used for 2D layout structure</li>
      </ul>
    </div>
  );
}
