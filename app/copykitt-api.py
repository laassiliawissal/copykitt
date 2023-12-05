from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from copykitt import generate_keywords, generate_branding_snippet 
from mangum import Mangum

MAX_LENGH_INPUT= 12 

app = FastAPI()
handler = Mangum(app)

@app.get("/generate_snippet")
def generate_snippet_api(prompt : str):
    validate_len(prompt)
    snipet = generate_branding_snippet(prompt)
    return {"snipet " : snipet}

@app.get("/generate_keywords")
def generate_keywords_api(prompt : str):
    validate_len(prompt)
    keywords = generate_keywords(prompt)
    return {"keywords " : keywords}

@app.get("/generate_snippets_and_keywords")
def generate_snippets_and_keywords_api(prompt : str):
    validate_len(prompt)
    snipet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snipet " : snipet, "keywords " : keywords}

def validate_len(prompt :str):
    if len(prompt) >= MAX_LENGH_INPUT:
        raise HTTPException(
            status_code=400, 
            detail=f"Input lengh is too Long. Must be under {MAX_LENGH_INPUT}."
            )


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
