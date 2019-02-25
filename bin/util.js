var sizeObj = (obj) => {
    return Object.keys(obj).length;
};

var regexSafePass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

var hashGenerator = function(keyword, salt){
    var hash = crypto.createHash("whirlpool");
    var data = hash.update(keyword + salt ,"utf-8");
    return data.digest("hex");
};

module.exports = {
    sizeObj,
    regexSafePass,
    hashGenerator
}