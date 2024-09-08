let correct_answers_dico = {
    "question1" : "algeria",
    "question2" : "jupiter",
    "question3" : "elephant"
};

form = document.getElementById("quiz");
const result = document.getElementById("result");
const progressBar = document.querySelector(".progress-bar");
form.addEventListener('submit', e => {
    e.preventDefault();
    let score = 0;
    if (form.question1.value == correct_answers_dico["question1"]) score++;
    if (form.question2.value == correct_answers_dico["question2"]) score++;
    if (form.question3.value == correct_answers_dico["question3"])  score++;

    percentage = Math.round(score*100/3);
    scrollTo(0,0);
    let output = 0;
    let timer = setInterval(() => {
        progressBar.style.width = output + '%';
        progressBar.textContent = output + '%';
        output++;
        if (output > percentage){
            clearInterval(timer);
            result.textContent = "Your score is "+ score;
        }
    },10
    );
 
}
)