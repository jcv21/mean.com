const providers = require('../models/providers');

let data = { title: 'The Mean Stack Agency', providers : providers };

//List
module.exports.list = function(req, res){
    res.render('providers/providers-list', data);
};

//Details
module.exports.details = function(req, res){
    let id = req.params.id;
    let provider = providers.find( provider => provider.id == id )

    res.render('providers/providers-details', {
        id : id,
        title: 'The Mean Stack Agency', 
        company : provider.company
    });
};

//Edit Form
module.exports.edit = function(req, res){
    let id = req.params.id;
    let provider = providers.find( provider => provider.id == id )

    res.render('providers/providers-edit', {
        id : id,
        title: 'The Mean Stack Agency', 
        provider : provider
    });
};

//Update Form
module.exports.update = function(req, res){
    let id = req.params.id;
    let provider = providers.find( provider => provider.id == id )
    provider.firstname = req.body.first_name;
    provider.lastname = req.body.last_name;
    provider.position = req.body.position;
    provider.company.company_name = req.body.company_name;
    provider.company.email = req.body.email;
    provider.company.phone = req.body.phone;
    provider.company.address = req.body.address;
    provider.company.address2 = req.body.address_two;
    provider.company.city = req.body.city;
    provider.company.state = req.body.state;
    provider.company.postal_code = req.body.zip_code;
    provider.company.description = req.body.description;
    provider.company.tagline = req.body.tag_line;
    
    res.render('providers/providers-update', {
        title: 'The Mean Stack Agency'
    });
};

//Add Page
module.exports.add = function(req, res){
    res.render('providers/providers-add-form', {
        title: 'The Mean Stack Agency'
    });
};

//Add Page Form
module.exports.addform = function(req, res){
    //Create a random id
    let min = 100000;
    let max = 999999;
    let id = Math.floor(Math.random() * (max-min) + min);
    //Create new provider object
    let provider = {
        id : id,
        firstname : req.body.first_name,
        lastname : req.body.last_name,
        position : req.body.position,
        company : {
            company_name : req.body.company_name,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            address2 : req.body.address_two,
            city : req.body.city,
            state : req.body.state,
            postal_code : req.body.zip_code,
            description : req.body.description,
            tagline : req.body.tag_line
        }
    };
    providers.push(provider);

    res.render('providers/providers-add', {
        title: 'The Mean Stack Agency',
    });
};

//Delete a provider
module.exports.delete = function(req, res){
    let id = req.params.id;
    let provider = providers.find( provider => provider.id == id )
    let company = provider.company.company_name;
    let idx = providers.indexOf(provider);
    //Remove the element at the index of "idx"
    providers.splice(idx, 1);

    res.render('providers/providers-delete', {
        title: 'The Mean Stack Agency', 
        company : company
    });
};
