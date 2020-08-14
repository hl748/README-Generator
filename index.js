const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const asynchronousWriteFile = util.promisify(fs.writeFile)
​
prompt = () => {
  return inquirer.prompt(
    [
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
      },
      {
        type: "input",
        name: "description",
        message: "Please enter a description for your project."
      },
      {
        type: "input",
        name: "installation",
        message: "Installation requirements?"
      },
      {
        type: "input",
        name: "usage",
        message: "What is the usage for your project?"
      },
      {
        type: "list",
        name: "license",
        message: "What is the license for your project?",
        choices: ["default", "this", "that"]
      },
      {
        type: "input",
        name: "contributing",
        message: "Please list all contributors."
      },
      {
        type: "input",
        name: "tests",
        message: "What tests are included in your project?"
      },
      {
        type: "input",
        name: "questions",
        message: "Do you have any questions?"
      },
      {
        type: "input",
        name: "github",
        message: "GitHub Username:"
      },
      {
        type: "input",
        name: "email",
        message: "Email:"
      },
      {
        type: "input",
        name: "contact",
        message: "What is the best way to reach you?"
      }
    ]
  )
}
​
markdown = (answers) => {
  return `
  #${answers.title}
​
  ##Table of Contents
  [Description]
  -Installation
  -Usage
  -License
  -Contributing
  -Tests
  -Questions
​
  [Description]${answers.description}
  [Installation]${answers.installation}
  [Usage]${answers.usage}
  [License]${answers.license}
  Contributing]${answers.contributing}
  [Tests]${answers.tests}
  [Questions]${answers.questions} "/n"
  [GitHub](www.github.com/${answers.github})
  ${answers.email}
  ${answers.contact}
  `
}
​
async function initialize () {
  try{
  const answers = await prompt();
  const generate = markdown(answers);
  await asynchronousWriteFile ("README.md", generate)
  }
  catch (err) {
    console.log(err)
  }
}
​
initialize();