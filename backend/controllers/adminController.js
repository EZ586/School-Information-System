const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');


// Controller function for getting all students
const getAdmin = async (req, res) => {

    const connection = await mysql.createConnection(config.db);
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    console.log('Finished setting the isolation level to read committed');
    //set wait timeout and lock wait timeout as per need.
    await connection.beginTransaction();
    console.log('Transaction started!');
    const q = "SELECT * FROM school_info.administrator";

    try {

      const [rows] = await connection.execute(q);
      console.log('Retrieved student data:', rows);
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

// Controller function for creating a student
const insert_admin = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
 
  const values = [
    req.body.username,
    req.body.password,
    req.body.first_name,
    req.body.last_name,
    req.body.birthdate,
  ];

  const { st_address, city, state, zip, ...studentData } = req.body;

  try {
    // create query 
    const q = "INSERT INTO administrator (adminUser, adminPass) VALUES (?, ?)";
    // create values list with addressID
    const values = [
      req.body.username,
      req.body.password,
    ];
    //submit student
    await connection.execute(q, values)
    console.log(`admin added`);
    console.log("The admin:\n" + JSON.stringify(values));
    await connection.commit();
    console.log(`commited!`);
  } catch(err) {
    console.error(`Error occurred while creating order: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating order';
  }
  return res.json("admin has been created");
};

// provide password for checking
const admin_pass = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
 
  const adminUser = req.body.username;
  let passAdmin = 0;
  try {

    // Check if the address already exists
    const [adminPasswords] = await connection.execute(
      'SELECT adminPass FROM administrator WHERE adminUser = ?',
      [adminUser]
    );
    console.log("HERE")
    console.log(adminUser)
    passStud = adminPasswords;
    if (adminPasswords.length > 0) {
      // Password Exists
      passAdmin = adminPasswords[0].adminPass;
      console.log(adminPasswords)
    } else {
      // Address does not exist, insert it into the database
      console.log("No Password!??");
      return "No PASSWORD";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error finding password';
  }
  return res.json(passAdmin);
};

// provide admin id
const admin_info = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
 
  const adminUser = req.body.username;
  let infoAdmin = 0;
  try {

    // Check if the address already exists
    const [adminInfos] = await connection.execute(
      'SELECT * FROM administrator WHERE adminUser = ?',
      [adminUser]
    );
    console.log("HERE")
    console.log(adminInfos)
    console.log(adminUser)
    infoAdmin = adminInfos;
    if (adminInfos.length > 0) {
      // id Exists
      infoAdmin = adminInfos[0];
    } else {
      // no id case
      console.log("No Info!??");
      return "No Info";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error getting info';
  }
  return res.json(infoAdmin);
};
  
// Export the controller functions
module.exports = {
  insert_admin,
  admin_pass,
  getAdmin,
  admin_info
};