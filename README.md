# note-dat
Note-dat is a note taking app

## Local installation
### Prerequisites
* Python
* pip

___

#### Clone repository:

```
git clone https://github.com/alexglazkov9/note-dat.git
cd note-dat
```
#### Setup Python environment and install dependencies:
```
virtualenv venv
source venv/bin/activate     # or ./venv/Scripts/activate.ps1
pip install -r requirements.txt
```

#### Run migrations:
```
flask db migrate
flask db upgrade
```

#### Start local server:
```
python run.py
```