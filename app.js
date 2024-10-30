const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json());
const entriesRoutes = require("./routes/entries.routes")
const authorsRoutes = require("./routes/authors.routes")


app.use('/api/authors',authorsRoutes);
app.use('/api/entries',entriesRoutes);
// Para ruta no existente
app.use("*",(req, res) => {
    res.status(404).send("Ruta no encontrada");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
  