import csv

def replace_hyphen_with_zero(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        for row in reader:
            # 4번째 열의 '-'를 '0'으로 바꾸기
            row[3] = row[3].replace("-", "0")
            writer.writerow(row)
    
    print(f"처리가 완료되었습니다! 결과가 {output_file}에 저장되었습니다.")

# 실행 예시
input_file = '건랜스2.csv'  # 기존 CSV 파일
output_file = 'fnl건랜스.csv'  # 변환 후 저장할 CSV 파일
replace_hyphen_with_zero(input_file, output_file)

