 var questionSet;
 var form = document.getElementById("quizForm");

 var ajax = new XMLHttpRequest();
 ajax.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz");
 ajax.send();
 ajax.addEventListener("readystatechange", onReadyStateChange);
 function onReadyStateChange(e) {
    if(e.target.readyState === 4 && e.target.status === 200) {
     var data = JSON.parse(e.target.responseText);
     questionSet = data;
     for( var i =0; i<data.length; i++) {
        var questionContainer = document.createElement("div");
        var questionObj = data[i];
        var counter  = i+1;
        var question = document.createElement("h3");
        question.classList.add("questionClass");
        question.innerText = "Q" + counter + "." + questionObj.question;
            var containerClass = document.createElement("div");
            containerClass.classList.add("container-class");
              

        var options = questionObj.options;
        questionContainer.append(question);

        for(var j=0; j<options.length; j++) {
         var option = options[j];
         var innerCounter = j+1;

         var radioId = `id_${counter}_${innerCounter}`;

        var radio = document.createElement("input");
        radio.classList.add("radio-class");
        radio.type = "radio";
        radio.id = radioId;
        radio.name = `q_${counter}`;
        radio.value = radioId;

        var label = document.createElement("label");
        label.classList.add("label-class");
        label.innerText = option;
        label.htmlFor = radioId;
        containerClass.append(radio, label);
        questionContainer.appendChild(containerClass);

        


     }
     form.append(questionContainer);
    }
        var submitBtn = document.createElement("input");
        submitBtn.classList.add("btn");
        submitBtn.type = "submit";
        submitBtn.value ="Submit";

      form.append(submitBtn);

   }
 }

    form.addEventListener("submit", onFormSubmit);
    function onFormSubmit(e) {
      e.preventDefault();
      var score = 0;

      for(var i=0; i<questionSet.length; i++) {

         var counter = i + 1;
         var questionName = `q_${counter}`;
         var answer = form[questionName].value;
         var questionObj = questionSet[i];
 
         if(answer.endsWith(questionObj.answer)) {
            score++;
         }

      }
 
      var scoreBoard = document.getElementById("score");
      scoreBoard.innerText = score;

    }
    