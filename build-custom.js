// this custom file might be used as a node.js script to read all file names for the build
// TODO: fix calculateName capitals

import fs from 'node:fs/promises';
import path from 'node:path';

function serialiseJSON(inputArray, outputPath) {
  // serialise the objects into json

}

function checkMarkdown(inputPath) {
  if(path.extname(inputPath) == ".md") {
    return true
  } else {
    return false
  }
}

async function checkDirectory(inputPath) {
  try {
    const stats = await fs.stat(inputPath);
    return stats.isDirectory();
  } catch (e) {
    console.error(e);
    return false;
  }
}

function calculateName(inputPath) {
  // This funciton calculates a displayable name based on the filename. This is done because the
  // format of files should be manually set to "an-example.md".
  // In the presented case, this function returns "an example" as a string.
  // TODO: Return with capital letters instead.
  let base = path.basename(inputPath, '.md');
  let returnString = "";
  for(const ch of base) {
    switch(ch) {
      case '-':
        returnString += " ";
        break;
      default:
        returnString += ch;
    }
  }
  return returnString;
}

class ItemNode {
  constructor(fullPath, name, subfiles, isDirectory) {
    this.id = ItemNode.staticCounter;
    this.relativePath = ("/" + path.relative(pathToPublic, fullPath));
    this.name = name;
    this.isDirectory = isDirectory;
    this.subfiles = subfiles;
    ItemNode.staticCounter++;
  }
  static staticCounter = 0;
} 

async function recurseGetFilesInDirec(inputPath) {
  // this function should go through all directories and add the ItemNodes to an
  // array that can be serialised into a json file. 

  let objectArray = [];
  try {
    const files = await fs.readdir(inputPath)
    for(const file of files) {
      let fullPath = path.join(inputPath, file);
      let isDirec = await checkDirectory(fullPath);
      let isMarkdown = checkMarkdown(fullPath);
      if (isDirec) {
        objectArray.push(new ItemNode(fullPath, calculateName(fullPath), 
          await recurseGetFilesInDirec(fullPath), isDirec));
      } else if (isMarkdown) {
        objectArray.push(new ItemNode(fullPath, calculateName(fullPath), null, 
          isDirec));
      } else {
        console.log("File type has eluded: " + fullPath);
      }
    }
  } catch (e) {
    console.log(e);
  } 
  return objectArray;
}

// gets the dirname of this .js script file
const __dirname = import.meta.dirname;

const pathToPublic = path.join(__dirname, "public/");

// Build the Blog JSON
let postsArray = await recurseGetFilesInDirec(path.join(__dirname, "public/posts"));

// Build the Projects JSON
let projectsArray = await recurseGetFilesInDirec(path.join(__dirname, "public/projects"));
