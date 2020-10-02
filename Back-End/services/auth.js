 
const jwt  = require( "jsonwebtoken");

const REFRESH_TOKEN_SECRET = 'asiodfhoi1hoi23jnl1kejd';
const ACCESS_TOKEN_SECRET = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

exports.createTokens =(user)=>{
  
  const refreshToken = jwt.sign(
    { userId: user.id_doctor },
    user.password+REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );
  
  const token = jwt.sign(
      { userId: user.id_doctor }, 
      ACCESS_TOKEN_SECRET, {
        expiresIn: "15min"
  });

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
