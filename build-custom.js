/* TODO:
change necessary fnctions to use async properly
*/

// this custom file might be used as a node.js script to read all file names for the build
import fs from 'node:fs/promises';
import path from 'node:path';

let allFileObject = [];

function serialiseJSON(outputPath, inputArray) {
  // serialise the objects into json

}

function checkMarkdown(inputPath) {
  if(path.extname(inputPath) == ".md") {
    return true
  } else {
    return false
  }
}

function checkDirectory(inputPath) {
  fs.stat(inputPath, (err, stats) => {
    if(err) {
      console.log("Error checking path for directory: " + err);
      return;
    }
    return stats.isDirectory();
  });
}

function calculateName(inputPath) {
  // This funciton calculates a displayable name based on the filename. This is done because the
  // format of files should be manually set to "an-example.md".
  // In the presented case, this function returns "an example" as a string.
  // TODO: Return with capital letters instead.
  let base = path.basename(inputPath);
  let baseArray = base.split();

  let i;
  let ch = '';
  let returnString = "";
  for(i in baseArray) {
    ch = baseArray[i];
    switch(ch) {
      case '.':
        return returnString;
      case '-':
        returnString.concat(" ");
      default:
        returnString.concat(ch);
    }
  }
  return "CalculateName Error!";
}

class ItemNode {
  constructor(fullRelativePath, name, subfiles) {
    this.id = staticCounter;
    this.fullRelativePath = fullRelativePath;
    this.name = name;
    this.isDirectory = checkDirectory(fullRelativePath);
    this.subfiles = subfiles;
    staticCounter++;
  }
  static staticCounter = 0;
} 

async function recursiveSerialiseFilesInDirectory(inputPath) {
  // this function should go through all directories and add the file paths to an
  // array that can be serialised into a json file. 

  let objectArray = [];
  fs.readdir(inputPath, (err, files) => {
    if(err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(file => {
      let fullPath = path.join(inputPath, file);
      if(!checkDirectory(fullPath) && !checkMarkdown(fullPath)) {
        continue;
      } else if(checkDirectory(fullPath)) {     
        objectArray.push(new ItemNode(fullPath, calculateName(fullPath), 
          recursiveSerialiseFilesInDirectory(fullPath)));
      } else if(checkMarkdown(fullPath)) {
        objectArray.push(new ItemNode(fullPath, calculateName(fullPath), null))
      } else {
        console.error("File type has eluded: " + fullPath);
      }
    });
    return objectArray;
  }); 

}

// gets the dirname of this .js script file
const __dirname = import.meta.dirname;

// Build the Blog JSON
recursiveSerialiseFilesInDirectory(path.join(__dirname, "public/posts"));

// Build the Projects JSON
recursiveSerialiseFilesInDirectory(path.join(__dirname, "public/projects"));
