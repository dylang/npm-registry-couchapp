// kill the couchdb process that's running as a detached child process
// started by the 00-setup.js test

var fs = require('fs')
var rimraf = require('rimraf')
var test = require('tap').test
//var test = require('tape');
//var test = require('prova');

var path = require('path')
var pidfile = path.resolve(__dirname, 'fixtures', 'pid')
var _users = path.resolve(__dirname, 'fixtures', '_users.couch')
var db = path.resolve(__dirname, 'fixtures', 'registry.couch')
var log = path.resolve(__dirname, 'fixtures', 'couch.log')
var repl = path.resolve(__dirname, 'fixtures', '_replicator.couch')
var rdes = path.resolve(__dirname, 'fixtures', '.registry_design')
var udes = path.resolve(__dirname, 'fixtures', '._users_design')

var start = Date.now();

test('cleanup', {timeout: 60000 }, function (t) {
    t.ok(true, 'before try ' + (Date.now() - start) + 'ms')
  try {
      t.ok(true, 'before read ' + (Date.now() - start) + 'ms')
    var pid = fs.readFileSync(pidfile)
      t.ok(true, 'after read ' + pidfile + ' ' + (Date.now() - start) + 'ms')
  } catch (er) {

      t.ok(true, 'catch ' + er.message + ' ' + (Date.now() - start) + 'ms')
  }

  if (pid) {
      t.ok(true, 'if pid ' + pid + ' ' + (Date.now() - start) + 'ms')
    try { process.kill(pid) } catch (er) {
      // ok if already killed
      t.equal(er.code, 'ESRCH')
    }
  }
    t.ok(true, 'rmraf ' + ' ' + (Date.now() - start) + 'ms')
  files = [ pidfile, repl, log, _users, db, rdes, udes ]
  files.forEach(function(file) {
      t.ok(true, 'delete  ' + file + ' ' + (Date.now() - start) + 'ms')
    rimraf.sync(file)
  })

  t.pass('couch is no more')
  t.end()
})
