const fs = require('fs');
const path = require('path');
const organizationdDataPath = path.join(__dirname, '../public/json/organization_data.json');

const get = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(organizationdDataPath, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};

module.exports = {
  get,
};
