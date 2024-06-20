// third party imports
import { config } from "dotenv";
import app from "./app";
import db from "./models";

//local imports

// env
config({ path: "./.env" });
const port = process.env.PORT || process.argv[2] || 8080;

// start server

//sincronizar bd
db.sequelize
  .sync({ force: true })

  //una vez se termine de sincronizar la db
  .then(function () {
    //mostrar los models
    console.log(db.sequelize.models);

    // escuchar en el puerto ${port}
    app.listen(port, () => {
      console.log("Server running on port %s", port);
    });
  })

  //manejar erorres
  .catch((error) => {
    console.log("Se produjo un error al sincronizar la bd");
    console.error(error);
  });
