# Hubot

```
                     _______________
                    /               \
   //\              |   Greetings   |
  ////\    _____    |               |
 //////\  /_____\   \               /
 ======= |[^_/\_]|   /--------------
  |   | _|___@@__|__
  +===+/  ///     \_\
   | |_\ /// HUBOT/\\
   |___/\//      /  \\
         \      /   +---+
          \____/    |   |
           | //|    +===+
            \//      |xx|
 ```           
            

Hubot is a chat bot built on the [Hubot][hubot] framework.
This version is designed to be deployed on [Heroku][heroku]. 

# Documentation

## How to run: 

There are 3 ways to run hubot. Local, on Heroku or using Docker.

### Run Local
Requirements: 

Firstly, make sure you have installed nodejs & npm and dependencies:
    
    % sudo apt-get install nodejs npm
    % apt-get install build-essential libssl-dev git-core libexpat1-dev
  
To run hubot local you will need to clone it first:

    % mkdir hubot && cd hubot
    % git clone https://github.com/AuthEceSoftEng/chatops.git      
    
Install project's depenndencies. Inside hubot directory run: 

    % npm install 

For using Hubot in slack and using all his available integrations, you must set all the needed environment variables. Example of those vatriables can be found in the file env_example
Set the environment variables using `% export` or create a file `.env` in $HOME directory:

    % cd $HOME
    % touch .env
    % pico .env
    Add your environment variables in this form: ENV_VAR_NAME=VALUE
    
To run the bot:
    
    % ./bin/hubot -a adapter slack

You are ready to go

When running local you will not be able to set up any webhooks unless you set a public host url.<br>
One way to do this is by using ngrok tool. 
    
    % ngrok http $PORT
    Hubot by default listens on port 8080

### Run on Heroku 
(Recommended for easy and fast run)<br>

Just press the Deploy Button bellow, add the environment variables and you are ready to go. <br>
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Run using Docker

For using docker, first install docker cli. 

After that, you have to create a docker image using the follow command:  

    % sudo docker build https://github.com/AuthEceSoftEng/chatops --tag <image_repo_name>:<image_tag_name>
    OR 
    % git clone https://github.com/AuthEceSoftEng/chatops.git      
    % sudo docker build . --tag <image_repo_name>:<image_tag_name>

Set the environment variables:

    % touch env
    % pico env
    Add your environment variables in this form: ENV_VAR_NAME=VALUE

Run the image: 
    
    % sudo docker run -it --name <container_name> --env-file env <image_repository_name>:<image_tag_name>

## Environment Variables

