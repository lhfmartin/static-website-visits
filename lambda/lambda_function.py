import json
from datetime import datetime
import configparser
from pymongo import MongoClient

config = configparser.ConfigParser()
config.read("db.ini")

CONNECTION_STRING = f"mongodb+srv://{config['mongo']['username']}:{config['mongo']['password']}@{config['mongo']['host']}/?retryWrites=true&w=majority"
mongo_client = MongoClient(CONNECTION_STRING)

def lambda_handler(event, context):
    db = mongo_client.get_database(config['mongo']['database_name'])
    collection = db.get_collection(config['mongo']['collection_name'])

    reqBody = json.loads(event["body"])

    collection.insert_one({
        "datetime": datetime.utcnow(),
        **reqBody
    })

    return {
        "statusCode": 200,
        "body": json.dumps({})
    }
