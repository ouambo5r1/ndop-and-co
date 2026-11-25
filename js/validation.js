/*
    Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Input validation functions for the Contact, Purchase (payment), and
             Shipping forms. Each function returns an error message, or an empty
             string when the value is valid. showError/clearError update the page
             so the message appears under the field and is read by screen readers.
*/

/* ===== Regular expressions used by the validators ===== */
const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    name: /^[A-Za-z][A-Za-z .'-]{1,}$/,
    cardDigits: /^\d{13,19}$/,
    expiry: /^(0[1-9]|1[0-2])\/(\d{2})$/,
    cvc: /^\d{3,4}$/,
    zip: /^\d{5}(-\d{4})?$/,
    phone: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    state: /^[A-Za-z]{2}$/
};

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

/* ===== Individual validation functions ===== */

// Any required field: must not be empty
function validateRequired(value, label) {
    return value.trim() === "" ? `${label} is required.` : "";
}

function validateName(value, label) {
    const missing = validateRequired(value, label);
    if (missing) return missing;
    return PATTERNS.name.test(value.trim()) ? "" : `${label} can only use letters, spaces, apostrophes, periods, and hyphens.`;
}

function validateEmail(value) {
    const missing = validateRequired(value, "Email address");
    if (missing) return missing;
    return PATTERNS.email.test(value.trim()) ? "" : "Enter an email address like name@example.com.";
}

function validateMessage(value) {
    const missing = validateRequired(value, "Message");
    if (missing) return missing;
    return value.trim().length < 10 ? "Message must be at least 10 characters." : "";
}

// Luhn checksum used by real card numbers
function passesLuhn(digits) {
    let sum = 0;
    let double = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let n = Number(digits[i]);
        if (double) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        double = !double;
    }
    return sum % 10 === 0;
}

function validateCardNumber(value) {
    const missing = validateRequired(value, "Credit card number");
    if (missing) return missing;
    const digits = value.replace(/[\s-]/g, "");
    if (!PATTERNS.cardDigits.test(digits)) {
        return "Card number must be 13 to 19 digits.";
    }
    return passesLuhn(digits) ? "" : "That card number is not valid. Check the digits.";
}

// MM/YY, and the card must not be expired
function validateExpiry(value) {
    const missing = validateRequired(value, "Expiration date");
    if (missing) return missing;
    const match = value.trim().match(PATTERNS.expiry);
    if (!match) {
        return "Use the format MM/YY.";
    }
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    const now = new Date();
    const lastValidDay = new Date(year, month, 0, 23, 59, 59); // last day of that month
    return lastValidDay < now ? "This card is expired." : "";
}

function validateCVC(value) {
    const missing = validateRequired(value, "Security code");
    if (missing) return missing;
    return PATTERNS.cvc.test(value.trim()) ? "" : "Security code must be 3 or 4 digits.";
}

function validateState(value) {
    const missing = validateRequired(value, "State");
    if (missing) return missing;
    const code = value.trim().toUpperCase();
    return PATTERNS.state.test(code) && US_STATES.includes(code) ? "" : "Use a two-letter US state code, like VA.";
}

function validateZip(value) {
    const missing = validateRequired(value, "ZIP code");
    if (missing) return missing;
    return PATTERNS.zip.test(value.trim()) ? "" : "ZIP code must be 5 digits (or ZIP+4).";
}

function validatePhone(value) {
    const missing = validateRequired(value, "Phone number");
    if (missing) return missing;
    return PATTERNS.phone.test(value.trim()) ? "" : "Enter a 10-digit phone number, like 757-555-0142.";
}

/* ===== Show and clear messages on the page ===== */
function showError(input, message) {
    const box = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", "true");
    input.classList.add("invalid");
    if (box) box.textContent = message;
}

function clearError(input) {
    const box = document.getElementById(input.id + "-error");
    input.removeAttribute("aria-invalid");
    input.classList.remove("invalid");
    if (box) box.textContent = "";
}

// Run a list of [inputId, validatorFunction] rules. Returns true if all pass.
function validateForm(rules) {
    let firstBad = null;
    rules.forEach(([id, check]) => {
        const input = document.getElementById(id);
        const message = check(input.value);
        if (message) {
            showError(input, message);
            if (!firstBad) firstBad = input;
        } else {
            clearError(input);
        }
    });
    if (firstBad) {
        firstBad.focus(); // move keyboard focus to the first problem
        return false;
    }
    return true;
}

// Re-check a single field when the shopper leaves it
function liveValidate(rules) {
    rules.forEach(([id, check]) => {
        const input = document.getElementById(id);
        input.addEventListener("blur", () => {
            const message = check(input.value);
            message ? showError(input, message) : clearError(input);
        });
    });
}

/* ===== Contact form (contact.html) ===== */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    const contactRules = [
        ["contact-email", validateEmail],
        ["contact-message", validateMessage]
    ];
    liveValidate(contactRules);

    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        const status = document.getElementById("contact-status");
        if (validateForm(contactRules)) {
            const name = document.getElementById("contact-name").value.trim() || "there";
            status.textContent = `Thank you, ${name}! Your message was received. We usually reply within two business days.`;
            status.className = "form-message success";
            contactForm.reset();
        } else {
            status.textContent = "Please fix the highlighted fields.";
            status.className = "form-message error";
        }
    });
}
