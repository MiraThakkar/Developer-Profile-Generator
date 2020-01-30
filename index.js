const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//function to prompt user to enter github username and favorite color

function promptUser (){

return inquirer
  .prompt([
    {
        message: "Enter your GitHub username",
        name: "username"
    },

    {
        message: "Enter your favorite color",
        name: "color"
    }
  ]);

} 

async function getUser (answers){
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    const response = await axios.get(queryUrl);
    return  response.data;

}
  


function generateHTML(userinfo, answers) {
  console.log(userinfo);

 
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        
        <title>Profile Generator</title>
    </head>
    
    
    
     <div class = "row">

    
    
            <div class= col-md-12 style= "background-color: ${answers.color}; color: white;">  
                <h1 class="display-4 text-center">${userinfo.login}</h1>
                <h1 class="lead text-center">${userinfo.bio}!</h1>
                <hr class="my-4">
            </div>
    
    
    </div>
        <!-- Jumbotron which contains Developer name and location -->
    
        <div class="container-fluid mt-5">
            <div class="row">
                <div class="col-12">
                <div class="card card-inverse" style= "border-color: white">
                    <div class="card-block">
                        <div class="row">
                        <div class="col-md-6 col-sm-6 text-center">
                                <img src= ${userinfo.avatar_url} alt="" class="btn-md" style = "border-radius: 50%">
                                <h3 class="card-title">Name: ${userinfo.name}</h3>
                                <p class="card-text"><strong>Location: </strong>${userinfo.location}</p>
                                <p class="card-text"><strong>Profile: </strong> Full Stack Developer </p>
                                <p class="card-text"><strong>Skills: </strong> Web Development, Business Analysis </p>
                               <a href = ${userinfo.html_url} ><i class="fa fa-github" aria-hidden="false"><span> Github</span></i></a>
                               <a href = ${userinfo.html_url} ><i class="fa fa-github" aria-hidden="false"><span> Github</span></i></a>
                                
                        </div>         
                        <div class="col-md-6 col-sm-6 text-center">
                            <p class="text-center">Hi! My name is Mira and I love to build</p>
                            <br>
                            <br>
                            <div class = "row">
                                <div class= "col-md-6"> 
                                    <div class="card card-inverse card-info mb-3 text-center" style="background-color: ${answers.color}; color:  white;">
                                        <div class="card-block">
                                            <h2 id = "git-repo"><strong> ${userinfo.public_repos} </strong></h2>                    
                                            <p><small>Public Repository</small></p>
                                            <!-- <button class="btn btn-primary btn-block btn-md"><span class="fa fa-facebook-square"></span> Like  </button> -->
                                        </div>
                                    </div>
                                    <div class="card card-inverse card-warning mb-3 text-center" style="background-color: ${answers.color}; color:  white;">
                                        <div class="card-block">
                                            <h2 id = "git-follow"><strong>${userinfo.following}</strong></h2>                    
                                            <p><small>Following</small></p>
                                            <!-- <button class="btn btn-success btn-block btn-md"><span class="fa fa-twitter-square"></span> Tweet </button> -->
                                        </div>
                                    </div>
                                </div>
    
                                <div class = "col-md-6"> 
                                    <div class="card card-inverse card-info mb-3 text-center" style="background-color: ${answers.color}; color:  white;">
                                        <div class="card-block">
                                            <h2 id = "git-stars"><strong> 10 </strong></h2>                    
                                            <p><small>Github Stars</small></p>
                                            <!-- <button class="btn btn-primary btn-block btn-md"><span class="fa fa-facebook-square"></span> Like  </button> -->
                                        </div>
                                    </div>
                                    <div class="card card-inverse card-warning mb-3 text-center"style="background-color: ${answers.color}; color:  white;">
                                        <div class="card-block">
                                            <h2 id = "git-follower"><strong>${userinfo.followers}</strong></h2>                    
                                            <p><small>Followers</small></p>
                                            <!-- <button class="btn btn-success btn-block btn-md"><span class="fa fa-twitter-square"></span> Tweet </button> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
              </div>
            </div> 
          </div>
       
    
    
    <body>
        
    </body>
    </html>`;
  }
  
  async function init() {
    // console.log("hi")
    try {
        const answers = await promptUser();
        const userinfo =  await getUser(answers);
      
        // console.log(userinfo.public_repos);
        const html =  await generateHTML(userinfo, answers);
        // console.log(html);

        
  
        await writeFileAsync("myindex.html", html);
  
      console.log("Successfully wrote to myindex.html");
    } catch(err) {
      console.log(err);
    }
  }

  init();
  