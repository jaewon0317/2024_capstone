import csv

# 입력과 출력 파일 경로
input_file = "방어구.csv"
output_file = "방어구2.csv"

def process_row(row):
    # 4번째 열 처리 (인덱스는 3)
    if row[3] == "-" or "-" in row[3]:
        row[3] = row[3].replace("-", "0")
    else:
        try:
            # 문자열을 리스트로 변환 후 병합
            int_list = eval(row[3])  # 문자열을 리스트로 변환
            row[3] = ''.join(int_list)  # 리스트의 요소를 문자열로 병합
        except (SyntaxError, ValueError):
            row[3] = "0"  # 변환 실패 시 0으로 설정

    # 모든 열에서 '-' 값을 "0"으로 변환
    row = [cell.replace("-", "0") if "-" in cell else cell for cell in row]

    # 누락된 값 처리: 빈 값("")을 "0"으로 설정
    row = [cell if cell.strip() else "0" for cell in row]
    
    return row

# CSV 파일 읽고 처리
with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8', newline='') as outfile:
    csv_reader = csv.reader(infile)
    csv_writer = csv.writer(outfile)
    
    # 헤더 처리 (필요 시)
    # header = next(csv_reader)
    # csv_writer.writerow(header)
    
    # 데이터 처리
    for row in csv_reader:
        processed_row = process_row(row)
        csv_writer.writerow(processed_row)
