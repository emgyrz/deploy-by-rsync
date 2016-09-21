const promptt = require( 'prompt' )
const colors = require( 'colors/safe' )
const message = require( './message' )



function start( config, cb ) {


  promptt.message = colors.yellow( 'Select for deploy' );

  promptt.start()

  var promptSchema = {
    properties: {
      number: {
        description: 'number',
        type: 'number',
        pattern: /^\d+$/,
        message: 'You may enter only digits from 1 to ' + config.projectsLength,
        required: true,
        conform( num ) {
          return num <= config.projectsLength
        }
      }
    }
  }



  promptt.get( [ promptSchema ], function( err, result ) {

    if ( err ) {
      message.error( err.message )
      return
    }

    let ind = parseInt( result.number )

    for ( let pr of config.projects.values() ) {
      if ( pr.index === ind ) {
        cb( pr )
        return
      }
    }

    cb( null )

  } )


}





module.exports = {
  start
}

