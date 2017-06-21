
module.exports = {
    data: function(dbname,callback){
        var file={};
        var header;
        var row;
        dbname.find({},function(err,response){
            if(err) {
                    reject(err)
            }
            header = Object.keys(response[0]._doc)
                file.row = [];
                for(i=0;i<response.length;i++){
                     for(j=0;j<header.length;j++){
                        var value=response[i][header[j]];
                        file.row.push(value+"\t")
            }
            file.row.push("\n")
            }
            file.col = [];
                for(i=0;i<header.length;i++){
                    file.col.push(header[i]+"\t")
                }
                file.col.push("\n")
                file.col=file.col.toString();
                file.col=file.col.replace(/,/gi,"");
                file.row=file.row.toString();
                file.row=file.row.replace(/,/gi,"");
                data = file.col+file.row
            callback(data)
        })
    }
}