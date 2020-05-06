from rgsync import RGWriteBehind, RGWriteThrough
from rgsync.Connectors import MySqlConnector, MySqlConnection

connection = MySqlConnection('root', '$MYSQL_ROOT_PASSWORD', 'db:3306/wbdemo')
usersConnector = MySqlConnector(connection, 'users', 'id')

usersMappings = {
	'temp':'temp',
}

RGWriteBehind(GB,  keysPrefix='user', mappings=usersMappings, connector=usersConnector, name='UsersWriteBehind',  version='99.99.99')
