module.exports = {

  apps : [],

  deploy : {},

  pm2_logrotate: {

    max_size: '50M',

    retain: '10',

    compress: true,

    dateFormat: 'YYYY-MM-DD_HH-mm-ss',

    rotateInterval: '0 0 * * *',

    rotateModule: true
  }
}