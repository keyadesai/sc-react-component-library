var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var extend = _.merge;

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentLibraryName', { type: String, required: true });

    this.componentLibraryName = this.componentLibraryName || '';
    this.prettyComponentLibraryName = this.componentLibraryName
      .split('-')
      .map(function (word) {
        return _.capitalize(word);
      })
      .join(' ');

      this.props = {};
  },

  prompting: {
    greeting: function () {
      this.log(yosay(
        'Welcome to the phenomenal ' + chalk.red('Electrode App') + ' generator!'
      ));
    },

    askFor: function () {

      var prompts = [
        {
          name: 'name',
          message: 'Application Name',
          when: !this.props.name,
          default: path.basename(process.cwd()),
          store: true
        },
        {
          name: 'description',
          message: 'Description',
          when: !this.props.description,
          store: true
        },
        {
          name: 'projectName',
          message: 'projectName',
          when: !this.props.projectName,
          store: true
        },
        {
          name: 'projectUrl',
          message: 'projectUrl',
          when: !this.props.projectUrl,
          store: true
        },
        {
          name: 'jenkinsCredentials',
          message: 'jenkinsCredentials',
          when: !this.props.authorEmail,
          store: true
        },
        {
          name: 'checkpointCredentials',
          message: 'checkpointCredentials',
          when: !this.props.authorUrl,
          store: true
        },
        {
          name: 'buildSlaveLabel',
          message: 'buildSlaveLabel',
          when: !this.props.buildSlaveLabel,
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
        self.copy(fileName, self.componentLibraryName + '/.' + fileName);
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
        self.copy(fileName, self.componentLibraryName + '/' + fileName);
      });
    },

    copyPackageJson: function () {
      var self = this;

      self.template(
        'package.json',
        self.componentLibraryName + '/package.json',
        {
          name: self.componentLibraryName,
          description: self.props.description,
          githubUrl: self.props.projectUrl
        }
      );
    },

    copyOtherFiles: function () {
      var self = this;
      self.template(
        'README.md',
        self.componentLibraryName + '/README.md',
        {
          name: self.prettyComponentLibraryName,
          description: self.props.description
        }
      );

      self.template(
        'CONTRIBUTING.md',
        self.componentLibraryName + '/CONTRIBUTING.md',
        { name: self.prettyComponentLibraryName }
      );
    },

    copyJenkinsFiles: function () {
      var self = this;
      self.template(
        'Jenkinsfile.groovy',
        self.componentLibraryName + '/Jenkinsfine.groovy',
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
        self.copy(fileName, self.componentLibraryName + '/' + fileName);
      });
    }
  },

  end: {
    logMessage: function () {
      this.log('');
      this.log('Awesome! Your component library"' + this.prettyComponentLibraryName + '" is ready!');
      this.log('Apply following commands to install dependencies.');
      this.log('');
      this.log(' cd ' + this.componentLibraryName);
      this.log(' npm install');
      this.log('');
      this.log('More information found in README.md');
      this.log('');
    }
  }
});
