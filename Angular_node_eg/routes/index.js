var express = require('express');
var router = express.Router();
var path = require('path');
var isArray = require('isarray');
//var querystring = require('querystring');
var https = require('https');
//var googlemaps = require('@google/maps');
// include httpModule which accumulates the response data
//var httpmodule = require('./httpModule');
//var requestIp = require('request-ip');ç
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* GET help page. */
router.get('/help', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'help.html'));
});

router.get('/vlcc', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'VLCC.html'));
});

router.get('/places', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'PlacesFind.html'));
});

//cocacola page
router.get('/demo', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'cocacola.html'));
});

//BIdemo home page
router.get('/searceBIplatform', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'BIplatformhome.html'));
});

//BIdemo page
router.get('/bidemo', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'bidemo.html'));
});

//var googleMapsClient = googlemaps.createClient({
//    key: 'AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo'
//});
var index = -1;

//router.get('/data', function(req,res){
//	res.json([{"id": 1, "name": "Mymm", "city": "Pantano do Sul"},
//        {"id": 2, "name": "Skyble", "city": "Guilmaro"},
//        {"id": 3, "name": "Tagfeed", "city": "Gnosjö"},
//        {"id": 4, "name": "Realcube", "city": "Jrashen"},
//        {"id": 5, "name": "Bluejam", "city": "Zhangjiawo"},
//        {"id": 6, "name": "Jayo", "city": "Obonoma"},
//        {"id": 7, "name": "Cogidoo", "city": "Sungsang"},
//        {"id": 8, "name": "Avavee", "city": "Diawara"},
//        {"id": 9, "name": "Tagtune", "city": "Monywa"},
//        {"id": 10, "name": "Centimia", "city": "Retkovci"}]);
//});

router.get('/wareHouses', function (req, res) {
    var db = req.db;
    var collection = db.get('wareHouses');

    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/filter', function (req, res) {
    var db = req.db;
//    var filter = req.filter;
    var collection = db.get(req.query['dbToSearchFor']);
    delete req.query['dbToSearchFor'];
    console.log(req.query);

    collection.find(req.query, {}, function (e, docs) {
//        console.log(docs, e);
        res.json(docs);
    });
});

