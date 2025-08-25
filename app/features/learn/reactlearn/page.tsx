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
              <ReactLearning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReactLearning() {
  return (
    <div
      style={{
        lineHeight: "33px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Learning REACT</h2>
      <a
        href="https://www.youtube.com/watch?v=fJSFus0pxZI"
        target="_blank"
        rel="noreferrer"
      >
        <div style={{ textAlign: "center", margin: 14, fontSize: 14 }}>
          <em>Video Link: REACT Course</em>
        </div>
      </a>
      <p>
        <strong>
          What I learned here is React fundamentals and their functions:
        </strong>
      </p>

      <h3>⚛️ Components & JSX</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"<Component />"} — Self-closing component syntax</li>
        <li>{"<Component></Component>"} — Component with children</li>
        <li>{"export default"} — Export component as default</li>
        <li>{"import Component"} — Import a React component</li>
        <li>{"{ }"} — JavaScript expressions in JSX</li>
        <li>{"className"} — CSS class attribute in JSX (not class)</li>
        <li>{"htmlFor"} — Label&apos;s for attribute in JSX</li>
        <li>
          {"<React.Fragment>"} or {"<></>"} — Wrap multiple elements
        </li>
      </ul>

      <h3>🔄 State & Hooks</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"useState()"} — Hook to manage component state</li>
        <li>{"useEffect()"} — Hook for side effects and lifecycle</li>
        <li>{"useContext()"} — Hook to consume context</li>
        <li>{"useReducer()"} — Hook for complex state management</li>
        <li>{"useMemo()"} — Hook to memoize expensive calculations</li>
        <li>{"useCallback()"} — Hook to memoize functions</li>
        <li>{"useRef()"} — Hook to reference DOM elements</li>
        <li>{"custom hooks"} — Reusable stateful logic</li>
      </ul>

      <h3>📝 Props & Data Flow</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"props"} — Data passed from parent to child</li>
        <li>{"props.children"} — Content between component tags</li>
        <li>
          {"destructuring"} — Extract props: {"const { name } = props"}
        </li>
        <li>{"default props"} — Default values for props</li>
        <li>{"prop types"} — Type checking for props</li>
        <li>{"callback props"} — Functions passed as props</li>
        <li>{"key prop"} — Unique identifier for list items</li>
      </ul>

      <h3>🎯 Event Handling</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"onClick"} — Handle click events</li>
        <li>{"onChange"} — Handle input changes</li>
        <li>{"onSubmit"} — Handle form submissions</li>
        <li>{"onMouseOver"} — Handle mouse hover</li>
        <li>{"preventDefault()"} — Prevent default browser behavior</li>
        <li>{"stopPropagation()"} — Stop event bubbling</li>
        <li>
          {"event.target"} — Reference to the element that triggered event
        </li>
      </ul>

      <h3>🔀 Conditional Rendering</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"condition && <Component />"} — Render if condition is true</li>
        <li>{"condition ? <A /> : <B />"} — Ternary operator</li>
        <li>{"if/else statements"} — Conditional logic before return</li>
        <li>{"early return"} — Return JSX based on conditions</li>
        <li>{"null"} — Return null to render nothing</li>
      </ul>

      <h3>📋 Lists & Keys</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"array.map()"} — Render lists of components</li>
        <li>{"key={item.id}"} — Unique key for each list item</li>
        <li>{"array.filter()"} — Filter items before rendering</li>
        <li>{"array.sort()"} — Sort items before rendering</li>
        <li>{"index as key"} — Use array index (not recommended)</li>
      </ul>

      <h3>📋 Forms & Controlled Components</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"controlled components"} — Input value controlled by state</li>
        <li>{"uncontrolled components"} — Input managed by DOM</li>
        <li>{"value={state}"} — Controlled input value</li>
        <li>{"onChange={handler}"} — Update state on input change</li>
        <li>{"ref"} — Direct access to DOM elements</li>
        <li>{"form validation"} — Validate input before submission</li>
      </ul>

      <h3>🌐 Context & State Management</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"React.createContext()"} — Create context for global state</li>
        <li>{"<Context.Provider>"} — Provide context value</li>
        <li>{"useContext(Context)"} — Consume context value</li>
        <li>{"prop drilling"} — Passing props through multiple levels</li>
        <li>{"Redux"} — External state management library</li>
        <li>{"Zustand"} — Lightweight state management</li>
      </ul>

      <h3>🔄 Lifecycle & Effects</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"useEffect(() => {}, [])"} — Run once on mount</li>
        <li>{"useEffect(() => {}, [dep])"} — Run when dependency changes</li>
        <li>{"useEffect(() => { return cleanup })"} — Cleanup function</li>
        <li>{"componentDidMount"} — Class component lifecycle</li>
        <li>{"componentWillUnmount"} — Cleanup in class components</li>
        <li>{"dependency array"} — Control when effects run</li>
      </ul>

      <h3>🚀 Performance & Optimization</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"React.memo()"} — Memoize component to prevent re-renders</li>
        <li>{"useMemo()"} — Memoize expensive calculations</li>
        <li>{"useCallback()"} — Memoize functions</li>
        <li>{"lazy loading"} — Load components on demand</li>
        <li>{"Suspense"} — Handle loading states</li>
        <li>{"code splitting"} — Split code into smaller bundles</li>
      </ul>

      <h3>🔧 Development Tools</h3>
      <hr />
      <ul style={{ fontSize: "1rem" }}>
        <li>{"React DevTools"} — Browser extension for debugging</li>
        <li>{"console.log()"} — Debug state and props</li>
        <li>{"React.StrictMode"} — Development mode warnings</li>
        <li>{"error boundaries"} — Catch JavaScript errors</li>
        <li>{"TypeScript"} — Type safety for React</li>
        <li>{"ESLint"} — Code linting for React</li>
      </ul>
    </div>
  );
}
