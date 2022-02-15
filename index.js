const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mlx",
  port: 3306,
});

connection.connect(function (err) {
  // en caso de error
  if (err) {
    console.log(err.code);
    console.log(err.fatal);
    console.log("módulo backend");
  } else console.log("CONEXION EXITOSA!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/lista", (req, res) => {
  let query = "SELECT * from operaciones order by fecha desc";

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log("módulo backend");
      res.status(500).send({
        status: "error",
        rows,
      });
    } else {
      console.log("Consulta ejecutada con éxito:");
      res.status(200).send({
        status: "success",
        rows,
      });
    }
  });
});

app.get("/listar/:desde/:hasta", (req, res) => {
  console.log("params", req.params);

  let query = `SELECT * from operaciones where Fecha >= ? AND fecha <= ? ORDER BY fecha asc`;
  let desde = req.params.desde;
  let hasta = req.params.hasta;

  connection.query(query, [desde, hasta], function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log("módulo backend");
      res.status(500).send({
        status: "error",
        rows,
      });
    } else {
      console.log("Consulta ejecutada con éxito:");
      res.status(200).send({
        status: "success",
        rows,
      });
    }
  });
});

app.post("/compra", (req, res) => {
  let Tipo = "c";
  let Fecha = req.body.Fecha;
  let Cliente = req.body.Cliente;
  let Importe = -req.body.Importe;
  let Obs = req.body.Obs;
  let query = `insert into operaciones values (0,?,?,?,?,?)`;

  connection.query(
    query,
    [Tipo, Fecha, Cliente, Importe, Obs],
    function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.", req.body);
        console.log("módulo backend");
        res.status(500).send({
          status: "error",
          info: req.body,
        });
      } else {
        console.log("Consulta ejecutada con éxito:");
        res.status(200).send({
          status: "success",
          rows,
        });
      }
    }
  );
});

app.post("/venta", (req, res) => {
  let Tipo = "v";
  let Fecha = req.body.Fecha;
  let Cliente = req.body.Cliente;
  let Importe = req.body.Importe;
  let Obs = req.body.Obs;
  let query = `insert into operaciones values (0,?,?,?,?,?)`;

  connection.query(
    query,
    [Tipo, Fecha, Cliente, Importe, Obs],
    function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.", req.body);
        console.log("módulo backend");
        res.status(500).send({
          status: "error",
          info: req.body,
        });
      } else {
        console.log("Consulta ejecutada con éxito:");
        res.status(200).send({
          status: "success",
          rows,
        });
      }
    }
  );
});

app.post("/repa", (req, res) => {
  let Tipo = "r";
  let Fecha = req.body.Fecha;
  let Cliente = req.body.Cliente;
  let Importe = req.body.Importe;
  let Obs = req.body.Obs;
  let query = `insert into operaciones values (0,?,?,?,?,?)`;

  connection.query(
    query,
    [Tipo, Fecha, Cliente, Importe, Obs],
    function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.", req.body);
        console.log("módulo backend");
        res.status(500).send({
          status: "error",
          info: req.body,
        });
      } else {
        console.log("Consulta ejecutada con éxito:");
        res.status(200).send({
          status: "success",
          rows,
        });
      }
    }
  );
});

app.post("/gasto", (req, res) => {
  let Tipo = "g";
  let Fecha = req.body.Fecha;
  let Cliente = req.body.Cliente;
  let Importe = -req.body.Importe;
  let Obs = req.body.Obs;
  let query = `insert into operaciones values (0,?,?,?,?,?)`;

  connection.query(
    query,
    [Tipo, Fecha, Cliente, Importe, Obs],
    function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.", req.body);
        console.log("módulo backend");
        res.status(500).send({
          status: "error",
          info: req.body,
        });
      } else {
        console.log("Consulta ejecutada con éxito:");
        res.status(200).send({
          status: "success",
          rows,
        });
      }
    }
  );
});

app.delete("/borra/:id", (req, res) => {
  let query = "delete from operaciones where id=?";
  let id = req.params.id;

  connection.query(query, [id], function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log("módulo backend");
      res.status(500).send({
        status: "error",
        rows,
      });
    } else {
      console.log("Consulta ejecutada con éxito:");
      res.status(200).send({
        status: "success",
        rows,
      });
    }
  });
});

