from flask import Flask

app = Flask(__name__)

@app.route("/")
def data_collector():
    """Serves a web page for collecting sketch data"""
    return 