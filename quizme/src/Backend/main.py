import json
import mysql.connector
from typing import Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Body
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
host = "localhost"
user = "root"
database = "quizme"


@app.get("/")
def read_root():
    return {"hello": "world"}


@app.post("/createacc")
async def account(request: Request):
    mydb = mysql.connector.connect(
        host=host, user=user, database=database)
    cursor = mydb.cursor()
    body = json.loads(await request.body())
    cursor.execute(f"SELECT * FROM account WHERE email='{body['mail']}'")
    res = cursor.fetchall()
    if(len(res) == 0):
        cursor.execute(
            f"INSERT INTO `account` (`id_account`, `name`, `surname`, `password`, `email`) VALUES(NULL,'{body['name']}','{body['surname']}','{body['pass']}','{body['mail']}');")
        mydb.commit()
        data = "Success"
    else:
        data = "Fail"
    return data


@app.get("/getallaccounts")
async def allacts():
    mydb = mysql.connector.connect(
        host=host, user=user, database=database)
    cursor = mydb.cursor()
    cursor.execute(
        f"SELECT * FROM account WHERE id_account!=0")
    result = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]
    data = []
    for res in result:
        data.append(dict(zip(row_headers, res)))
    return data


@app.post("/modifyaccount")
async def modifacc(request: Request):
    mydb = mysql.connector.connect(
        host=host, user=user, database=database)
    body = json.loads(await request.body())
    cursor = mydb.cursor()
    try:
        cursor.execute(
            f"UPDATE account SET name='{body['name']}',surname='{body['surname']}',email='{body['mail']}',password='{body['pass']}' WHERE id_account={body['id']}")
        mydb.commit()
        return "OK"
    except:
        mydb.rollback()
        return "Failed"


@app.get("/deleteacc/{id}")
def delete(id: str):
    mydb = mysql.connector.connect(
        host=host, user=user, database=database)
    cursor = mydb.cursor()
    cursor.execute(f"DELETE FROM score WHERE id_account='{id}'")
    mydb.commit()
    cursor.execute(f"DELETE FROM account WHERE id_account='{id}'")
    mydb.commit()
    return "OK"


@app.post("/signin")
async def sign(request: Request):
    mydb = mysql.connector.connect(
        host=host, user=user, database=database)
    cursor = mydb.cursor()
    body = json.loads(await request.body())
    cursor.execute(
        f"SELECT * FROM account WHERE email='{body['mail']}' AND password ='{body['pass']}'")
    result = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]
    data = []
    for res in result:
        data.append(dict(zip(row_headers, res)))
    if(len(result) == 0):
        return "Failed"
    else:
        print(data)
        return data


@app.get("/addscore/{mail}/{idq}/{score}")
def score(score, idq: int, mail: str):
    mydb = mysql.connector.connect(
        host=host, user=user, database=database)
    cursor = mydb.cursor()
    cursor.execute(f"SELECT id_account FROM account WHERE email='{mail}'")
    ida = cursor.fetchone()
    ida = ida[0]
    cursor.execute(
        f"SELECT * FROM score WHERE id_account={ida} AND id_quiz={idq}")
    res = cursor.fetchall()
    if(len(res) == 0):
        cursor.execute(f"INSERT INTO score VALUES ({ida},{idq},{score})")
        mydb.commit()
    else:
        cursor.execute(
            f"UPDATE score SET score={score} WHERE id_account={ida} AND id_quiz={idq}")
        mydb.commit()
    return "Success"


@app.get("/getscores")
def gets():
    mydb = mysql.connector.connect(
        host="127.0.0.1", user="root", database="quizme")
    cursor = mydb.cursor()
    cursor.execute(
        f"SELECT *,name FROM score s,account a WHERE a.id_account=s.id_account ORDER by score DESC")
    result = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]
    if(len(result) == 0):
        return "nothing"
    data = []
    for res in result:
        data.append(dict(zip(row_headers, res)))
    return data
