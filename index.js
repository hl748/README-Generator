const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const asynchronousWriteFile = util.promisify(fs.writeFile)
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
        choices: ["MIT", "Apache"],
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
      },
    ]
  )
}
markdown = (answers) => {
  if (answers.license === "MIT") {
    answers.badge = `![MIT](https://img.shields.io/badge/license-MIT-brightgreen)`
  }
  if (answers.license === "Apache") {
    answers.badge = `![Apache](https://img.shields.io/badge/license-Apache-brightgreen)`
  }
  return `#${answers.title}
  ${answers.badge}
​
  ## Table of Contents
  [Description](#description)
  [Installation](#installation)
  [Usage](#usage)
  [License](#license)
  [Contributing](#contributing)
  [Tests](#tests)
  [Questions](#questions)
​
  ## Description
  ${answers.description}
  ## Installation
  ${answers.installation}
  ## Usage
  ${answers.usage}
  ## License
  The license for your website is ${answers.license}
  ## Contributing
  ${answers.contributing}
  ## Tests
  ${answers.tests}
  ## Questions
  ${answers.questions}
  GitHub: (www.github.com/${answers.github})  
  Email: ${answers.email}  
  Answers: ${answers.contact}
  `
}
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
initialize();