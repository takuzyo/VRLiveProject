from flask import render_template, request, Blueprint, abort
from jinja2 import TemplateNotFound

bp = Blueprint('top', __name__, url_prefix='')

@bp.route("/")
def index():
    try:
        return render_template("test.html")
    except TemplateNotFound:
        abort(404)