You need to set some environment variables to take full advantage of Hubot. 
Here is a list of all the environment variables. A more deep explanation for most of them can be found in the Integraions Set-up section. 
    
    HUBOT_SLACK_TOKEN

    HUBOT_HOST_URL=(e.g. <HUBOT_URL>:<PORT> OR https://<heroku_app_name>.herokuapp.com/)
    MONGODB_URL=(e.g. for mlab addon on heroku: mongodb://XXXX:XXXX@XXXX.mlab.com:<PORT>/XXXX)
    
    ENCRYPTION_ALGORITHM=aes-256-ctr
    ENCRYPTION_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (a 32 char key of your choice)

    JENKINS_URL   

    APIAI_TOKEN

    GITHUB_APP_ID
    GITHUB_WEBHOOK_SECRET
    GITHUB_APP_CLIENT_ID
    GITHUB_APP_CLIENT_SECRET
    GITHUB_PEM OR GITHUB_PEM_DIR

    HUBOT_TRELLO_KEY
    HUBOT_TRELLO_TEAM
    HUBOT_TRELLO_OAUTH
    

## Integrations Set-Up

### Slack
To use hubot, you will need a [hubot slack integration](https://hubotdevteam.slack.com/apps/A0F7XDU93-hubot). 
Follow the link above and click “Add Configuration”. Slack will ask you to designate a username for your bot.

Once the username is provided, Slack will create an account on your team with that username and assign it an API token. It is very important that you keep this API token a secret, so do not check it into your git repository. This statement exists for all integration tokens. You’ll also have the option to customize your bot’s icon, first and last name, what it does, and so forth.
 
Set the slack api token to env variable: HUBOT_SLACK_TOKEN.


### GitHub
To use GitHub integration you must first register a new [GitHub App](https://developer.github.com/apps/building-integrations/setting-up-and-registering-github-apps/registering-github-apps/) in you account or organization

After a GitHub App is registered, you'll need to generate a **private key**. To generate a private key, click on your app's name, then click the Generate private key button. Open the .pem file in any text editor and paste the content in the relevant field in environment variables.

You you also need the **app ID** and **OAuth credentials** and specificly you need **Client ID** and **Client Secret** where you can find them at the bottom of the GitHub App's page.


![Screenshot](readme_files/Screenshot_2.png)

### Trello 
To use trello integration you must provide Trello API Key, OAuth Secret and your Team name. 
You can find them all in [trello's api page](https://trello.com/app-key), as shown in the screenshots bellow.  

### Jenkins 
To use jenkins you must provide your jenkins' url. 
For build notifications you must install [Jenkins Notification Plugin](https://wiki.jenkins.io/display/JENKINS/Notification+Plugin)

After that, configure the Plugin: 
1. Add hubot's endpoint to jenkins jobs: (see Screenshot)
2. Configure it to be JSON, HTTP and either "All events", "Job started" or "Job finalized". "Job completed" will be ignored.
3. To send to a room: http://<hubot-host>:<hubot-port>/hubot/jenkins-notifications?room=<room>
4. To send to a user: http://<hubot-host>:<hubot-port>/hubot/jenkins-notifications?user=<username>
5. Add log lines if you want to

### Dialogflow (ex API.AI)

1. Create a new dialogflow [account](https://console.dialogflow.com/api-client/#/login) 
2. Create a new Agent
3. Download dialogflow.zip file from the repository root 
4. Import data as shown in the screenshot bellow 

5. Set APIAI_TOKEN=(Client access token). For the token, check the screenshot bellow 



# Hubot Framework Fast-Start Documentation

## hubot

hubot is a chat bot built on the [Hubot][hubot] framework. It was
initially generated by [generator-hubot][generator-hubot], and configured to be
deployed on [Heroku][heroku] to get you up and running as quick as possible.

This README is intended to help get you started. Definitely update and improve
to talk about your own instance, how to use and deploy, what functionality is
available, etc.

[heroku]: http://www.heroku.com
[hubot]: http://hubot.github.com
[generator-hubot]: https://github.com/github/generator-hubot

### Running andreasbot Locally

You can test your hubot by running the following, however some plugins will not
behave as expected unless the [environment variables](#configuration) they rely
upon have been set.

You can start andreasbot locally by running:

    % bin/hubot

You'll see some start up output and a prompt:

    [Sat Feb 28 2015 12:38:27 GMT+0000 (GMT)] INFO Using default redis on localhost:6379
    andreasbot>

Then you can interact with andreasbot by typing `andreasbot help`.

    andreasbot> andreasbot help
    andreasbot animate me <query> - The same thing as `image me`, except adds [snip]
    andreasbot help - Displays all of the help commands that andreasbot knows about.
    ...

### Configuration

A few scripts (including some installed by default) require environment
variables to be set as a simple form of configuration.

Each script should have a commented header which contains a "Configuration"
section that explains which values it requires to be placed in which variable.
When you have lots of scripts installed this process can be quite labour
intensive. The following shell command can be used as a stop gap until an
easier way to do this has been implemented.

    grep -o 'hubot-[a-z0-9_-]\+' external-scripts.json | \
      xargs -n1 -I {} sh -c 'sed -n "/^# Configuration/,/^#$/ s/^/{} /p" \
          $(find node_modules/{}/ -name "*.coffee")' | \
        awk -F '#' '{ printf "%-25s %s\n", $1, $2 }'

How to set environment variables will be specific to your operating system.
Rather than recreate the various methods and best practices in achieving this,
it's suggested that you search for a dedicated guide focused on your OS.

### Scripting

An example script is included at `scripts/example.coffee`, so check it out to
get started, along with the [Scripting Guide][scripting-docs].

For many common tasks, there's a good chance someone has already one to do just
the thing.

[scripting-docs]: https://github.com/github/hubot/blob/master/docs/scripting.md

### external-scripts

There will inevitably be functionality that everyone will want. Instead of
writing it yourself, you can use existing plugins.

Hubot is able to load plugins from third-party `npm` packages. This is the
recommended way to add functionality to your hubot. You can get a list of
available hubot plugins on [npmjs.com][npmjs] or by using `npm search`:

    % npm search hubot-scripts panda
    NAME             DESCRIPTION                        AUTHOR DATE       VERSION KEYWORDS
    hubot-pandapanda a hubot script for panda responses =missu 2014-11-30 0.9.2   hubot hubot-scripts panda
    ...


To use a package, check the package's documentation, but in general it is:

1. Use `npm install --save` to add the package to `package.json` and install it
2. Add the package name to `external-scripts.json` as a double quoted string

You can review `external-scripts.json` to see what is included by default.

##### Advanced Usage

It is also possible to define `external-scripts.json` as an object to
explicitly specify which scripts from a package should be included. The example
below, for example, will only activate two of the six available scripts inside
the `hubot-fun` plugin, but all four of those in `hubot-auto-deploy`.

```json
{
  "hubot-fun": [
    "crazy",
    "thanks"
  ],
  "hubot-auto-deploy": "*"
}
```

**Be aware that not all plugins support this usage and will typically fallback
to including all scripts.**

[npmjs]: https://www.npmjs.com

### hubot-scripts

Before hubot plugin packages were adopted, most plugins were held in the
[hubot-scripts][hubot-scripts] package. Some of these plugins have yet to be
migrated to their own packages. They can still be used but the setup is a bit
different.

To enable scripts from the hubot-scripts package, add the script name with
extension as a double quoted string to the `hubot-scripts.json` file in this
repo.

[hubot-scripts]: https://github.com/github/hubot-scripts

##  Persistence

If you are going to use the `hubot-redis-brain` package (strongly suggested),
you will need to add the Redis to Go addon on Heroku which requires a verified
account or you can create an account at [Redis to Go][redistogo] and manually
set the `REDISTOGO_URL` variable.

    % heroku config:add REDISTOGO_URL="..."

If you don't need any persistence feel free to remove the `hubot-redis-brain`
from `external-scripts.json` and you don't need to worry about redis at all.

[redistogo]: https://redistogo.com/

## Adapters

Adapters are the interface to the service you want your hubot to run on, such
as Campfire or IRC. There are a number of third party adapters that the
community have contributed. Check [Hubot Adapters][hubot-adapters] for the
available ones.

If you would like to run a non-Campfire or shell adapter you will need to add
the adapter package as a dependency to the `package.json` file in the
`dependencies` section.

Once you've added the dependency with `npm install --save` to install it you
can then run hubot with the adapter.

    % bin/hubot -a <adapter>

Where `<adapter>` is the name of your adapter without the `hubot-` prefix.

[hubot-adapters]: https://github.com/github/hubot/blob/master/docs/adapters.md

## Deployment

    % heroku create --stack cedar
    % git push heroku master

If your Heroku account has been verified you can run the following to enable
and add the Redis to Go addon to your app.

    % heroku addons:add redistogo:nano

If you run into any problems, checkout Heroku's [docs][heroku-node-docs].

You'll need to edit the `Procfile` to set the name of your hubot.

More detailed documentation can be found on the [deploying hubot onto
Heroku][deploy-heroku] wiki page.

### Deploying to UNIX or Windows

If you would like to deploy to either a UNIX operating system or Windows.
Please check out the [deploying hubot onto UNIX][deploy-unix] and [deploying
hubot onto Windows][deploy-windows] wiki pages.

[heroku-node-docs]: http://devcenter.heroku.com/articles/node-js
[deploy-heroku]: https://github.com/github/hubot/blob/master/docs/deploying/heroku.md
[deploy-unix]: https://github.com/github/hubot/blob/master/docs/deploying/unix.md
[deploy-windows]: https://github.com/github/hubot/blob/master/docs/deploying/windows.md

## Campfire Variables

If you are using the Campfire adapter you will need to set some environment
variables. If not, refer to your adapter documentation for how to configure it,
links to the adapters can be found on [Hubot Adapters][hubot-adapters].

Create a separate Campfire user for your bot and get their token from the web
UI.

    % heroku config:add HUBOT_CAMPFIRE_TOKEN="..."

Get the numeric IDs of the rooms you want the bot to join, comma delimited. If
you want the bot to connect to `https://mysubdomain.campfirenow.com/room/42`
and `https://mysubdomain.campfirenow.com/room/1024` then you'd add it like
this:

    % heroku config:add HUBOT_CAMPFIRE_ROOMS="42,1024"

Add the subdomain hubot should connect to. If you web URL looks like
`http://mysubdomain.campfirenow.com` then you'd add it like this:

    % heroku config:add HUBOT_CAMPFIRE_ACCOUNT="mysubdomain"

[hubot-adapters]: https://github.com/github/hubot/blob/master/docs/adapters.md

## Restart the bot

You may want to get comfortable with `heroku logs` and `heroku restart` if
you're having issues.
