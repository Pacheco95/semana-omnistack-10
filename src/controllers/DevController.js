const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, coordinates } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return response.json(dev);
    }

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
    const { name = login, avatar_url, bio } = apiResponse.data;
    
    const location = {
        type: 'Point',
        coordinates: [coordinates.longitude, coordinates.latitude]
    }
  
    const newDev = {
      github_username,
      techs,
      name,
      avatar_url,
      bio,
      location
    };

    dev = await Dev.create(newDev);
  
    return response.json(dev);
  }
}