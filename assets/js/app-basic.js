/* Application will ask for seclection of components you want to add
   The tilte is a required section so it is not in the pick list */

const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');
const inquirer = require('inquirer');
const util = require('util');
const dataContent = [];
const questArray =[];
let sections = [];

const TitleQ = [{type: 'input',name: 'appName', message: 'Please Enter the Application name ', default: 'My Project'},
{type: 'input',name: 'appUrl', message: 'Please Enter the Application url '},
{type: 'input',name: 'repoName', message: 'Please Enter the Repository name(eg. github) ', default: 'github.com'},
{type: 'input',name: 'repoUrl', message: 'Please Enter the Repository url'}];

const InstallationQ = [{type: 'input',name: 'installation', message: 'Please Enter a description of the installation process ', 
     default: 'The installation pocess is a download of git source, installing required npm modules by using npm install. The package.json file is included in the same directory as the application.'},
{type: 'input',name: 'install1', message: 'First Installation Instruction:'},
{type: 'input',name: 'install2', message: 'Second Installation Instruction:'},
{type: 'input',name: 'install3', message: 'Third Installation Instruction:'},
{type: 'input',name: 'install4', message: 'Fourth Installation Instruction:'},
{type: 'input',name: 'installImg', message: 'If you have an image for the installation please add using relative path: ', default: '../images/installation.jpg'}];

const UsageQ = [{type: 'input',name: 'usage', message: 'Please Enter a description of how the user would use this program: '},
{type: 'input',name: 'use1', message: 'First user instruction (eg. user clicks on main page)'},
{type: 'input',name: 'use2', message: 'Second user instruction'},
{type: 'input',name: 'use3', message: 'Third user instruction'},
{type: 'input',name: 'use4', message: 'Fourth user instruction'},
{type: 'input',name: 'installationImg', message: 'If you have an image  or gif that shows the use of app using relative path: ', default: '../images/appUse.gif'}];

const TechnologiesQ = [{type: 'input',name: 'technologies', message: 'Please Enter a  brief description of technology used '}, 
{type: 'input',name: 'tech1', message: 'First technology to list'},
{type: 'input',name: 'tech2', message: 'Second technology to list'},
{type: 'input',name: 'tech3', message: 'Third technology to list'},
{type: 'input',name: 'tech4', message: 'Fourth technology to list'}];

const CreditsQ = [{type: 'input',name: 'credit1', message: 'Please Enter list people you would like to credit \n (eg. Sample code  - John Doe on GeeksForGeeks' },
{type: 'input',name: 'credit2', message: 'Next person to credit: '},
{type: 'input',name: 'credit3', message: 'Next person to credit: '},
{type: 'input',name: 'credit4', message: 'Next person to credit: '}];
/*
const LicenseQ = [{type: 'boolean',name: 'license', message: 'Please Specify License type', 
default: 'The installation pocess is a download of git source, installing required npm modules by using npm install. The package.json file is included in the same directory as the application.'},
{type: 'input',name: 'installation1', message: 'First Installation Instruction:'},
{type: 'input',name: 'installation2', message: 'Second Installation Instruction:'},
{type: 'input',name: 'installation3', message: 'Third Installation Instruction:'},
{type: 'input',name: 'installation3', message: 'Fourth Installation Instruction:'},
{type: 'input',name: 'installationImg', message: 'If you have an image for the installation please add using relative path: ', default: '../images/installation.jpg'}];
*/
/*
function askContent() {
 inquirer.prompt(questArray).then(answers => {
  console.log(answers);
 });
}
*/
/*
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
*/
async function main (){
  //inquirer.prompt(questions).then((answers) =>
  inquirer.prompt([
    {
      name: 'section',
      type: 'checkbox',
      message: "Please select the sections you want in a README file",
      choices: ["Table of Contents","Installation","Usage","Technologies","Credits","License"],
    }
  ])
  .then(response => {
    sections = response.section;
    //console.log('sections',sections);
    sections.forEach( async (section) =>  {
      let qset = section + 'Q';
      console.log("working with",qset)
      await inquirer.prompt(eval(qset))
      .then((response) => {
        console.log(response)
      
      })
      //await console.log('we are here ',section,questArray)};
    })
  })

    .catch(err => {console.log(err)})
  


}


async function showResp(qset){
 inquirer.prompt(eval(qset)).then((ans) => {
    console.log(ans);

  });
  return ans;
}


main();
//startQuestions(sections);
//console.log("this is bull")

//inquirer.prompt(TitleQ).then((response) => {console.log(response)});