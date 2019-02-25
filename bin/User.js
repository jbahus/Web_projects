var userQueries = require('../bin/query/userQueries');
var crypto = require("crypto");
var util = require("../bin/util");

var user = class User{

    constructor(userInfos){
        this.setId(userInfos.id);
        this.setUsername(userInfos.username);
        this.setFirstname(userInfos.firstname);
        this.setLastname(userInfos.lastname);
        this.setEmail(userInfos.email);

        var hash = crypto.createHash("whirlpool");
        var data = hash.update(userInfos.password ,"utf-8").digest("hex");
        this.setPass(data);
    }

    save(){
        var user = this;
        return userQueries.addUser(user);
    };

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getUsername(){
        return this.username;
    }

    setUsername(username){
        this.username = username;
    }

    getFirstname(){
        return this.firstname;
    }

    setFirstname(firstname){
        this.firstname = firstname;
    }

    getLastname(){
        return this.lastname;
    }

    setLastname(lastname){
        this.lastname = lastname;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email){
        this.email = email;
    }

    getPass(){
        return this.pass;
    }

    setPass(password){
        this.pass = password;
    }

    getUser(id){
        return new User(userQueries.getUser(id));
    }

    validateEmail(){
        
    }
}
module.exports = user;