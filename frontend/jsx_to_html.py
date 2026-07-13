import re
import os

def style_replacer(match):
    style_content = match.group(1)
    
    props = style_content.split(',')
    html_style = []
    for prop in props:
        if ':' not in prop: continue
        k, v = prop.split(':', 1)
        k = k.strip()
        v = v.strip()
        
        kebab_k = re.sub(r'(?<!^)(?=[A-Z])', '-', k).lower()
        
        v = v.replace('"', '').replace("'", "")
        if kebab_k in ['font-size', 'width', 'height', 'border-radius', 'padding', 'margin', 'top', 'left', 'bottom', 'right'] and v.isdigit():
            v = f"{v}px"
            
        if 'C.g900' in v: v = "#0F172A"
        elif 'C.blue' in v: v = "#2563EB"
        elif 'C.g500' in v: v = "#64748B"
        elif 'C.g400' in v: v = "#94A3B8"
        elif 'C.g300' in v: v = "#CBD5E1"
        elif 'C.g200' in v: v = "#E2E8F0"
        elif 'C.g100' in v: v = "#F1F5F9"
        elif 'C.g50' in v: v = "#F8FAFC"
        elif 'C.white' in v: v = "#FFFFFF"
        elif 'C.green' in v: v = "#10B981"
        elif 'C.red' in v: v = "#EF4444"
        elif 'C.amber' in v: v = "#F59E0B"
        elif 'C.purple' in v: v = "#8B5CF6"
        elif 'C.indigo' in v: v = "#6366F1"
        elif 'C.teal' in v: v = "#14B8A6"
        
        html_style.append(f"{kebab_k}: {v}")
        
    return 'style="' + '; '.join(html_style) + ';"'

def icon_replacer(match):
    icon_name = match.group(1).lower()
    attrs = match.group(2)
    # just create a simple div for now or an i tag
    return f'<i data-lucide="{icon_name}" {attrs}></i>'

def convert(filename, out_filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace('className=', 'class=')
    content = re.sub(r'style=\{\{\s*(.*?)\s*\}\}', style_replacer, content, flags=re.DOTALL)
    
    # Replace icons like <Clock size={12} color={C.g400} />
    content = re.sub(r'<([A-Z][a-zA-Z0-9]*)\s*(.*?)\s*/>', icon_replacer, content)
    
    # Remove { ...map(...) } and just leave inner HTML (very rough)
    content = re.sub(r'\{[^{]*\.map\([^>]*=>\s*\(', '', content)
    content = re.sub(r'\)\)\}?', '', content)
    
    # Remove other {vars}
    content = re.sub(r'\{([a-zA-Z0-9_.]+)\}', r'\1', content)
    
    with open(out_filename, 'w', encoding='utf-8') as f:
        f.write(content)

for role in ['employee', 'manager', 'admin']:
    try:
        convert(f"d:/ExpertDecisionPlatform/frontend/templates/temp_{role}.txt", f"d:/ExpertDecisionPlatform/frontend/templates/{role}_dashboard_raw.html")
    except Exception as e:
        print(f"Error on {role}: {e}")
