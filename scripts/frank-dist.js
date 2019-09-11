/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');

const packagePath = process.cwd();
const distPath = path.join(packagePath, './dist');

async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(packagePath, './package.json'),
    'utf8'
  );
  const { scripts, devDependencies, ...packageOthers } = JSON.parse(
    packageData
  );
  const newPackageData = {
    ...packageOthers,
    private: false,
  };
  const targetPath = path.resolve(distPath, './package.json');

  await fse.writeFile(
    targetPath,
    JSON.stringify(newPackageData, null, 2),
    'utf8'
  );
  console.log(`Created package.json in ${targetPath}`);
}

async function run() {
  try {
    await createPackageFile();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
