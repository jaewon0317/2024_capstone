import csv

# CSV 파일 읽고 처리
def process_csv(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        for row in reader:
            # 4번째 열의 처리
            try:
                # 문자열 형태의 리스트를 실제 리스트로 변환
                special_effect = eval(row[3])
                if isinstance(special_effect, list):
                    # 리스트를 병합하여 원하는 형식으로 변환
                    row[3] = ' '.join(special_effect)
                else:
                    # 리스트가 아니면 그대로 사용
                    row[3] = str(special_effect)
            except (SyntaxError, ValueError):
                # 변환 실패 시 열 값을 그대로 유지
                pass
            row[3] = row[3].replace("-", "0")

            
            # 변환된 행을 CSV 파일에 쓰기
            writer.writerow(row)
    
    print(f"처리가 완료되었습니다! 결과가 {output_file}에 저장되었습니다.")

# 실행 예시
input_file = '방어구.csv'  # 기존 CSV 파일
output_file = '방어구1.csv'  # 변환 후 저장할 CSV 파일
process_csv(input_file, output_file)
