
# PicFlix

PicFlix takes movie and tv show data from The Movie Database (https://www.themoviedb.org/) and allows you to save and suggest things to watch with your friends. 

## Description

### Why I Made It

So many times when hanging out with friends, there were so many options of things to watch that we spent hours scrolling and always just ended up watching The Office because no one could make a decision. PicFlix helps this in several ways:

### Features

1. Generates the most popular movies/shows by selectable genre and allows you to save any to your personal collection. You can also search for something specific in the search bar. 

2. In your collection, you can view details and comments other users have made on your selections. From here, you can also click an icon to suggest that item as something everyone should watch together. 

3. In the Group page you can view all the content your friends have saved and interact through comments. 


## How To Get Started

### Installation

1. Clone this repository
2. cd into the directory it creates
3. In the api directory, create a copy of the database.json.example and remove the .example extension.
4. Run json-server -p 8088 -w database.json from the api directory.
5. Run npm install and wait for all dependencies to be installed.
6. Run npm start to verify that installation was successful.