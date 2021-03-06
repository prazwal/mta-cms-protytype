var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var mtaProductYearLevelSchema = new mongoose.Schema({
  slug:String,
  name: String,
  products:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});


mtaProductYearLevelSchema.plugin(mongoosePaginate);

var ProductYearLevel = mongoose.model("ProductYearLevel", mtaProductYearLevelSchema);

module.exports  = ProductYearLevel;
