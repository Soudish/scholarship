// Sample data
const scholarships = [
    {
        title: "National Merit Scholarship",
        description: "For students with excellent academic records.",
        deadline: "Dec 31, 2024",
        link: "#"
    },
    {
        title: "STEM Scholarship Program",
        description: "Supports students pursuing degrees in STEM fields.",
        deadline: "Jan 15, 2025",
        link: "#"
    },
    {
        title: "Need-Based Financial Aid",
        description: "For students from low-income families.",
        deadline: "Feb 1, 2025",
        link: "#"
    },
    {
        title: "Arts Scholarship",
        description: "For students pursuing degrees in the arts.",
        deadline: "Mar 15, 2025",
        link: "#"
    },
    {
        title: "Community Service Scholarship",
        description: "For students with a strong record of community service.",
        deadline: "Apr 30, 2025",
        link: "#"
    },
];

// Function to display scholarships
function displayScholarships(scholarshipList) {
    const list = document.getElementById('scholarship-list');
    list.innerHTML = ""; // Clear the current list

    if (scholarshipList.length === 0) {
        list.innerHTML = "<p>No scholarships found matching your search criteria.</p>";
        return;
    }

    scholarshipList.forEach((scholarship) => {
        const card = document.createElement('div');
        card.classList.add('scholarship-card');
        card.innerHTML = `
            <h3>${scholarship.title}</h3>
            <p>${scholarship.description}</p>
            <p style="color:red;"><strong>Deadline:</strong> ${scholarship.deadline}</p>
            <a href="${scholarship.link}" target="_blank">Apply Now</a>
        `;
        list.appendChild(card);
    });
}

// Function to search scholarships
function searchScholarships() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filtered = scholarships.filter(scholarship =>
        scholarship.title.toLowerCase().includes(searchInput) ||
        scholarship.description.toLowerCase().includes(searchInput)
    );

    displayScholarships(filtered); // Display the filtered scholarships
}

// Initial display
displayScholarships(scholarships);

// Generalized function for toggling pop-ups
function togglePopup(overlayId, show) {
    const overlay = document.getElementById(overlayId);
    if (show) {
        overlay.classList.add('visible');
    } else {
        overlay.classList.remove('visible');
    }
}

// Event listeners for Login pop-up
document.getElementById('openLoginPopup').addEventListener('click', () => togglePopup('loginOverlay', true));
document.getElementById('closeLoginPopup').addEventListener('click', () => togglePopup('loginOverlay', false));
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Login submitted!');
    togglePopup('loginOverlay', false);
});

// Event listeners for Sign-up pop-up
document.getElementById('openSignupPopup').addEventListener('click', () => togglePopup('signupOverlay', true));
document.getElementById('closeSignupPopup').addEventListener('click', () => togglePopup('signupOverlay', false));
document.getElementById('switchToSignup').addEventListener('click', (e) => {
    e.preventDefault();
    togglePopup('loginOverlay', false);
    togglePopup('signupOverlay', true);
});
document.getElementById('switchToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    togglePopup('signupOverlay', false);
    togglePopup('loginOverlay', true);
});

// Toggle password visibility
function togglePasswordVisibility(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);
    checkbox.addEventListener('change', () => {
        input.type = checkbox.checked ? 'text' : 'password';
    });
}

togglePasswordVisibility('showPassword', 'password');
togglePasswordVisibility('showSignupPassword', 'newPassword');

// Highlight scholarships with upcoming deadlines
const today = new Date();
scholarships.forEach(scholarship => {
    const deadlineDate = new Date(scholarship.deadline);
    const daysLeft = (deadlineDate - today) / (1000 * 60 * 60 * 24);

    if (daysLeft <= 7 && daysLeft > 0) {
        scholarship.description += " (Hurry! Only a few days left)";
    }
});
