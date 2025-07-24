const express = require("express");
const { createServer } = require("node:http");
const app = express();
const multer = require("multer");
const fs = require("fs");
const memoryStorage = multer.memoryStorage();
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { Server } = require("socket.io");
require("dotenv").config();

const server = createServer(app);
const io = new Server(server);

const memoryUpload = multer({
  storage: memoryStorage,
});

app.use(memoryUpload.any());
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

app.use(express.json());
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const todoRouter = require("./routes/todo");
const CommentRoutes = require("./routes/comment");
const authRoutes = require("./routes/auth");
const { conenctDb } = require("./config/db");
conenctDb();
app.post("/files", async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  const file = req.files[0];

  const base64String = file.buffer.toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64String}`;

  // -----------------------------------------------------------
  // Upload to Cloudinary
  // -----------------------------------------------------------
  // NOTE: folder, resource_type auto-detect, tags optional
  const uploadResult = await cloudinary.uploader.upload(dataURI, {
    folder: "Blog", // change as needed
    public_id: path.parse(file.originalname).name,
    resource_type: "auto", // detects image/video/raw
  });

  // ✅ Save file buffer to disk with original name
  // const filePath = path.join(uploadDir, file.originalname);
  // fs.writeFileSync(filePath, file.buffer);
  // fs.unlinkSync(filePath)

  // Delete success
  return res.json({
    url: uploadResult.secure_url,
    size: file.size,
    public_id: uploadResult.public_id,
  });
});
// ROUTES
app.use("/todos", todoRouter);
app.use("/auths", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", CommentRoutes);

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log(`User Conected with the sokcet Id:: ${socket.id}`);
  io.emit("userConnected", { id: socket.id });

  socket.on("joinRoom", (data) => {
    console.log(data.roomId);
    socket.join(data.roomId);
  });

  socket.on("message", (data) => {
    const { roomId, message,userId } = data;
    io.to(roomId).emit("message", {userId,message});
  });
});

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
