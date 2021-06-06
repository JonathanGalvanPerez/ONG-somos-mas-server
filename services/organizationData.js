const fs = require('fs');
const path = require('path');
const organizationdDataPath = path.join(__dirname, '../public/json/organization_data.json');

const get = () => {
    const data = fs.readFileSync(organizationdDataPath, 'utf8');
    return JSON.parse(data);
}

module.exports = {
    get
}