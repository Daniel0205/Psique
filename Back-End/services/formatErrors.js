const _ = require( 'lodash');




const sequelize = require('sequelize');

exports.formatErrors=(e)=> {
  if (e instanceof sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};