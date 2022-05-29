const firebaseConfig = {
    apiKey: "AIzaSyD_t3q2hArjIB_v-lzd1ydHnhvCGTj7yng",
    authDomain: "finalprojectlnt-7e3dd.firebaseapp.com",
    projectId: "finalprojectlnt-7e3dd",
    storageBucket: "finalprojectlnt-7e3dd.appspot.com",
    messagingSenderId: "1069199501854",
    appId: "1:1069199501854:web:affaf2c2322a663951dc0f",
    measurementId: "G-N60SBHR97M"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var messagesRef = db.collection("messages");

document.getElementById('form').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();


    var name = getInputVal('name');
    var emailAddress = getInputVal('emailAddress');
    var company = getInputVal('company');
    var phoneNumber = getInputVal('phoneNumber');
    var event = document.getElementById("eventInfo");
    var myEvent = event.options[event.selectedIndex].value;

    var checkPhone = phoneNumber.substring(0,2);
    var errorMsg = "";
    var condition = true;

    if(name == "" || emailAddress == "" || company == "" || phoneNumber == "" || myEvent == ""){
        errorMsg += "Please fill the form";
        condition = false;
    }
    else if(name.length < 3){
        errorMsg += "\nYour name must be 3 or more characters";
        condition = false;
    }
    else if(!validateEmail(emailAddress)){
        errorMsg += "\nInvalid Email";
        condition = false;
    }
    else if(checkPhone != "08"){
        errorMsg += "\nInvalid phone number";
        condition = false;
    }
    else if(phoneNumber.length > 14){
        errorMsg += "\nInvalid phone number";
        condition = false;
    }
    
    if(condition == false){
        alert(errorMsg);
    }
    else if(condition == true){
        saveMessages(name, emailAddress, company, phoneNumber, myEvent);
        
    }
}

const saveMessages = (name, emailAddress, company, phoneNumber, myEvent) =>{ 

    messagesRef.add({
        Name: name,
        Email: emailAddress,
        Company: company,
        Phone: phoneNumber,
        Event: myEvent
    });
    // console.log("Yaaay")
    // showAlert("Yaaaay");
    document.getElementById("form").reset();
}


function getInputVal(id){
    return document.getElementById(id).value;
}

function showAlert(alertMsg){
    alert(alertMsg);
}

function validateEmail(email) {
    var atSymbol = email.indexOf("@");
    if(atSymbol < 1){
        return false;
    }
    var dot = email.indexOf(".");
    if(dot <= atSymbol + 2) {
        return false;
    }
    if (dot === email.length - 1){
        return false;
    }
    
    return true;
}


const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
$(document).ready(()=>{
    const handleSubmit = (name, emailAddress, company, phoneNumber, myEvent) =>{
        $.ajax({
            url: BASE_URL,
            type: 'post',
            body:{
                Name: name,
                Email: emailAddress,
                Company: company,
                Phone: phoneNumber,
                Event: myEvent
            },
            success: function(result){
                console.log(result)
            },
            error: () => {
                console.log('error')
            }
        })
    }
    $("#submit").click(handleSubmit)
})