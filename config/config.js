/* gulp-config.js */
export default {

	serv: {
		server: {
			baseDir: 'build/'
		},
		port: 3000
	},

	json: {
		dir: 'config/server/db.json'
	},

	src: {
		html: 'frontend/*.html',
		scss: 'frontend/scss/**/**/*.scss',
		js: 'frontend/scripts/**/*.js',
		img: 'frontend/images/*.{jpg,svg,png}'
	},

	build: {
		html: 'build/',
		css: 'build/css/',
		js: 'build/js/bundle.js',
		img: 'build/img/',
		bundleFormat: 'iife'
	},

	browsersList: [
		'chrome > 70',
		// 'last 1 version',
		// '> 0.001% in PL',
		// 'ie > 8',
	]
};
