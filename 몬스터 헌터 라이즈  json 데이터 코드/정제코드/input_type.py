import pandas as pd

# CSV 파일 읽기
input_file = 'fnl활.csv'  # 원본 파일 경로를 입력하세요
output_file = '활.csv'  # 수정된 파일 저장 경로

# CSV 파일 읽기 (헤더 없이 읽기)
df = pd.read_csv(input_file, header=None)

# 각 행 앞에 '활' 추가
df.insert(0, '활', '활')

# 수정된 CSV 파일 저장
df.to_csv(output_file, index=False, header=False)

print(f"모든 행 앞에 '활'가 추가되었습니다. 수정된 파일은 '{output_file}'에 저장되었습니다.")
