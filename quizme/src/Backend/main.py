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


@app.post("/createacc")
async def account(request: Request):
    mydb = mysql.connector.connect(
        host="localhost", user="root", database="quizme")
    cursor = mydb.cursor()
    body = json.loads(await request.body())
    cursor.execute(f"SELECT * FROM account WHERE email='{body['mail']}'")
    res = cursor.fetchall()
    print(len(res))
    if(len(res) == 0):
        cursor.execute(
            f"INSERT INTO `account` (`id_account`, `name`, `surname`, `password`, `email`, `avatar`) VALUES(NULL,'{body['name']}','{body['surname']}','{body['pass']}','{body['mail']}','{body['avatar']}');")
        mydb.commit()
        data = "Success"
    else:
        data = "Failed"
    return data
