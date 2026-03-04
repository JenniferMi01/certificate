# python3 -m venv .venv
# source .venv/bin/activate
# pip install -r requirements.txt
python3 -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload
