const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema ({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name

AuthorSchema.virtual('name').get(() => {
    // To avoid errors in cases where an author does not have either a family name
    // or first name.
    // We want to make sure we handle the exception by returning an empty
    // string for that case.
    let fullname = '';
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
});

AuthorSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need this obj.
    // Returns absolute URL required to get a particular instance
    // of the model. -- We'll use the property in our templates
    // whenever we need to get a link to a particular author.
    return `/catalog/author/${this._id}`;
});

// Export Model
module.exports = mongoose.model('Author', AuthorSchema);
