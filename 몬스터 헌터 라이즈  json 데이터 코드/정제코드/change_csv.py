import json
import csv

# JSON 파일에서 데이터 읽기
input_file = "accessory_df.json"  # 변환할 JSON 파일 경로
output_file = "장신구.csv"  # 출력될 CSV 파일 경로

with open(input_file, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# CSV 파일에 데이터 쓰기
with open(output_file, 'w', encoding='utf-8', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)

    # JSON 데이터가 배열이라면 첫 번째 항목의 키를 CSV 헤더로 사용
    if isinstance(data, list) and len(data) > 0:
        # Write header
        header = data[0].keys()
        csv_writer.writerow(header)

        # Write rows
        for row in data:
            csv_writer.writerow(row.values())
    else:
        print("JSON 파일이 배열 형태가 아닙니다.")
