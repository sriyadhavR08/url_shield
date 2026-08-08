import re
from urllib.parse import urlparse

class URLScanner:
    def __init__(self, db_keywords=None):
        self.db_keywords = db_keywords or []
        
        self.shorteners = [
            'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'is.gd', 'cli.gs', 
            'yfrog.com', 'migre.me', 'ff.im', 'tiny.cc', 'url4.eu', 'twit.ac', 
            'su.pr', 'twurl.nl', 'snipurl.com', 'short.to', 'BudURL.com', 
            'ping.fm', 'post.ly', 'Just.as', 'bkite.com', 'snipr.com', 
            'fic.kr', 'loopt.us', 'doiop.com', 'short.ie', 'kl.am', 'wp.me', 
            'rubyurl.com', 'om.ly', 'to.ly', 'bit.do', 't.co', 'lnkd.in', 
            'db.tt', 'qr.ae', 'adf.ly', 'goo.gl', 'bitly.com', 'cur.lv', 
            'ow.ly', 'ity.im', 'q.gs', 'is.gd', 'po.st', 'bc.vc', 'twitthis.com', 
            'u.to', 'j.mp', 'buzurl.com', 'cutt.us', 'u.bb', 'yourls.org', 
            'x.co', 'prettylinkpro.com', 'scrnch.me', 'filoops.info', 'vzturl.com', 
            'qr.net', '1url.com', 'tweez.me', 'v.gd', 'tr.im', 'link.zip.net'
        ]
        
        self.suspicious_extensions = ['.exe', '.apk', '.zip', '.rar', '.bat', '.sh', '.bin', '.cmd']
        self.suspicious_tlds = ['.xyz', '.top', '.loan', '.win', '.club', '.gq', '.ml', '.cf', '.tk', '.info']

    def analyze(self, url: str):
        if not url.startswith(('http://', 'https://')):
            url = 'http://' + url

        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        path = parsed_url.path

        risk_score = 0
        details = {
            "https_status": False,
            "url_length": len(url),
            "ip_detected": False,
            "shortener_detected": False,
            "suspicious_keywords_found": []
        }

        # 1. HTTPS Check
        if parsed_url.scheme == 'https':
            details["https_status"] = True
        else:
            risk_score += 35

        # 2. URL Length
        if len(url) > 75:
            risk_score += 10
        if len(url) > 150:
            risk_score += 15

        # 3. IP Address Detection
        ip_pattern = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
        if ip_pattern.match(domain.split(':')[0]):
            details["ip_detected"] = True
            risk_score += 25

        # 4. '@' Symbol
        if '@' in parsed_url.netloc:
            risk_score += 25

        # 5. Multiple '//'
        if url.count('//') > 1:
            risk_score += 10

        # 6. Hyphen in Domain
        if '-' in domain:
            risk_score += 10

        # 7. Subdomains Count
        subdomains = domain.split('.')
        if len(subdomains) > 3:
            risk_score += 10
        if len(subdomains) > 4:
            risk_score += 15

        # 8. URL Shortener Detection
        if any(shortener in domain for shortener in self.shorteners):
            details["shortener_detected"] = True
            risk_score += 20

        # 9. Suspicious Keywords (Default + DB)
        default_keywords = ['login', 'update', 'free', 'bonus', 'claim', 'secure', 'account', 'banking', 'confirm']
        all_keywords = set(default_keywords + [k.keyword for k in self.db_keywords])
        
        found_keywords = [kw for kw in all_keywords if kw.lower() in url.lower()]
        if found_keywords:
            details["suspicious_keywords_found"] = found_keywords
            risk_score += 15 * len(found_keywords)

        # 10. Suspicious File Extensions
        if any(path.lower().endswith(ext) for ext in self.suspicious_extensions):
            risk_score += 25

        # 11. Suspicious TLDs
        if any(domain.lower().endswith(tld) for tld in self.suspicious_tlds):
            risk_score += 20

        # Cap Risk Score at 100
        risk_score = min(risk_score, 100)

        # Determine Status
        if risk_score >= 60:
            status = "Dangerous"
        elif risk_score >= 30:
            status = "Medium Risk"
        else:
            status = "Safe"

        return {
            "risk_score": risk_score,
            "status": status,
            "details": details
        }
