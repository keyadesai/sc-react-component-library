var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var extend = _.merge;

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.props = {
    };
  },

  prompting: {
    greeting: function () {
      this.log(yosay(
        'Welcome to the phenomenal ' + chalk.red('Suncorp React Component Library') + ' generator!'
      ));
      this.log(yosay(
        'Now please answer some questions, so we can generate this project the way you want!!'
      ));
    },

    askFor: function () {

      var prompts = [
        {
          name: 'componentLibraryName',
          message: 'Enter your library Name',
          when: !this.props.componentLibraryName,
          default: 'suncorp-react-components',
          store: true
        },
        {
          name: 'description',
          message: 'Short description about this project',
          when: !this.props.description,
          store: true
        },
        {
          name: 'jenkinsCredentials',
          message: 'Enter jenkins credentials',
          when: !this.props.jenkinsCredentials,
          default: '9c7e9bfe-ff5b-413e-973c-874d5986d19b',
          store: true
        },
        {
          name: 'buildSlaveLabel',
          message: 'Enter Alfred build slave label',
          when: !this.props.buildSlaveLabel,
          default: 'nodejs-build',
          store: true
        }
      ];

      return this.prompt(prompts).then((props) => {
        this.props = extend(this.props, props);
      });
    },
  },

  configuring: {
    copyDotFiles: function() {
      var self = this;
      [
        'babelrc',
        'eslintrc',
        'gitignore',
        'npmignore'
      ].forEach(function (fileName) {
        self.copy(fileName, self.props.componentLibraryName + '/.' + fileName);
      });
    },

    copyCoreFiles: function () {
      var self = this;
      [
        '.storybook/config.js',
        '.scripts/mocha_runner.js',
        '.scripts/prepublish.sh',
        '.scripts/publish_storybook.sh',
        '.scripts/user/prepublish.sh',
        '.scripts/user/pretest.js',
      ].forEach(function (fileName) {
        self.copy(fileName, self.props.componentLibraryName + '/' + fileName);
      });
    },

    copyPackageJson: function () {
      var self = this;

      self.template(
        'package.json',
        self.props.componentLibraryName + '/package.json',
        {
          name: self.props.componentLibraryName,
          description: self.props.description,
          githubUrl: self.props.projectUrl
        }
      );
    },

    copyOtherFiles: function () {
      var self = this;
      self.template(
        'README.md',
        self.props.componentLibraryName + '/README.md',
        {
          name: this.props.componentLibraryName
      .split('-')
      .map(function (word) {
        return _.capitalize(word);
      })
      .join(' '),
          description: self.props.description
        }
      );

      self.template(
        'CONTRIBUTING.md',
        self.props.componentLibraryName + '/CONTRIBUTING.md',
        { name: this.props.componentLibraryName
      .split('-')
      .map(function (word) {
        return _.capitalize(word);
      })
      .join(' ')}
      );
    },

    copyJenkinsFiles: function () {
      var self = this;
      self.template(
        'Jenkinsfile.groovy',
        self.props.componentLibraryName + '/Jenkinsfine.groovy',
        {
          projectName: self.props.projectName,
          projectUrl: self.props.projectUrl,
          jenkinsCredentials: self.props.jenkinsCredentials,
          checkpointCredentials: self.props.checkpointCredentials,
          buildSlaveLabel: self.props.buildSlaveLabel
        }
      );
    }
  },

  writing: {
    copySrcFiles: function () {
      var self = this;
      [
        'src/components/atoms/atom1.js',
        'src/components/molecules/molecule1.js',
        'src/components/organisms/organism1.js',
        'src/components/index.js',
        'src/stories/atoms/atom1.js',
        'src/stories/molecules/molecule1.js',
        'src/stories/organisms/organism1.js',
        'src/stories/index.js',
        'src/tests/index.js'
      ].forEach(function (fileName) {
        self.copy(fileName, self.props.componentLibraryName + '/' + fileName);
      });
    }
  },

  end: {
    logMessage: function () {
      let prettyName = this.props.componentLibraryName
      .split('-')
      .map(function (word) {
        return _.capitalize(word);
      })
      .join(' ');
      this.log('');
      this.log('Awesome! Your component library"' + prettyName + '" is ready!');
      this.log('Apply following commands to install dependencies.');
      this.log('');
      this.log(' cd ' + this.props.componentLibraryName);
      this.log(' npm install');
      this.log('');
      this.log('More information found in README.md');
      this.log('');
    }
  }
});
