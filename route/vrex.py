from flask import render_template, request, Blueprint, abort
from jinja2 import TemplateNotFound

bp = Blueprint('vr', __name__, url_prefix='/vr')

@bp.route("/")
def index():
    try:
        return render_template("test.html")
    except TemplateNotFound:
        abort(404)