// Examples
const myGlobalVariable = "myGlobalVariableValue";

function logInformation(param1) {
  const myGlobalVariable = param1;
  var c;
  console.log("message:", myGlobalVariable);
  console.log(a);
  console.log(b);
  console.log(c);
  const a = "a value";
  let b = "b value";
  c = "c value";
}
// equal to 🔝
//

// logInformation({ myGlobalVariable: undefined });
logInformation({ otherParam: "test" });

console.log(myGlobalVariable);

// create variable myGlobalVariable in scope of the file
// assign value 'myGlobalVariableValue' to the variable "myGlobalVariable"
// create variable logInformation in scope of the file
// assign value function to the variable "logInformation"
// call function logInformation with parameter 'myGlobalVariableValue'
// logInformation('myGlobalVariableValue');
// end Examples

// 1. read file
// 2. parse file content (here the step where variables creates)

// Global(scope of the file)
//      myGlobalVariable
//      logInformation:

// 4. Execution (we are here)
