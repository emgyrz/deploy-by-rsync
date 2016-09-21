const spawn = require( 'child_process' ).spawn

const message = require( './message' )




function deploy( deployArgs ) {
  // console.log('deployArgs', deployArgs);

  let depl = spawn( 'sshpass', deployArgs )

  depl.stdout.on( 'data', ( data ) => {
    if ( data ) console.log( `${data}` )
  } )

  depl.stderr.on( 'data', ( data ) => {
    if ( data ) message.error( 'Error: ', `${data}` )
  } )

  depl.on( 'close', ( code ) => {
    if ( code === 0 ) {
      message.success( 'project.name' )
    } else {
      console.log( `child process exited with code ${code}` );
    }


  } )


}


module.exports = deploy

