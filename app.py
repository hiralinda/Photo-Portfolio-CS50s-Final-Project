from flask import Flask, render_template, request, send_file, jsonify, session, redirect
from flask_sqlalchemy import SQLAlchemy
import io
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = 'your_secret_key_here'

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))
    password = db.Column(db.String(500))


# password = "senha"
# hashed_password = generate_password_hash(password)
# print(hashed_password)


@app.route("/")
def index():
    return render_template("index.html", uploads=Upload.query.all())


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""
    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username and password were submitted
        username = request.form.get("username")
        password = request.form.get("password")
        if not username:
            return render_template("login.html", message="no username")
        elif not password:
            return render_template("login.html", message="no password")
        
        user = User.query.filter_by(username=username).all()
        if not user[0]:
            return render_template("login.html", message="Invalid username and/or password")
        
        if not check_password_hash(user[0].password, password):
            return render_template("login.html", message="Invalid username and/or password")

        session["admin"] = True
        return redirect('/admin')
       
    # User reached route via GET (as by clicking a link or via redirect)
    else:
        if session["admin"] == True:
            return redirect('/admin')
        return render_template("login.html")

@app.route("/logout")
def logout():
    # Forget any user_id
    session.clear()
    session["admin"] = False
    # Redirect user to login form
    return redirect("/")

@app.route('/admin', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']

        if not file:
            return jsonify({'message': 'No pic uploaded!'}), 400
        else:
            allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'avif'}  
            if file.filename.split('.')[-1].lower() not in allowed_extensions:
                return jsonify({'message': 'Invalid file format. Please upload an image file'}), 400
            else:
                upload = Upload(filename=file.filename, data=file.read())
                db.session.add(upload)
                db.session.commit()
                return jsonify({'message': f'Uploaded: {file.filename}', 'reload': True})
    else:
        if session["admin"] == True:
            return render_template('admin.html', uploads=Upload.query.all())
        else:
            return redirect("/")


@app.route('/delete-image/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    # Fetch the image record from the database
    image = Upload.query.get(image_id)
    if image:
        # If the image exists, delete it from the database
        db.session.delete(image)
        db.session.commit()
        return '', 204  # Return success with status code 204 (No Content)
    else:
        # If the image does not exist, return a 404 error
        return 'Image not found', 404

@app.route('/images/<int:upload_id>')
def display_image(upload_id):
    upload = Upload.query.get_or_404(upload_id)
    return send_file(io.BytesIO(upload.data), mimetype='image/jpeg')

if __name__ == '__main__':
    with app.app_context():
        db.configure_mappers()
        db.create_all()
        db.session.commit()
    app.run(debug=True)

