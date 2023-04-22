/**
 * this files handles configuirng the connection with the database.
 */
import mysql from 'mysql2'

export class DbConnectionManager {

    static connection: mysql.Connection;

    /**
     * It is used to initialize connection field and to setup the connection.
     */
    static setupConnection = () => {
        DbConnectionManager.connection = mysql.createConnection({
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USER,
            password : process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_NAME
        });

        try {
            DbConnectionManager.connection.connect();
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
            DbConnectionManager.connection.end();
            console.log("connected successfully to the database")
        } catch(e) {
            console.log("could not connection to the database");
        }
    }


}
