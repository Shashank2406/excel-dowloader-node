var xls = require('xlsconverter')

exports.xlsconverter=function(dbname){
	return xls.data(dbname);
}
