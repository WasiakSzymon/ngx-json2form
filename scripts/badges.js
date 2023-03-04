const pkg = require('badges');
const fs = require('fs');
const path = require('path');

const list = [
    'npmversion',
    'npmdownloads',
    'nodeico',
    'githubfollow',
    'githubstar',
]

// Configuration for the badges
const config = {
    npmPackageName: 'ngx-json2form',
    githubSlug: 'WasiakSzymon/ngx-json2form',
    nodeicoQueryString: { downloads: true, compact: true, height: 2 },
    githubUsername: 'WasiakSzymon'
}

// Options for rendering the badges
const options = {
    // Filter Category
    // When set to a string, will only render badges from the list that of the specified category
    // Values can be 'development', 'testing', 'funding', or 'social'
    // E.g. to render only funding badges, set to 'funding'
    filterCategory: false,

    // Filter Scripts
    // When true, do not render any badges from the list that are scripts
    filterScripts: false
}

// Render the badges to a string
const result = pkg.renderBadges(list, config, options)

fs.readFile(path.resolve(__dirname, '../README.md'), 'utf-8', function (err, data) {
    if (err) throw err;

    var newValue = result + `
    
    `+ data;

    fs.writeFile(path.resolve(__dirname, '../README.md'), newValue, 'utf-8', function (err, data) {
        if (err) throw err;
        console.log('Done!');
    })
})