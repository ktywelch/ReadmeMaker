const inquirer = require('inquirer');
const util = require('util');
const dataContent = [];
const questArray =[];
let sections = [];

function askContent() {
 inquirer.prompt(questArray).then(answers => {
  console.log(answers);
 });
}

async function createQuestions(section){
  let q1,q2,q3,q4,q5 = {};     
      questArray.length = 0;
      if(section !== "Table of Contents"){
      q1 = {type: 'input',name: section, message: 'Please add text for '+ section+' section'}
      //section to prepare the questions
      if (section === "Title") {
      q2 = {type: 'input',name: 'appName', message: 'Please Enter the Application name '};
      q3 = {type: 'input',name: 'appUrl', message: 'Please Enter the Application url '}; 
      q4 = {type: 'input',name: 'repoName', message: 'Please Enter the Repository name(eg. github) ', default: 'github.com'};
      q5 = {type: 'input',name: 'repoUrl', message: 'Please Enter the Repository url'}; 
      } else {
      q2 = {type: 'input', name: 'altP', message: 'Second paragraph for ' + section + ' section'}  
      q3 = {type: 'input',name: 'needList', message: 'Does this section need a (eg. Installation steps) ' + section + ' Yes/No',
      default: true};
      q4 = {type: 'fuzzypath', name: 'imgPath', itemType: 'file', rootPath: '../', 
      message: 'Select a the img file to include for ' + section,suggestOnly: false,depthLimit: 5};
      q5 = {type: 'input', name: 'closeP', message: 'Closing paragraph for ' + section + ' section'} 
      }
      questArray.push(q1,q2,q3,q4,q5);
      //console.log(questArray);
     }   
     askContent();
}

function p1 (){
  //inquirer.prompt(questions).then((answers) =>
  inquirer.prompt([
    {
      name: 'section',
      type: 'checkbox',
      message: "Please select the sections you want in a README file",
      choices: ["Table of Contents","Installation","Usage","Technologies","Credits","License"],
    }
  ])
  .then((response) => {
    sections = response.section;
    //console.log('sections',sections);
    sections.forEach(async (section) => {
      await createQuestions(section);
      //await console.log('we are here ',section,questArray)};
  });
  });
}


function startQuestions(sections){
  sections.forEach(async (section) => {
  console.log('we are here ',section);
  await createQuestions(section);
  console.log('Completed!!!');
  });
}

function main(){
  p1();
  startQuestions(sections);
}

main();
startQuestions(sections);
console.log("this is bull")

  