import mysql.connector
import time
from collections import defaultdict

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'your_username',
    'password': 'your_password',
    'database': 'blog_platform'
}

def connect_to_db():
    return mysql.connector.connect(**DB_CONFIG)

def get_recent_views():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    
    query = """
    SELECT post_id, user_ip, viewed_at
    FROM post_views
    WHERE viewed_at >= NOW() - INTERVAL 1 HOUR
    """
    
    cursor.execute(query)
    views = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return views

def detect_fake_views(views):
    ip_count = defaultdict(int)
    post_ip_count = defaultdict(lambda: defaultdict(int))
    
    for view in views:
        ip_count[view['user_ip']] += 1
        post_ip_count[view['post_id']][view['user_ip']] += 1
    
    suspicious_ips = [ip for ip, count in ip_count.items() if count > 100]
    suspicious_post_views = [
        (post_id, ip)
        for post_id, ip_counts in post_ip_count.items()
        for ip, count in ip_counts.items()
        if count > 10
    ]
    
    return suspicious_ips, suspicious_post_views

def update_fake_views(suspicious_ips, suspicious_post_views):
    conn = connect_to_db()
    cursor = conn.cursor()
    
    # Mark suspicious IPs
    for ip in suspicious_ips:
        cursor.execute("UPDATE post_views SET is_valid = 0 WHERE user_ip = %s", (ip,))
    
    # Mark suspicious post views
    for post_id, ip in suspicious_post_views:
        cursor.execute("UPDATE post_views SET is_valid = 0 WHERE post_id = %s AND user_ip = %s", (post_id, ip))
    
    conn.commit()
    cursor.close()
    conn.close()

def main():
    while True:
        views = get_recent_views()
        suspicious_ips, suspicious_post_views = detect_fake_views(views)
        update_fake_views(suspicious_ips, suspicious_post_views)
        time.sleep(300)  # Run every 5 minutes

if __name__ == "__main__":
    main()

