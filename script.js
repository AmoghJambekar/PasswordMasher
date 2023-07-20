window.addEventListener('DOMContentLoaded', (event) => {
  const passwordInput = document.getElementById("passwordInput");
  const togglePassword = document.getElementById("togglePassword");
  const mashButton = document.getElementById("mashButton");
  const newPasswordInput = document.getElementById("newPasswordInput");
  const passwordStrengthBar = document.getElementById("passwordStrengthBar");
  const timeToCrack = document.getElementById("timeToCrack");
  const timeToCrackContainer = document.getElementById("timeToCrackContainer");

  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.classList.add("show-password");
    } else {
      passwordInput.type = "password";
      togglePassword.classList.remove("show-password");
    }
  });

  mashButton.addEventListener("click", () => {
    const originalPassword = passwordInput.value;
    const newPassword = generateNewPassword(originalPassword);
    newPasswordInput.value = newPassword;
    
    const time = calculateTimeToCrack(newPassword);
    timeToCrack.textContent = `Approx. time to crack: ${Math.round(time/10000000000)} days`;
    timeToCrackContainer.style.display = "block"; // Show the time-to-crack container
  });

  // Helper functions to generate a new password, calculate password strength, and time to crack
  function generateNewPassword(originalPassword) {
    const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
  
    // Combine all characters to choose from
    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
  
    let newPassword = "";
  
    // Function to generate a random number between min and max (both inclusive)
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    for (const char of originalPassword) {
      newPassword += char;
      const numberOfRandomCharacters = getRandomInt(1, 3); // Adjust the range as needed (1 to 3 in this example)
      for (let i = 0; i < numberOfRandomCharacters; i++) {
        const randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        newPassword += randomCharacter;
      }
    }
  
    return newPassword;
  }


  function calculateTimeToCrack(password) {
    const attemptsPerSecond = 1000000; // Arbitrary number of attempts per second
    const secondsInDay = 86400; // Number of seconds in a day
  
    // Calculate the total number of possible combinations for a brute-force attack
    const characterSet = 94; // Number of possible characters (alphanumeric + special characters)
    const passwordLength = password.length;
    const possibleCombinations = Math.pow(characterSet, passwordLength);
  
    // Calculate the time to crack in seconds
    const timeToCrackInSeconds = possibleCombinations / attemptsPerSecond;
  
    // Convert time to crack to days
    const timeToCrackInDays = timeToCrackInSeconds / secondsInDay;
  
    return timeToCrackInDays ;
  }
});
