import json

list_path="/var/www/html/japanese/lists/"

with open(list_path + "all-def","r",encoding="UTF-8") as list_file:
    try:
        dict = json.load(list_file);
    except json.JSONDecodeError as e:
        print("ERROR: all-def is corrupt")
        print(e) 