import express from "express";
import cors from "cors";
import salesRouter from "./routes/sales.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/sales", salesRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));


