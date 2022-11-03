from pydoc import describe
import eel
import pymysql
import pickle
import datetime

host = '127.0.0.1'
user = 'root'
password = '1234'
db_name = 'bibliotekaPython'

@eel.expose
def ConnectingToTheDatabase():
    try:
        global connection
        connection = pymysql.connect(
        host = host,
        port = 3306,
        user = user,
        password = password,
        database = db_name,
        cursorclass=pymysql.cursors.DictCursor
        )
        print('Connected')
        
        try:
            global cursors
            cursors = connection.cursor()
            print('Cursor created')
        except Exception as ex:
            print('Failed to create cursor')
            print(ex)
    except Exception as ex:
        print('Connection failed')
        print(ex)
    cursors.execute('show tables;')
    tables = cursors.fetchall()
    return tables



@eel.expose
def selectFromDatabase():
    cursors.execute('SELECT * FROM MoveBook;')
    logins = cursors.fetchall()
    return logins 

@eel.expose
def returnDescribeTable(nameTable):
    cursors.execute(f'describe {nameTable};')
    describeTable = cursors.fetchall()
    return describeTable

@eel.expose
def insertValues(nameTable,arrayValues):
    test = []
    for i in arrayValues:
        try:
            test.append(int(i))
        except ValueError:
            test.append(str(i))
    s = ', '.join( repr(e) for e in test)
   
    cursors.execute(f'insert into {nameTable} values({s});')
    connection.commit()
    

@eel.expose
def insertValuesMoveBook(idBook,idReader,countBooksMove,dateOut,dateIn):
    arrayPerem = []
    arrayPeremForInsert = []
    arrayPerem.append(idBook)
    arrayPerem.append(idReader)
    arrayPerem.append(countBooksMove)
    arrayPerem.append(dateOut)
    arrayPerem.append(dateIn)
    for i in arrayPerem:
        try:
            arrayPeremForInsert.append(int(i))
        except ValueError:
            arrayPeremForInsert.append(str(i))
    s = ', '.join( repr(e) for e in arrayPeremForInsert)
    cursors.execute(f'insert into MoveBook values(0,{s},null);')
    connection.commit()
    res = cursors.fetchall()
    return res

@eel.expose
def checkAllRecord(nameTable):
    cursors.execute(f'select * from {nameTable}')
    checkAllRecords = cursors.fetchall()
    return checkAllRecords

@eel.expose
def uniqueCheckSelect(idSelect):
    if int(idSelect) == 0:
        cursors.execute("select Readers.idReader as 'Number abonement', Readers.NameReader, Readers.SurnameReader, count(MoveBook.idBook) as 'Count read books' from MoveBook, Readers where Readers.idReader = MoveBook.idReader group by Readers.idReader, Readers.NameReader, Readers.SurnameReader;")
    elif int(idSelect) == 1:
        cursors.execute("select books.idBook, books.nameBook, genre.Genre,Author.NameAuthor,Author.SurnameAuthor,Author.lastNameAuthor, books.countBooks,sum(MoveBook.countBooksMove) from books,MoveBook,Author,genre where Author.idAuthor = books.idAuthor and MoveBook.idBook = books.idBook and books.idGenre = genre.idGenre group by books.idBook,books.nameBook, genre.idGenre, genre.Genre, Author.NameAuthor,Author.SurnameAuthor,Author.lastNameAuthor,books.countBooks order by sum(MoveBook.countBooksMove) desc limit 10")
    elif int(idSelect) == 2:
        cursors.execute("select books.nameBook,genre.Genre from books, genre where books.idGenre = genre.idGenre and books.idAuthor = (select idAuthor from Author where SurnameAuthor = 'Pyshkin');")
    elif int(idSelect) == 3:
        cursors.execute("select books.nameBook, Readers.NameReader, Readers.SurnameReader, Readers.lastNameReader, Readers.Passport_Seriya, Readers.Passport_Nomer, Readers.Passport_vydan from books,Readers,MoveBook where books.idBook = MoveBook.idBook and MoveBook.idReader = Readers.idReader and dateInFact is null;")
    checkUniqueSelectResult = cursors.fetchall()
    return checkUniqueSelectResult

@eel.expose
def bookReturn(dateInFact,idMoving):
    cursors.execute(f"update MoveBook set dateInFact = {repr(dateInFact)} where idMoving = {int(idMoving)}")
    connection.commit()


eel.init("web")
eel.start("index.html",size=(400,600), mode="edge")