
        var sampleApp = angular.module('angularjs_with_Nodejs', []);
        sampleApp.controller('MapCtrl', function ($http,$scope) {
	
	    var i;
        var mark,marks,places,arr,arr1,color,markpoint1,district,districts;
        var pet2 = [];
        var veterinary2 = [];
        var department2 = [];
        var supermarket2 = [];
        var store2 = [];
        var convenience2 = [],
        pet = [],
        veterinary = [],
        department = [],
        supermarket = [],
        store = [],
        convenience = [];
        $scope.selectedStore = {};
        var result = [];
        var array=[];
        var infowindowplacesmarker,infoWindow;
        var locations = [];
        var north, east, west, south,northeast,northwest,southeast,southwest;
       var nearbyplaces=[];
       var locations1 = [];
      var nearplace =[];
        
    var mapOptions = { 
        zoom: 5,
        center: new google.maps.LatLng(25,80),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    infoWindow = new google.maps.InfoWindow();
    $scope.markers = [];
    var data1 = $scope.map.data.loadGeoJson('/districts.json');
    $scope.map.data.addGeoJson(data1);

    $scope.map.data.setStyle(function(feature) {
        var NAME = feature.getProperty('NAME_1');
        var scolor = "black";
        if (NAME == "Andaman and Nicobar") {
          color = "green";
        }
        else if (NAME == "Andhra Pradesh") {
          color = "blue";
        }
        else if (NAME == "Arunachal Pradesh") {
          color = "violet";
        }
        else if (NAME == "Assam") {
          color = "pink";
        }
        else if (NAME == "Bihar") {
          color = "grey";
        }
        else if (NAME == "Chandigarh") {
          color = "yellow";
        }
        else if (NAME == "Chhattisgarh") {
          color = "#2a9093";
        }else if (NAME == "Dadra and Nagar Haveli") {
          color = "#912b30";
        }else if (NAME == "Daman and Diu") {
          color = "#ed898e";
        }else if (NAME == "Goa") {
          color = "#ed898e";
        }else if (NAME == "Gujarat") {
          color = "#a07e86";
        }else if (NAME == "Haryana") {
          color = "#d60e7c";
        }else if (NAME == "Himachal Pradesh") {
          color = "#5e0b38";
        }else if (NAME == "Jammu and Kashmir") {
          color = "#e6e7ea";
        }else if (NAME == "Jharkhand") {
          color = "#3b64ef";
        }else if (NAME == "Karnataka") {
          color = "#adbfff";
        }else if (NAME == "Kerala") {
          color = "#adf4ff";
        }else if (NAME == "Lakshadweep") {
          color = "#1f5e68";
        }else if (NAME == "Madhya Pradesh") {
          color = "#043942";
        }else if (NAME == "Maharashtra") {
          color = "#21deff";
        }else if (NAME == "Manipur") {
          color = "#20ffc3";
        }else if (NAME == "Meghalaya") {
          color = "#06261d";
        }else if (NAME == "Mizoram") {
          color = "#86baab";
        }else if (NAME == "Nagaland") {
          color = "#86ba92";
        }else if (NAME == "Delhi") {
          color = "#01c62f";
        }else if (NAME == "Orissa") {
          color = "#8ac601";
        }else if (NAME == "Puducherry") {
          color = "#d4f785";
        }else if (NAME == "Punjab") {
          color = "#6d7f43";
        }else if (NAME == "Rajasthan") {
          color = "#edf731";
        }else if (NAME == "Sikkim") {
          color = "#faff9e";
        }else if (NAME == "Tamil Nadu") {
          color = "#d39e17";
        }else if (NAME == "Tripura") {
          color = "#db6b08";
        }else if (NAME == "Uttar Pradesh") {
          color = "#9b510f";
        }else if (NAME == "Uttaranchal") {
          color = "#f2773e";
        }else if (NAME == "West Bengal") {
          color = "#f14f3e";
        }
        return {
          fillColor: color,
          strokeWeight: 0.5,
          strokeColor:scolor,
        }
      });

      $scope.updateCheckBox = function () {
        if ($scope.test != null) {
            
                $scope.enableMe = true;
            
        }else
        $scope.enableMe = true;
        
    };

    var getJsonData = function() {
        var req = {
            method: 'GET',
            url: '/index.json',
            cache: false,
            headers: {'Content-Type': 'application/json'}
          };  
        $http(req)
             .then(function (res) {
                 $scope.cities = res.data.cities;

                 for (i = 0; i < $scope.cities.length; i++)
                 {
                    createMarker($scope.cities[i]);
                } 
                
  
             });
          
     };
     var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.location[0],info.location[1]),
            title: info.name,
            icon:"https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-01-32.png"
        });
        marker.content = '<div class="infoWindowContent">' + info.location + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent( '<strong>'+ marker.title + '</br>' + marker.content +'</strong>');
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
     
    getJsonData();

    // $scope.test = $scope.cities;

    // $scope.onCategoryChange = function () {
    //     console.log("Selected Value: " + $scope.test.location + "\nSelected Text: " + $scope.test.name);
    //      var selectedMarker=$scope.test.name;
    //      for(i = 0; i < $scope.markers.length; i++)
    //      {
    //         if(selectedMarker==$scope.markers[i].title)
    //         {
    //             mark=$scope.markers[i]
    //             google.maps.event.trigger($scope.markers[i], 'click');
    //         }
    //     }
    //     return mark;
        
    // var expanded = false;
    //  $scope.showCheckboxes= function() {
    //     var checkboxes = document.getElementById("checkboxes");
    //     if (!expanded) {
    //         console.log(mark.position);
    //       checkboxes.style.display = "block";
    //       expanded = true;
    //     } else {
    //       checkboxes.style.display = "none";
    //       expanded = false;
    //     }
        
    //   }



      $scope.storetypes = 
      [
          {"name":"Veterinary Care", "checked":false},
          {"name":"Department Store", "checked":false},
          {"name":"Pet Store", "checked":false},
          {"name":"Super Market", "checked":false},
          {"name":"Convenience Store", "checked":false},
          {"name":"Stores", "checked":false},
          
      ]



      $scope.itemList=[];
      $scope.changedValue=function(item){
        locations.forEach(function(marker){marker.setMap(null);});
        locations1.forEach(function(marker){marker.setMap(null);});
        locations.length=null;
        locations1.length=null;
        array.length=null;
         $scope.city=item.name;
         for(i = 0; i < $scope.markers.length; i++)
             {
                if($scope.city==$scope.markers[i].title)
                {
                    $scope.markers[i].setMap($scope.map);
                    mark=$scope.markers[i].getPosition();
                    google.maps.event.trigger($scope.markers[i], 'click');
                    
                    $scope.map.setCenter($scope.markers[i].getPosition());
                    $scope.UncheckAll();
                    $scope.randomPoints();

                    $scope.map.data.forEach(function(feature)
                    {
                       // map.setZoom(7);
                       $scope.map.setZoom(10);
                        if (feature.getGeometry().getType()=="Polygon") 
                        {
                                var poly = new google.maps.Polygon
                                ({
                                path: feature.getGeometry().getAt(0).getArray(),
                                });
                                district= feature.getProperty('NAME_2');	
                        if (google.maps.geometry.poly.containsLocation(mark,poly)) 
                            {
                              districts=district
                                $scope.map.data.revertStyle();
                                $scope.map.data.overrideStyle(feature, {fillColor:"#000066"});
                               
                               // if(infowindow){infowindow.close();}
                               // infowindow.setContent("<strong>"+"LatLng : "+$scope.markers[i].getPosition()+"</br>"+ "City : "+$scope.markers[i].title +"</br>"+"City : " + feature.getProperty('NAME_2')+"</strong>");
                               // infowindow.setPosition($scope.markers[i].getPosition());
                                //infowindow.open($scope.map);
                            }
                        }
                    });
                }else{
                       
                    $scope.markers[i].setMap(null);
                }
            }
           // console.log(mark);
            return mark; 

        }
		
        $scope.randomPoints = function()
        { 
          var spherical = google.maps.geometry.spherical;	
        
          north = spherical.computeOffset(mark, 10000, 0);
          createPoint($scope.map, north, "north"); 
          north = spherical.computeOffset(mark, 15000, 0);
          createPoint($scope.map, north, "north"); 
          north = spherical.computeOffset(mark, 20000, 0);
         createPoint($scope.map, north, "north"); 
           north = spherical.computeOffset(mark, 25000, 0);
         createPoint($scope.map, north, "north"); 
          northeast = spherical.computeOffset(mark, 10000, 45);
          createPoint($scope.map, northeast, "northeast");
          northeast = spherical.computeOffset(mark, 15000, 45);
          createPoint($scope.map, northeast, "northeast");
         northeast = spherical.computeOffset(mark, 20000, 45);
          createPoint($scope.map, northeast, "northeast");
          northeast = spherical.computeOffset(mark, 25000, 45);
         createPoint($scope.map, northeast, "northeast");
          west  = spherical.computeOffset(mark, 10000, -90);
          createPoint($scope.map, west, "west");
          west  = spherical.computeOffset(mark, 15000, -90);
          createPoint($scope.map, west, "west"); 
         west  = spherical.computeOffset(mark, 20000, -90);
         createPoint($scope.map, west, "west");
         west  = spherical.computeOffset(mark, 25000, -90);
         createPoint($scope.map, west, "west"); 
          southeast = spherical.computeOffset(mark, 10000, 135);
          createPoint($scope.map, southeast, "southeast");
           southeast = spherical.computeOffset(mark, 15000, 135);
          createPoint($scope.map, southeast, "southeast");
          southeast = spherical.computeOffset(mark, 20000, 135);
          createPoint($scope.map, southeast, "southeast");
          southeast = spherical.computeOffset(mark, 25000, 135);
          createPoint($scope.map, southeast, "southeast"); 
          south = spherical.computeOffset(mark, 10000, 180);
          createPoint($scope.map, south, "south");
          south = spherical.computeOffset(mark, 15000, 180);
          createPoint($scope.map, south, "south");
         south = spherical.computeOffset(mark, 20000, 180);
         createPoint($scope.map, south, "south");
         south = spherical.computeOffset(mark, 25000, 180);
         createPoint($scope.map, south, "south");
          southwest = spherical.computeOffset(mark, 10000, -45);
          createPoint($scope.map, southwest, "southwest");
          southwest = spherical.computeOffset(mark, 15000, -45);
          createPoint($scope.map, southwest, "southwest");
         southwest = spherical.computeOffset(mark, 20000, -45);
         createPoint($scope.map, southwest, "southwest");
         southwest = spherical.computeOffset(mark, 25000, -45);
         createPoint($scope.map, southwest, "southwest");
          east  = spherical.computeOffset(mark, 10000, 90);
          createPoint($scope.map, east, "east");
          east  = spherical.computeOffset(mark, 15000, 90);
          createPoint($scope.map, east, "east");
         east  = spherical.computeOffset(mark, 20000, 90);
         createPoint($scope.map, east, "east"); 
         east  = spherical.computeOffset(mark, 25000, 90);
          createPoint($scope.map, east, "east");
          northwest = spherical.computeOffset(mark, 10000, -135);
          createPoint($scope.map, northwest, "northwest");
           northwest = spherical.computeOffset(mark, 15000, -135);
          createPoint($scope.map, northwest, "northwest");
          northwest = spherical.computeOffset(mark, 20000, -135);
          createPoint($scope.map, northwest, "northwest");
          northwest = spherical.computeOffset(mark, 25000, -135);
         createPoint($scope.map, northwest, "northwest");
           function createPoint(map, mark, title) 
          {
            var point=new google.maps.Marker({
              map: map,
              position: mark,
              title: title,
              visible: false,
              icon:'https://cdn3.iconfinder.com/data/icons/bunch-of-stuff/126/slice87-16.png'
           });	
           locations.push(point);
         }
            // for(i=0;i<locations.length;i++)
           // {
              // markpoint1= locations[i].getPosition();
              // northeast = spherical.computeOffset(markpoint1, 30000, 45);
              // createPoint1($scope.map, northeast, "northeast");
              // northwest = spherical.computeOffset(markpoint1, 30000, -135);
              // createPoint1($scope.map, northwest, "northwest");
              // southeast = spherical.computeOffset(markpoint1, 30000, 135);
              // createPoint1($scope.map, southeast, "southeast");
              // southwest = spherical.computeOffset(markpoint1, 30000, -45);
              // createPoint1($scope.map, southwest, "southwest");
           // }
           // function createPoint1(map, mark, title) 
           // {
            // var point1=new google.maps.Marker({
              // map: map,
              // position: mark,
              // title: title,
              // visible: false,
              // icon:'https://cdn3.iconfinder.com/data/icons/bunch-of-stuff/126/slice87-16.png'
             // });
             // locations1.push(point1);
            // }
        } 




	
