let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user");
const compScorePara = document.querySelector("#comp");

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was a Draw.";
    msg.className = "draw";
};

const createEmoji = (emoji) => {
    const emojiElement = document.createElement('div');
    emojiElement.innerText = emoji;
    emojiElement.style.position = 'absolute';
    emojiElement.style.left = `${Math.random() * 100}vw`;
    emojiElement.style.top = `${Math.random() * 100}vh`;
    emojiElement.style.fontSize = `${Math.random() * 2 + 1}rem`;
    emojiElement.style.transition = 'all 1s ease-out';
    document.body.appendChild(emojiElement);

    setTimeout(() => {
        emojiElement.style.transform = 'translateY(-100px)';
        emojiElement.style.opacity = '0';
    }, 0);

    setTimeout(() => {
        emojiElement.remove();
    }, 1000);
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.className = "win";
        userScorePara.classList.add('score-update');
        setTimeout(() => userScorePara.classList.remove('score-update'), 500);

        for (let i = 0; i < 10; i++) {
            createEmoji('🏆');
            createEmoji('🎉');
        }
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.className = "lose";
        compScorePara.classList.add('score-update');
        setTimeout(() => compScorePara.classList.remove('score-update'), 500);

        for (let i = 0; i < 10; i++) {
            createEmoji('😢');
            createEmoji('👎');
        }
    }
};

const playGame = (userChoice) => {
    const compChoice = genComputerChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);

        choices.forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
    });
});