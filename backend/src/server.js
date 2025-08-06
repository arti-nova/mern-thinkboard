import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from './config/db.js';
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB(); 
// Middleware 
app.use
(cors({
   origin: 'http://localhost:5173', 
  })
);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimit); // Apply rate limiting middleware

app.use("/api/notes",rateLimit , notesRoutes);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);


});
   
