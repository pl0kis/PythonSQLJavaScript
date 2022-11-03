import {checkMoveBook} from "./returnBook.js"
let giveBook = document.querySelector('.giveBook')
giveBook.style.display = 'none'
let formBackReturnBook = document.querySelector('.formBackReturnBook')
formBackReturnBook.style.display = 'none'
let buttonConnectOnDatabase = document.querySelector('.buttonConnectOnDatabase')
let columns = []
let header = document.querySelector('.header')
let middle = document.querySelector('.middle')
middle.style.display = 'none'

async function test(){
    
   let columnsSelect = document.querySelector('.columnsSelect')

    let result = await eel.ConnectingToTheDatabase()()
    

    
    for(let i = 0;i<result.length;i++){
        columns.push(result[i].Tables_in_bibliotekapython)
    }
    console.log(columns)
    // for(let i = 0;i<columns.length;i++){
    //     let option = document.createElement('option')
    //     option.append(columns[i])
    //     option.value = columns[i]
    //     columnsSelect.append(option)
    // }
    // columnsSelect.addEventListener('change',()=>{
    //     returnDescribeTableJS(document.querySelector('.columnsSelect').value)
    // })
    // let columnSelectCheck = document.querySelector('.columnSelectCheck')
    // for(let i = 0;i<columns.length;i++){
    //     let option = document.createElement('option')
    //     option.append(columns[i])
    //     option.value = columns[i]
    //     columnSelectCheck.append(option)
    // }
    let CheckUniqueSelect = document.querySelector('.CheckUniqueSelect')
    let arrayForUniqueSelect = ['Запрос 1','Запрос 2','Запрос 3']
    for(let i = 0;i<arrayForUniqueSelect.length;i++){
        let option = document.createElement('option')
        option.append(arrayForUniqueSelect[i])
        option.value = i
        CheckUniqueSelect.append(option)
    }
    header.style.display = 'none'
    middle.style.display = 'block'
    idBook()
    idReader()
    checkMoveBook()
    formBackReturnBook.style.display = 'block'
    giveBook.style.display = 'block'

    let dateOut = document.querySelector('.dateOut')
    let dateIn = document.querySelector('.dateIn')
    let dateToday = new Date()
    dateToday.setDate(dateToday.getDate() + 30)
    let year = new Date().getFullYear()
    let mount = new Date().getMonth() + 1
    let day = new Date().getDate()
    day = ('0'+day).slice(-2)
    let yearIn = dateToday.getFullYear()
    let mountIn = dateToday.getMonth() + 1
    let dayIn = dateToday.getDate()
    dayIn = ('0'+dayIn).slice(-2)
    dateOut.value = year +'-'+mount+'-'+day
    dateIn.value = yearIn+'-'+mountIn+'-'+dayIn
    
    
}



    buttonConnectOnDatabase.addEventListener('click',()=>{
        test()
    })

// let buttonForSelectInDatabase = document.querySelector('.buttonForSelectInDatabase')
async function test2(){
    let result2 = await eel.selectFromDatabase()()
    for(let i = 0;i<result2.length;i++){
        console.log(result2[i])
    }
}

// buttonForSelectInDatabase.addEventListener('click',()=>{
//     test2()
// })
async function idBook(){
    let idBookSelect = document.querySelector('.idBook')
    let result = await eel.checkAllRecord('books')()
    for(let i = 0;i<result.length;i++){
        let option = document.createElement('option')
        option.append(result[i].nameBook)
        option.value = result[i].idBook
        idBookSelect.append(option)
    }
}
async function idReader(){
    let idReaderSelect = document.querySelector('.idReader')
    let result = await eel.checkAllRecord('Readers')()
    for(let i = 0;i<result.length;i++){
        let option = document.createElement('option')
        option.append( '№'+ result[i].idReader+' '+result[i].NameReader + ' ' + result[i].SurnameReader + ' ' + result[i].lastNameReader)
        option.value = result[i].idReader
        idReaderSelect.append(option)
    }
    
}

