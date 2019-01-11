"use strict";

// Block Scoping with let and const
let nbr = 42;
{
	let bbr = 1000;
}

console.log(nbr);

function tryExecute(myOp) {
	try{
		myOp();
	}catch(e){
		console.log("Error: %s", e.message);
	}
}

tryExecute( () => {
	const value = 42;
	console.log(value);
	value = 9999;
});

tryExecute( () => {
	console.log(nbr1);
	let nbr1 = 45;
});

tryExecute( () => {
	let data = true;
	{
		console.log(data);
		let data;
	}
	console.log("data = " + data);
	if(true){
		console.log(typeof anUndeclared);
		console.log(typeof random);
		let random;
	}
});

tryExecute( () => {
	const obj = {};
	obj.key = 42;
	console.log(obj.key);

	obj = {};
});

tryExecute( () => {
	let arr = [];
	for(let i=0; i<3; i++ ){
		arr.push( () => i );
	}

	let val = arr[2]();
	console.log("arr[0]() = %s", val);
});

tryExecute( () => {
	let getNumber = () => 42;

	console.log("typeof getNumber = %s", typeof(getNumber));
	console.log("getNumber() = %s", getNumber());

	let getPrice = (quantity, tax) => {
		let price = (quantity * 5);
		price = price * (1 + tax);
		return price;
	}

	console.log("getPrice(3, .03) = %s", getPrice(3, .03));

	let getNumber2 = (d) => ({ data: "check", number: d });
	console.log("getNumber2(2) = %s", getNumber2(2).number);
});

tryExecute( () => {
	let fn = ((number)=> {
		return {
			getNumber: function() { return number; }
		}
	})(42);

	console.log("fn.getNumber() = %s", fn.getNumber());
});

tryExecute( () => {
	function getContext(){
		console.log(this);
	}

	getContext();
});

tryExecute( () => {
	let myObj = {
		name: 'fancy',
		operation: function(){
			console.log(this);
		}
	}

	myObj.operation();

	let x = myObj.operation;
	x();
	x.call(myObj);
});

tryExecute( () => {
	function Employee(firstName, department, salary){
		this.firstName = firstName;
		this.department = department;
		this.salary = salary;
		this.getInfo = function() {
		// outer function context = Employee object
			return () => {
			// inner function context = Global object
				console.log(this.firstName + " from " +
				this.department + " earns " + this.salary);
			};
		}

		this.getContext = () =>{
			console.log(this);
		}
	}

	let jim = new Employee('Jim', 'Finance', 5200);
	jim.getInfo()();
	jim.getContext();
});

tryExecute( () => {
	let details = {
		number: 39,
		operation: function(){
			return () => console.log('number = %s', this.number);
		}
	};

	let detail2 = {
		number: 40
	};

	details.operation().bind(detail2)();

	let product = (x, y) => x * y;
	console.log('product.call(null, 2, 3) = %s', product.call(null, 2, 3));
	console.log('product.apply(null, 2, 3) = %s', product.apply(null, [2, 3]));

	let multiply = product.bind(null, 2, 3);
	console.log('multiply() = %s', multiply());
});

tryExecute( () => {
	let getSum2 = (a = 1, b = 38) => {
		console.log(a + b);
	}

	getSum2();
	getSum2(1, 2);
	getSum2(10);
	getSum2(null, 6);

	var getName = function(firstName, lastName = "Doe"){
		console.log("length = %s", arguments.length);
		console.log("%s %s", firstName, lastName);
	}

	getName("John");

	let getNumber = new Function("number = 42", "return number;");
	console.log("getNumber = %s", getNumber());
});

tryExecute( () => {
	let showCollections = function(id, ...collection){
		console.log("collection instanceof Array = %s", collection instanceof Array);
		console.log("collection = [%s]", collection);

		let getFirst = new Function("...args", "return args[0]");
		console.log("getFirst = %s", getFirst(1, 2));

		let values = [200, 300, 400];
		let newSet = [100, ...values, 500];
		console.log("newSet = [ %s ]", newSet);
	}

	showCollections(42, "movies", "music");
});

tryExecute( () => {
	const price = 4.2, quantity = 20;
	const prefix = 'dynamicRandom';
	let invoinceData = {
		[prefix + '-01']: 0,
		price,
		quantity,
		calculateTotal(){
			return this.price * this.quantity;
		}
	};
	console.log(invoinceData);
	console.log(`calculateTotal = ${invoinceData.calculateTotal()}`);
});

tryExecute( () => {
	let names = ['matt', 'smith', 'jack'];
	for(let name of names){
		console.log(`name = ${name}`);
	}
});