const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt =require( 'bcrypt');
const Doctor = require('../../DB/models/Doctor');


async function createTokens(user, secret, secret2){


  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

async function tryLogin(username, password, SECRET, SECRET2){
  
  const user = await Doctor.findOne({ where: {id_doctor: username }, raw: true });
  if (!user) {
    // user with provided username not found or wrong password
    return {
      ok: false
    };
  }
  
  const valid = await bcrypt.compare(password, user.password);
  
  if (!valid) {
    // bad password
    return {
      ok: false,
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  return {
    ok: true,
    token,
    refreshToken,
  };
};

  

// The resolvers
const resolvers = {
    Query:{
        hola:()=>true
    },

    Mutation: {
        login: (parent, { username, password }, { SECRET, SECRET2 }) =>{
        return tryLogin(username, password, SECRET,SECRET2)}
            
        
    } 

  };

module.exports = resolvers;