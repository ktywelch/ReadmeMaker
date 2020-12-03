/* Application will ask for seclection of components you want to add
   The tilte is a required section so it is not in the pick list */
const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
let toc = false;
const dataContent = [];
let  questArray =[];
let sections = [];


const TitleQ = [{type: 'input',name: 'titleName', message: 'The Title, Name and Repo are required\nPlease Enter the Application name ', 
default: 'My Project'},
{type: 'input',name: 'description', message: 'Please Enter the Application Description:\n'},
{type: 'input',name: 'titleUrl', message: 'Please Enter the Application url: '},
{type: 'input',name: 'repoName', message: 'Please Enter the Repository name(eg. github): ', default: 'github.com'},
{type: 'input',name: 'repoUrl', message: 'Please Enter the Repository url: '},
{type: 'input',name: 'titleImg', message: 'If you have an image for the title please add relative path or URL: ',default: '../images/'}];

const InstallationQ = [{type: 'input',name: 'installation', message: 'Please Enter a description of the installation process ', 
     default: 'The installation pocess is a download of git source, installing required npm modules by using npm install. The package.json file is included in the same directory as the application.'},
{type: 'input',name: 'install1', message: 'First Installation Instruction: '},
{type: 'input',name: 'install2', message: 'Second Installation Instruction: '},
{type: 'input',name: 'install3', message: 'Third Installation Instruction: '},
{type: 'input',name: 'install4', message: 'Fourth Installation Instruction: '},
{type: 'input',name: 'installImg', message: 'If you have an image/gif that covers install please add relative path or URL: ', default: '../images/'}];

const UsageQ = [{type: 'input',name: 'use', message: 'Please Enter a description of how the user would use this program: '},
{type: 'input',name: 'use1', message: 'First user instruction (eg. user logs in)'},
{type: 'input',name: 'use2', message: 'Second user instruction: '},
{type: 'input',name: 'use3', message: 'Third user instruction: ' },
{type: 'input',name: 'use4', message: 'Fourth user instruction: '},
{type: 'input',name: 'useImg', message: 'If you have an image/gif that shows the use of app using relative path: ', default: '../images/description, installation instructions, usage information, contribution guidelines, and test instructions'}];

const TechnologiesQ = [{type: 'input',name: 'technologies', message: 'Please Enter a  brief description of technology used '}, 
{type: 'input',name: 'tech1', message: 'First technology to list: '},
{type: 'input',name: 'tech2', message: 'Second technology to list: '},
{type: 'input',name: 'tech3', message: 'Third technology to list: '},
{type: 'input',name: 'tech4', message: 'Fourth technology to list: '}];

const CreditsQ = [{type: 'input',name: 'credit1', message: 'Please Enter list people you would like to credit \n (eg. Sample code  - John Doe on GeeksForGeeks' },
{type: 'input',name: 'credit2', message: 'Next person to credit: '},
{type: 'input',name: 'credit3', message: 'Next person to credit: '},
{type: 'input',name: 'credit4', message: 'Next person to credit: '}];

const TestQ = [{type: 'input',name: 'testIns', message: 'Provide instructions to run validation test'}];

const LicenseQ = [{type: 'input',name: 'lType', message: 'Please add License type: ',default: 'MIT'}];
// End of variable declaration //

