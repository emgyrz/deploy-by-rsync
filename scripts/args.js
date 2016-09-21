const argv = require( 'yargs' ).argv
const path = require( 'path' )
const fs = require( 'fs' )

const defaultExclude = [ '.git', 'build', 'node_modules', 'bower_components', 'production' ]

const defaultArgs = [ '--progress', '--delete-after', '-avhz' ]
const sshArgs = [ '-e', 'ssh' ]



function prepareArgs( project ) {

  let ARGS = [ '-p', project.pass, 'rsync' ]

  return ARGS.concat(
    excluded( project ),
    defaultArgs,
    inputedArgs(),
    sshArgs,
    pathesArgs( project )
  )

}


// const argsAliases = {
//   n: '-n',
//   'dry-run': '-n'
// }


function inputedArgs() {
  let res = []

  if ( argv.n === true ) {
    res.push( '-n' )
  }

  return res
}

//project.src,
//`${project.userName}@${project.host}:${project.remoteDir}`

function pathesArgs( project ) {
  let res = []
  let src = project.src
  let dest = `${project.userName}@${project.host}:${project.remoteDir}`

  let fPath = argv.f || argv.path

  if ( fPath !== undefined ) {
    fPath = fPath.replace( /^\//, '' )

    try {
      let srcToFile = path.resolve( src, fPath )
      var stat = fs.statSync( srcToFile )
      src = srcToFile
      dest += fPath
      if ( stat.isDirectory() ) {
        if (src.lastIndexOf('/') !== src.length - 1 ) {
          src += '/'
        }
        if (dest.lastIndexOf('/') !== dest.length - 1 ) {
          dest += '/'
        }
      }
    } catch ( e ) {}

  }


  res.push( src, dest )
  return res
}



function excluded( project ) {
  let excludes = defaultExclude
  let prExcludes = project.excludes
  let isArray = Array.isArray( prExcludes )
  if ( isArray ) {
    prExcludes.forEach( excl => {
      let path = `${excl}`.replace( /\s/g, '\ ' )
      excludes.push( path )
    } )
  }

  excludes = excludes.map( toArg )

  return excludes

  function toArg( path ) {
    return `--exclude=${path}`
  }

}




function findProject( config ) {
  let projectKey = argv.p || argv.project

  if ( !isNaN( parseInt( projectKey ) ) ) {
    let ind = parseInt( projectKey )
    for ( let pr of config.projects.values() ) {
      if ( pr.index === ind ) {
        return pr
      }
    }
    return null
  } else {
    let pr = config.projects.get( projectKey )
    return pr === undefined ? null : pr
  }

  return null

}



module.exports = {
  findProject,
  prepareArgs
}

