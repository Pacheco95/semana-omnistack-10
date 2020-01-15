const Dev = require('../models/Dev');

module.exports = {
  async index(request, response) {

    const { latitude, longitude, distance = 100000 } = request.query;
    let { techs } = request.query;

    techs = techs.split(',').map(tech => tech.trim());


    // FIXME query n funciona

    const query = {
      techs: {
        $in: techs
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: distance,
        }
      }
    }

    console.log(JSON.stringify(query, null, 2));

    const devs = await Dev.find(query);

    console.log(devs);

    return response.json(devs);
  }
}