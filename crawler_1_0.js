/* required modules */
GLOBAL.crawler = require('crawler');
GLOBAL.mongojs = require('mongojs');
GLOBAL.cheerio = require('cheerio');

/* init config. */
GLOBAL.config_crawler = GLOBAL.config_crawler || {};
GLOBAL.config_mongojs = GLOBAL.config_mongojs || {};

// config mongojs
// config_mongojs.db_url = 'localhost/the_edge';
// config_mongojs.db_collections = ['funding_lending'];
// GLOBAL.my_mongo = mongojs.connect(config_mongojs.db_url, config_mongojs.db_collections);

/* set new crawler */
GLOBAL.config_crawler.url = 'http://www.borro.com';
GLOBAL.config_crawler.setting = {maxConnection : 10,
								 forceUTF8 : true,
								};
GLOBAL.config_crawler.setting.callback = function(err, result){
											if(!err && result.statusCode == 200){
												var $ = cheerio.load(result.body);
												$('a').each(function(index, value){
													var sub_url = $(this).attr('href');
													if(sub_url !== undefined){
														var result = sub_url.match(/javascript|pdf|mailto|tel/gi);
														if(!result){
															if(sub_url.indexOf('\/') === 0){
																sub_url = sub_url.substring(1);
										
															}
															if(sub_url.indexOf('http') !== 0){
																sub_url = GLOBAL.config_crawler.url + sub_url;
															}

															var str = $(this).text() || $(this).attr('title');
															if(str !== undefined){
																str = str.replace(/\t|\r|\n/gi, '').trim();
															}else{
																str = 'NA';
															}

															// print
															console.log('Text: ' + str + ' ; URL: ' + sub_url);
														}
													}
													// console.log(value);			
												});
											}
										};

GLOBAL.crawler_1 = new crawler(GLOBAL.config_crawler.setting);
GLOBAL.crawler_1.queue(GLOBAL.config_crawler.url);
