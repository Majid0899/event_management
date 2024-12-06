const db = require('../config/db');
const bcrypt = require("bcryptjs");

const UserModel = {
    findByEmail: async (email) => {
        const sql = "SELECT * FROM users WHERE email=?";
        const [rows] = await db.promise().query(sql, [email]);
        return rows[0];
    },

    create: async (name, email, password,role) => {
        const sql = "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";
        const [result] = await db.promise().query(sql, [name, email, password,role || "user"]);
        return result; 
    },
    findById: async (id) => {
        const sql = "SELECT * FROM users WHERE id=?";
        const[rows]= await db.promise().query(sql,[id])
        

        return rows[0];
    },
    update:async(id,field)=>{
        
        const fields=[]
        const values=[]

        if(field.name){
            fields.push("name = ?");
            values.push(field.name);
        }
        if (field.email) {
            fields.push("email = ?");
            values.push(field.email);
          }
          if (field.password) {
            const hashedPassword = await bcrypt.hash(field.password, 10);
            fields.push("password = ?");
            values.push(hashedPassword);
          }
          if(fields.length===0){
            return reject(new Error('No fields provided for update'));
          }

          const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
          values.push(id);

          const [user]=await db.promise().query(sql,values);

          return user;

        
  

    },

};

module.exports = UserModel;  