//TODO  
//get all the commits for the last month
//save the date
//plot it on the graph

const removeSuffix = require('remove-suffix')
const exec = require("child_process").exec;
folders = Array()
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function scan(path) {
  let { stdout } = await sh('find ' + path + ' -name ".git"');
  for (let line of stdout.split('\n')) {
    line = removeSuffix(line,'/.git')
    if(line[0]!= ''){
      let { stdout} = await sh('cd ' + line[0] + '&& git rev-list --all --count')
      folders.push([line[0],Number(stdout)])
    }
 
  }
  console.log(folders)
}
scan("/home/aruniyer/AndroidStudioProjects/");