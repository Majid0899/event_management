const db = require('../config/db');


const EventModel={
    create: async(name, description, category, date, location, available_seats)=>{
        const sql="INSERT INTO events(name, description, category, date, location, available_seats) VALUES(?,?,?,?,?,?)";
        const [event]=await db.promise().query(sql,[name, description, category, date, location, available_seats]);

        return event;

    },
    getAllEvents:async()=>{
        const sql="SELECT * FROM events"
        const [events]=await db.promise().query(sql)
        return events;

    },
    getEventByCategory:async(category)=>{
        const sql="SELECT * FROM events WHERE category=?";
        const [events]=await db.promise().query(sql,[category]);
        return events;
    },
    deleteEvent:async(eventId)=>{
        const sql="DELETE FROM events WHERE id = ?";
   const [result]= await db.promise().query(sql,[eventId])
 
    },
    updateEvent:async(id,field)=>{
        
        const fields=[]
        const values=[]

        if(field.name){
            fields.push("name = ?");
            values.push(field.name);
        }
        if(field.description){
            fields.push("description=?");
            values.push(field.description);
        }
        if(field.category){
            fields.push("category=?");
            values.push(field.category);
        }
        if(field.data){
            fields.push("date=?");
            values.push(field.date);
        }
        if(field.location){
            fields.push("location= ?");
            values.push(field.location)
        }
        if(field.available_seats){
            fields.push("available_seats=?");
            values.push(fields.available_seats);
        }
        if(fields.length===0){
            return reject(new Error('No fields provided for update'));
          }
        
          const sql = `UPDATE events SET ${fields.join(", ")} WHERE id = ?`;
          
          values.push(id);

          const [event]=await db.promise().query(sql,values);

         
          

          return event;

        

    },
    findEventById:async(eventId)=>{
        const sql="SELECT * FROM events WHERE id=?"
        const result=await db.promise().query(sql,[eventId]);
        return result[0];
    }



}

module.exports = EventModel