var Rx = require('rx');
global.Rx = Rx;
var testConfig = require('./testConfig')();
var config = testConfig.config;
var models = testConfig.models;
var macroSimple = testConfig.set.simple(models.macro, 'PathMap');
var modelSimple = testConfig.set.simple(models.model, 'PathMap');
var macroReference = testConfig.set.reference(models.macro, 'PathMap');
var modelReference = testConfig.set.reference(models.model, 'PathMap');

testConfig.repeatInConfig('macro-simple', 3, macroSimple, config.tests);
testConfig.repeatInConfig('model-simple', 3, modelSimple, config.tests);
testConfig.repeatInConfig('macro-reference', 3, macroReference, config.tests);
testConfig.repeatInConfig('model-reference', 3, modelReference, config.tests);

require('./testRunner')(require('benchmark'), config, 1, function(totalResults) {
    var fs = require('fs');
    fs.writeFileSync('out.csv', totalResults.join('\n'))
});