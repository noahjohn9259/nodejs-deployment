
exports.up = function(knex, Promise) {
  return knex.raw(`
  	CREATE TABLE posts (
		  id int(10) unsigned NOT NULL AUTO_INCREMENT,
		  text text,
		  user_id int(10) DEFAULT NULL,
		  PRIMARY KEY (id)
		) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;`);
		};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};
