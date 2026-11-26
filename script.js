// Contact Form
console.log("SCRIPT IS LOADED!");
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields!");
        return;
    }
    try{
        const response = await fetch("http://localhost:3000/contact",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, message})
        });
        if(response.ok){
            alert("Thank you, " + name + "! Your message has been received.");
        }
    }catch(error){
        alert("Backend connection failed!");
        console.error(error);
    }
});