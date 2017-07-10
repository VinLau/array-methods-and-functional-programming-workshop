function forEach(callback, theArray) {
  // the forEach implementation checks if each element at that index exists (ie not undefined) ;) 
  for (var i = 0; i < theArray.length; i++) {
    callback(theArray[i]);
  }

}

function map(mappingFunction, theArray) {
  var RA = [];

  forEach(function(singleElement) {
    RA.push(mappingFunction(singleElement));
    // the loop will execute but will call the mappingFunction through each iter, mappingfunction in this case is multiplyByTwo(x)
  }, theArray); // we are passing the "same" 'theArray' (let's say of size 6) to the forEach function above

  return RA;
}

// Call stack => map => forEach => anonymousFunction ('mappingFunction') => multiplyByTwo 

// function multiplyByTwo(x) {
//   return x * 2;
// }

// var values = [1, 10, 15, 16];
// var doubleValues = map(multiplyByTwo, values); // [2,20,30,32]

// console.log(doubleValues);

function filter(predicate, theArray) {
  var RA = [];

  forEach(function(singleElement) {
    if (predicate(singleElement)) {
      RA.push(singleElement);
    }
  }, theArray);

  return RA;
}

// function isEven(x) {
//   return x % 2 === 0;
// }

// var values = [1, 10, 15, 16];
// var evenValues = filter(isEven, values); // [10,16]
// console.log(evenValues);

function every(predicate, theArray) {

  var flag = true;

  for (var i = 0; i < theArray.length; i++) {
    if (predicate(theArray[i]) === false) {
      flag = false;
      break;
    }
  }
  return flag;
}

