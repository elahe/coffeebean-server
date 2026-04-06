import express from "express";
import cors from "cors";
import coffeeRoutes from "./routes/coffee.routes";
import recipeRoutes from "./routes/recipe.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/coffees", coffeeRoutes);

app.use("/recipe",recipeRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});