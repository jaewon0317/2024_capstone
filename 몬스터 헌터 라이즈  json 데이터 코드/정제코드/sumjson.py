import os
import json

# JSON 파일이 있는 디렉토리 경로
directory = "C:/Users/jheon/OneDrive/바탕 화면/json"  # JSON 파일들이 있는 디렉토리 경로

# 결과를 저장할 리스트
combined_data = []

# 디렉토리의 모든 파일 읽기
for filename in os.listdir(directory):
    if filename.endswith(".json"):
        file_path = os.path.join(directory, filename)
        with open(file_path, "r", encoding="utf-8") as file:
            try:
                data = json.load(file)
                # JSON 파일의 데이터가 리스트인지, 딕셔너리인지에 따라 처리
                if isinstance(data, list):
                    combined_data.extend(data)
                else:
                    combined_data.append(data)
            except json.JSONDecodeError as e:
                print(f"Error decoding {filename}: {e}")

# 합친 데이터를 저장할 파일
output_file = "무기.json"
with open(output_file, "w", encoding="utf-8") as outfile:
    json.dump(combined_data, outfile, indent=4, ensure_ascii=False)

print(f"JSON files combined into {output_file}")
