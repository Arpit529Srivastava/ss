var customers = [];

function renderTable() {
  var output = document.getElementById("output");
  var html = "<table border='1'><tr><th>Name</th><th>Email</th><th>Age</th><th>Height</th><th>Weight</th></tr>";
  for (var i = 0; i < customers.length; i++) {
    html += "<tr><td>" + customers[i].name + "</td><td>" + customers[i].email +
            "</td><td>" + customers[i].age + "</td><td>" + customers[i].height +
            "</td><td>" + customers[i].weight + "</td></tr>";
  }
  html += "</table>";
  output.innerHTML = html;
}

document.getElementById("submitBtn").addEventListener("click", function () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value;
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;

  var customer = {
    name: name,
    email: email,
    age: age,
    height: height,
    weight: weight
  };

  customers.push(customer);
  renderTable();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
});

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
});
