import json
import mysql.connector
from typing import Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Body
from googletrans import Translator
translator = Translator()
app = FastAPI()

origins = [
    "http://localhost/",
    "http://localhost:4200/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


""" @app.post("/translate")
async def translate(request: Request):
    body = json.loads(await request.body())
    translations = translator.translate(
        body["req"], dest="fr")
    data = []
    print(translations.text)
    return translations.text """