async function insertValuesMoveBookJS(idBook,idReader,countBooksMove,dateOut,dateIn){
    if(dateOut>dateIn){
        alert('Нельзя поставить возврат задним числом')
    }else{
        let result = await eel.insertValuesMoveBook(idBook,idReader,countBooksMove,dateOut,dateIn)()
    console.log(result)
    }
    
}
let dateOut = document.querySelector('.dateOut')
dateOut.setAttribute('disabled','disabled')
let dateIn = document.querySelector('.dateIn')
dateIn.setAttribute('disabled','disabled')
let giveBookButton = document.querySelector('.giveBookButton')
giveBookButton.addEventListener('click',(event)=>{
    event.preventDefault()
    let idBookInsert = document.querySelector('.idBook').value
    let idReaderInsert = document.querySelector('.idReader').value
    let countMoveBookInsert = document.querySelector('.countBooksMove').value
    let dateOutInsert = document.querySelector('.dateOut').value
    let dateInInsert = document.querySelector('.dateIn').value
    insertValuesMoveBookJS(idBookInsert,idReaderInsert,countMoveBookInsert,dateOutInsert,dateInInsert)
})


let arrayForInsert = []
async function returnDescribeTableJS(nameTable){
    arrayForInsert = []
    let inputsForInsert = document.querySelector('.inputsForInsert')
    inputsForInsert.innerHTML = ''
    let result = await eel.returnDescribeTable(nameTable)()
    console.log(result)
    for(let i = 0;i<result.length;i++){
        let input = document.createElement('input')
        input.placeholder = result[i].Field
        input.className = result[i].Field
        inputsForInsert.append(input)
        arrayForInsert.push(result[i].Field)
    }
}
let valuesArray = []

async function insertValuesJS(valuesArray){
    let result = await eel.insertValues(document.querySelector('.columnsSelect').value,valuesArray)()
    console.log(result)
    
}

let insertValuesInDatabase = document.querySelector('.insertValuesInDatabase')
insertValuesInDatabase.addEventListener('click',()=>{
    valuesArray = []
    for(let i = 0;i<arrayForInsert.length;i++){
        let values = document.querySelector(`.${arrayForInsert[i]}`).value
        valuesArray.push(values)
    }
    console.log(valuesArray)
    insertValuesJS(valuesArray)
})

let nameStolbcu = []
let tableForSelect = document.querySelector('.tableForSelect')

async function checkAllRecordJS(nameTable){
    let result = await eel.checkAllRecord(nameTable)()
    tableForSelect.innerHTML = ''
    nameStolbcu = []
    let row = document.createElement('tr')
    row.className = 'HeadTable'
    tableForSelect.appendChild(row)
    Object.keys(result[0]).forEach(function(v){
        let cell = document.createElement('th')
        row.appendChild(cell)
        cell.innerHTML = v
    })
for(let i = 0;i<result.length;i++){
    let row = document.createElement('tr')
    row.className = 'BodyTable'
    tableForSelect.append(row)
    for(key in result[i]){
        let cell = document.createElement('td')
        row.appendChild(cell)
        cell.innerHTML = result[i][key]
    }
}
    //  for(let key in result[0]){
    //         nameStolbcu.push(key)
    //     }
    // for(let i = 0;i<nameStolbcu.length;i++){
            
    //             let th = document.createElement('th')
    //             th.className = 'thead'
    //             th.innerHTML = nameStolbcu[i]
    //             tableForSelectHEADER.append(th)
                
    // }

    // for(let i = 0;i<result.length;i++){
       
        
    
    //     Object.entries(result[i]).forEach((entry) => {
    //         const [key, value] = entry;
            
    //         let thB = document.createElement('th')
    //         thB.className = 'tbody'
    //         thB.append(value)
    //         tableForSelectBODY.append(thB)
    //     });
       
    // }
    
}




let tableForUniqueSelect = document.querySelector('.tableForUniqueSelect')
async function uniqueSelect(idSelect){
    let result = await eel.uniqueCheckSelect(idSelect)()
    tableForUniqueSelect.innerHTML = ''
    let row = document.createElement('tr')
    row.className = 'HeadTableUnique'
    tableForUniqueSelect.appendChild(row)
    Object.keys(result[0]).forEach(function(v){
        let cell = document.createElement('th')
        row.appendChild(cell)
        cell.innerHTML = v
    })
    for(let i = 0;i<result.length;i++){
        let row = document.createElement('tr')
        row.className = 'BodyTable'
        tableForUniqueSelect.appendChild(row)
        for(let key in result[i]){
            let cell = document.createElement('td')
            row.appendChild(cell)
            cell.innerHTML = result[i][key]
        }
    }
}

let buttonCheckRecord = document.querySelector('.buttonCheckRecord')
buttonCheckRecord.addEventListener('click',()=>{
    checkAllRecordJS(document.querySelector('.columnSelectCheck').value)
})

let buttonCheckUniqueSelect = document.querySelector('.buttonCheckUniqueSelect')
buttonCheckUniqueSelect.addEventListener('click',()=>{
    uniqueSelect(document.querySelector('.CheckUniqueSelect').value)
})