/* required modules */
var fs = require('fs'),
	async = require('async'),
	jsonfile = require('jsonfile'),
	natural = require('natural'),
	cheerio = require("cheerio");
	
/* */
var file_dir = '/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/media/',
	data_ary = [];
var parse_html_to_json = function(arg_file_name){
	var data_json = {};
	var file_path = file_dir + arg_file_name;
	fs.readFile(file_path, 'utf-8', function(err, file_html){
		if(file_html !== undefined){
			var $ = cheerio.load(file_html);
			$('tr').each(function(){
				var grade = $(this).find('td.rateAndAmountRequested')
								.find('div')
								.find('span.master_pngfix')
								.clone()    //clone the element
						        .children() //select all the children
						        .remove()   //remove all the children
						        .end()  //again go back to selected element
						        .text(),
					grade_number = $(this).find('td.rateAndAmountRequested').find('div').find('span').find('span').text(),
					rate = $(this).find('td.rateAndAmountRequested').find('div').find('span').find('strong').text(),
					loan_type_length = $(this).find('td.yui-dt1-col-typeAndTerm').find('div').find('span').text();
				
				data_json['grade'] = grade;
				data_json['grade_number'] = grade_number;
				data_json['rate'] = rate;
				data_json['loan_type_length'] = loan_type_length;
					
				console.log(data_json);
			});
		}
	});
}
var parser_callback = function(err, files){
	files.forEach(function(file, index){
		console.log(file);
		if(file !== undefined){
			parse_html_to_json(file);
		}
	});
}

var get_and_parse_data = function(){
	fs.readdir(file_dir, parser_callback);
}

/**/
get_and_parse_data();