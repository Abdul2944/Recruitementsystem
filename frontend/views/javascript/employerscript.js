
const option1=document.querySelector('.option1');
const option2=document.querySelector('.option2');

const optionbased=document.querySelector('#optionbased');

const line=document.querySelector('.line');

const form=document.querySelector('.registerform');

const signupButton=document.querySelector('.signup');


signupButton.addEventListener('click',()=>{
    form.submit();
});

option2.addEventListener('click',()=>{
    let temp=option1.innerHTML;
    
    option1.innerHTML=option2.innerHTML;
    option2.innerHTML=temp;
    document.getElementById('optioncheck').value=option1.innerText;
    console.log(document.getElementById('optioncheck').value);
});

let check=false;
optionbased.addEventListener('click',()=>{
    if(!check)
    {
        optionbased.classList.remove('on');
        optionbased.classList.add('off');
        option2.style.display="none";
    
        line.style.display="none";
    }
    else
    {
        optionbased.classList.remove('off');
        optionbased.classList.add('on');
        option2.style.display="block";
        line.style.display="block";
    }
    check=!check;
});
