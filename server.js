const express=require("express");
const app=express();
const dotenv=require("dotenv");
const morgan=require("morgan");
const cors=require("cors");
const { connect } = require("./routes/testRoutes.js");
const connectDb = require("./config/db.js");

dotenv.config();

connectDb();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT=8080;

app.use("/api/v1/test", require("./routes/testRoutes.js"));
app.use("/api/v1/auth", require("./routes/authRoute.js"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes.js"));

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Welcome to BLood-B"
    });
})

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})