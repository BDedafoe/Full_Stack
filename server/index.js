import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import morgan from'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import { register } from "./controllers/auth.js";
import { createMessage } from "./controllers/messages.js";
import { verifyToken } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/images", express.static( "public/images"));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const multerFilter = (req, file, cb) => {
      if (file.mimetype.split("/")[1] === ".png", ".jpg", ".jpeg") {
        cb(null, true);
      } else {
        cb(new Error("Not a .png, .jpg, or .jpeg File!!"), false);
      }
    };
  
const upload = multer({ storage, multerFilter });

  //controllers//
app.post("/auth/register", upload.single("picture"), register);
app.post("/messages", verifyToken, upload.single("picture"), createMessage);
  //routes//
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes)

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
