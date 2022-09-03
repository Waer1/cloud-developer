export const config = {
  "dev": {
    "username": process.env.POSTRGRESS_USERNAME,// udagramruntterdev
    "password": process.env.POSTRGRESS_PASSWORD,//udagramruntterdev
    "database": process.env.POSTRGRESS_DATABASE,//udagramruntterdev
    "host": process.env.POSTRGRESS_HOST,//udagramruntterdev.c9g62xg2dfc3.us-east-1.rds.amazonaws.com
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,//us-east-1
    "aws_profile": process.env.AWS_PROFILE, //default
    "aws_media_bucket": process.env.AWS_BUCKET //udagram-waer-dev
  },
  "jwt": {
    "secret": "helloworled"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
