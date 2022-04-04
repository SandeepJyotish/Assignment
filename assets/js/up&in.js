

        const form=document.getElementById('sign_up');
        const username=document.getElementById('username');
        const email=document.getElementById('email');
        const phone=document.getElementById('phone');
        const password=document.getElementById('password');
        const reenter=document.getElementById('reenter');
        //add event
        form.addEventListener.submit(function(event){
            event.preventDefault();
            validate();
        })
        const sendData=(sRate,count)=>{
            if(sRate===count){
                alert("Registration successfull.")
            }
        }

//for final data validation
        const successMsg=()=>{
            let formCon= document.getElementsByClassName("form-control");
            var count=formCon.length-1;
            for(var i=0;i<=count;i++){
                if(formCon[i].className==="form-control success"){
                    var sRate=0+i;
                    console.log(sRate);
                    sendData(sRate,count);

                }
                else{
                    return false
                }
            }
        }

 //more email validate       
        const isEmail=(emailVal)=>{
            var atSymbol=emailVal.indexOf("@");
            if(atSymbol<1) return false;
            var dot=emailVal.lastIndexOf('.');
            if(dot<=atSymbol+3) return false;
            if(dot===emailVal.length-1) return false;
            return true;           
        }
//Define the validate function
        const validate=()=>{
        const usernameVal=username.value.trim();
        const emailVal=email.value.trim();
        const phoneVal=phone.value.trim();
        const passwordVal=password.value.trim();
        const reenterVal=reenter.value.trim();
// validate Username
        if(usernameVal===""){
            setErrorMsg(username,"username can not be blank");
        }
        else if(usernameVal.length<=2){
            setErrorMsg(username,'username min 3 char');
        }
        else{
            setSuccessMsg(username);
        }
//Validate Email id
        if(emailVal===""){
            setErrorMsg(email,"email can not be blank");
        }
        else if(!isEmail(emailVal)){
            setErrorMsg(email,'not a valid Email');
        }
        else{
            setSuccessMsg(email);
        }
//Validate Phone number
        if(phoneVal===""){
            setErrorMsg(phone,"phone number can not be blank");
        }
        else if(phoneVal.length!=10){
            setErrorMsg(phone,'not a valid phone number');
        }
        else{
            setSuccessMsg(phone);          
        }
//Validate password
        if(passwordVal===""){
            setErrorMsg(password,"password can not be blank");
        }
        else if(passwordVal.length<8){
            setErrorMsg(password,'The password must be 8 char.');
        }
        else{
            setSuccessMsg(password);          
        }
//Re-Enter password.
        if(reenterVal===""){
            setErrorMsg(reenter,"password can not be blank");
        }
        else if(passwordVal!==reenterVal){
            setErrorMsg(reenter,'The password doesn\'\t match.');
        }
        else{
            setSuccessMsg(reenter);          
        }
        successMsg();
    }
    function setErrorMsg(input,errormsgs){
        const formControl=input.parentElement;
        const small=formControl.querySelector('small');
        formControl.className="form-control error";
        small.innerText=errormsgs;
    }
    function setSuccessMsg(input){
        const formControl=input.parentElement;
        formControl.className="form-control success";
    }
    
