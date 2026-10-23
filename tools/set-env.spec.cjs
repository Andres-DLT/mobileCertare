const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

test('preserves quoted and multiline contact details when generating the environment', () => {
  const source = readFileSync(join(__dirname, 'set-env.ts'), 'utf8');
  const input = "O'Neil Consulting\nSuite \\2";
  const env = {
    NG_APP_CONTACT_EMAIL: input,
    NG_APP_CONTACT_PHONE: input,
    NG_APP_WHATSAPP: input,
    NG_APP_LINKEDIN: input,
    NG_APP_LOCATION: input,
    NG_APP_LEGAL_ENTITY: input,
    NG_APP_LEGAL_ADDRESS: input,
    NG_APP_LEGAL_EMAIL: input,
    NG_APP_LEGAL_UPDATED: input,
  };
  let generated = '';
  const script = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;

  vm.runInNewContext(script, {
    exports: {},
    process: { env },
    console: { log() {} },
    require(name) {
      if (name === 'dotenv') return { config() {} };
      assert.equal(name, 'fs');
      return {
        writeFile(_path, content, callback) {
          generated = content;
          callback(null);
        },
      };
    },
  });

  const parsed = ts.createSourceFile('environment.ts', generated, ts.ScriptTarget.Latest);
  assert.equal(parsed.parseDiagnostics.length, 0);
  const compiled = ts.transpileModule(generated, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const context = { exports: {} };
  vm.runInNewContext(compiled, context);
  for (const group of ['contact', 'legal']) {
    for (const value of Object.values(context.exports.environment[group])) {
      assert.equal(value, input);
    }
  }
});