function some(predicate, theArray) {
  var flag = false;
  for (var i = 0; i < theArray.length; i++) {
    if (predicate(theArray[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function indexOf(item, theArray) {
  var flag = -1;
  for (var i = 0; i < theArray.length; i++) {
    if (theArray[i] === item) {
      return i;
    }
  }
  return flag;
}

function findIndex(predicate, theArray) {
  var flag = -1;

  for (var i = 0; i < theArray.length; i++) {
    if (predicate(theArray[i]) === true) {
      return i;
    }
  }

  return flag;
}

// primitives are compared by value whereas objects are compared by their reference (mem address)
// hence === will work for two objects if both variable names point to the same object instance
// but it will not work if we are comparing a primitive such as 'dog' to an object itself

// var pets = [{
//   id: 33,
//   name: 'popcorn',
//   species: 'dog'
// }, {
//   id: 46,
//   name: 'purrito',
//   species: 'cat'
// }, {
//   id: 47,
//   name: 'bob',
//   species: 'fish'
// }, {
//   id: 49,
//   name: 'nacho',
//   species: 'dog'
// }];

// function isDog(item) {
//   return item.species === 'dog';
// }

// var firstDogIndex = findIndex(isDog, pets);
// console.log(firstDogIndex); // returns 0

function first(n, theArray) {
  var RA = [];

  if (n > 0 && n < theArray.length) {
    for (var i = 0; i < n; i++) {
      RA.push(theArray[i]);
    }
  }
  else if (n > 0 && n >= theArray.length) {
    RA = theArray;
  }
  else if (n < 0) {
    RA = []; //not really necessary
  }
  else if (Array.isArray(n)) {
    RA = n[0];
  }

  return RA;
}

function last(n, theArray) {
  var RA = [];

  if (theArray === undefined) {
    RA = n.pop(); // n is the array as the first param is ignored
  }
  else if (n > 0 && n >= theArray.length) {
    RA = theArray;
  }
  else if (n < 0) {
    RA = [];
  }
  else if (n < theArray.length) {
    for (var i = 0; i < n; i++) {
      RA.push(theArray[theArray.length - 1 - i]);
      RA.reverse();
    }
    //Alternatively we could do this, but would need an extra conditional:
    // for (var i = n; i < theArray.length; i++) {
    //   RA.push(theArray[i]);
    // }
  }

  return RA;
}

function pluck(property, arrayOfObjects) {
  var RA = [];

  for (var i = 0; i < arrayOfObjects.length; i++) {
    var objectInstance = arrayOfObjects[i];
    RA.push(objectInstance[property]); // could also do this for brevity RA.push(arrayOfObjects[i][property])
    //recall dot and bracket notation for object fields! Doesn't work with dot notation
    // https://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets 
    // Basically bracket notation is advantageous as it allows you to access variable property values within the brackets and
    // allow you to manipulate them with concatenate and other operators! Also easier to read! So go with brackets!
  }

  return RA;
}

// var pets = [{
//   id: 33,
//   owner: 'nyancat',
//   name: 'popcorn',
//   species: 'dog'
// }, {
//   id: 46,
//   name: 'purrito',
//   species: 'cat'
// }, {
//   id: 47,
//   name: 'bob',
//   species: 'fish'
// }, {
//   id: 49,
//   owner: 'nyancat',
//   name: 'nacho',
//   species: 'dog'
// }];

// pluck('id', pets); // [33,46,47,49]
// pluck('name', pets); // ['popcorn','purrito','bob','nacho']
// pluck('owner', pets); // ['nyancat', undefined, undefined, 'nyancat']

function flatten(theArray) {
  var RA = [];
  //we are using a base return array (RA) and iterating through every element.
  //when it encounters a non-array we simply pushit onto the array (base case)
  //more tricky is that we can also use the flatten function recursively with concat()
  //concat merges two or more arrays so we can merge a bunch of nested arrays into one 
  //array (RA) by adding those nested arrays to the end of RA. Of course those nested arrays 
  //can also have more nested arrays so we perfrom flatten recursively within concat
  for (var i = 0; i < theArray.length; i++) {
    if (Array.isArray(theArray[i])) {
      console.log("got an array, going to flatten this thing!");
      RA = RA.concat(flatten(theArray[i]));
    }
    else {
      RA.push(theArray[i]);
    }
  }
  return RA;
}

// flatten([1, 2, 3]); // [1,2,3] no change
// console.log("finished 1st array");
// flatten([
//   [1],
//   [2, 3], 4, 5
// ]); // [1,2,3,4,5];
// console.log("finished 2nd array");
// flatten([
//   [
//     ['hello'], 'world'
//   ]
// ]); // ['hello','world'];
// console.log("finished 3rd array");

function negate1(predicate) {
  var returnFun;

  returnFun = function(param) {
    return (!predicate(param));
  }

  return returnFun;
}

// function isEven(num) {
//   return num % 2 === 0;
// }

// var isOdd = negate1(isEven); // function that returns the opposite of isEven for the same input

// console.log(isEven(3)); // false
// console.log(isOdd(3)); // true

function negate2(predicate) {
  var returnFun;
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
  //Basically if you want to dynamically play with variable # of arguments in JS functions you can use the
  //'arguments' is an object but behaves like an array but does not have any fields nor methods except length
  //BUT it can be converted to a real array with Array.from(arguments)
  //HINT: use arguments.length to determine # of args and function.length to determine # of params in function signature

  //Also recall that functions are objects and first-class citizens. Functions are objects => have methods
  //Such as call() and apply)() which are similar. For example, foo.call(this, 2, 3);
  //call() method calls a function with a given 'this' (or another object) and arguments provided sequentially (as many as allows)
  //apply() invokes a function with a given 'this' (or another object) and 'arguments' object (above) as an array or an array [1,2,3]
  //can use call() and apply() to temporarily allow us to use methods on an object that are NOT methods of it by 'combining' the method
  //bind() 'binds' the method to the object instance i.e. var bound = fooFun.bind(objectOne); DOES NOT execute function like call & apply
  //Notice that we pass the object instance (with no other params) to bind. Can call it via bound(1, 2); 

  returnFun = function() {
    // console.log(arguments.length);
    return (!predicate.apply(this, arguments));
  };

  return returnFun;
}

function firstDividesSecond(first, second) {
  return second % first === 0;
}

var firstDoesNotDivideSecond = negate2(firstDividesSecond);

// console.log(firstDoesNotDivideSecond(2, 5));
// console.log(firstDividesSecond(2, 3));

function compose1(fun1, fun2) {
  return function(arg1) {
    var returnThis = fun2(arg1);
    var returnThisFinal = fun1(returnThis);
    return returnThisFinal;
  }
}


function scream(str) {
  return str.toUpperCase();
}

function shout(str) {
  return str + '!!!';
}

var screamAndShout = compose1(shout, scream);

console.log(screamAndShout('Hello World')); // HELLO WORLD!!!

function compose2(arrOfFuncs) { //could also do this recursively, python tutor useful for visualziing this, go from line 319 (HERE) to line 347

  return function(argument) {
    for (var i = (arrOfFuncs.length - 1); i >= 0; i--) { //i.e. iterate of the length of the array, array size 3, loop 3 times
      console.log("array index " + i);
      argument = arrOfFuncs[i].call(this, argument); //i.e. we are using call (which will call the function that exists in the current array element from the last element)
      // iteratively and applying an argument (which will change each iteration[i.e. each function call]). NB: also note that the 'this' refers to the context current array element which is a function
    }
    return argument;
  }
}

// Takes a string, returns a string
function toLowerCase(str) {
  return str.toLowerCase();
}
// Takes a string, returns an array
function splitByWord(str) {
  return str.split(' ');
}
// Takes an array, returns a string
function joinWithDashes(arrOfWords) {
  return arrOfWords.join('-');
}

// Takes a string, returns a string by doing toLowerCase -> splitByWord -> joinWithDashes
var createSlug = compose2([joinWithDashes, splitByWord, toLowerCase]);

console.log(createSlug.call(this, 'The Quick Brown Fox')); // the-quick-brown-fox // also testing call() to show it is a method of the function prototype //PYTHON TUTOR END HERE
// console.log(createSlug.toString());

/***** DO NOT EDIT AFTER THIS LINE *****/
module.exports = {
  forEach: forEach,
  map: map,
  filter: filter,
  every: every,
  some: some,
  indexOf: indexOf,
  findIndex: findIndex,
  first: first,
  last: last,
  pluck: pluck,
  flatten: flatten,
  negate1: negate1,
  negate2: negate2,
  compose1: compose1,
  compose2: compose2
};
