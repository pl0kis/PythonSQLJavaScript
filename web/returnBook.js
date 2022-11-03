let allMoveBook = document.querySelector('.allMoveBook')
let tableForReturnBooks = document.querySelector('.tableForReturnBooks')


export async function checkMoveBook(){
    tableForReturnBooks.innerHTML = ''
    let allMoveBook = document.querySelector('.allMoveBook')
    let result = await eel.uniqueCheckSelect(3)()
    
    let row = document.createElement('tr')
    row.className = 'HeadTableReturnBooks'
    tableForReturnBooks.appendChild(row)
    Object.keys(result[0]).forEach(function(v){
        let cell = document.createElement('th')
        row.appendChild(cell)
        cell.innerHTML = v
    })
    for(let i = 0;i<result.length;i++){
        let row = document.createElement('tr')
        row.className = 'BodyTableForReturnBooks'
        tableForReturnBooks.appendChild(row)
        for(let key in result[i]){
            let cell = document.createElement('td')
            row.appendChild(cell)
            cell.innerHTML = result[i][key]
            
        }
            let button = document.createElement('button')
            button.className = `Return ${result[i].idMoving}`
            button.textContent = 'Вернуть книгу'
            row.appendChild(button)
            button.addEventListener('click',(event)=>{
                event.preventDefault()
               let idMovings = button.className.slice(button.className.indexOf(' ')+1)
               let date = new Date().getFullYear()+'-'+ parseInt(new Date().getMonth() +1) + '-' + new Date().getDate()
               update(date,idMovings)
            })
    }
}

async function update(date,idMovings){
    let result = await eel.bookReturn(date,idMovings)()
    console.log(result)
    checkMoveBook()
}
let selectAndVubor = document.querySelector('.selectAndVubor')
selectAndVubor.style.display = 'none'
let Selects = document.querySelector('.Selects')
Selects.style.display = 'none'

// export default {checkMoveBook}