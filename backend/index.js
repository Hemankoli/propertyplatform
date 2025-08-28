const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const { connectDB } = require('./database/connection');
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ALL Routes
app.use("/", userRoutes);
app.use("/", propertyRoutes);
app.use("/", bookingRoutes);

// Database Connected
connectDB()

// Server Running
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`)
})
