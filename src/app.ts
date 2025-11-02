import express from "express";
import cors from "cors";
import cruxRoutes from "./routes/crux.routes";
import { errorHandler } from "./middleware/errorHandler";



const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// all crux routes
app.use("/api", cruxRoutes);

app.use(errorHandler);

export default app;
