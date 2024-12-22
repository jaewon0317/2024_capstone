import csv
import json

def csv_to_json(input_file, output_file):
    # JSON 구조를 저장할 리스트
    json_data = []
    
    with open(input_file, 'r', encoding='utf-8') as infile:
        reader = csv.reader(infile)
        
        # CSV의 각 행을 처리
        for row in reader:
            # 슬롯 값을 처리
            slot_values = row[3].replace("-", "0").split()  # "-"를 0으로 대체 후 공백 기준으로 분리
            slot_values = [int(slot) if slot.isdigit() else slot for slot in slot_values]  # 숫자는 정수로 변환
            
            # JSON 형태로 변환
            weapon = {
                "이름": row[0],
                "슬롯": int(row[1]) if row[1].isdigit() else 0,
                # "슬롯": slot_values,
                 "레어도": int(row[2]) if row[2].isdigit() else 0,
                "스킬": row[3],
               
            }
            json_data.append(weapon)
    
    # JSON 파일로 저장
    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(json_data, outfile, ensure_ascii=False, indent=4)
    
    print(f"JSON 변환 완료! 결과가 {output_file}에 저장되었습니다.")

# 실행 예시
input_file = '장신구1.csv'  # CSV 파일 경로
output_file = '장식주.json'  # 변환 후 저장할 JSON 파일 경로
csv_to_json(input_file, output_file)
