const createAccestoken = async function (){
    const accessToken = await  jwt.sign({
          id:this._id,
          username:this.username,
          fullname:this.fullname,
          email:this.email
  
      },process.env.ACCESS_TOKEN_SECRETE,
      {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
  )
  return accessToken
  }


  const createRefreshtoken = async function (){
    const accessToken = await  jwt.sign({
          id:this._id,
          username:this.username,
          email:this.email
  
      },process.env.ACCESS_TOKEN_SECRETE,
      {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
  )
  return accessToken
  }


  module.exports ={
    createAccestoken,
    createRefreshtoken
  }