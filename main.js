const questions = [
    'Your project name : ',
    'Your first module name : '
];
var questionsCounter = 0;
const EventEmitter = require('events');

const fs = require('fs')


function stdinLineByLine() {
    const stdin = new EventEmitter();
    let buff = '';

    process.stdin
        .on('data', data => {
            buff += data;
            lines = buff.split(/\r\n|\n/);
            buff = lines.pop();
            lines.forEach(line => stdin.emit('line', line));
        })
        .on('end', () => {
            if (buff.length > 0) stdin.emit('line', buff);
        });

    return stdin;
}
const project = {
  projectName: '',
  moduleNames: []
}
console.log(questions[0]);
const stdin = stdinLineByLine();
stdin.on('line', buff => {
    if (questionsCounter == 0 ) {
      project.projectName = buff.toString()
    }
    else {
      project.moduleNames.push(buff.toString())
    }
    questionsCounter++;
    if(questionsCounter >= questions.length){
      createFile(project)
      process.exit();
    }
    console.log(questions[questionsCounter]);
});

function createFile(project) {
  const rootPath = `./${project.projectName}`

  try {
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath)
    }
    const modulePath = `${rootPath}/${project.moduleNames[0]}`
    if (!fs.existsSync(modulePath)) {
      fs.mkdirSync(modulePath)
      fs.writeFileSync(`${modulePath}/${project.moduleNames[0]}.js`,'')
    }
  }
  catch (err) {
    console.log(err)
  }

}