router.get('/getData', function (req, res) {
    var db = req.db;
//    var dbName = req.query.dbName;
    var collection = db.get('metadata');

    collection.find(req.query, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/getNearestData', function (req, res) {
    var db = req.db;
//    var dbName = req.query.dbName;
    var collection = db.get('metadata');
    var query = {};
    if (req.query['docType']) {
        query = {
            'docType': {$in: ["wareHouses", "Plants", "WareHouses"]},
            '$and': [
                {'Latitude': {"$gte": +req.query['Latitude'].toString()  }},
                {'Latitude': {"$lte": +req.query['Latitude1'].toString()  }},
                {'Longitude': {"$gte": +req.query['Longitude'].toString()  }},
                {'Longitude': {"$lte": +req.query['Longitude1'].toString()  }}
            ]
        };
    }
    else {
        query = {
            '$and': [
                {'Latitude': {"$gte": +req.query['Latitude'].toString()  }},
                {'Latitude': {"$lte": +req.query['Latitude1'].toString()  }},
                {'Longitude': {"$gte": +req.query['Longitude'].toString()  }},
                {'Longitude': {"$lte": +req.query['Longitude1'].toString()  }}
            ]
        };
    }
    console.log(query);
    collection.find(query, {}, function (e, docs) {
//        console.log(docs);
        res.json(docs);
    });
});

router.get('/templates', function (req, res) {
    var db = req.db;
    var collection = db.get('templates');

    collection.distinct('docType', {"showInFilter": true}, function (err, items) {
        res.json(items);
    });
});

/*
 * GET wareHouseslist.
 */
router.get('/templatesFields', function (req, res) {
//    console.log('here');
    var db = req.db;
    var collection = db.get('templates');
    console.log(req.query);

    collection.find(req.query, {}, function (err, items) {
        console.log('here');
        console.log(err);
        console.log(items);
        res.json(items);
    });
});

router.get('/stateNames', function (req, res) {
    var db = req.db;
    var collection = db.get('censusData');

//    collection.distinct('properties.STATE', {'properties.PINCODE': {$exists: true }}, function (err, items) {
    collection.distinct('properties.STATE', {}, function (err, items) {
        res.json(items);
    });
});

router.get('/stateData', function (req, res) {
    var db = req.db;
    var collection = db.get('censusData');
    var resultData = {};

    collection.distinct('properties.PINCODE', req.query, function (err, items) {
        resultData.zipCodes = items;
        collection.distinct('properties.DISTRICT', req.query, function (err, items) {
            resultData.districts = items;
            collection.distinct('properties.SUB_DISTRICT', req.query, function (err, items) {
                resultData.talukas = items;
                res.json(resultData);
            });
        });
    });


});

router.get('/zipcodBoundries', function (req, res) {
    var db = req.db;
    var collection = db.get('censusData');
    var result = {};
    console.log(req.query);

    collection.find(req.query, {'_id': 0}, function (err, items) {
//       res.json(items);
        result.shapeFile = items;
        collection = db.get('metadata');

        collection.find(req.query, {'_id': 0}, function (err, items) {
            result.metaData = items;
            res.json(result);
        });
    });


});

router.get('/zipcodMetadata', function (req, res) {
    var db = req.db;
    var collection = db.get('metadata');
    var result = {};
    console.log(req.query);


    collection.find(req.query, {'_id': 0}, function (err, items) {
        result.metaData = items;
        res.json(result);
    });


});

var types = "bus";
var keyword = "jalgaon";
router.get('/searchText', function (req, res) {
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo&" + "query=" + req.query['query'];
    if (req.query['next_page_token']) {
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo&" + "pagetoken=" + req.query['next_page_token'];

    }


    console.log(url);
    https.get(url, function (response) {

        var body = '';
        response.on('data', function (chunk) {

            body += chunk;
        });

        response.on('end', function () {
            var places = JSON.parse(body);
            console.log(JSON.parse(body));
            var db = req.db;
            var collection = db.get('placesApiData');

            collection.insert(places.results);
//            var locations = places.results;
//            var randLoc = locations[Math.floor(Math.random() * locations.length)];

            res.json(places);
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
});

router.get('/saveRoute', function (req, res) {
    var db = req.db;
    var collection = db.get('routesHistory');
    console.log(req.query.routeInfo);
    console.log('----------------');

    collection.insert(req.query.routeInfo);
    res.json({"msg": ""})

//    res.msg("Route saved successfully.")
});


router.get('/getRoute', function (req, res) {
    var db = req.db;
    var collection = db.get('routesHistory');
    console.log(req.query['search']);
    var query1 = [
        {'origin': {'$options': '-i', '$regex': req.query['search']  }},
        {'destination': {'$options': '-i', '$regex': req.query['search']  }},
        {'routeName': {'$options': '-i', '$regex': req.query['search']  }}
    ];

    var query = {
        '$or': query1
    };
    console.log(query);
    console.log('=============');

//    collection.find(query, {'_id':0} , function(err, items) {
    collection.find({}, {'_id': 0}, function (err, items) {
//        result.metaData = items;
        res.json(items);
    });
});

function getLocationFromArray(dataArr, index) {
    var DELIM = " ";
    if (index == 1) {
        for (var j = 3; j > 0; j--) {
            dataArr[j] = dataArr[j].replace(/[.,;:*&'"@$%()]/g, "");
            var tempArr = dataArr[j].split(DELIM);
            if (tempArr.length > 1) {
                dataArr.splice(j, 1);
                tempArr.map(function (x, k) {
                    dataArr.splice(j + k, 0, x);
                })
            }
        }
    };

    var retString = "";
    for (var i = index; i < dataArr.length - 3; i++) {
        retString = retString + "" + dataArr[i];
    };

    return retString;
}

var geoAddress = [];

function getGeolocation(dataArray, index) {
    if (!index)
        index = 0;
//    else if (index >= dataArray.length)
//        return true;
//    else
    index++;

    console.log('provided location is --------------------------------------',dataArray);


    var location = getLocationFromArray(dataArray, index);
//    console.log("location", location);
    googleMapsClient.geocode({
        address: location
    }, function (err, response) {
        if (!err) {
            if (response.json.results.length > 0) {
                console.log("location", location);
                response.json.results.map(function (x) {
                    console.log("%s,%s,%s,%s,%s", dataArray[0], x.formatted_address.replace(/,/g, ' '), x.geometry.location.lat, x.geometry.location.lng, response.json.results.length);
                    geoAddress.push({'addr':  x.formatted_address.replace(/,/g, ' '),
                        'lat':x.geometry.location.lat,'lng': x.geometry.location.lng});
                    console.log('--------------------------------------------------------------------------')
                    return true;
                })
            }
            else
            {
//                console.log('calling again - ', index);
                getGeolocation(dataArray, index);
            }
        } else {
            console.log("error", err);
        }
    });
}
router.get('/getGeolocation', function (req, res) {
    console.log(req.query);
    var dataArray = req.query['addresses'];
    var tempArr1 = dataArray.split("\n");
    geoAddress = [];
    for (var i = 0; i < tempArr1.length; i++) {
        console.log('starting for - ', tempArr1[i]);
        var result = getGeolocation(tempArr1[i], 0);
    }

    console.log("finished--------------------------");

    res.json(geoAddress);

});

router.get('/allCities', function (req, res) {
    var db = req.db;
    var collection = db.get('censusData');
    var resultData = {};

    collection.distinct('properties.DISTRICT', {}, function (err, items) {
        res.json(items.sort());
    });


});

router.get('/citiesShapeFile', function (req, res) {
    var db = req.db;
    var collection = db.get('censusData');
    var resultData = {};

    collection.find(req.query, {'_id': 0}, function (err, items) {
        res.json(items);
    });


});

router.get('/weightagePOI', function (req, res) {
    var db = req.db;
    var collection = db.get('metadata');
    var resultData = {};

    var query = {"docType" : "MarketMapping","isActive":"true"};
    collection.find(query, {'_id': 0}, function (err, items) {
        console.log(err);
        console.log(items);

        res.json(items);
    });


});

//Times Internet States shape file
router.get('/IndiaStatesShapeFile', function (req, res) {
    var db = req.db;
    var collection = db.get('indiaStatesShapeFileJson');
    var resultData = {};

    collection.find({}, {'_id': 0}, function (err, items) {
        res.json(items);
    });


});

router.get('/getstorelocations', function (req, res) {
    var db = req.db;
    var collection = db.get('coca-cola');

    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/getcocacolastorelocations', function (req, res) {
    var db = req.db;
    var collection = db.get('coca-colaData');

    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/getBIData', function (req, res) {
    var db = req.db;
    var collection = db.get('biData');

    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;