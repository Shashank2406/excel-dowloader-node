var User = require('../models/user');
var Series = require('../models/series');
var Season = require('../models/season');
var Comic = require('../models/comic');
var Comment = require('../models/comment');
var xls = require('./xlsconverter');
var Promise = require("bluebird");
var md5 = require('md5');

exports.writefile=function(req,res){
    name=req.params.dbname;
    //console.log(User.modelName);
    //console.log(User.modelName==name);
    if(User.modelName==name)
    {
        db=User;
    }
    xls.data(db).then(function(data){
        console.log(data);
        res.setHeader('Content-disposition', `attachment;filename=data.xls`);
        res.setHeader('Content-type', 'text/plain');
        res.charset = 'UTF-8';
        res.status(200).end(data);
    })
}


exports.getcomment=function(req,res){
    Comment.find({}, function(err, response){
        if(err) {
            res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
    })
}


exports.postcomment = function(req,res){
    var id = req.body.image_id;
    var cmt = req.body.name+":"+req.body.comment;
    Comment.findOne({image_id:id},function(err,comment){
        if(comment!=null)
        {
        comment.comment_all.push(cmt);
        comment.updated_at=new Date();
        comment.save(function (err, response) {
        if(err) {
            res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }
        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        })
        
    });
        }
    else{
        var comment = new Comment({
        image_id: req.body.image_id,
        comment_all: req.body.name+":"+req.body.comment,
        created_at: new Date(),
        updated_at: ""
    })
    comment.save(function (err, response) {
        if(err) {
            res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }
        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        })
        
    });
    }    
})

}

exports.updateComic = function (req,res){
    var comic = new Comic({
        season_id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        story: req.body.description,
        created_at: new Date(),
        updated_at: ""
    });
    var checkid=req.params.id;
    Comic.findOne({_id:checkid},function(err,comic){
        if(err){
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });

        }
        var id = req.body.id;
        var name = req.body.name;
        var image= req.body.image;
        var description= req.body.description;
        
        comic.series_id = id;
        comic.name = name;
        comic.image = req.body.image;
        comic.story = description;
       
        comic.updated_at = new Date();
        comic.save(function (err, response) {
            if(err) {
                return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                 }

        res.json({
            "status": true,
            "respData": {
             "data":response
                }
            })
        
        });
    })
    
};

exports.updateSeason=function(req,res){
    var id = req.params.id;
    Season.findOne({_id: id}, function(err, season){
        if(err){
                 res.json({
                    "status": false,
                    "respData": {
                    "data": err
                         }
                    });
            }
        var id = req.body.id;
        var name = req.body.name;
        var description= req.body.description;
        var start= req.body.startson;
        var end= req.body.endson;
        season.series_id = id;
        season.name = name;
        season.description = description;
        season.startson = start;
        season.endson = end;
        season.updated_at = new Date();

        season.save(function(err, response){
            if(err){
                 res.json({
                    "status": false,
                    "respData": {
                    "data": err
                         }
                    });
            }

            res.json({
                    "status": true,
                    "respData": {
                    "data": response
                         }
                    });
        })
    })
}


exports.updateSeries=function(req,res){
    var id = req.params.id;
    Series.findOne({_id: id}, function(err, series){
        if(err){
                 res.json({
                    "status": false,
                    "respData": {
                    "data": err
                         }
                    });
            }
        var name = req.body.name;
        var description = req.body.description;
        series.name = name;
        series.description = description;
        series.updated_at = new Date();

        series.save(function(err, response){
            if(err){
                 res.json({
                    "status": false,
                    "respData": {
                    "data": err
                         }
                    });
            }

            res.json({
                    "status": true,
                    "respData": {
                    "data": response
                         }
                    });
        })
    })
}

exports.updateUsers=function(req,res){
    var id = req.params.id;
    User.findOne({_id: id}, function(err, user){
        if(err){
                 res.json({
                    "status": false,
                    "respData": {
                    "data": err
                         }
                    });
            }
        var password = req.body.password;
        var username = req.body.username;
        var role = req.body.role
        user.username = username;
        user.password = password;
        user.role = role;
        user.updated_at = new Date();

        user.save(function(err, response){
            if(err){
                 res.json({
                    "status": false,
                    "respData": {
                    "data": err
                         }
                    });
            }

            res.json({
                    "status": true,
                    "respData": {
                    "data": response
                         }
                    });
        })
    })
}


exports.deletecomic=function(req,res){
    var name1 = req.params.id;
    Comic.findOne({_id: name1}, function(err, comic){
        if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }
        if(comic){ 
           Comic.remove({_id: name1}, function(err){
                if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }

                res.json({
                            "status": true,
                            "respData": {
                        "data": "Success Removed Season"
                                }
                            });
            })  
       }else{
            res.json({
                    "status": false,
                    "respData": {
                    "data": "Series Doesn't exist"
                        }
                    });
            }
                      
    })
}   

