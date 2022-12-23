import json
from datetime import datetime
import configparser
from pymongo import MongoClient

config = configparser.ConfigParser()
config.read("db.ini")

CONNECTION_STRING = f"mongodb+srv://{config['mongo']['username']}:{config['mongo']['password']}@{config['mongo']['host']}/?retryWrites=true&w=majority"

REQUEST_TYPE_COLLECTION = {
    "PAGE_VISIT": "pages",
    "EXTERNAL_SITE_VISIT": "externalUrls",
    "ERROR_PAGE": "errors",
}

mongo_client = MongoClient(CONNECTION_STRING)

def lambda_handler(event, context):
    req_body = json.loads(event["body"])

    db = mongo_client.get_database(config['mongo']['database_name'])
    collection = db.get_collection(REQUEST_TYPE_COLLECTION[req_body["type"]])

    del req_body["type"]

    collection.insert_one({
        "datetime": datetime.utcnow(),
        "ip": event["requestContext"]["http"]["sourceIp"],
        **req_body
    })

    return {
        "statusCode": 200,
        "body": json.dumps({})
    }
