/* Application will ask for seclection of components you want to add
   The tilte is a required section so it is not in the pick list */
const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
let toc = false;
const dataContent = [];
let  questArray =[];
let sections = [];
const askQ2 = util.promisify(askQ);

const TitleQ = [{type: 'input',name: 'titleName', message: 'The Title, Name and Repo are required\nPlease Enter the Application name ', 
default: 'My Project'},
{type: 'input',name: 'titleUrl', message: 'Please Enter the Application url '},
{type: 'input',name: 'repoName', message: 'Please Enter the Repository name(eg. github) ', default: 'github.com'},
{type: 'input',name: 'repoUrl', message: 'Please Enter the Repository url'},
{type: 'input',name: 'titleImg', message: 'If you have an image for the title please add relative path or URL:',default: '../images/ph1.png'}];

const InstallationQ = [{type: 'input',name: 'installation', message: 'Please Enter a description of the installation process ', 
     default: 'The installation pocess is a download of git source, installing required npm modules by using npm install. The package.json file is included in the same directory as the application.'},
{type: 'input',name: 'install1', message: 'First Installation Instruction:'},
{type: 'input',name: 'install2', message: 'Second Installation Instruction:'},
{type: 'input',name: 'install3', message: 'Third Installation Instruction:'},
{type: 'input',name: 'install4', message: 'Fourth Installation Instruction:'},
{type: 'input',name: 'installImg', message: 'If you have an image/gif that covers install please add relative path or URL: ', default: '../images/ph2.png'}];

const UseQ = [{type: 'input',name: 'use', message: 'Please Enter a description of how the user would use this program: '},
{type: 'input',name: 'use1', message: 'First user instruction (eg. user clicks on main page)'},
{type: 'input',name: 'use2', message: 'Second user instruction'},
{type: 'input',name: 'use3', message: 'Third user instruction'},
{type: 'input',name: 'use4', message: 'Fourth user instruction'},
{type: 'input',name: 'useImg', message: 'If you have an image/gif that shows the use of app using relative path: ', default: '../images/ph3.png'}];

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
// End of variable declaration //

async function main (){
  //inquirer.prompt(questions).then((answers) =>
  inquirer.prompt([
    {
      name: 'section',
      type: 'checkbox',
      message: "Please select the sections you want in a README file",
      choices: ["Table of Contents","Installation","Use","Technologies","Credits","License"],
    }
  ])
  .then(response => {
    sections = response.section;
    sections.unshift('Title');
    //console.log('sections',sections);
    sections.forEach(sect => {
      let qset = sect + 'Q';
     // console.log(qset);
     if (sect === "Table of Contents") {
      toc = true;
     } else {
     questArray = questArray.concat(eval(qset));
     }
     
      })

      //console.log(questArray);
      return ([questArray,toc,sections]);
      
  })
  .then (qArray => {
    askQ2(qArray[0],qArray[1],qArray[2])})
   .catch(err => {console.log(err)})   
  }     

  function createReadme(ans,toc,sections)
  {
  let tocStr,titleStr,insStr,useStr,techStr,credStr,licStr =''  
  console.log("from CreateReadme",ans);
    if(toc){tocStr = "\n## Table of contents"}

    sections.forEach(element => {
     if(toc && (element != "Table of Contents")){
       tocStr += `\n* [${element}](#${element})`
     }
     switch (element) {
      case 'Title':
        if(ans.titleImg){titleStr = `![](${ans.titleImg})`}else{titleStr = ans.titleName.toUpperCase()+`\n`};
        titleStr += `\n\n[${ans.titleName} Application Link](${ans.titleUrl})`;
        titleStr += `\n\n[${ans.titleName} Application Repo on ${ans.repoName}](${ans.repoUrl})`;  
        break;
      case 'Installation':
        insStr = `\n## Installation\n${ans.installation}\n`;
        insStr += `\n* ${ans.install1}`
        insStr += `\n* ${ans.install2}`
        insStr += `\n* ${ans.install3}`
        insStr += `\n* ${ans.install4}\n`
        insStr += `![](${ans.insallImg})\n`
        break;
      case 'Use':
        useStr = `\n## Use\n${ans.use}\n`;
        useStr += `\n* ${ans.use1}`
        useStr += `\n* ${ans.use2}`
        useStr += `\n* ${ans.use3}`
        useStr += `\n* ${ans.use4}\n`
        useStr += `![](${ans.useImg})\n`
        break;
      case 'Technologies':
        techStr = `\n## Technologies\n${ans.technologies}\n`;
        techStr += `\n* ${ans.tech1}`
        techStr += `\n* ${ans.tech2}`
        techStr += `\n* ${ans.tech3}`
        techStr += `\n* ${ans.tech4}\n`
        break;
      case 'Credits':
        credStr = `\n## Credits\nRecognizing contributors and sites that helped in development:\n`;
        credStr += `\n* ${ans.credit1}`
        credStr += `\n* ${ans.credit2}`
        credStr += `\n* ${ans.credit3}`
        credStr += `\n* ${ans.credit4}\n`
        break;
      case 'License':
        licStr = `\n## License`
        licStr += `\n${ans.lType}` 
        break; 
      }
    })
   let fullStr = titleStr + tocStr + insStr + useStr + techStr + credStr + licStr
   fs.writeFile('../output/README.md',fullStr,err => {
    if (err) {
      console.error(err)
      return
    }
   }) 
  }

function askQ(qArray,toc,sections){
  let ans = [];
  inquirer.prompt(qArray).then((ans) => {
    console.log('Inside',ans,toc,sections)
   // .then (res => async() => {
  //        console.log(res);
          createReadme(ans,toc,sections);
    //return ([ans,toc,sections]);
}).catch(err => {console.log(err)})
}


main();
//startQuestions(sections);
//console.log("this is bull")
//inquirer.prompt(TitleQ).then((response) => {console.log(response)});

