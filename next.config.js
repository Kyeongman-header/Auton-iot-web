const API_KEY=process.env.MASTER_KEY;

headers={ Authorization : 'Token 005d516b38535a1e0b1acd0e0d61ed26d4dcb3cd'}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async redirects(){
  //   return [
  //     {
  //       source:"/admin/:path*",
  //       destination:"/",
  //       permanent: false,
  //     }
  //   ]
  // },
  // async rewrites(){
  //   return [
  //     {
  //       source:"/:req/:pub_date__gte/:pub_date__lte/:machine",
  //       destination:"http://auton-iot.com/api/:req/?pub_date__gte=:pub_date__gte&pub_date__lte=:pub_date__lte&machine=:machine",
  //       //headers: headers,
  //     },
      
  //   ]
  // }
}

module.exports = nextConfig
