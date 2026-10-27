const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');
const rxjs = require('rxjs');

test('history follows restored membership, switches owners and clears on sign out', () => {
  const source = readFileSync(join(__dirname, '../src/app/agency/discovery.service.ts'), 'utf8');
  const script = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true,
  }}).outputText;
  const authState = new rxjs.BehaviorSubject(null);
  const subscriptions = new Map();
  const firestore = {
    collection: () => ({}),
    where: (_field, _op, uid) => uid,
    orderBy: () => ({}),
    query: (_ref, uid) => uid,
    collectionData: uid => new rxjs.Observable(subscriber => {
      subscriptions.set(uid, subscriber);
      return () => subscriptions.delete(uid);
    }),
  };
  const modules = {
    '@angular/core': { Injectable: () => value => value, runInInjectionContext: (_injector, fn) => fn() },
    '@angular/fire/firestore': firestore,
    rxjs,
  };
  const context = { exports: {}, require(name) {
    if (modules[name]) return modules[name];
    throw new Error(`Unexpected dependency ${name}`);
  }};
  vm.runInNewContext(script, context);
  const service = new context.exports.DiscoveryService({}, {}, {}, { getCurrentUser: () => authState });
  const results = [];
  const subscription = service.listMyRequests().subscribe(value => results.push(value));
  assert.equal(results.at(-1).length, 0);
  authState.next({ uid: 'member-a' });
  subscriptions.get('member-a').next([{ id: 'a' }]);
  assert.equal(results.at(-1)[0].id, 'a');
  authState.next({ uid: 'member-b' });
  assert.equal(subscriptions.has('member-a'), false);
  subscriptions.get('member-b').next([{ id: 'b' }]);
  assert.equal(results.at(-1)[0].id, 'b');
  authState.next(null);
  assert.equal(subscriptions.size, 0);
  assert.equal(results.at(-1).length, 0);
  subscription.unsubscribe();
});
