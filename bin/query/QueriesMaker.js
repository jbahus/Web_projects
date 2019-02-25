var connection = require('../../config/databaseConnection');

module.exports = class QueryMaker{

    constructor(){
        this.query = '';
    }

    select(table){
        this.query = this.query + "SELECT " + table + " FROM";
    }

    selectAll(){
        this.query = this.query + "SELECT * FROM";
    }

    insert(table){
        this.query = this.query + "INSERT INTO " + table;
    }

    where(column){
        this.query = this.query + " WHERE " + column;
    }

    equal(equal){
        this.query = this.query + " = " + equal;
    }

    and(column){
        this.query = this.query + " AND " + column;
    }

    or (column){
        this.query = this.query + " OR " + column;
    }

    query(){
        return new Promise((resolve, reject) => {
            connection.query(this.query, (err, result) => {
                if (err){
                    console.log(err);
                }
                if (result){
                    console.log("user added to DB.");
                    resolve(result);
                }
            });
        })
    }
}