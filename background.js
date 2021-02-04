function init() {
  const problems = [{
    name: '2xn 타일링',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12900'
  }, {
    name: '스킬트리',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/49993'
  }, {
    name: '하노이탑',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12946'
  }, {
    name: '보행자 천국',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/1832'
  }, {
    name: '올바른 괄호의 갯수',
    uri: 'https://programmers.co.kr/learn/courses/30/lessons/12929'
  }]
  chrome.storage.sync.set({'isInit': 'true'});
  chrome.storage.sync.set({'problems': JSON.stringify(problems)});
}

chrome.storage.sync.get(['isInit'], (items) => {
  console.log(items);
  if (!items.isInit) init();
  //if (!res.item) init();
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
        case "openOptionsPage":
            openOptionsPage();
            break;
        case "getTimer":
        chrome.storage.sync.get(['timer'], (items) => {
            const t = Number(items.timer);
            sendResponse({data: t});
          console.log('sendResponse');
          console.log(t);
        })
        return true;
        default:
            break;
    }
});

function openOptionsPage(){
    chrome.runtime.openOptionsPage();
}
