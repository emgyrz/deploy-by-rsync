
const path = require( 'path' )

const CWD = process.cwd()
const HOMEDIR = require( 'os' ).homedir()
const CONFIGFILENAME = '.deploy_by_rsync_config'

const message = require('./message')



function searchConfig() {
  var conf
  try {
    conf = require( path.join( HOMEDIR, CONFIGFILENAME ) )
  } catch ( e ) {
    try {
      conf = require( path.join( CWD, CONFIGFILENAME ) )
    } catch ( e ) {
    console.log('e ' , e);
      message.error( 'no config file' )
      conf = null
    }
  }

  return conf
}



module.exports = searchConfig