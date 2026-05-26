from playwright.sync_api import sync_playwright
import os

def run():
    files = os.listdir('.')
    files.sort()

    html_content = """
    <html>
    <body style="background-color: #0f1117; color: white; font-family: sans-serif; padding: 40px;">
        <h1 style="color: #217346;">Project Root Directory</h1>
        <div style="background: #1c1f26; padding: 20px; border-radius: 10px; border: 1px solid #334155;">
            <ul style="list-style: none; padding: 0; line-height: 1.6;">
    """

    for f in files:
        if f == '.env.example':
            html_content += f'<li style="color: #2da061; font-weight: bold; background: rgba(33, 115, 70, 0.2); padding: 5px; border-radius: 4px;">📄 {f}  <-- FOUND HERE</li>'
        elif os.path.isdir(f):
            html_content += f'<li style="color: #94a3b8;">📁 {f}/</li>'
        else:
            html_content += f'<li style="color: #94a3b8;">📄 {f}</li>'

    html_content += """
            </ul>
        </div>
    </body>
    </html>
    """

    with open('file_list.html', 'w') as f:
        f.write(html_content)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 600, 'height': 800})
        page.goto(f'file://{os.getcwd()}/file_list.html')
        page.screenshot(path='env_location.png')
        browser.close()

if __name__ == "__main__":
    run()
