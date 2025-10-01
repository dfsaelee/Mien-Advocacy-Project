// Stored Name List of People Who Signed
let signers = []
rotationAngle = 0;

// Add JavaScript code for your web site here and call it from index.html.
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

const popupForm = () => {
    let popup = document.getElementById("popup-form");
    popup.classList.remove("hidden");
}

const closePopup = () => {
    let popup = document.getElementById("popup-form");
    popup.classList.add("hidden");
}

const joinFormParse = (event) => {
    event.preventDefault();

    const formElements = joinForm.elements;
    let name = '';
    let email = '';

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        // my object 
        let person = {
            name: '',
            email: ''
        };

        // Access email value and log it
        if (element.name === 'email' && element.type === 'email') {
            email = element.value.trim();
            if (email.includes('@')) {
                element.style.borderColor = 'red';
                element.style.backgroundColor = '#ffcccc';
                console.error("Email Address Not Added");
            }
            else {
                element.style.borderColor = '';
                element.style.backgroundColor = '';
                person.email = email
            }
            console.log(`Email: ${person.email}`);
        }

        // Access name value, validate, and log it
        if (element.name === 'name' && element.type === 'text') {
            name = element.value.trim();
            console.log(`Name: ${name}`);

            // Validate name
            if (name.length < 2) {
                element.style.borderColor = 'red';
                element.style.backgroundColor = '#ffcccc'; // Optional: Light red background
                console.error("Invalid signature: Name must be at least 2 characters long.");
                return;
            } else {
                element.style.borderColor = '';
                element.style.backgroundColor = '';
                person.name = name;
                signers.push(person);
                updateSignersList();

                break;
            }
        }
    }
};

const updateSignersList = () => {
    // Get the div where signers will be displayed
    const signersList = document.querySelector('.signature');

    // Could probably save the signers list string to save time complexity
    // Clear existing list
    signersList.innerHTML = '';
    let signersString = '';
    // Create a string to hold all the signers' names
    let i = 0;
    while (i < 10 && i < signers.length) {
        if (i === 0) {
            signersString += String(signers[i].name);
        }
        else {
            signersString = signersString + ", " + String(signers[i].name);
        }
        i++;
    }
    // Display the names
    signersList.textContent = `${signersString} support this cause`;

    // Append the total count of signers
    let totalSigners = document.createElement('p');
    totalSigners.textContent = `${signers.length} others have signed as well.`;
    signersList.appendChild(totalSigners);

    recentlyAddedPerson = signers[signers.length - 1];
    toggleModal(recentlyAddedPerson);
}

let lastScrollPosition = window.scrollY;
let navBarScroll = () => {
    let newScrollPosition = window.scrollY;
    if (lastScrollPosition < newScrollPosition) {
        navBar.style.setProperty('--top-calc', '-100px');
    } else if (newScrollPosition < lastScrollPosition) {
        //scrolled up 
        navBar.style.setProperty('--top-calc', '0px');
    }

    lastScrollPosition = newScrollPosition;
}

const scaleImage = () => {
    let image = document.getElementById('thank-you-image');
    image.style.transform = `rotate(${rotationAngle}deg)`;
    rotationAngle += 1;
}

let toggleModal = (person) => {
    let thanksModal = document.getElementById("thanks-modal");
    let contentModal = document.getElementById("thanks-modal-content");
    let intervalId = setInterval(scaleImage, 16);

    thanksModal.style.display = 'flex';
    // make the display show 
    try {
        contentModal.textContent = `Thank you, ${person?.name || 'guest'}, your support means the world to us`;
    } catch (error) {
        console.error('Error updating modal content:', error);
        return;
    }

    setTimeout(() => {
        thanksModal.style.display = 'none';
        clearInterval(intervalId);
        rotationAngle = 0;
    }, 3000);
}

/* Initial Fade in Of website */
let websiteFadeIn = () => {
    const sections = [
        document.getElementById("about-us-section"),
        document.getElementById("events-section"),
        document.getElementById("resources-section")
    ]
    sections.forEach( section => {
        if (section) {
            const sectionScrollY = window.scrollY + section.getBoundingClientRect().top;

            if (window.scrollY >= sectionScrollY) {
                section.classList.remove("hiddenFadeIn");
                section.classList.add("visible");
            }
        }
    }

    )
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-title');
    if (header) {
        header.classList.add('visible');
    } else {
        console.error('Header element not found.');
    }
});

let themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleDarkMode);

let joinButton = document.getElementById("join-button");
joinButton.addEventListener("click", popupForm)

let closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", closePopup);

let joinForm = document.getElementById("petition-form");
joinForm.addEventListener("submit", joinFormParse);

let navBar = document.getElementById("head-nav");

// if click outside of the form container 
window.addEventListener("click", function (event) {
    let popup = document.getElementById("popup-form");
    if (event.target == popup) {
        popup.classList.add("hidden");
    }
});

window.addEventListener("click", function (event) {
    let popup = document.getElementById("thanks-modal");
    if (event.target == popup) {
        let thanksModal = document.getElementById("thanks-modal");
        thanksModal.style.display = 'none';
    }
});

window.addEventListener("scroll", navBarScroll);
window.addEventListener("scroll", websiteFadeIn);

// Make a Join Button Appear after a while: