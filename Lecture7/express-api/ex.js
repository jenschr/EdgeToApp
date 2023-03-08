/*
getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
    getTopMovies((movies) => {
        console.log('Top movies: ', movies);
        sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
        });
    });
    }
});
*/
async function getCust(){
    console.log("Starting!");
    try{
        const cust = await getCustomer(1);
        if (cust.isGold) {
            const mov = await getTopMovies();
            const mail = await sendEmail(cust.email, mov);
        }
    } catch( err ){
        console.log("Error: ",err.message);
    }
}

getCust();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("got customer");
            resolve({ 
                id: 1, 
                name: 'Mosh Hamedani', 
                isGold: true, 
                email: 'email@some.where' 
            });
            }, 2000); 
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("got movies");
            resolve(['movie1', 'movie2']);
        }, 2000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("Sending email to "+email+" with movies "+movies)
            resolve();
            //reject(new Error("crap"));
        }, 2000);
    });
}