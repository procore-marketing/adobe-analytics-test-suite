const fs = require('fs');

async function createCSV(results, fields, hitType, time) {
  let csv = '';
  for (let field in fields) {
    csv += fields[field] + ' (' + field + ')' + ',';
  }
  csv = csv.replace(/,$/g, '\r\n');

  for (let result of results) {
    if (result.v1 === hitType) {
      for (let field in fields) {
        if (field in result) {
          csv += result[field];
        }
        csv += ',';
      }
      csv = csv.replace(/,$/g, '\r\n');
    }
  }

  const timestamp = time || new Date(Date.now()).toISOString();
  var dir = 'sheets/' + timestamp;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fs.writeFile('sheets/' + timestamp + '/adobe-audit-' + hitType.replace(/\s/g, '-').toLowerCase() + '-' + timestamp + '.csv', csv, (err) => {if (err) throw err});
};

module.exports = createCSV;
