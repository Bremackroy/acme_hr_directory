const express = require("express");
const { Client } = require("pg");

const connectionString =
  process.env.DB_URI ||
  "postgresql://postgres:Shadow22!@localhost/acme_hr_directory_db";

const client = new Client({
  connectionString: connectionString,
});

client.connect().then(() => console.log("DB Connected"));
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/employees", async (req, res, next) => {
    try {
      const result = await client.query("SELECT * FROM employee");
      res.json(result.rows);
    } catch (error) {
      next (error)
    }
  });
  
  app.get("/api/departments", async (req, res, next) => {
    try {
        const result = await client.query("SELECT * FROM department");
        res.json(result.rows);
      } catch (error) {
        next (error)
      }
    });
  
  app.delete("/api/employees/:id", async (req, res, next) => {
    try {
      const result = await client.query("DELETE FROM employee WHERE id = $1", [
        req.params.id,
      ]);
      res.json({ message: "Employee Deleted" });
    } catch (error) {
      res.status(500).json({ error: "internal error occurred" });
    }
  });
  
  app.post("/api/employees", async (req, res, next) => {
    try {
      const { name } = req.body;
      const result = await client.query(
        "INSERT INTO employee (name) VALUES ($1)",
        [name]
      );
      res.json({message: 'Employee Added'});
    } catch (error) {
      res.status(500).json({ error: "internal error occurred" });
    }
  });
  
  app.put("/api/employees/:id", async (req, res, next) => {
      try {
        const { name } = req.body;
        const result = await client.query(
          "UPDATE employee SET name = $1 WHERE id = $1",
          [name]
        );
        res.json({message: 'Employee Updated'});
      } catch (error) {
          console.log(error)
        res.status(500).json({ error: "internal error occurred" });
      }
    });
  

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json(error)
  })
    
  app.listen(3000, () => {
    console.log("Server is Running on Port 3000");
  });

  
  