import dotenv from 'dotenv';
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(7000, () => {
        console.log('http://localhost:7000');
    })
})
.catch((err) => {
    console.log("MONGODB Connection Failed !!! ", err);
});