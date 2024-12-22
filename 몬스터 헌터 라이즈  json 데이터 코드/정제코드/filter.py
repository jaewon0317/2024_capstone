import csv

# CSV 파일 읽고 처리
def process_csv(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        for row in reader:
            # 3번째 열 제거 (코드 열)
            del row[4]
            
            # 5번째 열의 앞 1글자 제거
            #row[4] = row[4][3:].strip()
            # row[4] = row[4].split()
            # 변환된 행을 출력
            writer.writerow(row)
    
    print(f"처리가 완료되었습니다! 결과가 {output_file}에 저장되었습니다.")

# 실행 예시
input_file = '장신구.csv'  # 기존 CSV 파일
output_file = '장신구1.csv'  # 변환 후 저장할 CSV 파일
process_csv(input_file, output_file)
