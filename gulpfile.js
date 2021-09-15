// Set CONFIG based on config.json
const path = require('path');
const fs   = require('fs-extra')
const untildify = require('untildify');
const argv = require('minimist')(process.argv.slice(2));

const CONFIG = fs.readJsonSync( './config.json', { throws: false })
let isValidProject = true
if ( CONFIG ) {
	if ( argv.project && argv.project in CONFIG ) {
		// nothing to do, all is good
	} else {
		console.error( `Error: cannot find "${argv.project}"` )
		isValidProject = false
		return
	}
} else {
	isValidProject = false
	console.error( `Error: config.json is not valid ` )
	return
}

let PROJ = null
if ( isValidProject ) {
	PROJ = {
		src: untildify( CONFIG[argv.project].src ),
		dest: untildify( CONFIG[argv.project].dest )
	}
}
if ( !PROJ.src || !PROJ.dest ) {
	isValidProject = false
	console.error( `Error: config.json's "${argv.project} src or dest has a problem` )
	return
}

// Run gulp
const { src, dest, watch, series, parallel } = require('gulp')
const globsToUse = [
	'**/*',
	'!**/node_modules{,/**}',
	'!**/yarn{,/**}',
	'!**/cache{,/**}',
	'!**/.sass-cache{,/**}',
	'!*.{sh,exe,ini,db,lock,md}',
	'!@(*-lock*|*lock.*)',
	'!package.json',  // explicit
	'!config.json',   // explicit
	'!gulpfile.js',   // explicit
	'!tags*',
]

function config () {
	if ( !isValidProject )
		return false
	console.log( '--------' )
	console.log( "project", PROJ )
	if ( CONFIG.forceDeleteDest )
		console.log( "forceDeleteDest", CONFIG.forceDeleteDest )
	console.log( '--------' )
	return false
}

function copy() {
	if ( !isValidProject )
		return false
	return src(globsToUse, { cwd: PROJ.src })
		.pipe(dest( PROJ.dest ));
}

// Set clean
const del = require("del")
function clean() {
	if ( !isValidProject )
		return false
	const forceDeleteDest = CONFIG.forceDeleteDest ? true : false
	const allDirFiles = [
		PROJ.dest + '/**',
		'!'+PROJ.dest,
	]
	return del( allDirFiles, { force: forceDeleteDest })
}

function watcher(cb) {
	if ( !isValidProject )
		return false
	return watch(
		globsToUse,
		{ cwd: PROJ.src },
		series( copy )
	)
}

exports.clean  = series( clean )
exports.sync   = series( clean, copy, watcher )
exports.prod   = series( clean, copy )
exports.config = series( config )
