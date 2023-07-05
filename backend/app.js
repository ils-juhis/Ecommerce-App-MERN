const express = require("express");
const app = express()
const cookieParser = require('cookie-parser');
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
var serviceAccount = require("./serviceAccountKey.json");
const errorMiddleware = require("./middlewares/error")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")

app.use(express.json())
app.use(cookieParser())

//firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET
});

//express functionalit
//The app.locals object has properties that are local variables within the application, and will be available in templates rendered with res.render.
global.bucket = getStorage().bucket()


//route
app.use("/api/v1", productRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1", orderRoutes)


//middleware for error handler
app.use(errorMiddleware)

module.exports = app;