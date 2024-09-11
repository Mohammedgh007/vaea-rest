/**
 * this files handles configuirng the connection with the database.
 */
import mysql from 'mysql2'

export class DbConnectionManager {

    static connection: mysql.Pool;

    /**
     * It is used to initialize connection field and to setup the connection.
     */
    static setupConnection = async () => {
        try {console.log(process.env.DATABASE_PASSWORD, "ssssss")
            DbConnectionManager.connection = mysql.createPool({
                host     : process.env.DATABASE_HOST,
                user     : process.env.DATABASE_USER,
                password : process.env.DATABASE_PASSWORD,
                database : process.env.DATABASE_NAME,
                port     : Number(process.env.DATABASE_PORT)
            });
            //await DbConnectionManager.connection.connect();
            console.log("connected successfully to the database")
        } catch(e) {
            console.log("could not connection to the database");
        }
        
    }


    /**
     * It is used to close the connection with the database.
     */
    static closeConnection = () => {
        try {
            //DbConnectionManager.connection.end();
            DbConnectionManager.closeConnection();
            console.log("connected successfully to the database")
        } catch(e) {
            console.log("could not connection to the database");
        }
    }


}
