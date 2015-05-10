var converter = require("csvtojson").core.Converter;
var jsonfile = require("jsonfile");
var fs = require("fs");

//
var csv_parsed_keywords = { keywords_personal : "/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/parsed_keywords_personal.csv",
							  keywords_business : "/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/parsed_keywords_business.csv",
							  keywords_other : "/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/parsed_keywords_other.csv",
							  keywords_temp : "/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/parsed_keywords_temp.csv" };
						

/*  */
GLOBAL.data_obj = GLOBAL.data_obj || { name : "keywords_of_reject_loans", children : []};
GLOBAL.convert_files = function(arg_file_paths){
	for( key in csv_parsed_keywords ){
		if( csv_parsed_keywordshasOwnProperty(key) ){
			GLOBAL.build_data_obj();
		}
	}
}

// method 1.
GLOBAl.convert_csv_to_json = function(arg_key, arg_file_path){
	var fileStream = fs.createReadStream(arg_file_path);
	var csvConverter = new Converter({ constructResult : true });
	
	csvConverter.on("end_parsed", function(json_obj){
		console.log(json_obj);
	});
}

// method 2.
GLOBAL.create_json_file = function(){
	var write_file_path = "/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/keywords_reject_loans.json";
	jsonfile.writeFile(write_file_path, GLOBAL.data_obj, function(err){
		console.log(err);
	});
}

GLOBAL.build_data_obj = function(arg_key, arg_file_paths){
	GLOBAL.keyword_sets[arg_key] = [];
	var csv_keys, count = 0;
	var csvReadStream = fs.createReadStream(arg_file_paths[arg_key]);
	var csvReadableStream = csv()
						.on("data", function(data){
							if(count === 0){
								csv_keys = data;
								GLOBAL.data_obj.children.push({ name : arg_key, children : []});
							}else{
								var keyword_index = csv_keys.indexOf("keyword"), keyword_number_index = csv_keys.indexOf("number");
								var keyword = data[keyword_index], keyword_number = data[keyword_number_index];
								
								GLOBAL.data_obj.children.children.push( { name : keyword, size : keyword_number } );
							}
							count += 1;
						})
						.on("end", function(){
							if(arg_key === "keywords_other"){
								console.log("done...");
								console.log(JSON.stringify(GLOBAL.data_obj, 2, 2));
								
								// start to parse data
								GLOBAL.create_json_file();
							}
						});
						
	// start to parse file
	csvReadStream.pipe(csvReadableStream);
}