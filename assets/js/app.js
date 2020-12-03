const inquirer = require('inquirer');
const util = require('util');
const dataContent = [];

function askContent(section,data) {
  
 inquirer.prompt(data).then((answers) => {
   dataContent.push(answers.section);
   if (answers.askAgain) {
            askContent(section,data);
          } else {
            console.log('Your section:',dataContent.join(', '));
          } 

        });
      }




async function main (){
 let response = await inquirer.prompt([
    {
      name: 'section',
      type: 'checkbox',
      message: "Please select the sections you want in a README file",
      choices: ["Installation","Usage","Technologies","Credits","License"],
    }
  ]);
  
   
    response.section.unshift("Title");   
    for(let i=0;i < response.section.length;i++){
      let newArray = [];  
      newArray.length = 0;
      let section = response.section[i]  
      let newSection = {type: 'input',name: section, message: 'Please add text for '+ section+' section'}
      let addQuest = {type: 'confirm',name: 'askAgain', message: 'Is there additional text content for ' + section + ' Yes/No',
      default: true};
      newArray.push(newSection);
      newArray.push(addQuest);
      console.log(newArray);
      await askContent(section,newArray);
    };
    }


main();


 