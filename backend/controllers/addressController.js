const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');

// Controller function for getting all address
const getAddress = async (req, res) => {

    const connection = await mysql.createConnection(config.db);
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await connection.beginTransaction();

    const q = "SELECT * FROM school_info.address";

    try {

      const [rows, fields] = await connection.execute(q);
      console.log('Retrieved student data:', rows);
      console.log('Fields:', fields);
      await connection.commit();
      console.log('Transaction committed successfully!');
      
      return res.json(rows);

    } catch (err){ 

      console.error(`Error occurred while creating order: ${err.message}`, err);
      connection.rollback();
      console.info('Rollback successful');
      return 'error creating order';S

    } finally {
      await connection.commit();
      connection.end();
    }
};


// Controller function for getting all students
const insert_Address = async (req, res) => {
    
    const connection = await mysql.createConnection(config.db);
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await connection.beginTransaction();
  
    const q = "INSERT INTO address (st_address, city, state, zip) VALUES (?, ?, ?, ?)";
    console.log("Here");
    const values = [
        req.body.st_address,
        req.body.city,
        req.body.state,
        req.body.zip,
    ];
  
    try {
      await connection.execute(q, values)
      console.log(`address added`);
      console.log("The address:\n" + JSON.stringify(values));
      await connection.commit();
      console.log(`commited!`);

    const [rows, fields] = await connection.execute('SELECT LAST_INSERT_ID() as last_id');
    const lastInsertId = rows[0].last_id;
    console.log(lastInsertId);
    
    return res.json({ message: "address has been created", lastInsertId });
    } catch(err) {
      console.error(`Error occurred while creating address: ${err.message}`, err);
      connection.rollback();
      console.info('Rollback successful');
      return 'error creating address';
    }
    return res.json("address has been created");
  };

// Export the controller functions
module.exports = {
    getAddress,
    insert_Address,
  };