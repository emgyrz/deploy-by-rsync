const colors = require( 'colors/safe' )


function logError( txt, desc ) {
  desc = ( desc !== undefined ) ? ( '\n' + desc ) : ''
  console.log( '\n' + colors.red.bold( txt ) + '\n' )
}


function drawLine( wBreak ) {
  let br = wBreak ? '\n' : ''
  console.log( colors.grey( `____________________________________________${br}` ) )
}


function logSuccess( name ) {
  name = name !== undefined ? `"${name}"` : ''
  let message = colors.green.bold( `   Deploy ${name} finished allright!` )
  drawLine( true )
  console.log( message )
  drawLine( true )
}





function logNames( projects ) {

  console.log( colors.grey( '\nAvaliable projects: ' ) )
  drawLine( true )
  let ind = 1
  projects.forEach( ( project, key ) => {
    let num = colors.bold.yellow( `  ${ind}. ` )
    let name = project.name || key
    console.log( `${num} ${name}` )
    ind++
  } )
  drawLine()

}







module.exports = {
  error: logError,
  logNames,
  success: logSuccess
}

