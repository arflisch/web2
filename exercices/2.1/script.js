const dateTimeNow = new Date();
const message = "This is the best moment to have a look at this website !";

function addDateTime(message){
    return dateTimeNow.toLocaleDateString()+ " " + dateTimeNow.toLocaleTimeString() + " : " + message;
}

console.log(addDateTime(message));

alert(addDateTime(message));