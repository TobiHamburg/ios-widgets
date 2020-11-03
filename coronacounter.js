
let widget = new ListWidget()
widget.setPadding(16, 16, 16, 16)

const spc = 3

var cc1 = '#FFFF00'

//Title text
let titleTxt = widget.addText("Boulderquartier")
titleTxt.font = Font.boldSystemFont(14)
titleTxt.leftAlignText()
widget.addSpacer(spc)

//Value text
let vlFnt = Font.semiboldSystemFont(20)

//Subtitle text
let ptFnt = Font.systemFont(14)
let ptCol

//Backgrund- & text colors
titleTxt.textColor = Color.lightGray()
ptCol = Color.gray()
const gradient = new LinearGradient()
gradient.locations = [0, 1]
gradient.colors = [
    new Color("192331"),
    new Color("222222")
]
widget.backgroundGradient = gradient


await loadSite()

if (!config.runsInWidget) widget.presentSmall()
Script.setWidget(widget)
Script.complete()

async function loadSite() {
    let url = 'https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IlVyYmFuQXBlc0hIIn0.TfCdfkokmN9ZKRq_5aKnuRTrUDM5kGhPf7v8coQAMCU'
    let wbv = new WebView()
    await wbv.loadURL(url)
    let jsc = `
  var arr = new Array()
  
  var visitorcounter = document
    .getElementById("visitorcount-container")
    .getElementsByTagName("span")[1]
    .innerText
  arr.push(visitorcounter)
  
  var visitorcounterfree = document
    .getElementById("visitorcount-container")
    .getElementsByTagName("span")[3]
    .innerText
  arr.push(visitorcounterfree)
  
  JSON.stringify(arr)
  `
    let jsn = await wbv.evaluateJavaScript(jsc)
    let val = JSON.parse(jsn)
    let rwt = val[0]
    let inf = val[1]


    //Visitors-Value text
    if (rwt != null) {
        let tx2 = widget.addText(rwt)
        tx2.leftAlignText()
        tx2.font = vlFnt
        tx2.textColor = new Color(cc1)
    }
    //Visitors-Value subtiltle
    let tx1 = widget.addText("Besucher")
    tx1.textColor = ptCol
    tx1.font = ptFnt
    tx1.leftAlignText()
    widget.addSpacer(spc)

    //Free text
    if (inf != null) {
        let tx4 = widget.addText(inf)
        tx4.leftAlignText()
        tx4.font = vlFnt
        tx4.textColor = new Color(cc1)
    }
    //Free subtiltle
    let tx3 = widget.addText("Frei")
    tx3.textColor = ptCol
    tx3.font = ptFnt
    tx3.leftAlignText()
    widget.addSpacer(spc)


}