// third party imports
import { config } from "dotenv";
import app from "./app";


//local imports

// env 
config({ path: "./.env" })
const port = process.env.PORT || process.argv[2] || 8080;

// start server 

app.listen(port, ()=> {
  console.log("Server running on port %s", port)
})