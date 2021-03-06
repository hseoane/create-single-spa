const { createFixtureIfDoesntExist } = require("../test-helpers.js");
const nixt = require("nixt");

describe(`js util module usage`, () => {
  const fixtureDir = createFixtureIfDoesntExist(
    __filename,
    ["webpack-config-single-spa", "webpack-config-single-spa"],
    `
    --moduleType util-module
    --packageManager yarn
    --orgName org
    --projectName project
    --typescript=false
  `
  );

  it(`Can yarn build`, (done) => {
    console.log("yarn build");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn build`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/webpack --mode=production/);
        expect(result.stdout).toMatch(/org-project.js/);
      })
      .code(0)
      .end(done);
  });

  it(`Can yarn lint`, (done) => {
    console.log("yarn lint");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn lint`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/eslint/);
      })
      .code(0)
      .end(done);
  });

  it(`Can yarn format`, (done) => {
    console.log("yarn format");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn format`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/prettier/);
        expect(result.stdout).toMatch(/webpack.config.js/);
      })
      .code(0)
      .end(done);
  });

  it(`Can yarn test`, (done) => {
    console.log("yarn test");
    nixt()
      .cwd(fixtureDir)
      .run(`yarn test`)
      .expect((result) => {
        console.log(result.stdout);
        console.log(result.stderr);
        expect(result.stdout).toMatch(/jest/);
        expect(result.stdout).toMatch(/No tests found, exiting with code 0/);
      })
      .code(0)
      .end(done);
  });
});
