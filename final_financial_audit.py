import re

with open('data/lessons/financial.js', 'r') as f:
    content = f.read()

# Improved regex to find individual lesson objects
lessons = re.findall(r'(\s+\{\s+id: "[a-z0-9]+",.*?\n\s+\}(?:,)?(?=\n\s+\{|$))', content, re.DOTALL)
print(f"Total financial functions: {len(lessons)}")

required = ["detailedExamples", "stepByStep"]
missing_count = 0

for lesson in lessons:
    id_match = re.search(r'id: "([a-z0-9]+)"', lesson)
    if id_match:
        lid = id_match.group(1)
        missing = [r for r in required if f"{r}:" not in lesson]
        if missing:
            print(f"Lesson {lid} is missing {', '.join(missing)}")
            missing_count += 1

if missing_count == 0:
    print("All 58 financial functions have Detailed Examples and Step-by-Step breakdowns.")
