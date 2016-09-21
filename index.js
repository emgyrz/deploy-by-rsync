#!/usr/bin/env node

( function() {
  'use strict';
  const searchConfig = require( './scripts/searchConfig' )
  const args = require( './scripts/args' )
  const promptt = require( './scripts/promptt' )
  const message = require( './scripts/message' )
  const deploy = require( './scripts/deploy' )

  const projects = searchConfig()
  setIndexes( projects )
  const projectKeys = projects.keys()
  const projectsLength = projects.size

  var config = {
    projects,
    projectKeys,
    projectsLength
  }

  if ( projects === null ) return

  var projectToDeploy = args.findProject( config )

  if ( projectToDeploy !== null ) {
    depl( projectToDeploy )
  } else {
    message.logNames( projects )

    promptt.start( config, function( projectToDeploy ) {
      depl( projectToDeploy )
    } )
  }


  function depl( project ) {
    let deployArgs = args.prepareArgs( project )
    deploy( deployArgs )
  }





  function setIndexes( projects ) {
    let ind = 1
    for ( let prKey of projects.keys() ) {
      let pr = projects.get( prKey )
      pr.index = ind
      projects.set( prKey, pr )
      ind++
    }
  }

}() )

