from dotenv import load_dotenv
import os
load_dotenv()

class Config:
    MONGODB_URI = os.getenv('MONGODB_URI')
    DB_NAME = os.getenv('DB_NAME')
    GOOGLE_CLIENT_ID=os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET=os.getenv("GOOGLE_CLIENT_SECRET")