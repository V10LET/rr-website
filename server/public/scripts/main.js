/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

document.querySelector("#nav-toggle").addEventListener('click', displayMenu)

function displayMenu(event) {
    event.stopPropagation()
    document.querySelector(".dropdown-content").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  console.log("onclick")
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var form = document.querySelector('form')
var inputName = form.querySelector('.input-name')
var inputEmail = form.querySelector('.input-email')
var thanks = document.querySelector('.thanks')

form.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopPropagation()

    var name = inputName.value
    var email = inputEmail.value
    console.log(name, email)
    
    axios.post('/mailing-list', {
        name: name,
        email: email,
    }).then(function () {
        console.log('hihihi')
        thanks.classList.add('submitted')
    })
})
