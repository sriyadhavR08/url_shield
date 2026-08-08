# URLShield Backend API

FastAPI backend for the URLShield Website Safety Checker application.

## Prerequisites

- Python 3.8+
- XAMPP (for MySQL)

## Setup Instructions

1. Start your XAMPP Control Panel and start the **MySQL** module.
2. Open phpMyAdmin (usually `http://localhost/phpmyadmin`) and create a new database named `urlshield_db`.
3. Open a terminal in this `backend` directory.
4. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   ```
5. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Run the FastAPI server using Uvicorn:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the server is running, you can access the interactive API documentation (Swagger UI) at:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Default Admin Account

An admin account is automatically created on the first startup:
- **Email:** admin@urlshield.com
- **Password:** admin123
