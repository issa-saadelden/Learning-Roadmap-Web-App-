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
              <HtmlLearning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HtmlLearning() {
  return (
    <div
      style={{
        lineHeight: "33px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Learning HTML</h2>
      <a
        href="https://www.youtube.com/watch?v=UB1O30fR-EE"
        target="_blank"
        rel="noreferrer"
      >
        <div style={{ textAlign: "center", margin: 14, fontSize: 14 }}>
          <em>Video Link: HTML Crash Course</em>
        </div>
      </a>
      <p>
        <strong>What I learned here is the tools and their functions:</strong>
      </p>
      <h3>📄 General Structure & Text</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"<></>"} — Fragment used to wrap multiple elements </li>
        <li>{"<html>"} — Root element of an HTML document</li>
        <li>{"<head>"} — Contains metadata about the document</li>
        <li>{"<body>"} — Contains the visible content of the page</li>
        <li>{"<h1>...<h6>"} — Headings from most important (h1) to (h6)</li>
        <li>{"<p>"} — Paragraph tag</li>
        <li>{"<br />"} — Line break</li>
        <li>{"<hr />"} — Horizontal rule (line)</li>
        <li>{"<strong>"} — Important text (bold)</li>
        <li>{"<em>"} — Emphasized text (italic)</li>
        <li>{"<div>"} — Block-level container</li>

        <h3>📋 Lists</h3>
        <hr />

        <li>{""} — Unordered list (bullets)</li>
        <li>{"<ol>"} — Ordered list (numbers)</li>
        <li>{"<li>"} — List item</li>

        <h3>🔗 Links & Media</h3>
        <hr />

        <li>{"<a>"} — Anchor/hyperlink</li>
        <li>{"<img>"} — Image</li>
        <li>{"<form>"} — Form container</li>
        <li>{"<input>"} — Input field (text, email, etc.)</li>
        <li>{"<textarea>"} — Multi-line text input</li>
        <li>{"<button>"} — Clickable button</li>
        <li>{"<label>"} — Label for input</li>
        <li>{"<select>"} — Dropdown list</li>
        <li>{"<option>"} — Option inside select</li>

        <h3>📊 Tables</h3>
        <hr />

        <li>{"<table>"} — Defines a table</li>
        <li>{"<tr>"} — Table row</li>
        <li>{"<th>"} — Table header cell</li>
        <li>{"<td>"} — Table data cell</li>
        <li>{"<thead>"} — Group of header rows</li>
        <li>{"<tbody>"} — Group of body rows</li>

        <h3>🏷️ Semantic HTML5</h3>
        <hr />

        <li>
          {"<header>"} — Introductory content/heading of a page or section
        </li>
        <li>{"<nav>"} — Navigation links</li>
        <li>{"<main>"} — Main content of the page</li>
        <li>{"<section>"} — Thematic grouping of content</li>
        <li>{"<article>"} — Independent self-contained content</li>
        <li>{"<aside>"} — Sidebar or content aside from main content</li>
        <li>{"<footer>"} — Footer of the page or section</li>

        <h3>📑 Metadata</h3>
        <hr />

        <li>{"<meta>"} — Metadata inside the head (charset, viewport, etc.)</li>
        <li>{"<title>"} — Title shown in the browser tab</li>
        <li>{"<link>"} — Link to external resources (like CSS)</li>
        <li>{"<style>"} — Internal CSS styling</li>
      </ul>
    </div>
  );
}
