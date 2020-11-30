console.log(document.readyState)
let baseMode = true;
chrome.storage.sync.get('data', (result) => {
console.log('foo')
if ('data' in result) {
  for (const [key, value] of Object.entries(result.data)) {
    if (value == true) {
      baseMode = false;
      break;
    }
  }
}
})
const timer = ms => new Promise(res => setTimeout(res, ms))
async function edit() {
    let i = 1
    while (i > 0) {
      let tweets = document.getElementsByTagName('article')
      let tweet_text = [...tweets].map(tweet => {
        return [...tweet.getElementsByTagName('span')]
      })
      let flat = tweet_text.flat()
      console.log('flat: ', flat)
      for (var tweet of flat) {
        //  console.log('tweet: ', tweet)
        tweet.innerText = 'AHHHHHHHHHHHHHHHH'
      }
      await timer(i*1000);
    }
  }
edit();
