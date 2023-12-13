const employeeButton=document.querySelector('.employeebutton');
const joinButton=document.querySelector('.joinbutton');

const loginButton=document.querySelector('.loginbutton');

const option1=document.querySelector('.option1');
const option2=document.querySelector('.option2');

const optionbased=document.querySelector('#optionbased');

employeeButton.addEventListener('click',()=>{
    window.location.href='/joining/employerRegister';
});
joinButton.addEventListener('click',()=>{
    window.location.href='/joining/employeeRegister';
});
loginButton.addEventListener('click',()=>{
    window.location.href='/joining/employeeLogin';
});

let check=false;
option1.addEventListener('click',()=>{
    optionbased.classList.toggle(check);
    check=!check;
    consoele.log('work');
});