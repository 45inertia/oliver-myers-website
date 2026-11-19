/* TODO:
the algorithm should go like this:
- call the function with the input path for the directory
- goes through every file in the directory and turn it into the object format and add it to an array
- if the file is a directory then go into that directory and do the same
- if the file is a file then move on
- when all files and directories are in the array, serialize it as a json file through stringify
*/

// this custom file might be used as a node.js script to read all file names for the build
import fs from 'node:fs';
import path from 'node:path';

function serialiseJSON(outputPath, inputArray) {

  // outputs the array of file paths with:
  //  - unique id field (counter?)
  //  - full relative path
  //  - name for display on a react button component
  //  - sub files (if the file path is a directory)
}

function recursiveSerialiseFilesInDirectory(inputPath) {
  // this function should go through all directories and add the file paths to an
  // array that can be serialised into a json file. 
  let filesArray = [];
  let counter = 0;
  
  fs.readdir(inputPath, (err, files) => {
    if(err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(file => {
      if(fs.stat(file, (err, stats) => {
        if(err) {
          console.log("Unable to stat " + file + ": " + err);
        } else {
          if(stats.isDirectory()) {

            recursiveSerialiseFilesInDirectory(file);
          }
          // both markdown and directories are pushed to the array
          filesArray.push(file);
        }
      }));
    });
  }); 

}

function buildBlogJSON() {
  let allFiles = [];
  fs.readdir('./public/posts/', (err, files) => {
    if(err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.foreach(file => allFiles.push(file));
  })
}

function buildProjectsJSON() {
  fs.readdir('./public/projects/', (err, files) => {
    if()
  })
}