async function main (){
  //inquirer.prompt(questions).then((answers) =>
  inquirer.prompt([
    {
      name: 'section',
      type: 'checkbox',
      message: "Please select the sections you want in a README file",  
      choices: ["Table of Contents","Installation","Use","Technologies","Credits","Test","License"],
    }
  ])
  .then(response => {
    sections = response.section;
    // Title will always be required so pushing into the question regardless
    sections.unshift('Title');
    sections.forEach(sect => {
      let qset = sect + 'Q';
     /* The table of contents is a special case so just want this to be true of false 
     We need this because of an issue with inquirer and promise so have to put all the questions in one */
     if (sect === "Table of Contents") {
      toc = true;
     } else {
     questArray = questArray.concat(eval(qset));
     }
      })
      //A promise can I only return one value so had to be them into an array
      return ([questArray,toc,sections]);
  })
  .then (qArray => {
    /* we have to do this to address the limitation of promise to get more than one return value
    had to put them all into an array in the previous section */
    askQ(qArray[0],qArray[1],qArray[2])})
   .catch(err => {console.log(err)})   
  }     

  //Function is the one that will create the file
  function createReadme(ans,toc,sections)
  {
  let tocStr,titleStr,insStr,useStr,techStr,credStr,licStr,finalStr,testStr = '' 
  let fullStr =[] 

  console.log("from CreateReadme",ans);
    if(toc){tocStr = "\n## Table of contents";fullStr.push("tocStr")}

    sections.forEach(element => {
     if(toc && (element != "Table of Contents")){
       tocStr += `\n* [${element}](#${element})`
     }
     switch (element) {
      case 'Title':
        if(ans.titleImg){titleStr = `![](${ans.titleImg})`}else{titleStr = ans.titleName.toUpperCase()+`\n`};
        titleStr += `\n\n${ans.description}`;
        titleStr += `\n\n[${ans.titleName} Application Link]`;
        if(ans.titleUrl){titleStr += `(${ans.titleUrl})`};
        titleStr += `\n\n[${ans.titleName} application can be found on repository ${ans.repoName}]`;
        if(ans.repoUrl){titleStr += `(${ans.repoUrl})`};  
        fullStr.push("titleStr")
        break;
      case 'Installation':
        insStr = `\n## Installation\n${ans.installation}\n`;
        if(ans.install1){insStr += `\n* ${ans.install1}`};
        if(ans.install2){insStr += `\n* ${ans.install2}`};
        if(ans.install3){insStr += `\n* ${ans.install3}`};
        if(ans.install4){insStr += `\n* ${ans.install4}\n`};
        if(ans.installImg){insStr += `![](${ans.installImg})\n`};
        fullStr.push("insStr")
        break;
      case 'Use':
        useStr = `\n\n## Use\n${ans.use}\n`;
        if(ans.use1){useStr += `\n* ${ans.use1}`};
        if(ans.use2){useStr += `\n* ${ans.use2}`};
        if(ans.use3){useStr += `\n* ${ans.use3}`};
        if(ans.use4){useStr += `\n* ${ans.use4}\n`};
        if(ans.useImg){useStr += `![](${ans.useImg})\n`};
        fullStr.push("useStr")
        break;
      case 'Technologies':
        techStr = `\n\n## Technologies\n${ans.technologies}\n`;
        if(ans.tech1){techStr += `\n* ${ans.tech1}`};
        if(ans.tech2){techStr += `\n* ${ans.tech2}`};
        if(ans.tech3){techStr += `\n* ${ans.tech3}`};
        if(ans.tech4){techStr += `\n* ${ans.tech4}\n`};
        fullStr.push("techStr")
        break;
      case 'Credits':
        credStr = `\n## Credits\nRecognizing contributors and sites that helped in development:\n`;
        if(ans.credit1){credStr += `\n* ${ans.credit1}`};
        if(ans.credit2){credStr += `\n* ${ans.credit2}`};
        if(ans.credit3){credStr += `\n* ${ans.credit3}`};
        if(ans.credit4){credStr += `\n* ${ans.credit4}\n`};
        fullStr.push("credStr")
        break;
      case 'Test':
        testStr = `\n## Test`
        testStr += `\n${ans.testIns}`
        fullStr.push("testStr") 
        break;   
      case 'License':
        licStr = `\n## License`
        licStr += `\n${ans.lType}`
        fullStr.push("licStr") 
        break; 
      }
    })
   fullStr.forEach(element => {
     finalStr += eval(element);
   });

   fs.writeFile('../output/README.md',finalStr,err => {
    if (err) {
      console.error(err)
      return
    }
    console.clear();
    console.log ("Your README.md file can be found at ../output/README.md");
   }) 
  }

//function to ask the questions in the array and then does the readme
function askQ(qArray,toc,sections){
  let ans = [];
  inquirer.prompt(qArray).then((ans) => {
    createReadme(ans,toc,sections);
}).catch(err => {console.log(err)})
}

// call the main function  
main();


