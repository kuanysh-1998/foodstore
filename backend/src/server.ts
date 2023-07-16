// import dotenv from 'dotenv';
// dotenv.config();
import path from "path";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
// import foodRouter from './routers/food.router';
// import userRouter from './routers/user.router';
// import orderRouter from './routers/order.router';
// import { dbConnect } from './configs/database.config';
// dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.send(foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tags/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));

  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find((food) => food.id === foodId);

  res.send(foods);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User name or passwor is not valid!");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "Some Rondom Text",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;

  return user;
};

// app.use("/api/foods", foodRouter);
// app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);

// app.use(express.static("public"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
