var fs = require('fs')
var path = require('path')
console.log('lego-digital-designer-files')
console.log('===========================')
console.log('')

var htmlDir = path.dirname(__dirname) + '/HTML Building Instructions'
var repoDirFileAndFolderNames = fs.readdirSync(path.dirname(__dirname))
var htmlDirFileAndFolderNames = fs.readdirSync(htmlDir)

var lxfFiles = repoDirFileAndFolderNames.filter(function (repoFileOrFolderName) {
	return path.extname(repoFileOrFolderName) === '.lxf'
}).map(function (lxfFileName) {
	return path.basename(lxfFileName, '.lxf')
})

lxfFiles.forEach(function (lxfFileNameNoExt) {
	var htmlFileName = `Building Instructions [${lxfFileNameNoExt}].html`
	if (htmlDirFileAndFolderNames.indexOf(htmlFileName) === -1) {
		console.error('Building instructions don\'t exist for ' + lxfFileNameNoExt)
		process.exit(1)
	}

	var htmlFileContents = fs.readFileSync(htmlDir + '/' + htmlFileName, { encoding: 'utf-8' })
	stepNum = htmlFileContents.match(/\]\-images\/Step(\d+)/)
	stepNum = stepNum && stepNum.pop()

	console.log('## ' + lxfFileNameNoExt)
	console.log('')
	console.log('![' + lxfFileNameNoExt + '](https://raw.githubusercontent.com/ArtskydJ/' +
		'lego-digital-designer-files/master/HTML%20Building%20Instructions/Building%20Instructions%20[' +
		lxfFileNameNoExt.replace(/ /g, '%20') + ']-images/Step' + stepNum + '.png)')
	console.log('')
})
