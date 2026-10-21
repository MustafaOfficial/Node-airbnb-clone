function logical_error() {
  let num = 5;
  if ((num = 10)) {
    console.log("Number is " + num);
  } else {
    console.log("Number is not 10");
  }
}

module.exports = logical_error;
