var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var mtaProductLanguageSchema = new mongoose.Schema({
  productLanguageName: String,
  products:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});


mtaProductLanguageSchema.plugin(mongoosePaginate);

var ProductLanguage = mongoose.model("ProductLanguage", mtaProductLanguageSchema);

module.exports  = ProductLanguage;