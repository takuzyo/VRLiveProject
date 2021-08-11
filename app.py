from flask import Flask, redirect, url_for
from route import top, vrex

app = Flask(__name__)

# add route
app.register_blueprint(top.bp)
app.register_blueprint(vrex.bp)




if __name__ == "__main__":
    app.run(host='127.0.0.1',port=5000)