app.put("/update", (req, res) => {
  let Id = req.body.Id;
  let Tipo = req.body.Tipo;
  let Fecha = req.body.Fecha;
  let Cliente = req.body.Cliente;
  let Importe =
    Tipo == "c" || Tipo == "g" ? -req.body.Importe : req.body.Importe;
  let Obs = req.body.Obs;
  let query =
    "UPDATE operaciones SET Tipo = ?, Fecha = ?, Cliente = ?, Importe = ?, Obs = ? WHERE Id = ?";

  connection.query(
    query,
    [Tipo, Fecha, Cliente, Importe, Obs, Id],
    function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.", req.body);
        console.log("módulo backend");
        res.status(500).send({
          status: "error",
          info: req.body,
        });
      } else {
        console.log("Consulta ejecutada con éxito:");
        res.status(200).send({
          status: "success",
          rows,
        });
      }
    }
  );
});

app.get("/result/:periodo", (req, res) => {
  console.log("params", req.params);

  let query = "";

  switch (req.params.periodo) {
    case "h":
      query =
        'select sum(Importe) as "ingresos" from operaciones WHERE Importe > 0 and Fecha=curdate() union select sum(Importe)  from operaciones WHERE Importe < 0 and Fecha=curdate()';
      break;
    case "m":
      query =
        'select sum(Importe) as "ingresos" from operaciones WHERE Importe > 0 and month(Fecha)=month(curdate()) union select sum(Importe)  from operaciones WHERE Importe < 0 and month(Fecha)=month(curdate())';
      break;
    case "a":
      query =
        'select sum(Importe) as "ingresos" from operaciones WHERE Importe > 0 and year(Fecha)=year(curdate()) union select sum(Importe)  from operaciones WHERE Importe < 0 and year(Fecha)=year(curdate())';
      break;
    default:
      break;
  }

  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log("módulo backend");
      res.status(500).send({
        status: "error",
        rows,
      });
    } else {
      console.log("Consulta ejecutada con éxito:");
      res.status(200).send({
        status: "success",
        rows,
      });
    }
  });
});

app.get("/oxtr/:tipo/:desde/:hasta", (req, res) => {
  console.log("params", req.params);

  let query = `SELECT Cliente, sum(Importe) as total FROM operaciones WHERE (Tipo = 'g' OR Tipo = 'r') and (Fecha >= '2021-12-09' AND fecha <= '2021-12-29') GROUP BY Cliente HAVING Cliente <> "" `;

  let tipo = req.params.tipo;
  let desde = req.params.desde;
  let hasta = req.params.hasta;
  if(tipo=="r") {
  query = `SELECT Fecha, Cliente, sum(Importe) as total FROM operaciones WHERE (Tipo = 'g' OR Tipo = 'r') and (Fecha >= ? AND fecha <= ?) GROUP BY Cliente HAVING Cliente <> "" `;

  connection.query(query, [desde, hasta], function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log("módulo backend");
      res.status(500).send({
        status: "error",
        rows,
      });
    } else {
      console.log("Consulta ejecutada con éxito:");
      res.status(200).send({
        status: "success",
        rows,
      });
    }
  });
}else{
  query = `SELECT Fecha,Cliente,Importe,Obs  FROM operaciones WHERE Tipo = ?  and (Fecha >= ? AND fecha <= ?) order by fecha asc `;

  connection.query(query, [tipo,desde, hasta], function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log("módulo backend");
      res.status(500).send({
        status: "error",
        rows,
      });
    } else {
      console.log("Consulta ejecutada con éxito:");
      res.status(200).send({
        status: "success",
        rows,
      });
    }
  });
      }
    });

    app.get("/top", (req, res) => {

      let query = 'SELECT Cliente, sum(Importe) as total FROM operaciones GROUP BY Cliente HAVING Cliente <> "" ORDER BY total DESC';
    
      connection.query(query, function (err, rows, fields) {
        if (err) {
          console.log("An error ocurred performing the query.");
          console.log("módulo backend");
          res.status(500).send({
            status: "error",
            rows,
          });
        } else {
          console.log("Consulta ejecutada con éxito:");
          res.status(200).send({
            status: "success",
            rows,
          });
        }
      });
    });