import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  islogin: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    
    if( req.query.password===process.env.PASSWORD)
    {  
        res.status(200).json({islogin : "login"});
    }
    else{
        res.status(401).json({islogin: "not login"});
    }
  }
  catch(e){
   console.log("req error");
  }

}
  