module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "app",
      script    : "app.js",
      // env: {
      //   COMMON_VARIABLE: "true"
      // },
      env_production : {
        NODE_ENV: "production"
      }
    }

    // Second application
    // {
    //   name      : "WEB",
    //   script    : "web.js"
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "deploy",
      host : "107.170.197.133",
      ref  : "origin/master",
      repo : "https://github.com/noahjohn9259/nodejs-deployment.git",
      path : "~/node-example",
      "post-deploy" : "nvm install && npm install && ~/.nvm/versions/node/v6.9.1/bin/pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
