import express from "express";
import cors from "cors";
import authRoutes from "@routes/authRoutes";
import myApiRoutes from "@routes/myPage/myApiRoutes";
import myInfoRoutes from "@routes/myPage/myInfoRoutes";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Auth
app.use("/auth", authRoutes);

//MyPage
app.use("/myInfo", myInfoRoutes);
app.use("/myApi", myApiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
