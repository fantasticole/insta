// Find a way to scrape instagram photos based on a hashtag and download them to a folder.

// 'https://api.instagram.com/v1/media/popular?access_token=youraccesstoken'
// 'http://localhost/#access_token=6962099.41a6e79.db75930f284e44c9bd967ae15251bedb'



var main = function(){
	var follows = [];

	function display(arr, div){
		for (var x = 0; x < arr.length; x++){
			var pic = arr[x].profile_picture;
			var user = arr[x].username;
			// $('.cole').append($('<img src=' + list[x].profile_picture + '>'));
			$(div).append($('<div>').html('<img src=' + pic + '><br><a href="https://instagram.com/'+ user +'/">' + user + '</a>'));
		}
	};

	function people(loc){
		return $.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: loc,
		})
	};

	function makeArr(loc, arr, div){
		people(loc).done(function(data){
			list = arr.concat(data.data);
			// console.log('list: ', list);
			if (data.pagination.next_url){
				var newLoc = data.pagination.next_url;
				makeArr(newLoc, list, div)
			}
			else {
				var final = list;
				console.log('div, ', div);
				display(final, div);
				// return final;
			};
		});
	};

	makeArr("https://api.instagram.com/v1/users/6962099/follows?access_token=6962099.41a6e79.db75930f284e44c9bd967ae15251bedb", follows, '.cole');

	makeArr("https://api.instagram.com/v1/users/6962099/followed-by?access_token=6962099.41a6e79.db75930f284e44c9bd967ae15251bedb", follows, '.followers');

	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/media/popular?access_token=6962099.41a6e79.db75930f284e44c9bd967ae15251bedb",
		success: function(data) {
			// placing the images on the page
			for (var i = 0; i < 10; i++) {
		      $(".popular").append("<li><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
		    }
		}
	})
	// $("button").click(function(){
	// 	$("ul").prepend("<li>Jello!</li>");
	// });
};




$(document).ready(main);




// // HTTP Codes:
// // 	GET: retrieves information from the specified source (you just saw this one!)
// // 	POST: sends new information to the specified source.
// // 	PUT: updates existing information of the specified source.
// // 	DELETE: removes existing information from the specified source.

// var http = require('http');
// var args = process.argv;
// var url = args[2];

// // console.log(url);

// function works(site){
// 	http.get(site, function(res){
// 		res.setEncoding('utf8');
// 		res.on('data', function(){
// 			console.log('erger!!!!');
// 		});
// 		// res.on('data', console.log('erger!!!!')); DOES NOT WORK
// 		}).on('error', console.error);
// };

// if(url.indexOf('http') < 0){
// 	url = 'http://' + url;
// 	works(url);
// }
// else {
// 	works(url);
// };

// // http.get(url, function(res){
// // 	res.setEncoding('utf8');
// // 	res.on('data', console.log);
// // 	}).on('error', console.error);
