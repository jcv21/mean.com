//Main controller
let title = { title: 'The Mean Stack Agency' };

module.exports.home = function(req, res){
    res.render('index', title);
};

module.exports.login = function(req, res){
    res.render('login', title);
};

module.exports.register = function(req, res){
    res.render('register', title);
};
