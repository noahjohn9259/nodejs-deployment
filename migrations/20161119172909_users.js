
exports.up = function(knex, Promise) {
  return knex.raw(`
  	CREATE TABLE users (
		  id int(10) unsigned NOT NULL AUTO_INCREMENT,
		  first_name varchar(50) DEFAULT NULL,
		  last_name varchar(50) DEFAULT NULL,
		  email varchar(50) DEFAULT NULL,
		  password varchar(150) DEFAULT NULL,
		  is_admin bit(1) DEFAULT NULL,
		  oauth_provider varchar(50) DEFAULT NULL,
		  oauth_id varchar(50) DEFAULT NULL,
		  PRIMARY KEY (id)
		) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
  `)
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
