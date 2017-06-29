var expect = require('chai').expect;
var config = require('../../config/index');

function reloadConfig(){
  delete require.cache[require.resolve('../../config/index')];
  return require('../../config/index');
}

describe('config',function() {
  describe('#constructor', function() {
    it('should get config env.', function() {
      process.env.NODE_ENV = null;
      config = reloadConfig();
      expect(config.env).to.equal('development');
    });

    it('should get config development env.', function() {
      process.env.NODE_ENV = 'development';
      config = reloadConfig();
      expect(config.env).to.equal('development');
      expect(config.db).to.exist;
      expect(config.db.database).to.exist;
    });
  });

  describe('#isDev', function() {
    it('should get true when NODE_ENV is development.', function() {
      process.env.NODE_ENV = 'development';
      config = reloadConfig();
      expect(config.isDev()).to.equal(true);
    });

    it('should get false when NODE_ENV is production.', function() {
      process.env.NODE_ENV = 'production';
      config = reloadConfig();
      expect(config.isDev()).to.equal(false);
    });
  });

  describe('#isProduction', function() {
    it('should get true when NODE_ENV is production.', function() {
      process.env.NODE_ENV = 'production';
      config = reloadConfig();
      expect(config.isProduction()).to.equal(true);
    });

    it('should get false when NODE_ENV is development.', function() {
      process.env.NODE_ENV = 'development';
      config = reloadConfig();
      expect(config.isProduction()).to.equal(false);
    });
  });

  describe('#isTest', function() {
    it('should get true when NODE_ENV is test.', function() {
      process.env.NODE_ENV = 'test';
      config = reloadConfig();
      expect(config.isTest()).to.equal(true);
    });

    it('should get true when NODE_ENV is development.', function() {
      process.env.NODE_ENV = 'development';
      config = reloadConfig();
      expect(config.isTest()).to.equal(false);
    });
  });
});