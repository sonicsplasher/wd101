const email = document.getElementById ('email' ) ;
email.addEventListener( 'input' , () => validate(email) ) ;
function validate(element) {

if(element.validity.typeMismatch) {
element.setCustomValidity("The Email is not in the right format!!!") ;
element.reportValidity() ;
} else{
element.setCustomValidity('');
} }

const dob = document.getElementById ('dob') ;
dob.addEventListener( 'input' , () => validatedob(dob) ) ;
function validatedob(element) {
if(element.validity.rangeUnderflow || element.validity.rangeOverflow) {
element.setCustomValidity("Age<18 or age>51") ;
element.reportValidity() ;
} else{
element.setCustomValidity('');
} }




let userForm = document.getElementById("user-form") ;

const retrieveEntries = () => {
let entries = localStorage.getItem("user-entries");
if (entries) {
entries = JSON.parse(entries)
}else {
entries = [];
}
return entries;
}

let userEntries = retrieveEntries();

const saveUserForm = (event) => {
event.preventDefault();
const name = document .getElementById ("name" ).value;
const email = document.getElementById ("email").value;
const password = document.getElementById("password").value;
const dob = document.getElementById( "dob" ).value;
const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

const entry = {
name,
email,
password,
dob,
acceptedTermsAndconditions
};
userEntries.push(entry) ;
localStorage.setItem("user-entries", JSON.stringify(userEntries));
displayEntries();
}



const displayEntries = () =>{
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td >${entry.name}</td>`;
        const emailCell =`<td>${entry.email}</td>`;
        const passwordCell  =`<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.acceptedTermsAndconditions}</td>`
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
    return row;}).join(`\n`);
    const table = `<table ><tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>accepted terms?</th></tr>${tableEntries} </table>`;
    let details = document.getElementById('user-entries');
    details.innerHTML = table;
    }
userForm.addEventListener("submit", saveUserForm) ;
displayEntries();
