export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export const getInitials = (name) => {
    if(!name) return "?";

    const words = name.trim().split(/\s+/); // Use regex to handle multiple spaces
    let initials = "";

    for(let i = 0; i < Math.min(words.length, 2); i++) {
        // Add safety check for empty words
        if (words[i] && words[i].length > 0) {
            initials += words[i][0];
        }
    }

    return initials.toUpperCase() || "?"; // Fallback if no initials found
}
