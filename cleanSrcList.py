import json

list_path="/home/glatho01/src/japanese-portal/lists/"

with open(list_path + "all-def","r",encoding="UTF-8") as list_file:
    try:
        dict = json.load(list_file);
        sorted_dict = {k: dict[k] for k in sorted(dict)}
        with open(list_path + "all-def","w",encoding="UTF-8") as out_file:
            json.dump(sorted_dict, out_file, ensure_ascii=False, indent=4)

    except json.JSONDecodeError as e:
        print("ERROR: all-def is corrupt")
        print(e) 