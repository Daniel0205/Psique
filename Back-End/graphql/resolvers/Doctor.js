const bcrypt =require( 'bcrypt');
const Doctor =require( '../../DB/models/Doctor');
const auth = require('../../services/auth')


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

  const [ refreshToken, token ] =  auth.createTokens(user);

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
        login: (parent, { username, password }) =>{
        return tryLogin(username, password)},
    } 

  };

module.exports = resolvers;