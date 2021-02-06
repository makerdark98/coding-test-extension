function getTimer() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      "action": 'getTimer'
    }, function(response) {
      try {
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
    }
  );
}


(()=>{
  const top = document.querySelector("body > div.navbar.navbar-dark.navbar-expand-lg.navbar-application.navbar-breadcrumb");
  //top.remove();
  top.innerHTML = `<img src="https://makerdark98.dev/images/Rb.png" />&nbsp;&nbsp;<div style="color:white;">남은 시간&nbsp;&nbsp; </div><div id="timer" style="color:white;"></div>`
  top.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({"action": "openOptionsPage"});
  })
  const questionBtn = document.querySelector("#btn-show-question");
  questionBtn.remove();
  const solutionBtn = document.querySelector('#view-solution-group');
  solutionBtn.remove();

  const timerContainer = document.querySelector('#timer');
  getTimer().then(t => {
    setInterval(function() {
      const remain = Number.parseInt((t - (new Date()).getTime())) / 1000;
      const min = Number.parseInt(remain / 60);
      const sec = Number.parseInt(remain % 60);
      timerContainer.innerText = `${min} : ${sec}`;
    }, 1000);
  })
  const submitBtn = document.querySelector('#submit-code');
  console.log(submitBtn);
  submitBtn.addEventListener('click', (e) => {
    chrome.runtime.sendMessage({"action": "submit", "uri": window.location.href});
  })
})();
