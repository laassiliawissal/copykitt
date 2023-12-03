https://platform.openai.com/docs/quickstart?context=python

activate to get the env var :
source ~/.bash_profile  
<!--
create a venv:
python -m venv openai-env
activate venv:
source openai-env/bin/activate
remove v env:
rm -r myenv

ask git to Untrack Files:©
git rm -r --cached openai-env/

get the log of the current action: commit
git log
git log --oneline
-->

# run locally:


```bash
python copykitt.py "arg"
python copykitt.py "coffee"
```


# UP next: make our code as API, make it available via http
https://fastapi.tiangolo.com

Install required packages
```bash
pip install fastapi
pip install "uvicorn[standard]"
```
run the code

```bash
uvicorn copykitt-api:app --reload
```
access the api at port 8000
/docs to access the fastAPI swagger ui

/redoc to access fastAPI redoc
