// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch(
    `http://auton-iot.com/api/${req.query.sort}/?pub_date__gte=${req.query.pub_date__gte}&pub_date__lte=${req.query.pub_date__lte}&machine=${req.query.machine}`,
    {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : `Token ${process.env.MASTER_KEY}`
      }
    }
  ).then(response => response.json());

  res.json(data); // Send the response
}
