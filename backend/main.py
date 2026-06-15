from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes import tickets

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Support CRM"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://datastraw-assignment-2.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    tickets.router,
    prefix="/api"
)


@app.get("/")
def root():
    return {"message": "Support CRM API Running"}
