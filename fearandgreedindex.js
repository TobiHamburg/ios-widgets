let widget = new ListWidget()
widget.setPadding(16, 16, 16, 16)

const spc = 3


//Title text
let titleTxt = widget.addText("Fear and Greed Index")
titleTxt.font = Font.boldSystemFont(14)
titleTxt.leftAlignText()
widget.addSpacer(spc)

//Value text
let vlFnt = Font.semiboldSystemFont(14)
var cc1 = Color.gray()


//Backgrund- & text colors
titleTxt.textColor = Color.lightGray()
const gradient = new LinearGradient()
gradient.locations = [0, 1]
gradient.colors = [
    new Color("192331"),
    new Color("222222")
]
widget.backgroundGradient = gradient


await loadSite()

// used for debugging if script runs inside the app
if (!config.runsInWidget) widget.presentSmall()

Script.setWidget(widget)
Script.complete()

async function loadSite() {
    let url = 'https://money.cnn.com/data/fear-and-greed/'
    let wbv = new WebView()
    await wbv.loadURL(url)
    let jsc = `
  var arr = new Array()
  
  var fearandgreed = document
    .getElementById("fearGreedContainer")
    .getElementsByTagName("div")[0]
    .getElementsByTagName("div")[0]
    .getElementsByTagName("ul")[0]
    .getElementsByTagName("li")
    
  arr.push(fearandgreed[0].innerHTML.substring(17))
  arr.push(fearandgreed[1].innerHTML.substring(17))
  arr.push(fearandgreed[2].innerHTML.substring(17))
  arr.push(fearandgreed[3].innerHTML.substring(17))
  arr.push(fearandgreed[4].innerHTML.substring(17))

  
  JSON.stringify(arr)
  `
    let jsn = await wbv.evaluateJavaScript(jsc)
    let val = JSON.parse(jsn)


    //TODO: Schleife über Array verwenden

    //Fear & Greed Now
    let tx0 = widget.addText(val[0])
    tx0.leftAlignText()
    tx0.font = vlFnt
    tx0.textColor = cc1

    //Fear & Greed Previous Close
    let tx1 = widget.addText(val[1])
    tx1.leftAlignText()
    tx1.font = vlFnt
    tx1.textColor = cc1

    //Fear & Greed 1 Week Ago
    let tx2 = widget.addText(val[2])
    tx2.leftAlignText()
    tx2.font = vlFnt
    tx2.textColor = cc1

    //Fear & Greed 1 Month Ago
    let tx3 = widget.addText(val[3])
    tx3.leftAlignText()
    tx3.font = vlFnt
    tx3.textColor = cc1

    //Fear & Greed 1 Year Ago
    let tx4 = widget.addText(val[4])
    tx4.leftAlignText()
    tx4.font = vlFnt
    tx4.textColor = cc1

}