$scope.UncheckAll = function()
  { 
      var w = document.getElementsByTagName('input'); 
      for(var i = 0; i < w.length; i++)
	  { 
         if(w[i].type=='checkbox')
		{ 
          w[i].checked = false;	
		  convenience.forEach(function(marker){marker.setMap(null);}); 		
		  store.forEach(function(marker){marker.setMap(null);});  	
		  pet.forEach(function(marker){marker.setMap(null);});  	
		  veterinary.forEach(function(marker){marker.setMap(null);});  	
		  department.forEach(function(marker){marker.setMap(null);});  	
		  supermarket.forEach(function(marker){marker.setMap(null);});  	
        }
      }
	  if (convenience.length!=null)
		{
			convenience.length=null;	
		}
	  if(convenience2.length!=null)
		{
			convenience2.length=null;
		} 
      //document.getElementById("bicycle").value =bicycle2.length;
		if(store.length!=null)
		{
			store.length=null;
		}
		if(store2.length!=null)
		{
			store2.length=null;
		}
		//document.getElementById("book").value =book2.length;

		if(pet.length!=null)
		{
			pet.length=null;
		}
		if(pet2.length!=null)
		{
			pet2.length=null;
		}
		//document.getElementById("home").value =home2.length;
		if(veterinary.length!=null)
		{
			veterinary.length=null;
		}
		if(veterinary2.length!=null)
		{
			veterinary2.length=null;
		}
		//document.getElementById("liquor").value =liquor2.length;
		if(department.length!=null)
		{
			department.length=null;
		}
		if(department2.length!=null)
		{
			department2.length=null;
		}
		//document.getElementById("electronics").value =electronics2.length;
		if(supermarket.length!=null)
		{
			supermarket.length=null;
		}
		if(supermarket2.length!=null)
		{
			supermarket2.length=null;
		}
		//document.getElementById("jewelry").value =jewelry2.length;
  } 


  

        $scope.getData = function(storetype,event, index,isFromDropDownSelection) 
        {
            //var jsonObject = JSON.parse($scope.selectedStore);
           
            if(isFromDropDownSelection)
           {
                for (var i = 0, length = $scope.storetypes.length; i < length; i++) 
                    {
                        $scope.storetypes[i].checked = false;
                    }  
            }
        
            //checking and assiging values got from callback( index nad event )
            marks=mark;
           // console.log(marks);
           if(marks!==undefined)
              { 
              
                nearplace.length=null;
                nearbyplaces.length=null;  
                result.length=null;
                array.length=null;
				arr1=null;
                for(i=0;i<locations.length;i++)
                {
                    nearbyplaces.push(locations[i].getPosition());
                     
                }
                 // for(i=0;i<locations1.length;i++)
                 // {
                     // nearbyplaces.push(locations1[i].getPosition());
                    
                 // }
                nearbyplaces.push(marks);
                console.log(nearbyplaces.length);
                    for(i=0;i<nearbyplaces.length;i++)
                            { 
                                $scope.map.data.forEach(function(feature) 
                                {
                                  
                                  if (feature.getProperty('NAME_2') == districts) 
                                   {
                                    
                                    var poly = new google.maps.Polygon({
                                    path: feature.getGeometry().getAt(0).getArray(),
                                    strokeOpacity: 0.8,
                                    strokeWeight: 2,
                                    });
                                    $scope.map.data.revertStyle();
                                    $scope.map.data.overrideStyle(feature, {fillColor:"#05c0ff"});
                                 if (google.maps.geometry.poly.containsLocation(nearbyplaces[i],poly)) 
                                    {
                                        nearplace.push(nearbyplaces[i]);  
                                    }
                                   }
                                });
                            }
                            		  
            if(index!= -1)
                $scope.storetypes[index].checked = event.target.checked;
                
            for (var i = 0, length = $scope.storetypes.length; i < length; i++) 
            {
                if($scope.storetypes[i].checked)
                {
                   
                    typeName = $scope.storetypes[i].name;
                    console.log(nearplace.length);
                            if( typeName == "Veterinary Care" && storetype == "Veterinary Care" )
                            {
							      for(var j=0;j<nearplace.length;j++)
                                  {
										getAllResults(j);
								  }
								  function getAllResults(j) 
								  {
								    setTimeout(function() 
									{
										var request= 
										{
											location : nearplace[j],
											radius : 5000,
											componentRestrictions: {'country': 'IN'},
											type : ['veterinary_care']
										}
							    
									var service = new google.maps.places.PlacesService($scope.map);
									service.nearbySearch(request,$scope.veterinaryCallback);
									}, 1000 * j);
								  }
                          }
                            else if(typeName == "Pet Store" && storetype == "Pet Store")
                            {
							  for(var j=0;j<nearplace.length;j++)
                                  {
										getAllResults(j);
								  }
								  function getAllResults(j) 
								  {
								    setTimeout(function() 
									{
                                var request= {
                                    location :nearplace[j],
                                    radius : 5000,
                                    //query:subarea,
                                    componentRestrictions: {'country': 'IN'},
                                    type : ['pet_store']
                                }
                                var service1 = new google.maps.places.PlacesService($scope.map);
                                service1.nearbySearch(request, $scope.petCallback);   
                            }, 700 * j);
								  }
                          }
                           else if(typeName == "Department Store" && storetype == "Department Store")
                            { 
							  for(var j=0;j<nearplace.length;j++)
                                  {
										getAllResults(j);
								  }
								  function getAllResults(j) 
								  {
								    setTimeout(function() 
									{
                                         var request= {
                                            location :nearplace[j],
                                            radius : 5000,
                                            //query:subarea,
                                            componentRestrictions: {'country': 'IN'},
                                            type : ['department_store']
                                        }
                                        var service2 = new google.maps.places.PlacesService($scope.map);
                                        service2.nearbySearch(request, $scope.departmentCallback);   
										}, 700 * j);
								  }
                            }
                           else if(typeName == "Super Market" && storetype == "Super Market")
                            {
                                for(var j=0;j<nearplace.length;j++)
                                  {
										getAllResults(j);
								  }
								  function getAllResults(j) 
								  {
								    setTimeout(function() 
									{                                     
									 var request= {
                                            location : nearplace[j],
                                            radius : 5000,
                                            //query:subarea,
                                            componentRestrictions: {'country': 'IN'},
                                            type : ['supermarket']
                                        } 
                                        var service3 = new google.maps.places.PlacesService($scope.map);
                                        service3.nearbySearch(request, $scope.supermarketCallback);
										}, 700 * j);
								  }
                            }
                         else if(typeName == "Convenience Store" && storetype == "Convenience Store")
                            {
							     for(var j=0;j<nearplace.length;j++)
                                  {
										getAllResults(j);
								  }
								  function getAllResults(j) 
								  {
								    setTimeout(function() 
									{    
                                        var request= {
                                            location : nearplace[j],
                                            radius : 5000,
                                            //query:subarea,
                                            componentRestrictions: {'country': 'IN'},
                                            type : ['convenience_store']
                                        }
                                        var service4 = new google.maps.places.PlacesService($scope.map);
                                        service4.nearbySearch( request, $scope.convenienceCallback);
									}, 700 * j);
								  }										
                            }
                           else if(typeName == "Stores" && storetype == "Stores")
                            {
							   for(var j=0;j<nearplace.length;j++)
                                  {
										getAllResults(j);
								  }
								  function getAllResults(j) 
								  {
								    setTimeout(function() 
									{    
                                       var request= {
                                            location : nearplace[j],
                                            radius : 5000,
                                            //query:subarea,
                                            componentRestrictions: {'country': 'IN'},
                                            type : ['store']
                                        }
                                        var service5 = new google.maps.places.PlacesService($scope.map);
                                        service5.nearbySearch(request, $scope.storeCallback);
									}, 700 * j);
								  }														
                            }
                }else   
                    {
                        var typeName = $scope.storetypes[i].name;
                        if( typeName == "Veterinary Care" )
                        {
                            for (var x in veterinary) {
                                veterinary[x].setMap(null);
                            }
                             if(veterinary.length!=null)
                            {
                                veterinary.length=null;
                                
                            }
                             if(veterinary2.length!=null)
                            {
                                veterinary2.length=null;
                                
                            }
                            //document.getElementById("veterinary").value =veterinary2.length;
                        }
                        else if(typeName == "Pet Store")
                        {
                            for (var x in pet) {
                                pet[x].setMap(null);
                            }
                            if(pet.length!=null)
                            {
                                pet.length=null;
                                
                            }
                             if(pet2.length!=null)
                            {
                                pet2.length=null;
                                
                            }
                           //document.getElementById("pet").value =pet2.length;
                        }
                        else if(typeName == "Department Store")
                        {
                            for (var x in department) {
                                department[x].setMap(null);
                            }
                            if(department.length!=null)
                            {
                                department.length=null;
                                
                            }
                             if(department2.length!=null)
                            {
                                department2.length=null;
                            }
                            //document.getElementById("department").value =department2.length;
                        }
                        else if(typeName == "Super Market")
                        {
                            for (var x in supermarket) {
                                supermarket[x].setMap(null);
                            }
                            if(supermarket.length!=null)
                            {
                                supermarket.length=null;
                                
                            }
                             if(supermarket2.length!=null)
                            {
                                supermarket2.length=null;
                                
                            }
                           //document.getElementById("supermarket").value =supermarket2.length;
                        }
                        else if(typeName == "Convenience Store")
                        {
                            for (var x in convenience) {
                                convenience[x].setMap(null);
                            }
                            if(convenience.length!=null)
                            {
                                convenience.length=null;
                                
                            }
                             if(convenience2.length!=null)
                            {
                                convenience2.length=null;
                                
                            }
                           // document.getElementById("convenience").value =convenience2.length;
                        }
                        else if(typeName == "Stores")
                        {
                            for (var x in store) {
                                store[x].setMap(null);
                            }
                            if(store.length!=null)
                            {
                                store.length=null;
                                
                            }
                             if(store2.length!=null)
                            {
                                store2.length=null;
                                
                            }
                           // document.getElementById("convenience").value =convenience2.length;
                        }
                    }
        }
    }
 } 

        $scope.veterinaryCallback = function(results, status,pagination)
            {
                result.length=null;
                array.length=null;
             //  console.log(districts);
                if (status === google.maps.places.PlacesServiceStatus.OK) 
                {
                google.maps.places.type
                for (var i = 0; i < results.length; i++)
							{                                
                               // $scope.createPlacesMarkerForveterinary(results[i],results[i].place_id);
                               result.push(results[i]);
                               
							}
                            var dups = [];
							arr = result.filter(function(el) 
						 	{
							  if (dups.indexOf(el.place_id) == -1 ) {
								dups.push(el.place_id);
							return true;
							  }return false;
							});
						for (var i = 0; i < arr.length; i++)
						{
								$scope.map.data.forEach(function(feature) 
								{
									if (feature.getProperty('NAME_2') == districts) 
									{
										var poly = new google.maps.Polygon({
										path: feature.getGeometry().getAt(0).getArray(),
										strokeOpacity: 0.8,
										strokeWeight: 2,
										});
										$scope.map.data.revertStyle();
										$scope.map.data.overrideStyle(feature, {fillColor:"#8de0fc"});
									if (google.maps.geometry.poly.containsLocation(arr[i].geometry.location,poly)) 
										{
										  places=arr[i];
										  array.push(places);
										}
									}
								});
						}
						var duplicates = [];
								    arr1=null;
								 arr1 = array.filter(function(el) 
								{
								  if (duplicates.indexOf(el.place_id) == -1 ) 
								  {
									duplicates.push(el.place_id);
									return true;
								  }return false;
								});
								for (var i = 0; i < arr1.length; i++)
						       {
                                     //$scope.createPlacesMarkerForveterinary(arr1[i],type,arr1[i].place_id,arr1[i].types[0]);
                                      $scope.createPlacesMarkerForveterinary(arr1[i],arr1[i].place_id);    
					           }
					if (pagination.hasNextPage) 
				     {
				       pagination.nextPage();
                     };
                }else if(status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
                      {
                              console.log("Requst Could Not Complete Because :"+status);  
                      }else 
                      {
                          console.log("Requst Could Not Complete Because :"+status);  
                       }
            };
        
            $scope.petCallback = function(results, status,pagination)
            {
                result.length=null;
                array.length=null;
             
                if (status === google.maps.places.PlacesServiceStatus.OK) 
                {
                google.maps.places.type
                 
                for (var i = 0; i < results.length; i++)
                {
                   // $scope.createPlacesMarkerForpet(results[i],results[i].place_id);
                   result.push(results[i]);
                }
                var dups = [];
                arr = result.filter(function(el) 
                 {
                  if (dups.indexOf(el.place_id) == -1 ) {
                    dups.push(el.place_id);
                return true;
                  }return false;
                });
                for (var i = 0; i < arr.length; i++)
                {
                        $scope.map.data.forEach(function(feature) 
                        {
                            if (feature.getProperty('NAME_2') == districts) 
                            {
                                var poly = new google.maps.Polygon({
                                path: feature.getGeometry().getAt(0).getArray(),
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                });
                                $scope.map.data.revertStyle();
                                $scope.map.data.overrideStyle(feature, {fillColor:"#8de0fc"});
                            if (google.maps.geometry.poly.containsLocation(arr[i].geometry.location,poly)) 
                                {
                                  places=arr[i];
                                  array.push(places);
                                }
                            }
                        });
                }
						var duplicates = [];
								    arr1=null;
								 arr1 = array.filter(function(el) 
								{
								  if (duplicates.indexOf(el.place_id) == -1 ) 
								  {
									duplicates.push(el.place_id);
									return true;
								  }return false;
                                });
								for (var i = 0; i < arr1.length; i++)
						       {
                                 // $scope.createPlacesMarkerForbicycle(arr1[i],type,arr1[i].place_id,arr1[i].types[0]);
                                    $scope.createPlacesMarkerForpet(arr1[i],arr1[i].place_id);    
                                }
        if (pagination.hasNextPage) 
         {
           pagination.nextPage();
         };
                } 
                
            };
            $scope.departmentCallback = function(results, status,pagination)
            {
                result.length=null;
                array.length=null;
             
                if (status === google.maps.places.PlacesServiceStatus.OK) 
                {
                google.maps.places.type
                for (var i = 0; i < results.length; i++)
                {
                    //$scope.createPlacesMarkerFordepartment(results[i],results[i].place_id);  
                  result.push(results[i]);
                }
                var dups = [];
                arr = result.filter(function(el) 
                 {
                  if (dups.indexOf(el.place_id) == -1 ) {
                    dups.push(el.place_id);
                return true;
                  }return false;
                });
                for (var i = 0; i < arr.length; i++)
                {
                        $scope.map.data.forEach(function(feature) 
                        {
                            if (feature.getProperty('NAME_2') == districts) 
                            {
                                var poly = new google.maps.Polygon({
                                path: feature.getGeometry().getAt(0).getArray(),
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                });
                                $scope.map.data.revertStyle();
                                $scope.map.data.overrideStyle(feature, {fillColor:"#8de0fc"});
                            if (google.maps.geometry.poly.containsLocation(arr[i].geometry.location,poly)) 
                                {
                                  places=arr[i];
                                  array.push(places);
                                }
                            }
                        });
                }
                  var duplicates = [];
                        arr1=null;
                     arr1 = array.filter(function(el) 
                    {
                      if (duplicates.indexOf(el.place_id) == -1 ) 
                      {
                        duplicates.push(el.place_id);
                        return true;
                      }return false;
                    });
                    for (var i = 0; i < arr1.length; i++)
                   {
                   // $scope.createPlacesMarkerForbicycle(arr1[i],type,arr1[i].place_id,arr1[i].types[0]);
                          $scope.createPlacesMarkerFordepartment(arr1[i],arr1[i].place_id);    
                    }
                        if (pagination.hasNextPage) 
                        {
                        pagination.nextPage();
                        };
               
                    }
            };

            $scope.convenienceCallback = function(results, status,pagination)
            {
                result.length=null;
                array.length=null;
             
                if (status === google.maps.places.PlacesServiceStatus.OK) 
                {
                google.maps.places.type
                for (var i = 0; i < results.length; i++)
                {
                    //$scope.createPlacesMarkerForconvenience(results[i],results[i].place_id);    
                   result.push(results[i]);
                }
                var dups = [];
                arr = result.filter(function(el) 
                 {
                  if (dups.indexOf(el.place_id) == -1 ) {
                    dups.push(el.place_id);
                return true;
                  }return false;
                });
                for (var i = 0; i < arr.length; i++)
                {
                        $scope.map.data.forEach(function(feature) 
                        {
                            if (feature.getProperty('NAME_2') == districts) 
                            {
                                var poly = new google.maps.Polygon({
                                path: feature.getGeometry().getAt(0).getArray(),
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                });
                                $scope.map.data.revertStyle();
                                $scope.map.data.overrideStyle(feature, {fillColor:"#8de0fc"});
                            if (google.maps.geometry.poly.containsLocation(arr[i].geometry.location,poly)) 
                                {
                                  places=arr[i];
                                  array.push(places);
                                }
                            }
                        });
                }
						var duplicates = [];
								    arr1=null;
								 arr1 = array.filter(function(el) 
								{
								  if (duplicates.indexOf(el.place_id) == -1 ) 
								  {
									duplicates.push(el.place_id);
									return true;
								  }return false;
								});
								for (var i = 0; i < arr1.length; i++)
						       {
            //        // $scope.createPlacesMarkerForbicycle(arr1[i],type,arr1[i].place_id,arr1[i].types[0]);
                    $scope.createPlacesMarkerForconvenience(arr1[i],arr1[i].place_id);    
                    }
                    if (pagination.hasNextPage) 
                    {
                    pagination.nextPage();
                    };
                        
                }
            };

            $scope.supermarketCallback = function(results, status,pagination)
            {
                result.length=null;
                array.length=null;
             
                if (status === google.maps.places.PlacesServiceStatus.OK) 
                {
                google.maps.places.type
                for (var i = 0; i < results.length; i++)
                {
                   // $scope.createPlacesMarkerForsupermarket(results[i],results[i].place_id);   
                   result.push(results[i]);
                }
                var dups = [];
                arr = result.filter(function(el) 
                 {
                  if (dups.indexOf(el.place_id) == -1 ) {
                    dups.push(el.place_id);
                return true;
                  }return false;
                });
                  for (var i = 0; i < arr.length; i++)
                  {
                          $scope.map.data.forEach(function(feature) 
                          {
                              if (feature.getProperty('NAME_2') == districts) 
                              {
                                  var poly = new google.maps.Polygon({
                                  path: feature.getGeometry().getAt(0).getArray(),
                                  strokeOpacity: 0.8,
                                  strokeWeight: 2,
                                  });
                                  $scope.map.data.revertStyle();
                                  $scope.map.data.overrideStyle(feature, {fillColor:"#8de0fc"});
                              if (google.maps.geometry.poly.containsLocation(arr[i].geometry.location,poly)) 
                                  {
                                    places=arr[i];
                                    array.push(places);
                                  }
                              }
                          });
                  }
						var duplicates = [];
								    arr1=null;
								 arr1 = array.filter(function(el) 
								{
								  if (duplicates.indexOf(el.place_id) == -1 ) 
								  {
									duplicates.push(el.place_id);
									return true;
								  }return false;
								});
								for (var i = 0; i < arr1.length; i++)
						       {
            //        // $scope.createPlacesMarkerForbicycle(arr1[i],type,arr1[i].place_id,arr1[i].types[0]);
                    $scope.createPlacesMarkerForsupermarket(arr1[i],arr1[i].place_id);    
                   }
        if (pagination.hasNextPage) 
         {
           pagination.nextPage();
         };
                
        }
            };

            $scope.storeCallback = function(results, status,pagination)
            {
                result.length=null;
                array.length=null;
             
                if (status === google.maps.places.PlacesServiceStatus.OK) 
                {
                google.maps.places.type
                for (var i = 0; i < results.length; i++)
                {
                  //  $scope.createPlacesMarkerForstore(results[i],results[i].place_id);   
                   result.push(results[i]);
                }
                var dups = [];
                arr = result.filter(function(el) 
                 {
                  if (dups.indexOf(el.place_id) == -1 ) {
                    dups.push(el.place_id);
                return true;
                  }return false;
                });
                for (var i = 0; i < arr.length; i++)
                {
                        $scope.map.data.forEach(function(feature) 
                        {
                            if (feature.getProperty('NAME_2') == districts) 
                            {
                                var poly = new google.maps.Polygon({
                                path: feature.getGeometry().getAt(0).getArray(),
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                });
                                $scope.map.data.revertStyle();
                                $scope.map.data.overrideStyle(feature, {fillColor:"#8de0fc"});
                            if (google.maps.geometry.poly.containsLocation(arr[i].geometry.location,poly)) 
                                {
                                  places=arr[i];
                                  array.push(places);
                                }
                            }
                        });
                }
						var duplicates = [];
								    arr1=null;
								 arr1 = array.filter(function(el) 
								{
								  if (duplicates.indexOf(el.place_id) == -1 ) 
								  {
									duplicates.push(el.place_id);
									return true;
								  }return false;
								});
								for (var i = 0; i < arr1.length; i++)
						       {
                                  // $scope.createPlacesMarkerForbicycle(arr1[i],type,arr1[i].place_id,arr1[i].types[0]);
                                  $scope.createPlacesMarkerForstore(arr1[i],arr1[i].place_id);    
                                }
        if (pagination.hasNextPage) 
         {
           pagination.nextPage();
         };
                
        }
            };

            $scope.createPlacesMarkerForveterinary = function(place,id)
            {
                if(infoWindow){infoWindow.close();}
                var image = 'https://cdn4.iconfinder.com/data/icons/map-pins-2/256/20-24.png';
        
                infowindowplacesmarker = new google.maps.InfoWindow();
                var placeLoc = place.geometry.location;
                var veterinaryMarker = new google.maps.Marker({
                map : $scope.map,
                icon : image,
                position : place.geometry.location,
                placeid:id,
                });
            
                google.maps.event.addListener(veterinaryMarker, 'click', function() {
                    var placeDirectionUrl = 'https://maps.google.com/maps?saddr=' +$scope.city+ '&daddr=' + place.name +' '+ place.vicinity;
                    infowindowplacesmarker.setContent( "<b>"+"Name     : "+"</b>" + place.name
                    + "<br><b>" + "Ratings     : " + "</b>"+place.rating
                    + "<br><b>" + "Address     : " + "</b>"+ place.vicinity
                    + "<br><b>" + "Phone Number: " + "</b>"+ place.formatted_phone_number
                    + "<br><b>" + "Place Type  : " + "</b>"+ "<strong>"+place.types[0] +"</strong> "+ ","+place.types[1]
                    +"</br></br><form><a class='btn btn-info' href='"+ placeDirectionUrl +"' target='_blank' 'style='width:50%;height:30px;margin-left:25%'>"+"<u><b>Get Directions</b></u></a></form>"+"</strong>"
                                                );
                infowindowplacesmarker.open(map, this);
               // infowindowsCollection.push(infowindowplacesmarker);
                //showDirectionsForLocations(dirLatLng,placeLoc);
                });
                veterinary.push(veterinaryMarker); 
                for (i=0; i<veterinary.length;i++)
									{						
									   if (veterinary2.indexOf(veterinary[i].placeid) == -1)
									    {
                                            veterinary2.push(veterinary[i].placeid);
										}
									}
								
								//document.getElementById("veterinary").value =veterinary2.length;
            };
        
            $scope.createPlacesMarkerForpet = function(place,id)
            {
              
                if(infoWindow){infoWindow.close();}
                var image = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/cat-20.png';
                infowindowplacesmarker = new google.maps.InfoWindow();
                var placeLoc = place.geometry.location;
                var petMarker = new google.maps.Marker({
                map : $scope.map,
                icon : image,
                position : place.geometry.location,
                placeid:id,
                });
        
                google.maps.event.addListener(petMarker, 'click', function() {
                    var placeDirectionUrl = 'https://maps.google.com/maps?saddr=' +$scope.city+ '&daddr=' + place.name +' '+ place.vicinity;
                    infowindowplacesmarker.setContent( "<b>"+"Name     : "+"</b>" + place.name
                    + "<br><b>" + "Ratings     : " + "</b>"+place.rating
                    + "<br><b>" + "Address     : " + "</b>"+ place.vicinity
                    + "<br><b>" + "Phone Number: " + "</b>"+ place.formatted_phone_number
                    + "<br><b>" + "Place Type  : " + "</b>"+ "<strong>"+place.types[0] +"</strong> "+ ","+place.types[1]
                    +"</br></br><form><a class='btn btn-info' href='"+ placeDirectionUrl +"' target='_blank' 'style='width:50%;height:30px;margin-left:25%'>"+"<u><b>Get Directions</b></u></a></form>"+"</strong>"
                                                );
                infowindowplacesmarker.open(map, this);
               // infowindowsCollection.push(infowindowplacesmarker);
                //showDirectionsForLocations(dirLatLng,placeLoc);
                });
                pet.push(petMarker); 
                for (i=0; i<pet.length;i++)
									{						
									   if (pet2.indexOf(pet[i].placeid) == -1)
									    {				
                                            pet2.push(pet[i].placeid);
										}
									}
								
								//document.getElementById("pet").value = pet2.length;
            };
        
            $scope.createPlacesMarkerForsupermarket = function(place,id)
            {
                if(infoWindow){infoWindow.close();}
                var image = 'https://cdn3.iconfinder.com/data/icons/shopping-and-commerce-2-2/512/61-24.png';
               
        
                infowindowplacesmarker = new google.maps.InfoWindow();
                var placeLoc = place.geometry.location;
                var supermarketMarker = new google.maps.Marker({
                map : $scope.map,
                icon : image,
                position : place.geometry.location,
                placeid:id,
                });
        
                google.maps.event.addListener(supermarketMarker, 'click', function() {
                    var placeDirectionUrl = 'https://maps.google.com/maps?saddr=' +$scope.city+ '&daddr=' + place.name +' '+ place.vicinity;
                    infowindowplacesmarker.setContent( "<b>"+"Name     : "+"</b>" + place.name
                    + "<br><b>" + "Ratings     : " + "</b>"+place.rating
                    + "<br><b>" + "Address     : " + "</b>"+ place.vicinity
                    + "<br><b>" + "Phone Number: " + "</b>"+ place.formatted_phone_number
                    + "<br><b>" + "Place Type  : " + "</b>"+ "<strong>"+place.types[0] +"</strong> "+ ","+place.types[1]
                    +"</br></br><form><a class='btn btn-info' href='"+ placeDirectionUrl +"' target='_blank' 'style='width:50%;height:30px;margin-left:25%'>"+"<u><b>Get Directions</b></u></a></form>"+"</strong>"
                                                );
                infowindowplacesmarker.open(map, this);
               // infowindowsCollection.push(infowindowplacesmarker);
                //showDirectionsForLocations(dirLatLng,placeLoc);
                });
                supermarket.push(supermarketMarker); 
                for (i=0; i<supermarket.length;i++)
									{						
									   if (supermarket2.indexOf(supermarket[i].placeid) == -1)
									    {				
                                            supermarket2.push(supermarket[i].placeid);
										}
                                    }
                                   // document.getElementById("supermarket").value = supermarket2.length;
            };
        
            $scope.createPlacesMarkerFordepartment = function(place,id)
            {
                if(infoWindow){infoWindow.close();}
                var image = 'https://cdn2.iconfinder.com/data/icons/e-commerce-icons-2/256/Ecommerce_Icons_Rose_Color-43-24.png';
        
                infowindowplacesmarker = new google.maps.InfoWindow();
                var placeLoc = place.geometry.location;
                var departmentMarker = new google.maps.Marker({
                map : $scope.map,
                icon : image,
                position : place.geometry.location,
                placeid:id,
                });
        
                google.maps.event.addListener(departmentMarker, 'click', function() {
                    var placeDirectionUrl = 'https://maps.google.com/maps?saddr=' +$scope.city+ '&daddr=' + place.name +' '+ place.vicinity;
                    infowindowplacesmarker.setContent( "<b>"+"Name     : "+"</b>" + place.name
                    + "<br><b>" + "Ratings     : " + "</b>"+place.rating
                    + "<br><b>" + "Address     : " + "</b>"+ place.vicinity
                    + "<br><b>" + "Phone Number: " + "</b>"+ place.formatted_phone_number
                    + "<br><b>" + "Place Type  : " + "</b>"+ "<strong>"+place.types[0] +"</strong> "+ ","+place.types[1]
                    +"</br></br><form><a class='btn btn-info' href='"+ placeDirectionUrl +"' target='_blank' 'style='width:50%;height:30px;margin-left:25%'>"+"<u><b>Get Directions</b></u></a></form>"+"</strong>"
                                                );
                infowindowplacesmarker.open(map, this);
               // infowindowsCollection.push(infowindowplacesmarker);
                //showDirectionsForLocations(dirLatLng,placeLoc);
                });
                department.push(departmentMarker); 
                for (i=0; i<department.length;i++)
									{						
									   if (department2.indexOf(department[i].placeid) == -1)
									    {				
                                            department2.push(department[i].placeid);
										}
									}
							
								//document.getElementById("department").value = department2.length;
            };
        
            $scope.createPlacesMarkerForconvenience = function(place,id)
            {
                if(infoWindow){infoWindow.close();}
                var image = 'https://cdn1.iconfinder.com/data/icons/road-signs-1/154/road-sign-convenience-store-24.png';
        
                infowindowplacesmarker = new google.maps.InfoWindow();
                var placeLoc = place.geometry.location;
                var convenienceMarker = new google.maps.Marker({
                map : $scope.map,
                icon : image,
                position : place.geometry.location,
                placeid:id,
                });
        
                google.maps.event.addListener(convenienceMarker, 'click', function() {
                    var placeDirectionUrl = 'https://maps.google.com/maps?saddr=' +$scope.city+ '&daddr=' + place.name +' '+ place.vicinity;
                    infowindowplacesmarker.setContent( "<b>"+"Name     : "+"</b>" + place.name
                    + "<br><b>" + "Ratings     : " + "</b>"+place.rating
                    + "<br><b>" + "Address     : " + "</b>"+ place.vicinity
                    + "<br><b>" + "Phone Number: " + "</b>"+ place.formatted_phone_number
                    + "<br><b>" + "Place Type  : " + "</b>"+ "<strong>"+place.types[0] +"</strong> "+ ","+place.types[1]
                    +"</br></br><form><a class='btn btn-info' href='"+ placeDirectionUrl +"' target='_blank' 'style='width:50%;height:30px;margin-left:25%'>"+"<u><b>Get Directions</b></u></a></form>"+"</strong>"
                                                );
                infowindowplacesmarker.open(map, this);
              //  infowindowsCollection.push(infowindowplacesmarker);
                //showDirectionsForLocations(dirLatLng,placeLoc);
                });
                convenience.push(convenienceMarker); 
                for (i=0; i<convenience.length;i++)
									{						
									   if (convenience2.indexOf(convenience[i].placeid) == -1)
									    {				
                                            convenience2.push(convenience[i].placeid);
										}   
									}
								
							//	document.getElementById("convenience").value = convenience2.length;
            };

            $scope.createPlacesMarkerForstore = function(place,id)
            {
                if(infoWindow){infoWindow.close();}
                var image = 'https://cdn2.iconfinder.com/data/icons/map-locations-colored-outlined-pixel-perfect/64/pin-map-location-10-24.png';
        
                infowindowplacesmarker = new google.maps.InfoWindow();
                var placeLoc = place.geometry.location;
                var storeMarker = new google.maps.Marker({
                map : $scope.map,
                icon : image,
                position : place.geometry.location,
                placeid:id,
                });
        
                google.maps.event.addListener(storeMarker, 'click', function() {
                    var placeDirectionUrl = 'https://maps.google.com/maps?saddr=' +$scope.city+ '&daddr=' + place.name +' '+ place.vicinity;
                    infowindowplacesmarker.setContent( "<b>"+"Name     : "+"</b>" + place.name
                    + "<br><b>" + "Ratings     : " + "</b>"+place.rating
                    + "<br><b>" + "Address     : " + "</b>"+ place.vicinity
                    + "<br><b>" + "Phone Number: " + "</b>"+ place.formatted_phone_number
                    + "<br><b>" + "Place Type  : " + "</b>"+ "<strong>"+place.types[0] +"</strong> "+ ","+place.types[1]
                    +"</br></br><form><a class='btn btn-info' href='"+ placeDirectionUrl +"' target='_blank' 'style='width:50%;height:30px;margin-left:25%'>"+"<u><b>Get Directions</b></u></a></form>"+"</strong>"
                                                );
                infowindowplacesmarker.open(map, this);
                });
                store.push(storeMarker); 
                for (i=0; i<store.length;i++)
									{						
									   if (store2.indexOf(store[i].placeid) == -1)
									    {				
                                            store2.push(store[i].placeid);
										}
									}
								
							//	document.getElementById("convenience").value = convenience2.length;
            };

           


      
});