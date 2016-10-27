// Variables to change when forking a new project from stencil
name = <%= projectName %>
projectName = "$name"
url = <%= projectUrl %> 
projectUrl = "$url"
projectBranch = 'master'

// Credentials are based on the pi-digital-jenkins user
jenkinsCred = <%= jenkinsCredentials %>
jenkinsCredentials = "$jenkinsCred"
checkpointCred = <%= checkpointCredentials %>
checkpointCredentials = '$checkpointCred'

buildSlave = <%= buildSlaveLabel %>
buildSlaveLabel = "$buildSlave"

// ======================================
// Introduce checkpoint and safe entry
// ======================================
def checkpoint = fileLoader.fromGit('checkpoint.groovy', 'ssh://git@stash:2222/jh/ghetto_checkpoint.git', 'master', checkpointCredentials, buildSlaveLabel)
checkpoint.initialiseCheckpoint()

properties([
  pipelineTriggers([
    [$class: "SCMTrigger", scmpoll_spec: "0 0 1 1 0"],
  ]),
  [$class: 'ParametersDefinitionProperty', parameterDefinitions:
    [[$class: 'StringParameterDefinition', defaultValue: '', description: '', name: 'CHECKPOINT']]]
])

build_number = "${env.BUILD_NUMBER}"

checkpoint.stage("Build") {
  node(buildSlaveLabel) {
    dir('suncorp-react-components') {
      withEnv(['NODE_HOME=/apps/software/node/node-v4.4.7-linux-x64/bin',
               'JAVA_HOME=/apps/tools/java/current-version-7',
               'GIT_HOME=/apps/software/git/git-2.9.0/bin',
               'PYTHON_HOME=/apps/software/python/python-linux-x86-2.7.11/bin',
               'PATH=$GIT_HOME:$NODE_HOME:$PYTHON_HOME:$JAVA_HOME:$PATH']) {
        sh 'env'
        sh 'node -v'
        sh 'npm -v'
        git credentialsId: jenkinsCredentials, url: projectUrl, branch: projectBranch

        runScript('ci/ci.sh')
      }
    }
  }
}

checkpoint.stage("Publish to NPM") {
  //input message: 'Publish to NPM?', ok: 'Publish'
  node(buildSlaveLabel) {
    dir('suncorp-react-components') {
      withEnv(['NPM_HOME=/apps/software/node/node-v4.4.7-linux-x64/bin',
               'JAVA_HOME=/apps/tools/java/current-version-7',
               'GIT_HOME=/apps/software/git/git-2.9.0/bin',
               'PYTHON_HOME=/apps/software/python/python-linux-x86-2.7.11/bin',
               'PATH=$GIT_HOME:$NPM_HOME:$PYTHON_HOME:$JAVA_HOME:$PATH']) {
        sh 'env'
        git credentialsId: jenkinsCredentials, poll: false, url: projectUrl, branch: projectBranch

        try {
          sh './ci/publish.sh'
        } catch (err) {
          throw err
        } finally {
        }
      }
    }
  }
}


void runScript(String script) {
  withEnv(['JAVA_HOME=/apps/tools/java/current-version-8']) {
    try {
      sh './' + script
    } catch (err) {
      throw err
    }
  }
}
