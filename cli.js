const fs = require('fs-extra')
const argv = require('minimist')(process.argv.slice(2));

const CONFIG = fs.readJsonSync( './config.json', { throws: false })
if ( argv.list ) {
	for (const key in CONFIG) {
		if ( "forceDeleteDest" == key )
			continue
		console.log( `${key}` )
	}
}
