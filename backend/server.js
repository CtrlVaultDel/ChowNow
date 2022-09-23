import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

// Create the server
const app = express();

// Middleware
// Note "use" keyword registers middleware to the server
app.use(cors());
app.use(express.json());    // Allows server to read JSON in a request's body

// Initial Routes
app.use("/api/v1/restaurants", restaurants);

// Bad Route
app.use('*', (req, res) => {
    res.status(404).json({
        error: "not found"
    })
})

export default app;