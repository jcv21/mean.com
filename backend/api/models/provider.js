const mongoose = require('mongoose');
const {providerSchema} = require('../schemas/provider.schemas');

// Create the provider model
const Provider = mongoose.model('Providers', providerSchema);

module.exports = { Provider };