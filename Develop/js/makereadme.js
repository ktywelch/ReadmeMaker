/* Application will ask for seclection of components you want to add
   The tilte is a required section so it is not in the pick list */
const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
let toc = false;
const dataContent = [];
let  questArray =[];
let sections = [];


const TitleQ = [{type: 'input',name: 'titleName', message: 'Please Enter the Application name:\n', 
default: 'My Project'},
{type: 'input',name: 'description', message: 'Please Enter the Application Description:\n'},
{type: 'input',name: 'titleUrl', message: 'Please Enter the Application url:\n'},
{type: 'input',name: 'repoName', message: 'Please Enter the Repository name(eg. github):\n', default: 'github.com'},
{type: 'input',name: 'repoUrl', message: 'Please Enter the Repository url:\n'},
{type: 'input',name: 'titleImg', message: 'If you have an image for the title please add relative path or URL:\n',default: '../images/'}];

const InstallationQ = [{type: 'input',name: 'installation', message: 'Enter a description of the installation process, followed by up to four detailed instrcutions:\n', 
default: 'The installation pocess is a download of git source, using npm install to install required modules based on the package.json file included in the same directory as the application.'},
{type: 'input',name: 'install1', message: 'Installation Instruction: '},
{type: 'input',name: 'install2', message: 'Installation Instruction: '},
{type: 'input',name: 'install3', message: 'Installation Instruction: '},
{type: 'input',name: 'install4', message: 'Installation Instruction: '},
{type: 'input',name: 'installImg', message: 'If you have an image/gif that covers install please add relative path or URL:\n', default: '../images/'}];

const UsageQ = [{type: 'input',name: 'use', message: 'Please Enter a description of how the user would use this program, followed by up to four detailed instrcutions:\n'},
{type: 'input',name: 'use1', message: 'User instruction:'},
{type: 'input',name: 'use2', message: 'User instruction: '},
{type: 'input',name: 'use3', message: 'User instruction: '},
{type: 'input',name: 'use4', message: 'User instruction: '},
{type: 'input',name: 'useImg', message: 'If you have an image/gif that shows the use of app using relative path: ', default: '../images/'}];

const TechnologiesQ = [{type: 'input',name: 'technologies', message: 'Please Enter a description of development technologies used,followed by up to four mentions:\n'}, 
{type: 'input',name: 'tech1', message: 'Special tech mention: '},
{type: 'input',name: 'tech2', message: 'Special tech mention: '},
{type: 'input',name: 'tech3', message: 'Special tech mention: '},
{type: 'input',name: 'tech4', message: 'Special tech mention: '}];

const ContributionsQ = [{type: 'input',name: 'credit', message: 'Please enter contributors you would like to acknowledge (max 4) \nContributor/Contribution:'},
{type: 'input',name: 'credit2', message: 'Contributor/Contribution: '},
{type: 'input',name: 'credit3', message: 'Contributor/Contribution: '},
{type: 'input',name: 'credit4', message: 'Contributor/Contribution: '}];

const TestQ = [{type: 'input',name: 'testIns', message: 'Provide instructions to run validation test'}];

const LicenseQ = [{type: 'input',name: 'lType', message: 'Please add License type: ',default: 'MIT'}];
// End of variable declaration //

async function main (){
  //start with a clear screen
  console.clear()
  //start the selection inquirer
  inquirer.prompt([
    {
      name: 'section',
      type: 'checkbox',
      message: "\nPlease select the sections you want in a README file (Title section is mandatory so not an option):\n",  
      choices: ["Table of Contents","Installation","Usage","Technologies","Contributions","Test","License"],
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
  let tocStr=titleStr=insStr=useStr=techStr=credStr=licStr=finalStr=testStr = ''; 
  let fullStr =["titleStr"] 

  
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
      case 'Usage':
        useStr = `\n\n## Useage\n${ans.use}\n`;
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
      case 'Contributions':
        credStr = `\n## Contributions\nRecognizing contributors and sites that helped in development:\n`;
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
   //used array because only wanted to string together the  sections that were selected
   fullStr.forEach(element => {
    finalStr += eval(element);
   });
  

   fs.writeFile('../output/README.md',finalStr,err => {
    if (err) {
      console.error(err)
      return
    }
    console.clear();
    console.log ("The generated README.md file can be found at ../output/README.md\nPlease open with any standard text editor to make changes.");
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


