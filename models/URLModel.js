const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
        lowercase: true,
    },
    short_url: Number,
}, {
    collection: 'shortened_urls',
    statics: {
        async findOneByShortURL(short_url) {
            return this.findOne({short_url: short_url});
        },
        
        findOneByURL(url_param) {
            return this.findOne({original_url: url_param});
        },

        getCount() {
            return this.count();
        }
    }
});

module.exports = mongoose.model('URLSchema', URLSchema);