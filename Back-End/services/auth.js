 
const jwt  = require( "jsonwebtoken");

const REFRESH_TOKEN_SECRET = 'asiodfhoi1hoi23jnl1kejd';
const ACCESS_TOKEN_SECRET = '6c559c4bd913481dcf7b6aa80efe451b6ced53691c84227fae3f3ad7e2ae5a06241c718bb787b12b97d2a579b7fa91fc34955f914db087d60878917e91d9867e';

exports.createTokens =(user)=>{
  
  const refreshToken = jwt.sign(
    { userId: user.id_doctor },
    REFRESH_TOKEN_SECRET
  );
  
  const token = jwt.sign(
      { userId: user.id_doctor }, 
      ACCESS_TOKEN_SECRET);

  return [ refreshToken, token ];
};


exports.validateToken = async (req, res, next)=>{
  const refreshToken = req.cookies["refresh-token"];
  const accessToken = req.cookies["access-token"];
  if (!refreshToken && !accessToken) {
    return next();
  }

  try {
    const data = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) ;
    req.userId = data.userId;
    return next();
  } catch {}

  if (!refreshToken) {
    return next();
  }

  let data;

  try {
    data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch {
    return next();
  }

  const user = await User.findOne(data.userId);
  // token has been invalidated
  if (!user || user.count !== data.count) {
    return next();
  }

  const tokens = createTokens(user);

  res.cookie("refresh-token", tokens.refreshToken);
  res.cookie("access-token", tokens.accessToken);
  req.userId = user.id;

  next();
}


exports.getId = (token)=>{
  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET,(err, decoded)=> {
    if (err) return null
    else return decoded.userId
  });  

  if(decoded!==null){

    return {ok:true,id:decoded}
  }
  else return  {ok:false}
}
