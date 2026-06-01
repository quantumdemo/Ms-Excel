import re
import json

def parse_md(filepath):
    with open(filepath, 'r') as f:
        text = f.read()

    blocks = re.split(r'\n---\n\n## ', '\n' + text)
    lessons = {}

    for block in blocks:
        if not block.strip(): continue

        # ID
        title_match = re.search(r'## (.*?) Function', '## ' + block)
        if not title_match: continue
        title_raw = title_match.group(1).strip()
        id = title_raw.lower()

        # Intro
        intro_match = re.search(r'### (.*?): .*? Function\n(.*?)\n\nThink of it as (.*?): "(.*?)"', block, re.DOTALL)
        intro = {}
        if intro_match:
            intro = {
                "title": intro_match.group(1).strip(),
                "description": intro_match.group(2).strip(),
                "concept": f"Think of it as {intro_match.group(3).strip()}: \"{intro_match.group(4).strip()}\""
            }

        # Syntax
        syntax_match = re.search(r'### Syntax\n`(.*?)`', block)
        syntax = syntax_match.group(1).strip() if syntax_match else ""

        # Breakdown
        breakdown = []
        breakdown_match = re.search(r'### Syntax Breakdown\n\| Part \| Description \|\n\|.*?\|.*?\|\n(.*?)(?=\n\n|\n#|$)', block, re.DOTALL)
        if breakdown_match:
            for row in breakdown_match.group(1).strip().split('\n'):
                parts = [p.strip() for p in row.split('|')]
                if len(parts) >= 3:
                    breakdown.append({"arg": parts[1].replace('**', ''), "desc": parts[2]})

        # Example
        examples = []
        # Find #### Example: Title
        ex_match = re.search(r'#### Example: (.*?)\n\n(.*?)\n\nFormula: `(.*?)`\n\n(.*?)\n\n\*\*How it works:\*\*\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL)
        if ex_match:
            ex_title, ex_table_md, ex_formula, ex_result_md, ex_steps_raw = ex_match.groups()
            rows = []
            table_lines = ex_table_md.strip().split('\n')
            if len(table_lines) >= 3:
                headers = [h.strip() for h in table_lines[0].strip('|').split('|')]
                for line in table_lines[2:]:
                    rows.append([d.strip() for d in line.strip('|').split('|')])
                examples.append({
                    "title": ex_title.strip(),
                    "table": {"headers": headers, "rows": rows},
                    "stepByStep": [s.strip().lstrip('1234567890. ').strip() for s in ex_steps_raw.strip().split('\n') if s.strip()]
                })

        # Mistakes
        mistakes = []
        mistakes_match = re.search(r'### Common Mistakes\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL)
        if mistakes_match:
            for line in mistakes_match.group(1).strip().split('\n'):
                line = line.strip().lstrip('- ').strip()
                if '—' in line:
                    m_parts = line.split('—')
                    mistakes.append({"title": m_parts[0].strip(), "desc": m_parts[1].strip()})
                elif ' - ' in line:
                    m_parts = line.split(' - ')
                    mistakes.append({"title": m_parts[0].strip(), "desc": m_parts[1].strip()})

        # Tips
        tips = []
        tips_match = re.search(r'### Pro Tips\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL)
        if tips_match:
            tips = [t.strip().lstrip('- ').strip() for t in tips_match.group(1).strip().split('\n') if t.strip()]

        lessons[id] = {
            "title": title_raw + " Function",
            "intro": intro,
            "syntax": syntax,
            "breakdown": breakdown,
            "examples": examples,
            "mistakes": mistakes,
            "tips": tips
        }
    return lessons

data = parse_md('stats_01_10.md')
print(json.dumps(data, indent=2))
