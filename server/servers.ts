import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { poolPromise, sql } from "../lib/db.ts";
import { generateSalt, hashPassword } from "../lib/paaswordhasher.ts";

const app: Application = express();
app.use(express.json());
app.use(cors());

const PORT: number = parseInt(process.env.PORT || "5000", 10);

// 🔹 Get all users
app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("EXEC GetAllUsers");
    res.json({ users: result.recordset });
  } catch (error) {
    res.status(500).json({ message: "DB connection failed", error });
  }
});

// 🔹 Get next available user ID
app.get("/api/users/nextid", async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT MAX(Id) as maxId FROM users");
    const nextId = result.recordset[0].maxId
      ? result.recordset[0].maxId + 1
      : 1;
    res.json(nextId);
  } catch (error) {
    res.status(500).json({ message: "DB connection failed", error });
  }
});

// 🔹 Signup new user
app.post("/api/users/signup", async (req: Request, res: Response) => {
  try {
    const { fname, email, password, id } = req.body;
    if (!fname || !email || !password) {
      return res
        .status(400)
        .json({ message: "fname, email, and password are required" });
    }
    const salt = generateSalt();
    const hashedpassword = await hashPassword(password, salt);

    const pool = await poolPromise;
    await pool
      .request()
      .input("fname", sql.NVarChar(100), fname)
      .input("email", sql.NVarChar(100), email)
      .input("salt", sql.NVarChar(300), salt)
      .input("password", sql.NVarChar(300), hashedpassword)
      .input("id", sql.Int, id)
      .query("EXEC InsertUser @fname, @email, @password , @salt, @id");

    res.json({ message: "User inserted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Insert failed", error });
  }
});

// 🔹 Login user
app.post("/api/users/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar(100), email)
      .query("EXEC CheckUserExists @email");

    const user = result.recordset[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const incomingHash = await hashPassword(password, user.salt);

    if (incomingHash === user.passwordd) {
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.Id || user.id, // Try both cases
          fname: user.fname,
          email: user.username || user.email,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Check failed", error });
  }
});

// 🔹 Get user ID by email
app.get("/api/user/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("EXEC getidbyemail @email");

    res.json({ message: "email succ", result: result.recordset });
  } catch (error) {
    res.status(500).json({ message: "Check failed", error });
  }
});

// 🔹 Get courses by user ID
app.get("/api/courses/:userid", async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("userid", sql.Int, userid)
      .query("EXEC getallcourses @userid");

    res.json({
      message: "courses appeared successfully",
      result: result.recordset,
    });
  } catch (error) {
    res.status(500).json({ message: "get courses failed", error });
  }
});

// 🔹 Get course content
app.get("/api/coursecontent/:courseId", async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("EXEC getContent @courseId");

    res.json({ message: "content succ", result: result.recordset });
  } catch (error) {
    res.status(500).json({ message: "content fetch failed", error });
  }
});

// 🔹 Get course content
app.get("/api/course/:courseId", async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("EXEC getcoursewithid @courseId");

    res.json({ message: "content succ", result: result.recordset });
  } catch (error) {
    res.status(500).json({ message: "content fetch failed", error });
  }
});

// 🔹 Insert new content
app.post("/api/newcont", async (req: Request, res: Response) => {
  try {
    const { contant, id } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("contant", sql.NVarChar(100), contant)
      .input("id", sql.Int, id)
      .query("EXEC insertcont @contant, @id");

    res.status(200).json({ message: "Content inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Insert failed", error });
  }
});

// 🔹 Insert new course
app.post("/api/newcoursecont", async (req: Request, res: Response) => {
  try {
    const { contant, id } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("contant", sql.NVarChar(100), contant)
      .input("id", sql.Int, id)
      .query("EXEC insertcont @contant, @id");

    res.status(200).json({ message: "Content inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Insert failed", error });
  }
});

// 🔹 Create new course
app.post("/api/newCourse", async (req: Request, res: Response) => {
  try {
    const { courseName, courseLink, courseSummary, Id } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("courseName", sql.VarChar(100), courseName)
      .input("courseLink", sql.VarChar(200), courseLink)
      .input("courseSummary", sql.VarChar(400), courseSummary)
      .input("Id", sql.Int, Id)
      .query("EXEC insertCourse @courseName, @courseLink, @courseSummary, @Id");

    res.json({
      message: "Course inserted successfully",
      insertedCourse: result.recordset[0],
      result: result.recordset,
    });
  } catch (error) {
    res.status(500).json({ message: "Insert failed", error });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
