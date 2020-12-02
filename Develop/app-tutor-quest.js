/* Application will ask for seclection of components you want to add
   The tilte is a required section so it is not in the pick list */


const inquirer = require('inquirer');
const util = require('util');
const dataContent = [];
let  questArray =[];
let sections = [];

const TitleQ = [{type: 'input',name: 'titleName', message: 'Please Enter the Application name ', default: 'My Project'},
{type: 'input',name: 'titleUrl', message: 'Please Enter the Application url '},
{type: 'input',name: 'repoName', message: 'Please Enter the Repository name(eg. github) ', default: 'github.com'},
{type: 'input',name: 'repoUrl', message: 'Please Enter the Repository url'},
{type: 'input',name: 'titleImg', message: 'If you have an image for the title please add relative path or URL:'}];


const InstallationQ = [{type: 'input',name: 'installation', message: 'Please Enter a description of the installation process ', 
     default: 'The installation pocess is a download of git source, installing required npm modules by using npm install. The package.json file is included in the same directory as the application.'},
{type: 'input',name: 'install1', message: 'First Installation Instruction:'},
{type: 'input',name: 'install2', message: 'Second Installation Instruction:'},
{type: 'input',name: 'install3', message: 'Third Installation Instruction:'},
{type: 'input',name: 'install4', message: 'Fourth Installation Instruction:'},
{type: 'input',name: 'installImg', message: 'If you have an image/gif that covers install please add relative path or URL: ', default: '../images/installation.jpg'}];

const UsageQ = [{type: 'input',name: 'usage', message: 'Please Enter a description of how the user would use this program: '},
{type: 'input',name: 'use1', message: 'First user instruction (eg. user clicks on main page)'},
{type: 'input',name: 'use2', message: 'Second user instruction'},
{type: 'input',name: 'use3', message: 'Third user instruction'},
{type: 'input',name: 'use4', message: 'Fourth user instruction'},
{type: 'input',name: 'installationImg', message: 'If you have an image/gif that shows the use of app using relative path: ', default: '../images/appUse.gif'}];

const TechnologiesQ = [{type: 'input',name: 'technologies', message: 'Please Enter a  brief description of technology used '}, 
{type: 'input',name: 'tech1', message: 'First technology to list'},
{type: 'input',name: 'tech2', message: 'Second technology to list'},
{type: 'input',name: 'tech3', message: 'Third technology to list'},
{type: 'input',name: 'tech4', message: 'Fourth technology to list'}];

const CreditsQ = [{type: 'input',name: 'credit1', message: 'Please Enter list people you would like to credit \n (eg. Sample code  - John Doe on GeeksForGeeks' },
{type: 'input',name: 'credit2', message: 'Next person to credit: '},
{type: 'input',name: 'credit3', message: 'Next person to credit: '},
{type: 'input',name: 'credit4', message: 'Next person to credit: '}];

const LicenseQ = [{type: 'input',name: 'lType', message: 'Please add License type',default: 'MIT'}];

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
    sections.unshift('Title');
    console.log('sections',sections);
    sections.forEach(sect => {
      let qset = sect + 'Q';
      let toc = false;
      console.log(qset);
     if (sect === "Table of Contents") {
      toc = true
     } else {
     questArray = questArray.concat(eval(qset));
     }
      //answers = await askQ(qset)
      })
      console.log(questArray); 
  
    inquirer.prompt(questArray).then((answers) => {
      
      console.log(answers);
     // createReadme(answers,toc,sections); 
    })
  })
   .catch(err => {console.log(err)})   
  }     

  function createReadme(answer,toc,sections){
  let tocStr =''  
  if(toc){
    toc = "## Table of contents\n";
    // * [Use Case](#use-case)
    // * [Application Objective](#application-objective)
    // * [Functionality](#functionality)
    // * [Setup](#setup)
    // * [Technologies Used](#technologies-used)
    // * [Developers: Javascript-Jockies](#Developers:-Javascript-Jockies)

    sections.forEach(elemet => {
      if(element != "Table of Contents" || element || "Title" )
      let lce = elemet.toLowerCase();
      toc += `* [${element}](#${lce})`
      })
     }
  
  let title_sect = `
  ![${answer.name}](./assets/images/ICONS/MainPage.jpg)
  `;

  }

// async function askQ(qset){
//   await inquirer.prompt(eval(qset)).then((ans) => {
//     console.log(ans);
//     return ans;
//   });
// }


main();
//startQuestions(sections);
//console.log("this is bull")
//inquirer.prompt(TitleQ).then((response) => {console.log(response)});