exports.deleteseason=function(req,res){
    var name1 = req.params.id;
    Season.findOne({_id: name1}, function(err, season){
        if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }
        if(season){ 
           Season.remove({_id: name1}, function(err){
                if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }

                res.json({
                            "status": true,
                            "respData": {
                        "data": "Success Removed Season"
                                }
                            });
            })  
       }else{
            res.json({
                    "status": false,
                    "respData": {
                    "data": "Series Doesn't exist"
                        }
                    });
            }
                      
    })
}   

exports.deleteseries=function(req,res){
    var name1 = req.params.id;
    //console.log(name1)
    Series.findOne({_id: name1}, function(err, series){
        if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }
        if(series){
           Series.remove({_id: name1}, function(err){
                if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }

                res.json({
                            "status": true,
                            "respData": {
                        "data": "Success"
                                }
                            });
            })  
       }
       else{
            res.json({
                    "status": false,
                    "respData": {
                    "data": "Series Doesn't exist"
                        }
                    });
            }
                      
    })
    
}   



exports.deleteusers=function(req,res){
    var username1 = req.params.username;
    User.findOne({username: username1}, function(err, user){
        if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }

        if(user){
           User.remove({username: username1}, function(err){
                if(err){
                        res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
                        }

                res.json({
                            "status": true,
                            "respData": {
                        "data": "Success"
                                }
                            });
            })  
       }else{
            res.json({
                    "status": false,
                    "respData": {
                    "data": "User Doesn't exist"
                        }
                    });
            }
                      
    })
}   
exports.postuser = function(req,res){
    var crpyt = md5(req.body.password)
    var user = new User({
        username: req.body.username,
        password: crpyt,
        role: req.body.role,
        created_at: new Date(),
        updated_at: ""
    })
    user.save(function (err, response) {
        if(err) {
            res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }
        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        })
        
    });
}

exports.getuser=function(req,res){
    User.find({}, function(err, response){
        if(err) {
            res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
    })
}

exports.searchuser = function (req, res) {
    //console.log(req.params.reg);
    var crpyt = md5(req.body.password)
    var username1 = req.body.username;
    var password1 = crpyt;
    User.findOne({username:username1,password:password1}, function (err, response) {
        if (err) {
            res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }
        if ((response || []).length === 0){
            return res.json({
                    "status": false,
                    "respData": {
                    "data": "User Doesn't exist"
                        }
                    });
        }
        return res.json({
            "status": true,
            "respData": {
             "data":response.role
            }
        });
    })
};


exports.getpatseason = function (req, res) {
    //console.log(req.params.reg);
    var regex = req.params.id
    //console.log(regex)
    Season.find({series_id: regex}, function (err, response) {
        
        if (err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }
        //console.log(response)
        if(response==[ ]){
            return res.json({
            "status": false,
            "respData": {
             "data":response
            }
        });
    }
    return res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
        
    })
};


exports.searchcomic = function (req, res) {
    //console.log(req.params.reg);
    var regex = RegExp(req.params.reg,'i');
    Series.find({
        name: regex
    }, function (err, response) {
        if (err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }
        if ((response || []).length === 0){
            return res.json({
                    "status": false,
                    "respData": {
                    "data": "Comic Doesn't exist"
                        }
                    });
        }
        return res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
    })
};


exports.postseries = function (req,res){
    var series = new Series({
        name: req.body.name,
        description: req.body.description,
        created_at: new Date(),
        updated_at: ""
    });
    series.save(function (err, response) {
        if(err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        })
        
    });
};

exports.getseries=function(req,res){
    Series.find({}, function(err, response){
        if(err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
    })
}

exports.postseason = function (req,res){
    var season = new Season({
        series_id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        startson: req.body.startson,
        endson: req.body.endson,
        created_at: new Date(),
        updated_at: ""
    });
    var name1=season.series_id;
    //console.log(name1)
    Series.findOne({_id: name1},function(err,response){
        if(err){
            return res.json({
                            "status": false,
                            "respData": {
                        "data": "Invalid Series Name"
                                }
                            });

        }
    season.save(function (err, response) {
        if(err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        })
        
    });

    })
    
};

exports.getseason=function(req,res){
    Season.find({}, function(err, response){
        if(err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
    })
}

exports.postcomic = function (req,res){
    var comic = new Comic({
        season_id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        story: req.body.description,
        created_at: new Date(),
        updated_at: ""
    });
    var checkid=comic.season_id;
    Season.findOne({_id:checkid},function(err,response){
        if(err){
            return res.json({
                            "status": false,
                            "respData": {
                        "data": "Invalid Season Name"
                                }
                            });

        }
    comic.save(function (err, response) {
        if(err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        })
        
    });
    })
    
};

exports.getcomic=function(req,res){
    Comic.find({}, function(err, response){
        if(err) {
            return res.json({
                            "status": false,
                            "respData": {
                        "data": err
                                }
                            });
        }

        res.json({
            "status": true,
            "respData": {
             "data":response
            }
        });
    })
}

exports.error=function(req,res){
    return res.json({
                    "status": false,
                    "respData": {
                    "data": "no entry"
                        }
            });
}